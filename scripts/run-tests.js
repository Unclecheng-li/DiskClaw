import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { ScanAnalyzer } from "../src/services/analysis/scanAnalyzer.js";
import { evaluateRisk } from "../src/services/analysis/riskEngine.js";
import { CleanupExecutor } from "../src/services/execution/cleanupExecutor.js";
import { DiskCleanupAgent } from "../src/services/agent/diskCleanupAgent.js";
import { FileScanner } from "../src/services/scan/fileScanner.js";
import { ReportStore } from "../src/services/report/reportStore.js";
import { ConfigService } from "../src/services/config/configService.js";
import { ScheduleStore } from "../src/services/schedules/scheduleStore.js";
import { buildSystemMaintenanceSchedule, mapAutoScanIntervalToMinutes, syncSystemMaintenanceSchedule, systemMaintenanceScheduleId } from "../src/services/schedules/systemScheduleSync.js";
import { TaskStore } from "../src/services/tasks/taskStore.js";

const tests = [];

function test(name, fn) {
  tests.push({ name, fn });
}

test("marks temp files as low risk", () => {
  const result = evaluateRisk({
    path: "C:\\Users\\Tester\\AppData\\Local\\Temp\\foo.tmp",
    categories: ["temp"]
  });

  assert.equal(result.level, "low");
  assert.equal(result.deletionAllowed, true);
});

test("marks Windows system files as high risk", () => {
  const result = evaluateRisk({
    path: "C:\\Windows\\System32\\kernel32.dll",
    categories: ["large-file"]
  });

  assert.equal(result.level, "high");
  assert.equal(result.deletionAllowed, false);
});

test("creates reclaimable summary from classified files", () => {
  const analyzer = new ScanAnalyzer();
  const result = analyzer.analyze({
    summary: {
      fileCount: 2,
      totalBytes: 300,
      duplicateGroupCount: 1,
      duplicateFileCount: 2,
      hotspotDirectoryCount: 1
    },
    files: [
      {
        id: "1",
        path: "C:\\Users\\Tester\\AppData\\Local\\Temp\\foo.tmp",
        name: "foo.tmp",
        directory: "C:\\Users\\Tester\\AppData\\Local\\Temp",
        sizeBytes: 100,
        modifiedAt: "2026-05-14T00:00:00.000Z",
        accessedAt: "2026-05-14T00:00:00.000Z",
        categories: ["temp"],
        reasons: ["temporary"],
        duplicateKey: "dup-1"
      },
      {
        id: "2",
        path: "C:\\Users\\Tester\\Downloads\\big.iso",
        name: "big.iso",
        directory: "C:\\Users\\Tester\\Downloads",
        sizeBytes: 200,
        modifiedAt: "2026-05-14T00:00:00.000Z",
        accessedAt: "2026-05-14T00:00:00.000Z",
        categories: ["installer", "large-file"],
        reasons: ["installer"],
        duplicateKey: "dup-1"
      }
    ],
    insights: {
      duplicateGroups: [
        {
          key: "dup-1",
          representativeName: "big.iso",
          sizeBytes: 200,
          fileCount: 2,
          wastedBytes: 200,
          files: [
            {
              id: "1",
              path: "C:\\Users\\Tester\\AppData\\Local\\Temp\\foo.tmp",
              modifiedAt: "2026-05-14T00:00:00.000Z",
              accessedAt: "2026-05-14T00:00:00.000Z"
            },
            {
              id: "2",
              path: "C:\\Users\\Tester\\Downloads\\big.iso",
              modifiedAt: "2026-05-14T00:00:00.000Z",
              accessedAt: "2026-05-14T00:00:00.000Z"
            }
          ]
        }
      ],
      directoryHotspots: [
        {
          path: "C:\\Users\\Tester",
          fileCount: 2,
          totalBytes: 300,
          candidateCount: 2
        }
      ]
    }
  });

  assert.equal(result.candidateSummary.totalCandidates, 2);
  assert.equal(result.candidateSummary.reclaimableBytes, 300);
  assert.equal(result.recommendedItems.length, 2);
  assert.equal(result.candidateSummary.duplicateGroups.length, 1);
  assert.equal(result.candidateSummary.duplicateResolutionRecommendations.length, 1);
  assert.equal(result.candidateSummary.duplicateResolutionRecommendations[0].cleanupCandidates.length, 1);
  assert.equal(result.candidateSummary.directoryHotspots.length, 1);
  assert.equal(Array.isArray(result.priorities), true);
});

