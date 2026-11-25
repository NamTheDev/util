import test from "node:test";
import assert from "node:assert/strict";
import {latestRuns,statusOf,summarize,matches} from "../dashboard/model.mjs";
const run=(id,name,status,conclusion,created_at)=>({workflow_id:id,name,status,conclusion,created_at});
const older=run(1,"Pages deploy","completed","failure","2026-11-24T00:00:00Z");
const latest=run(1,"Pages deploy","in_progress",null,"2026-11-25T00:00:00Z");
const success=run(2,"CI","completed","success","2026-11-25T00:00:00Z");
test("latest per workflow and deployment ordering",()=>assert.deepEqual(latestRuns([older,success,latest]),[latest,success]));
test("statuses and filters",()=>{
  assert.equal(statusOf(latest).label,"in progress");
  assert.equal(statusOf(older).color,"fg-danger");
  assert.equal(statusOf(success).color,"fg-success");
  assert.equal(matches(latest,"deployments"),true);
  assert.equal(matches(success,"deployments"),false);
  assert.equal(matches(latest,"running"),true);
  assert.equal(matches(older,"failed"),true);
});
test("summary counts observed states",()=>assert.deepEqual(summarize([{runs:[latest,success]},{runs:[older]},{}]),{repos:3,running:1,success:1,failed:1}));
