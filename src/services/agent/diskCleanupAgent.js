function extractJsonBlock(text) {
  const fencedMatch = text.match(/```json\s*([\s\S]+?)```/i);

  if (fencedMatch) {
    return fencedMatch[1];
  }

  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return text.slice(firstBrace, lastBrace + 1);
  }

  return null;
}

function safeParseJson(text) {
  const block = extractJsonBlock(text);

  if (!block) {
    return null;
  }

  try {
    return JSON.parse(block);
  } catch {
    return null;
  }
}

function buildPlanningMessages(analysis) {
  return [
    {
      role: "system",
      content: [
        "You are DiskClaw, a disk cleanup AI agent.",
        "Analyze the scan result and return strict JSON.",
        "Do not suggest deleting system-critical content.",
        "Return an object with keys summary, priorities, cautions, and userMessage."
      ].join(" ")
    },
    {
      role: "user",
      content: JSON.stringify({
        summary: analysis.summaryText,
        priorities: analysis.priorities,
        candidateSummary: analysis.candidateSummary,
        recommendedItems: analysis.recommendedItems.slice(0, 12)
      })
    }
  ];
}

function buildAskMessages(question, context) {
  return [
    {
      role: "system",
      content: [
        "You are DiskClaw, a safe disk cleanup AI agent.",
        "Explain recommendations clearly, highlight risk, and never overstate safety.",
        "If the context is insufficient, say what additional scan data is needed."
      ].join(" ")
    },
    {
      role: "user",
      content: JSON.stringify({
        question,
        context
      })
    }
  ];
}

function buildPlanReportIndexEntry(saved, result) {
  return {
    reportId: saved.reportId,
    type: "plan",
    createdAt: new Date().toISOString(),
    targetCount: result.scanResult?.targets?.length || 0,
    candidateCount: result.analysis?.candidateSummary?.totalCandidates || 0,
    reclaimableBytes: result.analysis?.candidateSummary?.reclaimableBytes || 0
  };
}

function buildExecutionReportIndexEntry(saved, type, result) {
  const directResults = Array.isArray(result.results)
    ? result.results
    : [];
  const nestedResults = Array.isArray(result.groupResults)
    ? result.groupResults.flatMap((item) => item.cleanupResults || [])
    : Array.isArray(result.hotspotResults)
      ? result.hotspotResults.flatMap((item) => item.cleanupResults || [])
      : [];
  const allResults = [...directResults, ...nestedResults];

  return {
    reportId: saved.reportId,
    type,
    createdAt: new Date().toISOString(),
    dryRun: result.dryRun ?? null,
    mode: result.mode || null,
    statusCounts: result.statusCounts || null,
    itemCount: allResults.length,
    reclaimedBytes: allResults.reduce((sum, item) => {
      if (["moved", "archived", "deleted", "recycled", "planned", "purged"].includes(item.status)) {
        return sum + Number(item.sizeBytes || 0);
      }
      return sum;
    }, 0)
  };
}

export class DiskCleanupAgent {
  constructor({ scanner, analyzer, llmGateway, cleanupExecutor, reportStore, ruleStore, preferenceStore }) {
    this.scanner = scanner;
    this.analyzer = analyzer;
    this.llmGateway = llmGateway;
    this.cleanupExecutor = cleanupExecutor;
    this.reportStore = reportStore;
    this.ruleStore = ruleStore;
    this.preferenceStore = preferenceStore;
  }

  async scan(targets, options, runtime = {}) {
    const rules = runtime.rules || await this.ruleStore.get();
    const preferences = await this.preferenceStore.get();
    const effectiveTargets = targets.length ? targets : (preferences.recentTargets || []).map((value) => ({ path: value }));

    if (effectiveTargets[0]?.path) {
      await this.preferenceStore.rememberTarget(effectiveTargets[0].path);
    }

    return this.scanner.scan(effectiveTargets, options, {
      ...runtime,
      rules
    });
  }

