import fs from "node:fs/promises";
import path from "node:path";
import { appPaths } from "./config/defaults.js";
import { renderDashboardHtml } from "./ui/dashboard.js";
import { syncSystemMaintenanceSchedule } from "./services/schedules/systemScheduleSync.js";
import { createHttpError, notFound, readJsonBody, sendBinary, sendHtml, sendJson } from "./utils/http.js";
import {
  validateCleanupItems,
  validateDirectoryHotspotGroups,
  validateDuplicateResolutionGroups,
  validateLlmConfig,
  validatePreferences,
  validateQuarantineItems,
  validateQuestion,
  validateRuleConfig,
  validateRestoreItems,
  validateSchedule,
  validateTargets
} from "./utils/validation.js";

function routeKey(method, url) {
  return `${method.toUpperCase()} ${new URL(url, "http://localhost").pathname}`;
}

function pathname(url) {
  return new URL(url, "http://localhost").pathname;
}

export async function handleDiskClawRequest(request, response, services) {
  const key = routeKey(request.method, request.url);
  const currentPathname = pathname(request.url);
  const {
    agent,
    configService,
    llmGateway,
    llmConfigStore,
    onboardingStore,
    preferenceStore,
    reportStore,
    ruleStore,
    scheduleStore,
    taskStore
  } = services;

  try {
    if (key === "GET /") {
      sendHtml(response, 200, renderDashboardHtml());
      return;
    }

    if (key === "GET /electron/icon.png") {
      const iconPath = path.join(appPaths.workspaceRoot, "electron", "icon.png");
      const buffer = await fs.readFile(iconPath);
      sendBinary(response, 200, buffer, "image/png");
      return;
    }

    if (request.method?.toUpperCase() === "GET" && currentPathname.startsWith("/electron/icons/")) {
      const iconName = path.basename(currentPathname);
      const iconPath = path.join(appPaths.workspaceRoot, "electron", "icons", iconName);
      const buffer = await fs.readFile(iconPath);
      sendBinary(response, 200, buffer, "image/svg+xml");
      return;
    }

    if (key === "GET /api/health") {
      let llmHealth = { ok: false, reason: "LLM is not configured." };

      try {
        llmHealth = await llmGateway.healthcheck();
      } catch (error) {
        llmHealth = {
          ok: false,
          reason: error.message
        };
      }

      sendJson(response, 200, {
        ok: true,
        service: "diskclaw-agent",
        timestamp: new Date().toISOString(),
        dataRoot: appPaths.dataRoot,
        llm: llmHealth
      });
      return;
    }

    if (key === "GET /api/config/llm") {
      const config = await llmConfigStore.loadSanitized();
      sendJson(response, 200, config);
      return;
    }

    if (key === "GET /api/rules") {
      const config = await ruleStore.get();
      sendJson(response, 200, config);
      return;
    }

    if (key === "POST /api/rules") {
      const body = await readJsonBody(request);
      validateRuleConfig(body);
      const saved = await ruleStore.save(body);
      sendJson(response, 200, saved);
      return;
    }

    if (key === "GET /api/preferences") {
      const preferences = await preferenceStore.get();
      sendJson(response, 200, preferences);
      return;
    }

    if (key === "POST /api/preferences") {
      const body = await readJsonBody(request);
      validatePreferences(body);
      const saved = await preferenceStore.save(body);
      await syncSystemMaintenanceSchedule(scheduleStore, saved);
      sendJson(response, 200, saved);
      return;
    }

    if (key === "GET /api/onboarding") {
      const state = await onboardingStore.get();
      sendJson(response, 200, state);
      return;
    }

    if (key === "GET /api/tasks") {
      sendJson(response, 200, taskStore.list());
      return;
    }

    if (request.method?.toUpperCase() === "GET" && currentPathname.startsWith("/api/tasks/")) {
      const taskId = decodeURIComponent(currentPathname.replace("/api/tasks/", ""));
      const task = taskStore.get(taskId);

      if (!task) {
        throw createHttpError(404, "task_not_found", "Task not found.");
      }

      sendJson(response, 200, task);
      return;
    }

    if (request.method?.toUpperCase() === "POST" && currentPathname.endsWith("/pause")) {
      const taskId = decodeURIComponent(currentPathname.replace("/api/tasks/", "").replace("/pause", ""));
      const task = taskStore.pause(taskId);
      if (!task) {
        throw createHttpError(404, "task_not_found", "Task not found or cannot be paused.");
      }
      sendJson(response, 200, task);
      return;
    }

    if (request.method?.toUpperCase() === "POST" && currentPathname.endsWith("/resume")) {
      const taskId = decodeURIComponent(currentPathname.replace("/api/tasks/", "").replace("/resume", ""));
      const task = taskStore.resume(taskId);
      if (!task) {
        throw createHttpError(404, "task_not_found", "Task not found or cannot be resumed.");
      }
      sendJson(response, 200, task);
      return;
    }

    if (request.method?.toUpperCase() === "POST" && currentPathname.endsWith("/cancel")) {
      const taskId = decodeURIComponent(currentPathname.replace("/api/tasks/", "").replace("/cancel", ""));
      const task = taskStore.cancel(taskId);
      if (!task) {
        throw createHttpError(404, "task_not_found", "Task not found or cannot be cancelled.");
      }
      sendJson(response, 200, task);
      return;
    }

    if (key === "POST /api/onboarding/complete") {
      const state = await onboardingStore.complete();
      sendJson(response, 200, state);
      return;
    }

    if (key === "POST /api/onboarding/dismiss") {
      const state = await onboardingStore.dismiss();
      sendJson(response, 200, state);
      return;
    }

    if (key === "POST /api/config/llm") {
      const body = await readJsonBody(request);
      const currentConfig = await llmConfigStore.loadSanitized();
      validateLlmConfig({
        ...body,
        hasApiKey: Boolean(body.apiKey) || currentConfig.hasApiKey
      });
      const saved = await llmConfigStore.save(body);
      sendJson(response, 200, saved);
      return;
    }

    if (key === "POST /api/config/llm/test") {
      const body = await readJsonBody(request);
      validateLlmConfig({
        ...body,
        hasApiKey: Boolean(body.apiKey)
      });
      const result = await llmGateway.healthcheck(body);
      sendJson(response, 200, result);
      return;
    }

    if (key === "GET /api/config/backup") {
      const backup = await configService.backup();
      sendJson(response, 200, backup);
      return;
    }

    if (key === "POST /api/config/restore") {
      const body = await readJsonBody(request);
      const restored = await configService.restore(body || {});
      sendJson(response, 200, restored);
      return;
    }

    if (key === "POST /api/config/reset-all") {
      const result = await configService.resetAll();
      sendJson(response, 200, result);
      return;
    }

    if (key === "GET /api/schedules") {
      const schedules = await scheduleStore.list();
      sendJson(response, 200, schedules);
      return;
    }

    if (key === "POST /api/schedules") {
      const body = await readJsonBody(request);
      validateSchedule(body);
      const saved = await scheduleStore.save(body);
      sendJson(response, 200, saved);
      return;
    }

    if (request.method?.toUpperCase() === "POST" && currentPathname.endsWith("/run")) {
      const scheduleId = decodeURIComponent(currentPathname.replace("/api/schedules/", "").replace("/run", ""));
      const task = await services.schedulerService.runNow(scheduleId);
      if (!task) {
        throw createHttpError(404, "schedule_not_found", "Schedule not found.");
      }
      sendJson(response, 202, task);
      return;
    }

    if (request.method?.toUpperCase() === "DELETE" && currentPathname.startsWith("/api/schedules/")) {
      const scheduleId = decodeURIComponent(currentPathname.replace("/api/schedules/", ""));
      const result = await scheduleStore.remove(scheduleId);
      sendJson(response, 200, result);
      return;
    }

    if (key === "POST /api/scan") {
      const body = await readJsonBody(request);
      validateTargets(body.targets || []);
      const scanResult = await agent.scan(body.targets || [], body.options || {});
      sendJson(response, 200, scanResult);
      return;
    }

    if (key === "POST /api/tasks/scan") {
      const body = await readJsonBody(request);
      validateTargets(body.targets || []);
      const task = taskStore.create("scan", {
        targets: body.targets || []
      });
      taskStore.run(task.taskId, async ({ setProgress }) => {
        setProgress(8, "Preparing scan task...");
        const result = await agent.scan(body.targets || [], body.options || {}, {
          onProgress: (event) => {
            setProgress(
              event.progress,
              event.message || "Scanning targets...",
              {
                phase: event.phase,
                currentPath: event.currentPath,
                scannedFiles: event.scannedFiles,
                candidateFiles: event.candidateFiles,
                candidateBytes: event.candidateBytes,
                directoriesVisited: event.directoriesVisited
              }
            );
          }
        });
        setProgress(94, "Packaging scan result...", {
          phase: "report",
          scannedFiles: result.summary?.fileCount || 0,
          candidateFiles: result.summary?.candidateFileCount || 0,
          candidateBytes: result.summary?.candidateBytes || 0,
          directoriesVisited: result.summary?.directoriesVisited || 0
        });
        return result;
      });
      sendJson(response, 202, task);
      return;
    }

    if (key === "POST /api/agent/plan") {
      const body = await readJsonBody(request);
      validateTargets(body.targets || []);
      const plan = await agent.plan(body.targets || [], body.options || {});
      sendJson(response, 200, plan);
      return;
    }

    if (key === "POST /api/tasks/agent/plan") {
      const body = await readJsonBody(request);
      validateTargets(body.targets || []);
      const task = taskStore.create("plan", {
        targets: body.targets || []
      });
      taskStore.run(task.taskId, async ({ setProgress }) => {
        setProgress(8, "Preparing planning task...");
        const result = await agent.plan(body.targets || [], body.options || {}, {
          onProgress: (event) => {
            setProgress(
              event.progress,
              event.message || "Generating cleanup plan...",
              {
                phase: event.phase,
                currentPath: event.currentPath,
                scannedFiles: event.scannedFiles,
                candidateFiles: event.candidateFiles,
                candidateBytes: event.candidateBytes,
                directoriesVisited: event.directoriesVisited
              }
            );
          }
        });
        setProgress(97, "Preparing cleanup plan result...", {
          phase: "report",
          scannedFiles: result.scanResult?.summary?.fileCount || 0,
          candidateFiles: result.analysis?.candidateSummary?.totalCandidates || 0,
          candidateBytes: result.scanResult?.summary?.candidateBytes || 0,
          directoriesVisited: result.scanResult?.summary?.directoriesVisited || 0
        });
        return result;
      });
      sendJson(response, 202, task);
      return;
    }

    if (key === "POST /api/agent/ask") {
      const body = await readJsonBody(request);
      validateQuestion(body.question || "");
      const answer = await agent.ask(body.question || "", body.context || {});
      sendJson(response, 200, answer);
      return;
    }

    if (key === "POST /api/cleanup/execute") {
      const body = await readJsonBody(request);
      validateCleanupItems(body.items || []);
      const result = await agent.execute(body.items || [], body.options || {});
      sendJson(response, 200, result);
      return;
    }

    if (key === "POST /api/tasks/cleanup/execute") {
      const body = await readJsonBody(request);
      validateCleanupItems(body.items || []);
      const task = taskStore.create("cleanup", {
        itemCount: (body.items || []).length
      });
      taskStore.run(task.taskId, async ({ setProgress, controller }) => {
        setProgress(20, "Executing cleanup task...");
        const result = await agent.execute(body.items || [], body.options || {}, {
          controller,
          onProgress: (event) => {
            setProgress(
              event.progress,
              "Cleaning selected files...",
              {
                completedItems: event.completedItems,
                totalItems: event.totalItems,
                releasedBytes: event.releasedBytes,
                currentPath: event.currentPath
              }
            );
          }
        });
        setProgress(90, "Finalizing cleanup report...");
        return result;
      });
      sendJson(response, 202, task);
      return;
    }

    if (key === "POST /api/cleanup/duplicates/execute") {
      const body = await readJsonBody(request);
      validateDuplicateResolutionGroups(body.groups || []);
      const result = await agent.executeDuplicateResolution(body.groups || [], body.options || {});
      sendJson(response, 200, result);
      return;
    }

    if (key === "POST /api/tasks/cleanup/duplicates/execute") {
      const body = await readJsonBody(request);
      validateDuplicateResolutionGroups(body.groups || []);
      const task = taskStore.create("duplicate-cleanup", {
        groupCount: (body.groups || []).length
      });
      taskStore.run(task.taskId, async ({ setProgress, controller }) => {
        setProgress(20, "Preparing duplicate cleanup groups...");
        const result = await agent.executeDuplicateResolution(body.groups || [], body.options || {}, {
          controller,
          onProgress: (event) => {
            setProgress(
              event.progress,
              "Cleaning duplicate files...",
              {
                completedItems: event.completedItems,
                totalItems: event.totalItems,
                releasedBytes: event.releasedBytes,
                currentPath: event.currentPath
              }
            );
          }
        });
        setProgress(90, "Finalizing duplicate cleanup report...");
        return result;
      });
      sendJson(response, 202, task);
      return;
    }

    if (key === "POST /api/cleanup/hotspots/execute") {
      const body = await readJsonBody(request);
      validateDirectoryHotspotGroups(body.groups || []);
      const result = await agent.executeDirectoryHotspots(body.groups || [], body.options || {});
      sendJson(response, 200, result);
      return;
    }

    if (key === "POST /api/tasks/cleanup/hotspots/execute") {
      const body = await readJsonBody(request);
      validateDirectoryHotspotGroups(body.groups || []);
      const task = taskStore.create("hotspot-cleanup", {
        hotspotCount: (body.groups || []).length
      });
      taskStore.run(task.taskId, async ({ setProgress, controller }) => {
        setProgress(20, "Preparing hotspot cleanup groups...");
        const result = await agent.executeDirectoryHotspots(body.groups || [], body.options || {}, {
          controller,
          onProgress: (event) => {
            setProgress(
              event.progress,
              "Cleaning files in selected folders...",
              {
                completedItems: event.completedItems,
                totalItems: event.totalItems,
                releasedBytes: event.releasedBytes,
                currentPath: event.currentPath
              }
            );
          }
        });
        setProgress(90, "Finalizing hotspot cleanup report...");
        return result;
      });
      sendJson(response, 202, task);
      return;
    }

    if (key === "GET /api/quarantine") {
      const items = await agent.listQuarantineItems();
      sendJson(response, 200, items);
      return;
    }

    if (key === "POST /api/quarantine/restore") {
      const body = await readJsonBody(request);
      validateRestoreItems(body.items || []);
      const result = await agent.restore(body.items || []);
      sendJson(response, 200, result);
      return;
    }

    if (key === "POST /api/quarantine/delete") {
      const body = await readJsonBody(request);
      validateQuarantineItems(body.items || []);
      const result = await agent.deleteQuarantineItems(body.items || []);
      sendJson(response, 200, result);
      return;
    }

    if (key === "POST /api/quarantine/clear") {
      const result = await agent.clearQuarantine();
      sendJson(response, 200, result);
      return;
    }

    if (key === "GET /api/reports") {
      const reports = await reportStore.list();
      sendJson(response, 200, reports);
      return;
    }

    if (key === "DELETE /api/reports") {
      const body = await readJsonBody(request);
      const reportIds = Array.isArray(body.reportIds) ? body.reportIds : [];
      const result = await reportStore.deleteMany(reportIds);
      sendJson(response, 200, result);
      return;
    }

    if (key === "GET /api/reports/analytics") {
      const analytics = await reportStore.analytics();
      sendJson(response, 200, analytics);
      return;
    }

    if (request.method?.toUpperCase() === "GET" && currentPathname.startsWith("/api/reports/")) {
      const reportId = decodeURIComponent(currentPathname.replace("/api/reports/", ""));
      const report = await agent.getReport(reportId);

      if (!report) {
        throw createHttpError(404, "report_not_found", "Report not found.");
      }

      sendJson(response, 200, report);
      return;
    }

    if (request.method?.toUpperCase() === "POST" && currentPathname.endsWith("/export")) {
      const reportId = decodeURIComponent(currentPathname.replace("/api/reports/", "").replace("/export", ""));
      const body = await readJsonBody(request);
      const exported = await reportStore.export(reportId, body.format || "json");
      if (!exported) {
        throw createHttpError(404, "report_not_found", "Report not found.");
      }
      sendJson(response, 200, exported);
      return;
    }

    notFound(response);
  } catch (error) {
    sendJson(response, error.statusCode || 500, {
      error: {
        code: error.code || "internal_error",
        message: error.message
      }
    });
  }
}