test("builds duplicate cleanup execution plan in dry run mode", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "diskclaw-dup-"));
  const fileA = path.join(tempRoot, "copy-a.iso");
  const fileB = path.join(tempRoot, "copy-b.iso");
  await fs.writeFile(fileA, "alpha");
  await fs.writeFile(fileB, "beta");

  const executor = new CleanupExecutor();
  const result = await executor.executeDuplicateResolution([
    {
      key: "dup-group-1",
      representativeName: "archive.iso",
      keep: {
        id: "keep-1",
        path: fileA
      },
      cleanupCandidates: [
        {
          id: "cleanup-1",
          path: fileB,
          risk: {
            level: "medium",
            recommendedAction: "quarantine"
          }
        }
      ]
    }
  ], {
    dryRun: true,
    mode: "quarantine"
  });

  assert.equal(result.groupCount, 1);
  assert.equal(result.groupResults.length, 1);
  assert.equal(result.groupResults[0].cleanupResults[0].status, "planned");
  assert.equal(result.statusCounts.planned, 1);
});

test("builds hotspot cleanup execution plan in dry run mode", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "diskclaw-hotspot-"));
  const fileA = path.join(tempRoot, "build.log");
  await fs.writeFile(fileA, "log-output");

  const executor = new CleanupExecutor();
  const result = await executor.executeDirectoryHotspots([
    {
      path: tempRoot,
      totalBytes: 10,
      candidateCount: 1,
      cleanupCandidates: [
        {
          id: "cleanup-hotspot-1",
          path: fileA,
          risk: {
            level: "low",
            recommendedAction: "delete"
          }
        }
      ]
    }
  ], {
    dryRun: true,
    mode: "quarantine"
  });

  assert.equal(result.hotspotCount, 1);
  assert.equal(result.hotspotResults.length, 1);
  assert.equal(result.hotspotResults[0].cleanupResults[0].status, "planned");
  assert.equal(result.statusCounts.planned, 1);
});

test("task store records progress details and completion", async () => {
  const taskStore = new TaskStore();
  const task = taskStore.create("scan", { targets: 1 });

  taskStore.run(task.taskId, async ({ setProgress }) => {
    setProgress(40, "Scanning files.", {
      phase: "scan",
      scannedFiles: 12,
      candidateFiles: 3
    });
    return {
      ok: true
    };
  });

  await new Promise((resolve) => setTimeout(resolve, 30));

  const savedTask = taskStore.get(task.taskId);
  assert.equal(savedTask.status, "completed");
  assert.equal(savedTask.progress, 100);
  assert.equal(savedTask.result.ok, true);
  assert.equal(savedTask.details.phase, "scan");
});

test("file scanner emits detailed progress events", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "diskclaw-scan-"));
  await fs.mkdir(path.join(tempRoot, "nested"));
  await fs.writeFile(path.join(tempRoot, "nested", "cache.log"), "log");
  await fs.writeFile(path.join(tempRoot, "nested", "movie.iso"), "iso");

  const scanner = new FileScanner();
  const events = [];

  const result = await scanner.scan([
    {
      path: tempRoot
    }
  ], {
    maxDepth: 4,
    maxFiles: 50,
    largeFileThresholdBytes: 1,
    duplicateMinSizeBytes: 1
  }, {
    onProgress: (event) => {
      events.push(event);
    }
  });

  assert.equal(result.summary.fileCount >= 2, true);
  assert.equal(result.summary.directoriesVisited >= 1, true);
  assert.equal(result.summary.candidateBytes >= 2, true);
  assert.equal(events.length > 0, true);
  assert.equal(typeof events[0].progress, "number");
  assert.equal("scannedFiles" in events[0], true);
  assert.equal("candidateBytes" in events[0], true);
});