  async plan(targets, options, runtime = {}) {
    const progress = runtime.onProgress;
    const notify = (patch) => {
      if (typeof progress === "function") {
        progress(patch);
      }
    };

    const rules = runtime.rules || await this.ruleStore.get();
    const preferences = await this.preferenceStore.get();
    const effectiveTargets = targets.length ? targets : (preferences.recentTargets || []).map((value) => ({ path: value }));

    if (effectiveTargets[0]?.path) {
      await this.preferenceStore.rememberTarget(effectiveTargets[0].path);
    }

    const scanResult = await this.scanner.scan(effectiveTargets, options, {
      onProgress: (event) => {
        notify({
          ...event,
          message: "Scanning selected targets."
        });
      },
      rules,
      controller: runtime.controller
    });
    notify({
      phase: "analysis",
      progress: 78,
      message: "Analyzing scan result.",
      currentPath: null,
      scannedFiles: scanResult.summary?.fileCount || 0,
      candidateFiles: scanResult.summary?.candidateFileCount || 0,
      directoriesVisited: scanResult.summary?.directoriesVisited || 0
    });
    const analysis = this.analyzer.analyze(scanResult);
    notify({
      phase: "llm",
      progress: 88,
      message: "Generating cleanup plan with LLM.",
      currentPath: null,
      scannedFiles: scanResult.summary?.fileCount || 0,
      candidateFiles: analysis.candidateSummary?.totalCandidates || 0,
      directoriesVisited: scanResult.summary?.directoriesVisited || 0
    });

    let llm = {
      ok: false,
      degraded: true,
      reason: "LLM is not configured.",
      output: null
    };

    try {
      const response = await this.llmGateway.chat(buildPlanningMessages(analysis), "reason", {
        temperature: 0.1,
        maxTokens: 800
      });

      if (response.ok) {
        llm = {
          ok: true,
          degraded: false,
          model: response.model,
          output: safeParseJson(response.text) || {
            userMessage: response.text
          }
        };
      } else {
        llm = {
          ...response,
          output: null
        };
      }
    } catch (error) {
      llm = {
        ok: false,
        degraded: true,
        reason: error.message,
        output: null
      };
    }

    const result = {
      type: "plan",
      scanResult,
      analysis,
      llm
    };

    notify({
      phase: "report",
      progress: 95,
      message: "Saving cleanup report.",
      currentPath: null,
      scannedFiles: scanResult.summary?.fileCount || 0,
      candidateFiles: analysis.candidateSummary?.totalCandidates || 0,
      directoriesVisited: scanResult.summary?.directoriesVisited || 0
    });

    const saved = await this.reportStore.save("plan", result);
    await this.reportStore.appendIndex(buildPlanReportIndexEntry(saved, result));

    return {
      reportId: saved.reportId,
      ...result
    };
  }

  async ask(question, context) {
    const response = await this.llmGateway.chat(buildAskMessages(question, context), "chat", {
      temperature: 0.2,
      maxTokens: 600
    });

    if (!response.ok) {
      return {
        ok: false,
        degraded: true,
        message: "LLM is not configured. Please configure a third-party LLM API to enable chat answers."
      };
    }

    return {
      ok: true,
      model: response.model,
      answer: response.text
    };
  }

  async execute(items, options, runtime = {}) {
    const execution = await this.cleanupExecutor.execute(items, {
      ...options,
      controller: runtime.controller,
      onProgress: runtime.onProgress
    });
    const payload = {
      type: "cleanup",
      ...execution
    };
    const saved = await this.reportStore.save("cleanup", payload);
    await this.reportStore.appendIndex(buildExecutionReportIndexEntry(saved, "cleanup", execution));

    return {
      reportId: saved.reportId,
      ...payload
    };
  }

  async executeDuplicateResolution(groups, options, runtime = {}) {
    const execution = await this.cleanupExecutor.executeDuplicateResolution(groups, {
      ...options,
      controller: runtime.controller,
      onProgress: runtime.onProgress
    });
    const payload = {
      type: "duplicate-cleanup",
      ...execution
    };
    const saved = await this.reportStore.save("duplicate-cleanup", payload);
    await this.reportStore.appendIndex(buildExecutionReportIndexEntry(saved, "duplicate-cleanup", execution));

    return {
      reportId: saved.reportId,
      ...payload
    };
  }

  async executeDirectoryHotspots(groups, options, runtime = {}) {
    const execution = await this.cleanupExecutor.executeDirectoryHotspots(groups, {
      ...options,
      controller: runtime.controller,
      onProgress: runtime.onProgress
    });
    const payload = {
      type: "hotspot-cleanup",
      ...execution
    };
    const saved = await this.reportStore.save("hotspot-cleanup", payload);
    await this.reportStore.appendIndex(buildExecutionReportIndexEntry(saved, "hotspot-cleanup", execution));

    return {
      reportId: saved.reportId,
      ...payload
    };
  }

  async listQuarantineItems() {
    return this.cleanupExecutor.listQuarantineItems();
  }

  async restore(items) {
    const restored = await this.cleanupExecutor.restore(items);
    const payload = {
      type: "restore",
      ...restored
    };
    const saved = await this.reportStore.save("restore", payload);
    await this.reportStore.appendIndex({
      reportId: saved.reportId,
      type: "restore",
      createdAt: new Date().toISOString(),
      statusCounts: restored.results?.reduce((accumulator, item) => {
        const key = item.status || "unknown";
        accumulator[key] = (accumulator[key] || 0) + 1;
        return accumulator;
      }, {})
    });

    return {
      reportId: saved.reportId,
      ...payload
    };
  }

  async getReport(reportId) {
    return this.reportStore.get(reportId);
  }

  async deleteQuarantineItems(items) {
    const result = await this.cleanupExecutor.deleteQuarantineItems(items);
    const payload = {
      type: "quarantine-delete",
      ...result
    };
    const saved = await this.reportStore.save("quarantine-delete", payload);
    await this.reportStore.appendIndex(buildExecutionReportIndexEntry(saved, "quarantine-delete", result));

    return {
      reportId: saved.reportId,
      ...payload
    };
  }

  async clearQuarantine() {
    const result = await this.cleanupExecutor.clearQuarantine();
    const payload = {
      type: "quarantine-clear",
      ...result
    };
    const saved = await this.reportStore.save("quarantine-clear", payload);
    await this.reportStore.appendIndex(buildExecutionReportIndexEntry(saved, "quarantine-clear", result));

    return {
      reportId: saved.reportId,
      ...payload
    };
  }
}
