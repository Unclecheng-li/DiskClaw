
    let lastPlan = null;
    let onboardingState = null;
    let activeTaskId = null;
    let activeTaskTimer = null;
    let activeTaskFilter = "all";
    let activeReportFilter = "all";
    let currentReportId = null;
    let selectedQuarantineIds = [];
    let pendingConfirmResolver = null;
    let logEntries = [];
    let logsExpanded = false;

    const DEFAULT_LLM_FORM = {
      provider: "openai-compatible",
      baseUrl: "",
      apiKey: "",
      chatModel: "",
      reasonModel: "",
      summaryModel: "",
      timeoutMs: 20000,
      maxRetries: 1
    };

    const DEFAULT_SCAN_SETTINGS = {
      scanTarget: "",
      maxDepth: 5,
      maxFiles: 3000,
      largeThreshold: 536870912,
      staleDays: 90
    };

    const STORAGE_KEYS = {
      scanSettings: "diskclaw.scan-settings.v1",
      activePanel: "diskclaw.active-panel.v1",
      taskFilter: "diskclaw.task-filter.v1",
      reportFilter: "diskclaw.report-filter.v1",
      confirmSkips: "diskclaw.confirm-skips.v1"
    };

    const el = (id) => document.getElementById(id);
    const systemLog = el("systemLog");

    function log(message, data, explicitLevel = null) {
      const stamp = new Date().toLocaleTimeString();
      const now = new Date();
      const level = explicitLevel || inferLogLevel(message, data);
      logEntries.unshift({
        id: Date.now() + "-" + Math.random().toString(16).slice(2),
        time: stamp,
        timeIso: now.toISOString(),
        level,
        message,
        data: data || null
      });
      logEntries = logEntries.slice(0, 500);
      renderLogs();
    }

    function inferLogLevel(message, data) {
      if (String(message).includes("失败") || String(message).includes("错误")) {
        return "error";
      }
      if (String(message).includes("取消")) {
        return "warn";
      }
      if (String(message).includes("成功") || String(message).includes("完成") || String(message).includes("已保存") || String(message).includes("已恢复")) {
        return "success";
      }
      return "info";
    }

    function filteredLogs() {
      const keyword = el("logSearch").value.trim().toLowerCase();
      const level = el("logLevelFilter").value;
      const timeFilter = el("logTimeFilter").value;
      const now = Date.now();

      return logEntries.filter((entry) => {
        if (level !== "all" && entry.level !== level) {
          return false;
        }

        if (timeFilter !== "all") {
          const minutes = timeFilter === "5m" ? 5 : timeFilter === "1h" ? 60 : 24 * 60;
          const threshold = now - minutes * 60 * 1000;
          if (Date.parse(entry.timeIso || 0) < threshold) {
            return false;
          }
        }

        if (!keyword) {
          return true;
        }

        const haystack = (entry.message + " " + JSON.stringify(entry.data || {})).toLowerCase();
        return haystack.includes(keyword);
      });
    }

    function renderLogs() {
      const entries = filteredLogs();
      const visible = logsExpanded ? entries : entries.slice(0, 5);

      if (!entries.length) {
        systemLog.innerHTML = "当前没有日志记录。";
        return;
      }

      const rendered = visible.map((entry) => {
        const detail = entry.data
          ? "<div class=\"log-entry-json\">" + JSON.stringify(entry.data, null, 2) + "</div>"
          : "";
        return "<div class=\"log-entry\">" +
          "<div class=\"log-entry-meta\"><span>" + entry.time + "</span><span class=\"log-level-" + entry.level + "\">" + entry.level.toUpperCase() + "</span></div>" +
          "<div class=\"log-entry-title\">" + entry.message + "</div>" +
          "<p class=\"log-entry-copy\">" + (entry.data ? "点击导出可查看完整记录。" : "无附加数据。") + "</p>" +
          detail +
        "</div>";
      }).join("");

      const collapsedHint = !logsExpanded && entries.length > 5
        ? "<div class=\"log-entry\"><div class=\"log-entry-title\">还有 " + (entries.length - 5) + " 条日志未展开</div><p class=\"log-entry-copy\">点击“展开全部”查看完整日志列表。</p></div>"
        : "";

      systemLog.innerHTML = rendered + collapsedHint;

      el("toggleLogExpand").textContent = logsExpanded ? "收起" : "展开全部";
    }

    function clearLogsWithConfirm() {
      logEntries = [];
      renderLogs();
      showToast("success", "日志已清空", "系统日志已重置。");
    }

    function exportLogs(format) {
      if (!logEntries.length) {
        showToast("warn", "没有可导出的日志", "当前日志为空。");
        return;
      }

      const content = format === "txt"
        ? logEntries.map((entry) => "[" + entry.time + "] [" + entry.level.toUpperCase() + "] " + entry.message + (entry.data ? "\n" + JSON.stringify(entry.data, null, 2) : "")).join("\n\n")
        : JSON.stringify(logEntries, null, 2);

      const blob = new Blob([content], { type: format === "txt" ? "text/plain" : "application/json" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = format === "txt" ? "diskclaw-log.txt" : "diskclaw-log.json";
      link.click();
      URL.revokeObjectURL(link.href);
      showToast("success", "日志已导出", "日志文件已生成下载。");
    }

    async function request(path, options = {}) {
      const response = await fetch(path, {
        headers: {
          "Content-Type": "application/json"
        },
        ...options
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(payload?.error?.message || "请求失败。");
        error.code = payload?.error?.code || "request_failed";
        error.payload = payload;
        throw error;
      }

      return payload;
    }

    function readLocalJson(key, fallbackValue) {
      try {
        const raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallbackValue;
      } catch {
        return fallbackValue;
      }
    }

    function writeLocalJson(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {}
    }

    function setGuideVisible(visible) {
      el("guideOverlay").classList.toggle("active", visible);
    }

    function jumpToLogs() {
      const logsCard = systemLog.closest(".card");
      if (logsCard && typeof logsCard.scrollIntoView === "function") {
        logsCard.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    function showToast(type, title, copy, options = {}) {
      const node = document.createElement("div");
      node.className = "toast " + type;
      node.innerHTML =
        "<div class=\"toast-title\">" + title + "</div>" +
        "<p class=\"toast-copy\">" + copy + "</p>";

      if (options.actionLabel) {
        const action = document.createElement("button");
        action.className = "toast-action";
        action.textContent = options.actionLabel;
        action.addEventListener("click", () => {
          if (typeof options.onAction === "function") {
            options.onAction();
          }
          node.remove();
        });
        node.appendChild(action);
      }

      el("toastStack").prepend(node);
      setTimeout(() => {
        node.remove();
      }, 5000);
    }

    function showRequestErrorToast(error, fallbackTitle = "操作失败") {
      const message = error?.message || "请求失败。";
      showToast("error", fallbackTitle, message, {
        actionLabel: "查看详细日志",
        onAction: jumpToLogs
      });
      log(fallbackTitle, {
        level: "error",
        message,
        code: error?.code || "request_failed",
        details: error?.payload || null
      }, "error");
    }

    window.addEventListener("error", (event) => {
      const message = event?.message || "前端运行时错误";
      log("前端运行时错误", {
        level: "error",
        message,
        source: event?.filename || "",
        line: event?.lineno || 0,
        column: event?.colno || 0
      }, "error");
      showToast("error", "前端运行时错误", message, {
        actionLabel: "查看详细日志",
        onAction: jumpToLogs
      });
    });

    window.addEventListener("unhandledrejection", (event) => {
      const reason = event?.reason?.message || String(event?.reason || "未处理的 Promise 异常");
      log("未处理的异步异常", {
        level: "error",
        message: reason
      }, "error");
      showToast("error", "未处理的异步异常", reason, {
        actionLabel: "查看详细日志",
        onAction: jumpToLogs
      });
    });

    function readConfirmSkips() {
      return readLocalJson(STORAGE_KEYS.confirmSkips, {});
    }

    function writeConfirmSkips(value) {
      writeLocalJson(STORAGE_KEYS.confirmSkips, value);
    }

    function openConfirmDialog(config) {
      el("confirmTitle").textContent = config.title;
      el("confirmMessage").textContent = config.message;
      el("confirmImpactText").textContent = config.impact;
      el("confirmRemember").checked = false;
      el("confirmKeywordInput").value = "";
      el("confirmRememberRow").style.display = config.allowRemember ? "flex" : "none";
      el("confirmKeywordWrap").style.display = config.keyword ? "block" : "none";
      el("confirmKeywordInput").placeholder = config.keyword ? ("请输入：" + config.keyword) : "";
      el("confirmOverlay").classList.add("active");
    }

    function closeConfirmDialog() {
      el("confirmOverlay").classList.remove("active");
    }

    async function confirmAction(config) {
      const skips = readConfirmSkips();

      if (config.allowRemember && skips[config.skipKey]) {
        return true;
      }

      openConfirmDialog(config);

      return new Promise((resolve) => {
        pendingConfirmResolver = (confirmed) => {
          closeConfirmDialog();

          if (confirmed && config.allowRemember && el("confirmRemember").checked && config.skipKey) {
            writeConfirmSkips({
              ...readConfirmSkips(),
              [config.skipKey]: true
            });
          }

          resolve(confirmed);
        };
      });
    }

    function setTaskBanner(visible, title, copy) {
      el("taskBanner").classList.toggle("active", visible);
      if (title) {
        el("taskBannerTitle").textContent = title;
      }
      if (copy) {
        el("taskBannerCopy").textContent = copy;
      }
    }

    function renderTaskMeta(details) {
      if (!details) {
        el("taskBannerMeta").innerHTML = "";
        return;
      }

      const chips = [];

      if (details.phase) {
        chips.push("<span class=\"status-chip\">阶段：" + details.phase + "</span>");
      }
      if (typeof details.scannedFiles === "number") {
        chips.push("<span class=\"status-chip\">已扫描文件：" + details.scannedFiles + "</span>");
      }
      if (typeof details.candidateFiles === "number") {
        chips.push("<span class=\"status-chip\">候选项：" + details.candidateFiles + "</span>");
      }
      if (typeof details.directoriesVisited === "number") {
        chips.push("<span class=\"status-chip\">已访问目录：" + details.directoriesVisited + "</span>");
      }
      if (details.currentPath) {
        chips.push("<span class=\"status-chip\">当前目录：" + details.currentPath + "</span>");
      }

      el("taskBannerMeta").innerHTML = chips.join("");
    }

    function taskTypeLabel(type) {
      const labels = {
        scan: "扫描",
        plan: "方案生成",
        cleanup: "普通清理",
        "duplicate-cleanup": "重复文件清理",
        "hotspot-cleanup": "热点目录清理"
      };

      return labels[type] || type;
    }

    function summarizeSelectedItems(items) {
      const totalSize = items.reduce((sum, item) => sum + Number(item.sizeBytes || 0), 0);
      return {
        count: items.length,
        totalSize
      };
    }

    function textAreaToArray(value) {
      return String(value || "")
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
    }

    function arrayToTextArea(values = []) {
      return values.join("\n");
    }

    function setActivePanel(panelName) {
      document.querySelectorAll(".nav-tab").forEach((node) => {
        node.classList.toggle("active", node.getAttribute("data-panel-target") === panelName);
      });

      document.querySelectorAll(".panel-group").forEach((node) => {
        node.classList.toggle("active", node.getAttribute("data-panel") === panelName);
      });

      writeLocalJson(STORAGE_KEYS.activePanel, panelName);
    }

    function loadActivePanel() {
      const saved = readLocalJson(STORAGE_KEYS.activePanel, "overview");
      setActivePanel(saved || "overview");
    }

    function setTaskFilter(filterValue) {
      activeTaskFilter = filterValue || "all";
      writeLocalJson(STORAGE_KEYS.taskFilter, activeTaskFilter);
      document.querySelectorAll(".filter-chip").forEach((node) => {
        node.classList.toggle("active", node.getAttribute("data-task-filter") === activeTaskFilter);
      });
    }

    function loadTaskFilter() {
      const saved = readLocalJson(STORAGE_KEYS.taskFilter, "all");
      setTaskFilter(saved || "all");
    }

    function setReportFilter(filterValue) {
      activeReportFilter = filterValue || "all";
      writeLocalJson(STORAGE_KEYS.reportFilter, activeReportFilter);
      document.querySelectorAll("[data-report-filter]").forEach((node) => {
        node.classList.toggle("active", node.getAttribute("data-report-filter") === activeReportFilter);
      });
    }

    function loadReportFilter() {
      const saved = readLocalJson(STORAGE_KEYS.reportFilter, "all");
      setReportFilter(saved || "all");
    }

    function collectScanSettings() {
      return {
        maxDepth: Number(el("maxDepth").value || 4),
        maxFiles: Number(el("maxFiles").value || 2000),
        largeFileThresholdBytes: Number(el("largeThreshold").value || 268435456),
        staleDays: Number(el("staleDays").value || 90),
        scanTarget: el("scanTarget").value.trim()
      };
    }

    function applyScanSettings(settings = {}) {
      if (settings.maxDepth !== undefined) el("maxDepth").value = settings.maxDepth;
      if (settings.maxFiles !== undefined) el("maxFiles").value = settings.maxFiles;
      if (settings.largeFileThresholdBytes !== undefined) el("largeThreshold").value = settings.largeFileThresholdBytes;
      if (settings.staleDays !== undefined) el("staleDays").value = settings.staleDays;
      if (settings.scanTarget !== undefined) el("scanTarget").value = settings.scanTarget;
    }

    function saveScanSettings() {
      writeLocalJson(STORAGE_KEYS.scanSettings, collectScanSettings());
      el("scanSettingsState").textContent = "扫描参数已自动保存到本地。";
    }

    function loadScanSettings() {
      const saved = readLocalJson(STORAGE_KEYS.scanSettings, null);
      if (saved) {
        applyScanSettings(saved);
        el("scanSettingsState").textContent = "已恢复上次使用的扫描参数。";
      }
    }

    function applyDefaultLlmForm() {
      el("provider").value = DEFAULT_LLM_FORM.provider;
      el("baseUrl").value = DEFAULT_LLM_FORM.baseUrl;
      el("apiKey").value = DEFAULT_LLM_FORM.apiKey;
      el("chatModel").value = DEFAULT_LLM_FORM.chatModel;
      el("reasonModel").value = DEFAULT_LLM_FORM.reasonModel;
      el("summaryModel").value = DEFAULT_LLM_FORM.summaryModel;
      el("timeoutMs").value = DEFAULT_LLM_FORM.timeoutMs;
      el("maxRetries").value = DEFAULT_LLM_FORM.maxRetries;
    }

    function applyDefaultScanSettings() {
      el("scanTarget").value = DEFAULT_SCAN_SETTINGS.scanTarget;
      el("maxDepth").value = DEFAULT_SCAN_SETTINGS.maxDepth;
      el("maxFiles").value = DEFAULT_SCAN_SETTINGS.maxFiles;
      el("largeThreshold").value = DEFAULT_SCAN_SETTINGS.largeThreshold;
      el("staleDays").value = DEFAULT_SCAN_SETTINGS.staleDays;
      saveScanSettings();
    }

    async function loadDesktopSettings() {
      if (!window.diskClawDesktop?.getWindowState) {
        el("desktopSettingsResult").textContent = JSON.stringify({
          message: "当前环境不支持桌面设置读取。"
        }, null, 2);
        return;
      }

      const state = await window.diskClawDesktop.getWindowState();
      el("windowAlwaysOnTop").checked = Boolean(state?.isAlwaysOnTop);
      el("windowCloseBehavior").value = state?.closeBehavior || "ask";
      el("windowAutoLaunch").checked = Boolean(state?.openAtLogin);
      el("desktopSettingsResult").textContent = JSON.stringify(state, null, 2);
      log("已加载桌面设置", state);
    }

    async function saveDesktopSettings() {
      if (!window.diskClawDesktop?.setWindowState) {
        showToast("warn", "当前环境不支持", "桌面设置仅在 Electron 桌面端可用。");
        return;
      }

      const saved = await window.diskClawDesktop.setWindowState({
        isAlwaysOnTop: el("windowAlwaysOnTop").checked,
        closeBehavior: el("windowCloseBehavior").value,
        openAtLogin: el("windowAutoLaunch").checked
      });
      el("desktopSettingsResult").textContent = JSON.stringify(saved, null, 2);
      log("已保存桌面设置", saved);
      showToast("success", "桌面设置已保存", "窗口行为配置已更新。");
    }

    async function browseScanFolder() {
      if (!window.diskClawDesktop?.chooseFolder) {
        showToast("warn", "当前环境不支持", "浏览文件夹仅在 Electron 桌面端可用。");
        return;
      }

      const selected = await window.diskClawDesktop.chooseFolder();
      if (!selected) {
        return;
      }
      el("scanTarget").value = selected;
      saveScanSettings();
      log("已选择扫描目录", { path: selected });
    }

    async function testDesktopNotification() {
      if (!window.diskClawDesktop?.notify) {
        showToast("warn", "当前环境不支持", "系统通知仅在 Electron 桌面端可用。");
        return;
      }

      await window.diskClawDesktop.notify("磁盘清理大虾", "这是一条测试通知。");
      log("已触发系统通知测试");
      showToast("success", "通知已发送", "请检查系统通知区域。");
    }

    async function notifyDesktop(title, body) {
      if (!window.diskClawDesktop?.notify) {
        return;
      }

      try {
        await window.diskClawDesktop.notify(title, body);
      } catch {}
    }

    function bindScanSettingsPersistence() {
      ["scanTarget", "maxDepth", "maxFiles", "largeThreshold", "staleDays"].forEach((id) => {
        el(id).addEventListener("input", saveScanSettings);
        el(id).addEventListener("change", saveScanSettings);
      });
    }

    function llmPayload() {
      return {
        enabled: true,
        provider: el("provider").value,
        baseUrl: el("baseUrl").value.trim(),
        apiKey: el("apiKey").value.trim(),
        models: {
          chat: el("chatModel").value.trim(),
          reason: el("reasonModel").value.trim(),
          summary: el("summaryModel").value.trim()
        },
        timeoutMs: Number(el("timeoutMs").value || 20000),
        maxRetries: Number(el("maxRetries").value || 1)
      };
    }

    function rulePayload() {
      return {
        excludePaths: textAreaToArray(el("excludePaths").value),
        whitelistPaths: textAreaToArray(el("whitelistPaths").value),
        blacklistPaths: textAreaToArray(el("blacklistPaths").value)
      };
    }

    function scanPayload() {
      return {
        targets: [
          {
            path: el("scanTarget").value.trim()
          }
        ],
        options: {
          maxDepth: Number(el("maxDepth").value || 4),
          maxFiles: Number(el("maxFiles").value || 2000),
          largeFileThresholdBytes: Number(el("largeThreshold").value || 268435456),
          staleDays: Number(el("staleDays").value || 90)
        }
      };
    }

    function preferencePayload() {
      return {
        defaultCleanupMode: el("defaultCleanupMode").value
      };
    }

    function schedulePayload() {
      return {
        name: el("scheduleName").value.trim(),
        action: el("scheduleAction").value,
        intervalMinutes: Number(el("scheduleInterval").value || 60),
        maxItems: Number(el("scheduleMaxItems").value || 10),
        enabled: el("scheduleEnabled").checked,
        dryRun: el("scheduleDryRun").checked,
        cleanupMode: el("defaultCleanupMode").value,
        archiveDir: el("archiveDir").value.trim(),
        targets: [
          {
            path: el("scanTarget").value.trim()
          }
        ],
        options: {
          maxDepth: Number(el("maxDepth").value || 4),
          maxFiles: Number(el("maxFiles").value || 2000),
          largeFileThresholdBytes: Number(el("largeThreshold").value || 268435456),
          staleDays: Number(el("staleDays").value || 90)
        }
      };
    }

    function renderRecommendations(items) {
      if (!items || items.length === 0) {
        el("recommendationsTable").innerHTML = "没有可展示的建议项。";
        return;
      }

      const rows = items.map((item) => {
        return "<tr>" +
          "<td>" + item.name + "</td>" +
          "<td>" + item.category + "</td>" +
          "<td class=\"risk-" + item.risk.level + "\">" + item.risk.level + "</td>" +
          "<td>" + item.sizeBytes + "</td>" +
          "<td>" + item.path + "</td>" +
        "</tr>";
      }).join("");

      el("recommendationsTable").innerHTML =
        "<table><thead><tr><th>名称</th><th>类别</th><th>风险</th><th>大小</th><th>路径</th></tr></thead><tbody>" +
        rows +
        "</tbody></table>";
    }

    function formatBytes(value) {
      const size = Number(value || 0);

      if (size < 1024) {
        return size + " B";
      }

      const units = ["KB", "MB", "GB", "TB"];
      let next = size;
      let unitIndex = -1;

      do {
        next /= 1024;
        unitIndex += 1;
      } while (next >= 1024 && unitIndex < units.length - 1);

      return next.toFixed(next >= 10 ? 1 : 2) + " " + units[unitIndex];
    }

    function renderPlanSummary(plan) {
      const summary = plan?.analysis?.candidateSummary;
      const priorities = plan?.analysis?.priorities || [];
      const riskCounts = summary?.riskCounts || {};

      if (!summary) {
        return;
      }

      el("planSummaryGrid").innerHTML = [
        {
          label: "可回收空间",
          value: formatBytes(summary.reclaimableBytes || 0)
        },
        {
          label: "候选项数量",
          value: String(summary.totalCandidates || 0)
        },
        {
          label: "重复文件组",
          value: String(summary.duplicateGroups?.length || 0)
        },
        {
          label: "热点目录",
          value: String(summary.directoryHotspots?.length || 0)
        }
      ].map((item) => {
        return "<div class=\"summary-card\">" +
          "<div class=\"summary-card-label\">" + item.label + "</div>" +
          "<div class=\"summary-card-value\">" + item.value + "</div>" +
        "</div>";
      }).join("");

      el("riskSummaryGrid").innerHTML = [
        {
          label: "低风险候选项",
          value: String(riskCounts.low || 0)
        },
        {
          label: "中风险候选项",
          value: String(riskCounts.medium || 0)
        },
        {
          label: "高风险候选项",
          value: String(riskCounts.high || 0)
        }
      ].map((item) => {
        return "<div class=\"summary-card\">" +
          "<div class=\"summary-card-label\">" + item.label + "</div>" +
          "<div class=\"summary-card-value\">" + item.value + "</div>" +
        "</div>";
      }).join("");

      if (!priorities.length) {
        el("priorityList").innerHTML =
          "<div class=\"priority-item\">" +
            "<div class=\"priority-title\">当前没有优先事项</div>" +
            "<p class=\"priority-copy\">本次扫描没有生成更高优先级的治理建议。</p>" +
          "</div>";
        return;
      }

      el("priorityList").innerHTML = priorities.map((item, index) => {
        return "<div class=\"priority-item\">" +
          "<div class=\"task-item-meta\"><span>动作建议 " + (index + 1) + "</span></div>" +
          "<div class=\"priority-title\">" + item.title + "</div>" +
          "<p class=\"priority-copy\">" + item.description + " 影响空间：" + formatBytes(item.impactedBytes || 0) + "</p>" +
        "</div>";
      }).join("");

      document.querySelectorAll("#priorityList .priority-item").forEach((node, index) => {
        node.addEventListener("click", () => {
          const item = priorities[index];
          triggerPriorityAction(item);
        });
      });
    }

    function triggerPriorityAction(item) {
      if (!item) {
        return;
      }

      if (item.type === "duplicate-resolution") {
        setActivePanel("operations");
        el("dryRunDuplicateCleanup").click();
        return;
      }

      if (item.type === "directory-hotspot") {
        setActivePanel("operations");
        el("dryRunHotspotCleanup").click();
        return;
      }

      if (item.type === "largest-candidate") {
        setActivePanel("operations");
        el("dryRunCleanup").click();
      }
    }

    function renderDuplicateRecommendations(plan) {
      const groups = plan?.analysis?.candidateSummary?.duplicateResolutionRecommendations || [];

      if (groups.length === 0) {
        el("duplicateResult").textContent = "当前没有重复文件策略。";
        return;
      }

      el("duplicateResult").textContent = JSON.stringify(groups, null, 2);
    }

    function renderHotspotRecommendations(plan) {
      const groups = plan?.analysis?.candidateSummary?.directoryHotspotRecommendations || [];

      if (groups.length === 0) {
        el("hotspotResult").textContent = "当前没有热点目录策略。";
        return;
      }

      el("hotspotResult").textContent = JSON.stringify(groups, null, 2);
    }

    function renderTaskSummary(task) {
      el("taskDetailSummary").innerHTML =
        "<h3>任务摘要</h3>" +
        "<div class=\"detail-grid\">" +
          "<div class=\"summary-card\"><div class=\"summary-card-label\">任务类型</div><div class=\"summary-card-value\">" + taskTypeLabel(task.type) + "</div></div>" +
          "<div class=\"summary-card\"><div class=\"summary-card-label\">当前状态</div><div class=\"summary-card-value\">" + task.status + "</div></div>" +
          "<div class=\"summary-card\"><div class=\"summary-card-label\">当前进度</div><div class=\"summary-card-value\">" + task.progress + "%</div></div>" +
          "<div class=\"summary-card\"><div class=\"summary-card-label\">最近更新时间</div><div class=\"summary-card-value\">" + task.updatedAt + "</div></div>" +
        "</div>";
    }

    function renderReportSummary(report) {
      const summaryText =
        report.analysis?.summaryText ||
        report.llm?.output?.userMessage ||
        report.message ||
        "当前报告没有额外摘要，可在下方查看原始 JSON 内容。";

      el("reportDetailSummary").innerHTML =
        "<h3>报告摘要</h3>" +
        "<div class=\"detail-grid\">" +
          "<div class=\"summary-card\"><div class=\"summary-card-label\">报告类型</div><div class=\"summary-card-value\">" + taskTypeLabel(report.type || "unknown") + "</div></div>" +
          "<div class=\"summary-card\"><div class=\"summary-card-label\">创建时间</div><div class=\"summary-card-value\">" + (report.createdAt || "未知") + "</div></div>" +
        "</div>" +
        "<p>" + summaryText + "</p>";
    }

    function renderCleanupSummary(result) {
      const counts = result?.statusCounts || {};
      el("cleanupSummaryGrid").innerHTML = [
        { label: "已移动", value: String(counts.moved || 0) },
        { label: "已计划", value: String(counts.planned || 0) },
        { label: "已跳过", value: String(counts.skipped || 0) },
        { label: "失败", value: String(counts.error || 0) }
      ].map((item) => {
        return "<div class=\"summary-card\">" +
          "<div class=\"summary-card-label\">" + item.label + "</div>" +
          "<div class=\"summary-card-value\">" + item.value + "</div>" +
        "</div>";
      }).join("");
    }

    function selectedDuplicateGroups() {
      return lastPlan?.analysis?.candidateSummary?.duplicateResolutionRecommendations || [];
    }

    function selectedHotspotGroups() {
      return lastPlan?.analysis?.candidateSummary?.directoryHotspotRecommendations || [];
    }

    async function refreshHealth() {
      const health = await request("/api/health");
      el("healthStatus").textContent = health.ok ? "在线" : "离线";
      el("llmStatus").textContent = health.llm?.ok ? "已连接" : (health.llm?.reason || "未配置");
      log("已刷新健康状态", health);
    }

    async function loadLlmConfig() {
      const config = await request("/api/config/llm");
      el("baseUrl").value = config.baseUrl || "";
      el("apiKey").value = "";
      el("chatModel").value = config?.models?.chat || "";
      el("reasonModel").value = config?.models?.reason || "";
      el("summaryModel").value = config?.models?.summary || "";
      el("timeoutMs").value = config.timeoutMs || 20000;
      el("maxRetries").value = config.maxRetries || 1;
      log("已加载本地 LLM 配置", config);
    }

    async function loadRules() {
      try {
        const rules = await request("/api/rules");
        el("excludePaths").value = arrayToTextArea(rules.excludePaths || []);
        el("whitelistPaths").value = arrayToTextArea(rules.whitelistPaths || []);
        el("blacklistPaths").value = arrayToTextArea(rules.blacklistPaths || []);
        log("已加载规则配置", rules);
        showToast("success", "规则已加载", "规则配置已刷新。");
      } catch (error) {
        showRequestErrorToast(error, "读取规则失败");
      }
    }

    async function saveRules() {
      try {
        const saved = await request("/api/rules", {
          method: "POST",
          body: JSON.stringify(rulePayload())
        });
        log("已保存规则配置", saved);
        showToast("success", "规则已保存", "排除路径、白名单和黑名单已更新。");
      } catch (error) {
        showRequestErrorToast(error, "保存规则失败");
      }
    }

    async function loadPreferences() {
      try {
        const preferences = await request("/api/preferences");
        el("defaultCleanupMode").value = preferences.defaultCleanupMode || "quarantine";
        el("cleanupMode").value = preferences.defaultCleanupMode || "quarantine";
        if (!el("scanTarget").value && Array.isArray(preferences.recentTargets) && preferences.recentTargets[0]) {
          el("scanTarget").value = preferences.recentTargets[0];
        }
        el("preferencesResult").textContent = JSON.stringify(preferences, null, 2);
        log("已加载用户偏好", preferences);
      } catch (error) {
        showRequestErrorToast(error, "读取偏好失败");
      }
    }

    async function savePreferences() {
      try {
        const saved = await request("/api/preferences", {
          method: "POST",
          body: JSON.stringify({
            ...preferencePayload(),
            recentTargets: [el("scanTarget").value.trim()].filter(Boolean),
            preferredTaskFilter: activeTaskFilter,
            preferredReportFilter: activeReportFilter
          })
        });
        el("preferencesResult").textContent = JSON.stringify(saved, null, 2);
        el("cleanupMode").value = saved.defaultCleanupMode || "quarantine";
        log("已保存用户偏好", saved);
        showToast("success", "偏好已保存", "默认清理模式与个性化偏好已更新。");
      } catch (error) {
        showRequestErrorToast(error, "保存偏好失败");
      }
    }

    async function loadSchedules() {
      let schedules;
      try {
        schedules = await request("/api/schedules");
      } catch (error) {
        showRequestErrorToast(error, "读取周期计划失败");
        return;
      }

      if (!schedules.length) {
        el("scheduleList").innerHTML = "当前没有周期计划。";
        return;
      }

      el("scheduleList").innerHTML = schedules.map((item) => {
        return "<div class=\"task-item\">" +
          "<div class=\"task-item-title\">" + item.name + "</div>" +
          "<div class=\"task-item-meta\">" +
            "<span>动作：" + item.action + "</span>" +
            "<span>间隔：" + item.intervalMinutes + " 分钟</span>" +
            "<span>状态：" + (item.enabled ? "启用" : "停用") + "</span>" +
          "</div>" +
          "<div class=\"actions\"><button class=\"secondary delete-schedule\" data-schedule-id=\"" + item.id + "\">删除</button></div>" +
        "</div>";
      }).join("");

      document.querySelectorAll(".delete-schedule").forEach((node) => {
        node.addEventListener("click", async () => {
          const scheduleId = node.getAttribute("data-schedule-id");
          await request("/api/schedules/" + encodeURIComponent(scheduleId), {
            method: "DELETE"
          });
          await loadSchedules();
        });
      });

      log("已加载周期计划", { count: schedules.length });
    }

    async function saveSchedule() {
      try {
        const saved = await request("/api/schedules", {
          method: "POST",
          body: JSON.stringify(schedulePayload())
        });
        log("已保存周期计划", saved);
        showToast("success", "周期计划已保存", "应用运行期间会按设定计划自动执行。");
        await loadSchedules();
      } catch (error) {
        showRequestErrorToast(error, "保存周期计划失败");
      }
    }

    async function pauseActiveTask() {
      if (!activeTaskId) {
        log("当前没有可暂停的任务");
        showToast("warn", "没有可暂停任务", "当前没有正在执行中的任务。");
        return;
      }
      try {
        await request("/api/tasks/" + encodeURIComponent(activeTaskId) + "/pause", {
          method: "POST",
          body: JSON.stringify({})
        });
        log("已请求暂停任务", { taskId: activeTaskId });
        showToast("success", "任务已暂停", "当前任务已进入暂停状态。");
      } catch (error) {
        showRequestErrorToast(error, "暂停任务失败");
      }
    }

    async function resumeActiveTask() {
      if (!activeTaskId) {
        log("当前没有可继续的任务");
        showToast("warn", "没有可继续任务", "当前没有已暂停的任务。");
        return;
      }
      try {
        await request("/api/tasks/" + encodeURIComponent(activeTaskId) + "/resume", {
          method: "POST",
          body: JSON.stringify({})
        });
        log("已请求继续任务", { taskId: activeTaskId });
        showToast("success", "任务已继续", "任务已恢复执行。");
      } catch (error) {
        showRequestErrorToast(error, "继续任务失败");
      }
    }

    async function cancelActiveTask() {
      if (!activeTaskId) {
        log("当前没有可取消的任务");
        showToast("warn", "没有可取消任务", "当前没有可取消的任务。");
        return;
      }
      try {
        await request("/api/tasks/" + encodeURIComponent(activeTaskId) + "/cancel", {
          method: "POST",
          body: JSON.stringify({})
        });
        log("已请求取消任务", { taskId: activeTaskId });
        showToast("warn", "任务已取消", "当前任务已停止执行。");
      } catch (error) {
        showRequestErrorToast(error, "取消任务失败");
      }
    }

    async function loadOnboarding() {
      onboardingState = await request("/api/onboarding");
      const shouldShow = !onboardingState.completed && !onboardingState.dismissedAt;
      setGuideVisible(shouldShow);
      log("已加载首启引导状态", onboardingState);
    }

    async function testLlmConfig() {
      try {
        const result = await request("/api/config/llm/test", {
          method: "POST",
          body: JSON.stringify(llmPayload())
        });
        log("LLM 连接测试完成", result);
        showToast(result.ok ? "success" : "warn", "LLM 测试完成", result.ok ? "模型连接成功。" : "模型连接失败。");
        await refreshHealth();
      } catch (error) {
        showRequestErrorToast(error, "LLM 测试失败");
      }
    }

    async function saveLlmConfig() {
      try {
        const payload = llmPayload();
        payload.hasApiKey = true;
        const result = await request("/api/config/llm", {
          method: "POST",
          body: JSON.stringify(payload)
        });
        log("LLM 配置已保存", result);
        showToast("success", "配置已保存", "LLM 配置已更新。");
        await refreshHealth();
      } catch (error) {
        showRequestErrorToast(error, "保存 LLM 配置失败");
      }
    }

    async function runScan() {
      const task = await request("/api/tasks/scan", {
        method: "POST",
        body: JSON.stringify(scanPayload())
      });
      setActivePanel("overview");
      trackTask(task.taskId, "扫描中", (result) => {
        el("askResult").textContent = JSON.stringify(result, null, 2);
        log("扫描完成", { summary: result.summary, warnings: result.warnings?.length || 0 });
        notifyDesktop("磁盘清理大虾", "扫描已完成。");
      });
    }

    async function runPlan() {
      const task = await request("/api/tasks/agent/plan", {
        method: "POST",
        body: JSON.stringify(scanPayload())
      });
      setActivePanel("overview");
      trackTask(task.taskId, "生成方案中", async (result) => {
        lastPlan = result;
        renderRecommendations(lastPlan.analysis?.recommendedItems || []);
        renderDuplicateRecommendations(lastPlan);
        renderHotspotRecommendations(lastPlan);
        renderPlanSummary(lastPlan);
        el("askResult").textContent = JSON.stringify(lastPlan.llm, null, 2);
        el("latestPlan").textContent = lastPlan.reportId || "已生成";
        log("清理方案已生成", lastPlan);
        await loadReports();
        notifyDesktop("磁盘清理大虾", "清理方案已生成。");
      });
    }

    async function askAgent() {
      const result = await request("/api/agent/ask", {
        method: "POST",
        body: JSON.stringify({
          question: el("agentQuestion").value.trim(),
          context: lastPlan?.analysis || {}
        })
      });
      el("askResult").textContent = JSON.stringify(result, null, 2);
      log("Agent 已回复问题", result);
    }

    function selectedCleanupItems() {
      const items = lastPlan?.analysis?.recommendedItems || [];
      const limit = Number(el("cleanupLimit").value || 5);
      return items.slice(0, limit);
    }

    async function runCleanup(dryRun) {
      const items = selectedCleanupItems();
      const summary = summarizeSelectedItems(items);
      const mode = el("cleanupMode").value;

      if (!dryRun) {
        const confirmed = await confirmAction({
          title: mode === "permanent" ? "确认永久删除" : "确认执行普通清理",
          message: mode === "permanent"
            ? "该操作不可恢复，将直接永久删除文件。"
            : "该操作会修改磁盘文件，请确认后继续。",
          impact: "将处理 " + summary.count + " 个文件，预计影响空间 " + formatBytes(summary.totalSize) + "。",
          allowRemember: mode !== "permanent",
          skipKey: mode === "quarantine" ? "cleanup-quarantine-low-risk" : ("cleanup-" + mode),
          keyword: mode === "permanent" ? "永久删除" : ""
        });

        if (!confirmed) {
          showToast("warn", "已取消操作", "普通清理未执行。");
          return;
        }
      }

      const task = await request("/api/tasks/cleanup/execute", {
        method: "POST",
        body: JSON.stringify({
          items,
          options: {
            dryRun,
            mode,
            archiveDir: el("cleanupArchiveDir").value.trim(),
            confirmHighRisk: false
          }
        })
      });
      setActivePanel("operations");
      trackTask(task.taskId, dryRun ? "Dry Run 执行中" : "清理执行中", async (result) => {
        renderCleanupSummary(result);
        el("cleanupResult").textContent = JSON.stringify(result, null, 2);
        log(dryRun ? "普通清理 Dry Run 完成" : "普通清理执行完成", result);
        await loadQuarantine();
        await loadReports();
        await loadTasks();
        notifyDesktop("磁盘清理大虾", dryRun ? "普通清理 Dry Run 已完成。" : "普通清理已完成。");
      });
    }

    async function runDuplicateCleanup(dryRun) {
      const groups = selectedDuplicateGroups();
      const itemCount = groups.reduce((sum, group) => sum + (group.cleanupCandidates?.length || 0), 0);
      const affectedBytes = groups.reduce((sum, group) => sum + Number(group.wastedBytes || 0), 0);
      const mode = el("cleanupMode").value;

      if (!dryRun) {
        const confirmed = await confirmAction({
          title: mode === "permanent" ? "确认永久删除重复文件" : "确认执行重复文件隔离",
          message: mode === "permanent"
            ? "该操作不可恢复，将永久删除重复文件副本。"
            : "将按重复文件策略处理副本，请确认后继续。",
          impact: "将处理 " + itemCount + " 个重复文件副本，预计影响空间 " + formatBytes(affectedBytes) + "。",
          allowRemember: mode !== "permanent",
          skipKey: "duplicate-" + mode,
          keyword: mode === "permanent" ? "永久删除" : ""
        });

        if (!confirmed) {
          showToast("warn", "已取消操作", "重复文件清理未执行。");
          return;
        }
      }

      const task = await request("/api/tasks/cleanup/duplicates/execute", {
        method: "POST",
        body: JSON.stringify({
          groups,
          options: {
            dryRun,
            mode,
            archiveDir: el("cleanupArchiveDir").value.trim(),
            confirmHighRisk: false
          }
        })
      });
      setActivePanel("operations");
      trackTask(task.taskId, dryRun ? "重复文件 Dry Run 执行中" : "重复文件隔离执行中", async (result) => {
        renderCleanupSummary(result);
        el("cleanupResult").textContent = JSON.stringify(result, null, 2);
        log(dryRun ? "重复文件 Dry Run 完成" : "重复文件隔离完成", result);
        await loadQuarantine();
        await loadReports();
        await loadTasks();
        notifyDesktop("磁盘清理大虾", dryRun ? "重复文件 Dry Run 已完成。" : "重复文件清理已完成。");
      });
    }

    async function runHotspotCleanup(dryRun) {
      const groups = selectedHotspotGroups();
      const itemCount = groups.reduce((sum, group) => sum + (group.cleanupCandidates?.length || 0), 0);
      const affectedBytes = groups.reduce((sum, group) => sum + Number(group.totalBytes || 0), 0);
      const mode = el("cleanupMode").value;

      if (!dryRun) {
        const confirmed = await confirmAction({
          title: mode === "permanent" ? "确认永久删除热点目录候选项" : "确认执行热点目录清理",
          message: mode === "permanent"
            ? "该操作不可恢复，将永久删除热点目录候选文件。"
            : "将按热点目录策略处理候选项，请确认后继续。",
          impact: "将处理 " + itemCount + " 个候选项，预计影响空间 " + formatBytes(affectedBytes) + "。",
          allowRemember: mode !== "permanent",
          skipKey: "hotspot-" + mode,
          keyword: mode === "permanent" ? "永久删除" : ""
        });

        if (!confirmed) {
          showToast("warn", "已取消操作", "热点目录清理未执行。");
          return;
        }
      }

      const task = await request("/api/tasks/cleanup/hotspots/execute", {
        method: "POST",
        body: JSON.stringify({
          groups,
          options: {
            dryRun,
            mode,
            archiveDir: el("cleanupArchiveDir").value.trim(),
            confirmHighRisk: false
          }
        })
      });
      setActivePanel("operations");
      trackTask(task.taskId, dryRun ? "热点目录 Dry Run 执行中" : "热点目录隔离执行中", async (result) => {
        renderCleanupSummary(result);
        el("cleanupResult").textContent = JSON.stringify(result, null, 2);
        log(dryRun ? "热点目录 Dry Run 完成" : "热点目录隔离完成", result);
        await loadQuarantine();
        await loadReports();
        await loadTasks();
        notifyDesktop("磁盘清理大虾", dryRun ? "热点目录 Dry Run 已完成。" : "热点目录清理已完成。");
      });
    }

    async function loadQuarantine() {
      const result = await request("/api/quarantine");
      el("quarantineCount").textContent = String(result.length);

      selectedQuarantineIds = selectedQuarantineIds.filter((id) => result.some((item) => item.id === id));

      if (!result.length) {
        el("quarantineSummary").innerHTML =
          "<h3>隔离区状态</h3><p>当前没有隔离项。</p>";
        el("quarantineResult").innerHTML = "当前没有隔离项。";
        log("已加载隔离区数据", { count: 0 });
        return;
      }

      el("quarantineSummary").innerHTML =
        "<h3>隔离区状态</h3><p>当前共有 " + result.length + " 个隔离项，其中未恢复项 " +
        result.filter((item) => !item.restoredAt).length + " 个。</p>";

      el("quarantineResult").innerHTML = result.map((item) => {
        const checked = selectedQuarantineIds.includes(item.id) ? "checked" : "";
        return "<div class=\"select-item\">" +
          "<div class=\"select-head\">" +
            "<input type=\"checkbox\" class=\"quarantine-checkbox\" data-quarantine-id=\"" + item.id + "\" " + checked + ">" +
            "<strong>" + item.id + "</strong>" +
          "</div>" +
          "<div class=\"task-item-meta\">" +
            "<span>原始路径：" + item.originalPath + "</span>" +
            "<span>创建时间：" + item.createdAt + "</span>" +
            "<span>恢复状态：" + (item.restoredAt ? "已恢复" : "未恢复") + "</span>" +
          "</div>" +
        "</div>";
      }).join("");

      document.querySelectorAll(".quarantine-checkbox").forEach((node) => {
        node.addEventListener("change", () => {
          const id = node.getAttribute("data-quarantine-id");
          if (node.checked) {
            if (!selectedQuarantineIds.includes(id)) {
              selectedQuarantineIds.push(id);
            }
          } else {
            selectedQuarantineIds = selectedQuarantineIds.filter((value) => value !== id);
          }
        });
      });

      log("已加载隔离区数据", { count: result.length });
    }

    async function restoreLatestQuarantine() {
      const items = await request("/api/quarantine");

      const latest = Array.isArray(items)
        ? items.find((item) => !item.restoredAt)
        : null;

      if (!latest) {
        log("没有可恢复的隔离项");
        el("cleanupResult").textContent = JSON.stringify({
          message: "当前没有可恢复的隔离项。"
        }, null, 2);
        return;
      }

      const confirmed = await confirmAction({
        title: "确认恢复最近一项",
        message: "该操作会把隔离区中的文件恢复回原始路径。",
        impact: "将恢复 1 个文件：" + latest.originalPath,
        allowRemember: true,
        skipKey: "restore-single"
      });

      if (!confirmed) {
        showToast("warn", "已取消操作", "恢复操作未执行。");
        return;
      }

      const result = await request("/api/quarantine/restore", {
        method: "POST",
        body: JSON.stringify({
          items: [
            {
              id: latest.id
            }
          ]
        })
      });

      el("cleanupResult").textContent = JSON.stringify(result, null, 2);
      renderCleanupSummary({
        statusCounts: result.results?.reduce((accumulator, item) => {
          const key = item.status || "unknown";
          accumulator[key] = (accumulator[key] || 0) + 1;
          return accumulator;
        }, {})
      });
      log("已恢复最近的隔离项", { id: latest.id, originalPath: latest.originalPath });
      await loadQuarantine();
      await loadReports();
    }

    async function restoreSelectedQuarantine() {
      if (!selectedQuarantineIds.length) {
        el("cleanupResult").textContent = JSON.stringify({
          message: "请先选择需要恢复的隔离项。"
        }, null, 2);
        log("未执行恢复：没有选中隔离项");
        return;
      }

      const confirmed = await confirmAction({
        title: "确认恢复选中项",
        message: "该操作会把选中的隔离文件恢复回原始路径。",
        impact: "将恢复 " + selectedQuarantineIds.length + " 个文件。",
        allowRemember: true,
        skipKey: "restore-batch"
      });

      if (!confirmed) {
        showToast("warn", "已取消操作", "批量恢复未执行。");
        return;
      }

      const result = await request("/api/quarantine/restore", {
        method: "POST",
        body: JSON.stringify({
          items: selectedQuarantineIds.map((id) => ({ id }))
        })
      });

      selectedQuarantineIds = [];
      renderCleanupSummary({
        statusCounts: result.results?.reduce((accumulator, item) => {
          const key = item.status || "unknown";
          accumulator[key] = (accumulator[key] || 0) + 1;
          return accumulator;
        }, {})
      });
      el("cleanupResult").textContent = JSON.stringify(result, null, 2);
      log("已恢复选中的隔离项", { count: result.results?.length || 0 });
      await loadQuarantine();
      await loadReports();
    }

    async function loadReports() {
      const result = await request("/api/reports");
      const analytics = await request("/api/reports/analytics");
      const reports = result.filter((item) => {
        if (activeReportFilter === "all") {
          return true;
        }

        return item.type === activeReportFilter;
      });

      if (!reports.length) {
        el("reportsSummary").innerHTML =
          "<h3>报告状态</h3><p>当前筛选条件下没有报告记录。</p>";
        el("reportsResult").innerHTML = "当前筛选条件下没有报告记录。";
        return;
      }

      el("reportsSummary").innerHTML =
        "<h3>报告状态</h3><p>当前筛选结果共 " + reports.length + " 条，最近一条类型为 " +
        taskTypeLabel(reports[0].type || "unknown") + "。</p>";

      el("reportAnalyticsGrid").innerHTML = [
        { label: "近 7 天报告数", value: String(analytics.last7Days?.reportCount || 0) },
        { label: "近 7 天空间", value: formatBytes(analytics.last7Days?.reclaimedBytes || 0) },
        { label: "近 30 天报告数", value: String(analytics.last30Days?.reportCount || 0) },
        { label: "近 30 天空间", value: formatBytes(analytics.last30Days?.reclaimedBytes || 0) }
      ].map((item) => {
        return "<div class=\"summary-card\">" +
          "<div class=\"summary-card-label\">" + item.label + "</div>" +
          "<div class=\"summary-card-value\">" + item.value + "</div>" +
        "</div>";
      }).join("");

      el("reportsResult").innerHTML = reports.map((report) => {
        return "<div class=\"report-item\" data-report-id=\"" + report.reportId + "\">" +
          "<div class=\"task-item-title\">" + report.type + "</div>" +
          "<div class=\"task-item-meta\">" +
            "<span>报告 ID：" + report.reportId + "</span>" +
            "<span>创建时间：" + report.createdAt + "</span>" +
          "</div>" +
        "</div>";
      }).join("");

      document.querySelectorAll(".report-item").forEach((node) => {
        node.addEventListener("click", async () => {
          const reportId = node.getAttribute("data-report-id");
          const detail = await request("/api/reports/" + encodeURIComponent(reportId));
          currentReportId = reportId;
          renderReportSummary(detail);
          el("reportDetailResult").textContent = JSON.stringify(detail, null, 2);
          log("已加载报告详情", { reportId, type: detail.type || "unknown" });
        });
      });

      log("已加载报告索引", { count: reports.length, filter: activeReportFilter });
    }

    async function viewLatestReport() {
      const reports = await request("/api/reports");

      if (!Array.isArray(reports) || reports.length === 0) {
        el("reportDetailResult").textContent = "当前没有可查看的报告。";
        return;
      }

      const latest = reports[0];
      const detail = await request("/api/reports/" + encodeURIComponent(latest.reportId));
      currentReportId = latest.reportId;
      renderReportSummary(detail);
      el("reportDetailResult").textContent = JSON.stringify(detail, null, 2);
      log("已加载报告详情", { reportId: latest.reportId, type: latest.type });
    }

    async function exportCurrentReport(format) {
      const reportId = currentReportId || (await request("/api/reports"))[0]?.reportId;

      if (!reportId) {
        log("当前没有可导出的报告");
        return;
      }

      const exported = await request("/api/reports/" + encodeURIComponent(reportId) + "/export", {
        method: "POST",
        body: JSON.stringify({ format })
      });

      log("已导出报告", exported);
      el("reportDetailResult").textContent = JSON.stringify({
        export: exported
      }, null, 2);
    }

    function updateRulesSummary(rules) {
      const excludeCount = (rules.excludePaths || []).length;
      const whitelistCount = (rules.whitelistPaths || []).length;
      const blacklistCount = (rules.blacklistPaths || []).length;

      const summary = document.createElement("div");
      summary.className = "summary-block";
      summary.innerHTML =
        "<h3>规则摘要</h3>" +
        "<p>排除路径 " + excludeCount + " 条，白名单 " + whitelistCount + " 条，黑名单 " + blacklistCount + " 条。</p>";

      const current = document.querySelector("#settings [data-rule-summary]");
      if (current) {
        current.replaceWith(summary);
      } else {
        summary.setAttribute("data-rule-summary", "1");
        const card = document.querySelector("#settings .card");
        if (card) {
          card.appendChild(summary);
        }
      }
    }

    async function loadTasks() {
      const tasks = await request("/api/tasks");
      const filteredTasks = tasks.filter((task) => {
        if (activeTaskFilter === "all") {
          return true;
        }

        return task.status === activeTaskFilter;
      });

      if (!Array.isArray(filteredTasks) || filteredTasks.length === 0) {
        el("tasksSummary").innerHTML =
          "<h3>任务状态</h3><p>当前筛选条件下没有任务记录。</p>";
        el("taskList").innerHTML = "当前筛选条件下没有任务记录。";
        return;
      }

      el("tasksSummary").innerHTML =
        "<h3>任务状态</h3><p>当前筛选结果共 " + filteredTasks.length + " 条，最近一条状态为 " +
        filteredTasks[0].status + "。</p>";

      el("taskList").innerHTML = filteredTasks.map((task) => {
        return "<div class=\"task-item\" data-task-id=\"" + task.taskId + "\">" +
          "<div class=\"task-item-title\">" + taskTypeLabel(task.type) + "</div>" +
          "<div class=\"task-item-meta\">" +
            "<span>状态：" + task.status + "</span>" +
            "<span>进度：" + task.progress + "%</span>" +
            "<span>更新时间：" + task.updatedAt + "</span>" +
          "</div>" +
        "</div>";
      }).join("");

      document.querySelectorAll(".task-item").forEach((node) => {
        node.addEventListener("click", async () => {
          const taskId = node.getAttribute("data-task-id");
          await viewTaskDetail(taskId);
        });
      });

      log("已加载任务列表", { count: filteredTasks.length, filter: activeTaskFilter });
    }

    async function viewTaskDetail(taskId) {
      const task = await request("/api/tasks/" + encodeURIComponent(taskId));
      renderTaskSummary(task);
      el("taskDetailResult").textContent = JSON.stringify(task, null, 2);
      log("已加载任务详情", { taskId, type: task.type, status: task.status });
    }

    function prefillDemo() {
      el("baseUrl").value = "https://api.openai.com/v1";
      el("chatModel").value = "gpt-4.1-mini";
      el("reasonModel").value = "gpt-4.1";
      el("summaryModel").value = "gpt-4.1-mini";
      el("scanTarget").value = "C:\\Users\\YourName\\Downloads";
      saveScanSettings();
      log("已填充演示配置");
    }

    function resetLlmDefaults() {
      applyDefaultLlmForm();
      log("已恢复 LLM 表单默认值");
    }

    function resetScanDefaults() {
      applyDefaultScanSettings();
      el("scanSettingsState").textContent = "已恢复默认扫描参数并保存到本地。";
      log("已恢复扫描参数默认值");
    }

    async function completeGuide() {
      onboardingState = await request("/api/onboarding/complete", {
        method: "POST",
        body: JSON.stringify({})
      });
      setGuideVisible(false);
      prefillDemo();
      setActivePanel("settings");
      log("首次引导已完成", onboardingState);
    }

    async function dismissGuide() {
      onboardingState = await request("/api/onboarding/dismiss", {
        method: "POST",
        body: JSON.stringify({})
      });
      setGuideVisible(false);
      log("首次引导已关闭", onboardingState);
    }

    async function pollTask(taskId, title, onComplete) {
      const task = await request("/api/tasks/" + encodeURIComponent(taskId));
      setTaskBanner(true, title, (task.message || "任务进行中") + " 当前进度 " + (task.progress || 0) + "%");
      renderTaskMeta(task.details);

      if (task.status === "completed") {
        clearInterval(activeTaskTimer);
        activeTaskTimer = null;
        activeTaskId = null;
        setTaskBanner(false);
        renderTaskMeta(null);
        await loadTasks();
        await onComplete(task.result);
        return;
      }

      if (task.status === "failed") {
        clearInterval(activeTaskTimer);
        activeTaskTimer = null;
        activeTaskId = null;
        setTaskBanner(true, "任务失败", task.error?.message || task.message || "任务执行失败。");
        renderTaskMeta(task.details);
        await loadTasks();
      }
    }

    function trackTask(taskId, title, onComplete) {
      activeTaskId = taskId;

      if (activeTaskTimer) {
        clearInterval(activeTaskTimer);
      }

      setTaskBanner(true, title, "任务已创建，等待执行...");

      pollTask(taskId, title, onComplete).catch((error) => {
        setTaskBanner(true, "任务查询失败", error.message);
      });

      activeTaskTimer = setInterval(() => {
        pollTask(taskId, title, onComplete).catch((error) => {
          setTaskBanner(true, "任务查询失败", error.message);
        });
      }, 1200);
    }

    el("confirmCancel").addEventListener("click", () => {
      if (pendingConfirmResolver) {
        const next = pendingConfirmResolver;
        pendingConfirmResolver = null;
        next(false);
      }
    });

    el("confirmProceed").addEventListener("click", () => {
      const required = el("confirmKeywordWrap").style.display !== "none";
      if (required && el("confirmKeywordInput").value.trim() !== "永久删除") {
        showToast("error", "确认失败", "请输入正确的确认文字后再继续。");
        return;
      }

      if (pendingConfirmResolver) {
        const next = pendingConfirmResolver;
        pendingConfirmResolver = null;
        next(true);
      }
    });

    el("refreshAll").addEventListener("click", async () => {
      await refreshHealth();
      await loadReports();
      await loadQuarantine();
      await loadTasks();
    });

    document.querySelectorAll(".nav-tab").forEach((node) => {
      node.addEventListener("click", () => {
        setActivePanel(node.getAttribute("data-panel-target"));
      });
    });

    document.querySelectorAll(".filter-chip").forEach((node) => {
      if (node.hasAttribute("data-task-filter")) {
        node.addEventListener("click", async () => {
          setTaskFilter(node.getAttribute("data-task-filter"));
          await loadTasks();
        });
      }

      if (node.hasAttribute("data-report-filter")) {
        node.addEventListener("click", async () => {
          setReportFilter(node.getAttribute("data-report-filter"));
          await loadReports();
        });
      }
    });

    el("logSearch").addEventListener("input", renderLogs);
    el("logLevelFilter").addEventListener("change", renderLogs);
    el("logTimeFilter").addEventListener("change", renderLogs);
    el("toggleLogExpand").addEventListener("click", () => {
      logsExpanded = !logsExpanded;
      renderLogs();
    });
    el("exportLogTxt").addEventListener("click", () => exportLogs("txt"));
    el("exportLogJson").addEventListener("click", () => exportLogs("json"));
    el("clearLogs").addEventListener("click", async () => {
      const confirmed = await confirmAction({
        title: "确认清空日志",
        message: "该操作会清空当前界面中的日志记录。",
        impact: "将清空当前加载的所有日志项。",
        allowRemember: false
      });

      if (!confirmed) {
        showToast("warn", "已取消操作", "日志未清空。");
        return;
      }

      clearLogsWithConfirm();
    });

    el("guidePrefill").addEventListener("click", prefillDemo);
    el("guideDismiss").addEventListener("click", dismissGuide);
    el("guideComplete").addEventListener("click", completeGuide);
    el("prefillDemoQuick").addEventListener("click", prefillDemo);
    el("prefillDemoSettings").addEventListener("click", prefillDemo);
    el("guidePrefillInline").addEventListener("click", prefillDemo);
    el("resetLlmDefaults").addEventListener("click", resetLlmDefaults);
    el("resetScanDefaults").addEventListener("click", resetScanDefaults);
    el("browseScanFolder").addEventListener("click", browseScanFolder);
    el("loadReportsQuick").addEventListener("click", loadReports);
    el("loadReportsOps").addEventListener("click", loadReports);
    el("loadQuarantine").addEventListener("click", loadQuarantine);
    el("restoreLatestQuarantine").addEventListener("click", restoreLatestQuarantine);
    el("restoreSelectedQuarantine").addEventListener("click", restoreSelectedQuarantine);
    el("viewLatestReport").addEventListener("click", viewLatestReport);
    el("exportLatestReportJson").addEventListener("click", () => exportCurrentReport("json"));
    el("exportLatestReportMd").addEventListener("click", () => exportCurrentReport("md"));
    el("loadTasksQuick").addEventListener("click", loadTasks);
    el("loadTasksOps").addEventListener("click", loadTasks);
    el("loadLlmConfig").addEventListener("click", loadLlmConfig);
    el("loadRules").addEventListener("click", loadRules);
    el("saveRules").addEventListener("click", saveRules);
    el("loadPreferences").addEventListener("click", loadPreferences);
    el("savePreferences").addEventListener("click", savePreferences);
    el("loadSchedules").addEventListener("click", loadSchedules);
    el("saveSchedule").addEventListener("click", saveSchedule);
    el("loadDesktopSettings").addEventListener("click", loadDesktopSettings);
    el("saveDesktopSettings").addEventListener("click", saveDesktopSettings);
    el("testDesktopNotification").addEventListener("click", testDesktopNotification);
    el("testLlmConfig").addEventListener("click", testLlmConfig);
    el("saveLlmConfig").addEventListener("click", saveLlmConfig);
    el("pauseTask").addEventListener("click", pauseActiveTask);
    el("resumeTask").addEventListener("click", resumeActiveTask);
    el("cancelTask").addEventListener("click", cancelActiveTask);
    el("runScan").addEventListener("click", runScan);
    el("runPlan").addEventListener("click", runPlan);
    el("askAgent").addEventListener("click", askAgent);
    el("dryRunCleanup").addEventListener("click", () => runCleanup(true));
    el("executeCleanup").addEventListener("click", () => runCleanup(false));
    el("dryRunDuplicateCleanup").addEventListener("click", () => runDuplicateCleanup(true));
    el("executeDuplicateCleanup").addEventListener("click", () => runDuplicateCleanup(false));
    el("dryRunHotspotCleanup").addEventListener("click", () => runHotspotCleanup(true));
    el("executeHotspotCleanup").addEventListener("click", () => runHotspotCleanup(false));

    bindScanSettingsPersistence();
    loadScanSettings();
    loadActivePanel();
    loadTaskFilter();
    loadReportFilter();

    refreshHealth().catch((error) => log("刷新健康状态失败", { message: error.message }));
    loadRules().catch((error) => log("加载规则配置失败", { message: error.message }));
    loadPreferences().catch((error) => log("加载用户偏好失败", { message: error.message }));
    loadSchedules().catch((error) => log("加载周期计划失败", { message: error.message }));
    loadDesktopSettings().catch((error) => log("加载桌面设置失败", { message: error.message }));
    loadReports().catch((error) => log("加载报告索引失败", { message: error.message }));
    loadTasks().catch((error) => log("加载任务列表失败", { message: error.message }));
    loadQuarantine().catch((error) => log("加载隔离区失败", { message: error.message }));
    loadOnboarding().catch((error) => log("加载首次引导状态失败", { message: error.message }));
  