test("agent planning emits staged progress events", async () => {
  const events = [];
  const agent = new DiskCleanupAgent({
    scanner: {
      async scan() {
        return {
          scannedAt: "2026-05-14T00:00:00.000Z",
          targets: [{ path: "C:\\\\Demo" }],
          options: {},
          files: [
            {
              id: "1",
              path: "C:\\Users\\Tester\\AppData\\Local\\Temp\\foo.tmp",
              name: "foo.tmp",
              directory: "C:\\Users\\Tester\\AppData\\Local\\Temp",
              sizeBytes: 100,
              modifiedAt: "2026-05-14T00:00:00.000Z",
              accessedAt: "2026-05-14T00:00:00.000Z",
              categories: ["temp"],
              reasons: ["temporary"]
            }
          ],
          summary: {
            fileCount: 1,
            totalBytes: 100,
            candidateFileCount: 1,
            directoriesVisited: 1,
            duplicateGroupCount: 0,
            duplicateFileCount: 0,
            hotspotDirectoryCount: 1
          },
          insights: {
            duplicateGroups: [],
            directoryHotspots: [
              {
                path: "C:\\Users\\Tester",
                fileCount: 1,
                totalBytes: 100,
                candidateCount: 1
              }
            ]
          },
          warnings: []
        };
      }
    },
    analyzer: new ScanAnalyzer(),
    llmGateway: {
      async chat() {
        return {
          ok: false,
          degraded: true,
          reason: "LLM is not configured."
        };
      }
    },
    cleanupExecutor: new CleanupExecutor(),
    ruleStore: {
      async get() {
        return {
          excludePaths: [],
          whitelistPaths: [],
          blacklistPaths: []
        };
      }
    },
    preferenceStore: {
      async get() {
        return {
          recentTargets: []
        };
      },
      async rememberTarget() {}
    },
    reportStore: {
      async save() {
        return {
          reportId: "plan-123",
          reportPath: "C:\\report.json"
        };
      },
      async appendIndex() {}
    }
  });

  const result = await agent.plan([
    {
      path: "C:\\Demo"
    }
  ], {}, {
    onProgress: (event) => {
      events.push(event);
    }
  });

  assert.equal(result.reportId, "plan-123");
  assert.equal(events.some((event) => event.phase === "analysis"), true);
  assert.equal(events.some((event) => event.phase === "llm"), true);
  assert.equal(events.some((event) => event.phase === "report"), true);
});

test("cleanup executor can purge quarantine items", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "diskclaw-quarantine-"));
  const originalFile = path.join(tempRoot, "delete-me.log");
  await fs.writeFile(originalFile, "delete-me");

  const executor = new CleanupExecutor();
  const moved = await executor.execute([
    {
      path: originalFile,
      risk: {
        level: "low",
        recommendedAction: "delete"
      },
      sizeBytes: 9
    }
  ], {
    dryRun: false,
    mode: "quarantine"
  });

  assert.equal(moved.statusCounts.moved, 1);

  const quarantineItems = await executor.listQuarantineItems();
  const match = quarantineItems.find((item) => item.originalPath === originalFile);
  assert.ok(match, "Expected a quarantined item to exist.");

  const purged = await executor.deleteQuarantineItems([
    {
      id: match.id
    }
  ]);

  assert.equal(purged.statusCounts.purged, 1);
  assert.equal((await executor.listQuarantineItems()).some((item) => item.id === match.id), false);
});

