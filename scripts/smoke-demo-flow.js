import assert from "node:assert/strict";
import path from "node:path";
import { createDiskClawApp } from "../src/app.js";
import { createDemoData } from "./create-demo-data.js";

async function main() {
  const { demoRoot } = await createDemoData();
  const { agent } = createDiskClawApp();

  const plan = await agent.plan([
    {
      path: demoRoot
    }
  ], {
    maxDepth: 6,
    maxFiles: 500,
    largeFileThresholdBytes: 1024 * 1024,
    duplicateMinSizeBytes: 1024 * 1024,
    staleDays: 30
  });

  assert.equal(plan.analysis.candidateSummary.totalCandidates > 0, true);
  assert.equal(plan.analysis.candidateSummary.duplicateResolutionRecommendations.length > 0, true);
  assert.equal(plan.analysis.candidateSummary.directoryHotspotRecommendations.length > 0, true);

  const cleanupTarget = plan.analysis.recommendedItems.find((item) => item.risk.deletionAllowed);
  assert.ok(cleanupTarget, "Expected at least one cleanup candidate.");

  const cleanup = await agent.execute([
    {
      path: cleanupTarget.path,
      risk: cleanupTarget.risk
    }
  ], {
    dryRun: false,
    mode: "quarantine",
    confirmHighRisk: false
  });

  assert.equal(cleanup.statusCounts.moved, 1);

  const quarantineItems = await agent.listQuarantineItems();
  const latest = quarantineItems.find((item) => item.originalPath === cleanupTarget.path && !item.restoredAt);
  assert.ok(latest, "Expected moved file in quarantine.");

  const restored = await agent.restore([
    {
      id: latest.id
    }
  ]);

  assert.equal(restored.results[0].status, "restored");

  console.log("Smoke demo flow passed.");
  console.log(`Demo root: ${demoRoot}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
