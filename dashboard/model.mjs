export const OWNER = "NamTheDev";
export const activeRun = run => run.status !== "completed";
export const failedRun = run => ["failure","timed_out","action_required","startup_failure","stale"].includes(run.conclusion);
export const deploymentRun = run => /deploy|pages|publish|release/i.test((run.name || "") + " " + (run.path || ""));
export function latestRuns(runs) {
  const latest = new Map();
  for (const run of runs) {
    const id = run.workflow_id ?? run.name;
    if (!latest.has(id) || Date.parse(run.created_at) > Date.parse(latest.get(id).created_at)) latest.set(id, run);
  }
  return [...latest.values()].sort((a,b)=>Number(deploymentRun(b))-Number(deploymentRun(a))||(a.name||"").localeCompare(b.name||""));
}
export function statusOf(run) {
  if (activeRun(run)) return {label:run.status.replaceAll("_"," "),color:"fg-warning"};
  if (failedRun(run)) return {label:run.conclusion.replaceAll("_"," "),color:"fg-danger"};
  if (run.conclusion === "success") return {label:"success",color:"fg-success"};
  return {label:(run.conclusion || "unknown").replaceAll("_"," "),color:"fg-3"};
}
export function summarize(records) {
  const runs = records.flatMap(r=>r.runs || []);
  return {repos:records.length,running:runs.filter(activeRun).length,success:runs.filter(r=>!activeRun(r)&&r.conclusion==="success").length,failed:runs.filter(r=>!activeRun(r)&&failedRun(r)).length};
}
export function matches(run, filter) {
  return filter==="deployments"?deploymentRun(run):filter==="running"?activeRun(run):filter==="failed"?!activeRun(run)&&failedRun(run):true;
}