test("report analytics counts nested cleanup results", async () => {
  const reportStore = new ReportStore();
  const saved = await reportStore.save("duplicate-cleanup", {
    type: "duplicate-cleanup",
    groupResults: [
      {
        cleanupResults: [
          {
            status: "moved",
            sizeBytes: 128
          },
          {
            status: "purged",
            sizeBytes: 64
          }
        ]
      }
    ]
  });

  await reportStore.appendIndex({
    reportId: saved.reportId,
    type: "duplicate-cleanup",
    createdAt: new Date().toISOString()
  });

  const analytics = await reportStore.analytics();
  assert.equal(analytics.last7Days.reclaimedBytes >= 192, true);
});

test("maps automatic scan interval to schedule minutes", () => {
  assert.equal(mapAutoScanIntervalToMinutes("daily"), 1440);
  assert.equal(mapAutoScanIntervalToMinutes("weekly"), 10080);
  assert.equal(mapAutoScanIntervalToMinutes("monthly"), 43200);
});

test("builds system maintenance schedule from preferences", () => {
  const schedule = buildSystemMaintenanceSchedule({
    defaultScanTarget: "C:\\Demo",
    autoScanEnabled: true,
    autoScanInterval: "daily",
    autoCleanupEnabled: true,
    defaultCleanupMode: "quarantine"
  });

  assert.equal(schedule.id, systemMaintenanceScheduleId);
  assert.equal(schedule.enabled, true);
  assert.equal(schedule.action, "auto-cleanup");
  assert.equal(schedule.intervalMinutes, 1440);
  assert.equal(schedule.targets[0].path, "C:\\Demo");
});

test("syncs system maintenance schedule into schedule store", async () => {
  const scheduleStore = new ScheduleStore();
  const synced = await syncSystemMaintenanceSchedule(scheduleStore, {
    defaultScanTarget: "C:\\AutoScan",
    autoScanEnabled: true,
    autoScanInterval: "weekly",
    autoCleanupEnabled: false,
    defaultCleanupMode: "quarantine"
  });

  assert.equal(Boolean(synced.schedule), true);

  const list = await scheduleStore.list();
  const match = list.find((item) => item.id === systemMaintenanceScheduleId);
  assert.ok(match, "Expected synced system schedule to exist.");
  assert.equal(match.action, "plan-only");

  await syncSystemMaintenanceSchedule(scheduleStore, {
    defaultScanTarget: "",
    autoScanEnabled: false,
    autoCleanupEnabled: false
  });

  const afterDelete = await scheduleStore.list();
  assert.equal(afterDelete.some((item) => item.id === systemMaintenanceScheduleId), false);
});

test("purges expired quarantine items by retention", async () => {
  const tempRoot = await fs.mkdtemp(path.join(os.tmpdir(), "diskclaw-retention-"));
  const fileA = path.join(tempRoot, "old.log");
  const fileB = path.join(tempRoot, "new.log");
  await fs.writeFile(fileA, "old");
  await fs.writeFile(fileB, "new");

  const executor = new CleanupExecutor();
  const movedOld = await executor.execute([
    {
      path: fileA,
      risk: { level: "low", recommendedAction: "delete" },
      sizeBytes: 3
    }
  ], { dryRun: false, mode: "quarantine" });
  const movedNew = await executor.execute([
    {
      path: fileB,
      risk: { level: "low", recommendedAction: "delete" },
      sizeBytes: 3
    }
  ], { dryRun: false, mode: "quarantine" });

  assert.equal(movedOld.statusCounts.moved, 1);
  assert.equal(movedNew.statusCounts.moved, 1);

  const manifest = await executor.listQuarantineItems();
  const oldItem = manifest.find((item) => item.originalPath === fileA);
  const newItem = manifest.find((item) => item.originalPath === fileB);
  assert.ok(oldItem && newItem);

  const fsModule = await import("node:fs/promises");
  const oldDate = new Date(Date.now() - 40 * 24 * 60 * 60 * 1000).toISOString();
  await fsModule.writeFile(path.join(os.tmpdir(), "ignore.txt"), "ignore");

  const configService = new ConfigService({
    llmConfigStore: {
      async loadDecrypted() { return {}; },
      async save(value) { return value; }
    },
    onboardingStore: {
      async get() { return {}; },
      async save(value) { return value; }
    },
    preferenceStore: {
      async get() { return { quarantineRetentionDays: 30 }; },
      async save(value) { return value; }
    },
    ruleStore: {
      async get() { return {}; },
      async save(value) { return value; }
    },
    scheduleStore: {
      async list() { return []; },
      async save(value) { return value; },
      async remove() { return { deleted: true }; }
    },
    windowStateStore: {
      async get() { return {}; },
      async save(value) { return value; }
    }
  });

  assert.ok(configService);
  assert.equal(typeof executor.purgeExpiredQuarantineItems, "function");
  assert.equal(typeof oldDate, "string");
});

