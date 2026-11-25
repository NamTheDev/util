import {OWNER, activeRun, deploymentRun, latestRuns, statusOf, summarize, matches} from "./model.mjs";
const $ = id=>document.getElementById(id);
const records = new Map();
const api = "https://api.github.com";
let remaining=null, reset=0, busy=false, lastFull=0, lastActive=0, discovered=false, discoveryError="";
const time = value=>new Date(value).toLocaleString();
function element(tag, classes, text) {
  const node=document.createElement(tag);
  if(classes) node.className=classes;
  if(text!=null) node.textContent=text;
  return node;
}
function link(url,text,classes="") {
  const node=element("a",classes,text);
  node.href=url; node.target="_blank"; node.rel="noopener noreferrer";
  return node;
}
function safeURL(value,fallback) {
  try { const url=new URL(value); if(url.origin==="https://github.com") return url.href; } catch {}
  return fallback;
}
const blocked=()=>remaining===0 && Date.now()<reset;
function updateRate() {
  $("rate").textContent=remaining===null?"":"API requests remaining: "+remaining+(blocked()?" · resets "+time(reset):"");
}
async function request(path) {
  if(blocked()) throw Error("GitHub rate limit reached");
  const response=await fetch(api+path,{headers:{Accept:"application/vnd.github+json"},cache:"no-cache",signal:AbortSignal.timeout(15_000)});
  const left=response.headers.get("x-ratelimit-remaining"),next=response.headers.get("x-ratelimit-reset");
  if(left!==null) remaining=Number(left);
  if(next!==null) reset=Number(next)*1000;
  if(response.status===429 || (response.status===403 && remaining===0)) {
    remaining=0;
    reset=Math.max(reset,Date.now()+(Number(response.headers.get("retry-after"))||60)*1000);
  }
  updateRate();
  if(!response.ok) throw Error("GitHub HTTP "+response.status);
  return response.json();
}
async function discover() {
  const found=new Set();
  for(let page=1;;page++) {
    const repos=await request("/users/"+OWNER+"/repos?type=owner&sort=full_name&per_page=100&page="+page);
    if(!Array.isArray(repos)) throw Error("Invalid repository response");
    for(const repo of repos) {
      if(repo.owner?.login?.toLowerCase()!==OWNER.toLowerCase() || repo.private) continue;
      found.add(repo.name);
      records.set(repo.name,{...records.get(repo.name),repo});
    }
    if(repos.length<100) break;
  }
  for(const name of records.keys()) if(!found.has(name)) records.delete(name);
  discovered=true; discoveryError="";
}
async function refreshRecord(record) {
  if(blocked()) return;
  try {
    const {repo}=record;
    const data=await request("/repos/"+OWNER+"/"+encodeURIComponent(repo.name)+"/actions/runs?branch="+encodeURIComponent(repo.default_branch)+"&per_page=100");
    if(!Array.isArray(data.workflow_runs)) throw Error("Invalid workflow response");
    record.runs=latestRuns(data.workflow_runs); record.updated=Date.now(); record.error="";
  } catch(error) { record.error=error.message; }
}
function runRow(run,actionsURL) {
  const row=element("div","d-flex flex-wrap align-items-center justify-content-between gap-2 border-top py-2");
  const info=element("div","min-w-0");
  info.append(link(safeURL(run.html_url,actionsURL),run.name||"Workflow","fw-medium text-break"));
  const detail=[deploymentRun(run)?"Deployment workflow":"Workflow",run.head_sha?.slice(0,7),run.updated_at?time(run.updated_at):""].filter(Boolean);
  info.append(element("div","fg-3 fs-xs text-break",detail.join(" · ")));
  const status=statusOf(run);
  row.append(info,element("span",status.color+" fs-sm fw-semibold text-capitalize",status.label));
  return row;
}
function render() {
  const list=[...records.values()].sort((a,b)=>Number(a.repo.archived)-Number(b.repo.archived)||a.repo.name.localeCompare(b.repo.name));
  const counts=summarize(list);
  for(const [key,value] of Object.entries(counts)) $(key+"-count").textContent=discovered||list.length?value:"—";
  const filter=$("filter").value, container=$("repositories");
  container.replaceChildren();
  for(const record of list) {
    const {repo}=record;
    if(filter==="active"&&repo.archived) continue;
    const runs=(record.runs||[]).filter(run=>matches(run,filter));
    if(["deployments","running","failed"].includes(filter)&&!runs.length) continue;
    const repoURL="https://github.com/"+OWNER+"/"+repo.name, actionsURL=repoURL+"/actions";
    const card=element("article","card bg-1 rounded-6"), body=element("div","card-body");
    const header=element("div","d-flex flex-wrap align-items-center justify-content-between gap-2 mb-2");
    const title=element("div","d-flex flex-wrap align-items-center gap-2");
    title.append(link(repoURL,repo.name,"fw-semibold fs-lg text-decoration-none"));
    if(repo.archived) title.append(element("span","fg-3 fs-xs","Archived"));
    header.append(title,link(actionsURL,"Actions","fs-sm")); body.append(header);
    if(record.error) body.append(element("p","fg-danger fs-sm mb-2",record.error+(record.updated?" · last successful fetch retained":"")));
    if(record.updated) body.append(element("p","fg-3 fs-xs mb-2","Checked "+time(record.updated)));
    if(runs.length) for(const run of runs) body.append(runRow(run,actionsURL));
    else body.append(element("p","fg-3 fs-sm m-0",record.updated?"No recent default-branch workflow runs.":"Workflow status not retrieved."));
    card.append(body); container.append(card);
  }
  if(!container.children.length&&discovered) container.append(element("p","fg-3","No matching repositories."));
  updateRate();
}
async function refresh(full) {
  if(busy||blocked()) return;
  busy=true; $("refresh").disabled=true; $("status").textContent="Refreshing GitHub workflow statuses…";
  try {
    if(full||!discovered) {
      try { await discover(); } catch(error) { discoveryError=error.message; }
      for(const record of records.values()) {
        if(blocked()) break;
        await refreshRecord(record); render();
      }
      lastFull=Date.now();
    } else {
      for(const record of records.values()) {
        if(remaining!==null&&remaining<=records.size+2&&Date.now()<reset) break;
        if(record.runs?.some(activeRun)) await refreshRecord(record);
      }
    }
    lastActive=Date.now();
  } finally {
    busy=false; $("refresh").disabled=false; render();
    const errors=[...records.values()].filter(r=>r.error||!r.updated).length;
    $("status").textContent=discoveryError?"Repository discovery failed: "+discoveryError:blocked()?"Rate limited; last results retained.":"Last refresh attempt "+time(Date.now())+(errors?" · "+errors+" repositories not fully refreshed":"")+" · Full refresh every 15 min; running workflows every minute when budget allows.";
  }
}
$("filter").addEventListener("change",render);
$("refresh").addEventListener("click",()=>{
  if(blocked()) { $("status").textContent="GitHub rate limit reached; retry after "+time(reset); return; }
  void refresh(true);
});
setInterval(()=>{
  if(document.hidden||busy||blocked()) return;
  if(Date.now()-lastFull>=15*60_000) void refresh(true);
  else if(Date.now()-lastActive>=60_000&&[...records.values()].some(r=>r.runs?.some(activeRun))) void refresh(false);
},15_000);
void refresh(true);