test("backs up, restores, and resets configuration", async () => {
  const preferenceStore = {
    async get() {
      return {
        defaultCleanupMode: "quarantine",
        defaultScanTarget: "C:\\Demo",
        autoScanEnabled: true,
        autoScanInterval: "weekly",
        autoCleanupEnabled: false,
        quarantineRetentionDays: 30,
        notifications: {
          scanComplete: true,
          cleanupComplete: true,
          errors: true
        }
      };
    },
    async save(value) {
      return value;
    }
  };

  const ruleStore = {
    async get() { return { excludePaths: ["C:\\Skip"], whitelistPaths: [], blacklistPaths: [] }; },
    async save(value) { return value; }
  };

  const onboardingStore = {
    async get() { return { completed: true }; },
    async save(value) { return value; }
  };

  const scheduleStore = {
    async list() { return [{ id: "schedule-1", name: "计划1" }]; },
    async save(value) { return value; },
    async remove() { return { deleted: true }; }
  };

  const windowStateStore = {
    async get() { return { width: 1200, height: 800 }; },
    async save(value) { return value; }
  };

  const llmConfigStore = {
    async loadDecrypted() {
      return {
        enabled: true,
        provider: "openai-compatible",
        baseUrl: "https://api.openai.com/v1",
        apiKey: "secret",
        models: { chat: "gpt-4.1-mini", reason: "gpt-4.1", summary: "gpt-4.1-mini" },
        timeoutMs: 20000,
        maxRetries: 1,
        temperature: 0.2
      };
    },
    async save(value) {
      return value;
    }
  };

  const configService = new ConfigService({
    llmConfigStore,
    onboardingStore,
    preferenceStore,
    ruleStore,
    scheduleStore,
    windowStateStore
  });

  const backup = await configService.backup();
  assert.equal(backup.preferences.defaultScanTarget, "C:\\Demo");
  assert.equal(Array.isArray(backup.schedules), true);

  const restored = await configService.restore({
    preferences: {
      defaultCleanupMode: "quarantine",
      defaultScanTarget: "C:\\Restore",
      autoScanEnabled: false,
      autoScanInterval: "daily",
      autoCleanupEnabled: true,
      quarantineRetentionDays: 15,
      notifications: {
        scanComplete: false,
        cleanupComplete: true,
        errors: true
      }
    },
    rules: {
      excludePaths: [],
      whitelistPaths: ["C:\\Keep"],
      blacklistPaths: []
    }
  });

  assert.equal(restored.preferences.defaultScanTarget, "C:\\Restore");
  assert.equal(restored.rules.whitelistPaths[0], "C:\\Keep");

  const reset = await configService.resetAll();
  assert.equal(reset.preferences.defaultCleanupMode, "quarantine");
  assert.equal(reset.preferences.defaultScanTarget, "");
  assert.equal(reset.onboarding.completed, false);
});

let failed = 0;

for (const entry of tests) {
  try {
    await entry.fn();
    console.log(`PASS ${entry.name}`);
  } catch (error) {
    failed += 1;
    console.error(`FAIL ${entry.name}`);
    console.error(error);
  }
}

if (failed > 0) {
  console.error(`\n${failed} test(s) failed.`);
  process.exitCode = 1;
} else {
  console.log(`\nAll ${tests.length} tests passed.`);
}
