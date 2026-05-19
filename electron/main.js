import { app, BrowserWindow, Menu, Tray, dialog, nativeImage, Notification, ipcMain, shell } from "electron";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { startDiskClawServer } from "../src/startServer.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const iconPath = path.join(__dirname, "icon.png");
const preloadPath = path.join(__dirname, "preload.js");

let mainWindow = null;
let serverHandle = null;
let tray = null;
let pendingOpenPath = null;
let trayIconBase64 = null;
let trayRefreshTimer = null;
let updateCheckTimer = null;

const protocolScheme = "diskclaw";
const appVersion = app.getVersion();

if (!app.requestSingleInstanceLock()) {
  app.quit();
}

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

async function loadTrayBaseIconBase64() {
  if (!trayIconBase64) {
    trayIconBase64 = (await fs.readFile(iconPath)).toString("base64");
  }

  return trayIconBase64;
}

function getActiveTaskSnapshot() {
  const taskStore = serverHandle?.services?.taskStore;
  const tasks = taskStore?.list?.() || [];
  const activeTask = tasks.find((task) => ["queued", "running", "paused"].includes(task.status)) || null;

  if (!activeTask) {
    return {
      active: false,
      label: "空闲",
      detail: "准备就绪",
      accent: "#10b981",
      symbol: "闲",
      state: "idle"
    };
  }

  const isCleanup = ["cleanup", "duplicate-cleanup", "hotspot-cleanup", "scheduled-cleanup"].includes(activeTask.type);
  const paused = activeTask.status === "paused";

  return {
    active: true,
    taskId: activeTask.taskId,
    type: activeTask.type,
    label: paused ? "已暂停" : isCleanup ? "清理中" : "扫描中",
    detail: `${activeTask.message || activeTask.type} · ${Math.max(0, Math.round(activeTask.progress || 0))}%`,
    accent: paused ? "#f59e0b" : isCleanup ? "#f59e0b" : "#3b82f6",
    symbol: paused ? "停" : isCleanup ? "清" : "扫",
    state: paused ? "paused" : isCleanup ? "cleaning" : "scanning"
  };
}

async function buildTrayIconDataUrl(snapshot) {
  const base64 = await loadTrayBaseIconBase64();
  const badgeColor = snapshot.accent || "#10b981";
  const badgeSymbol = escapeXml(snapshot.symbol || "闲");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <rect width="256" height="256" rx="52" fill="white"/>
      <image href="data:image/png;base64,${base64}" x="20" y="20" width="216" height="216" preserveAspectRatio="xMidYMid meet"/>
      <circle cx="208" cy="48" r="34" fill="${badgeColor}" stroke="white" stroke-width="8"/>
      <text x="208" y="58" text-anchor="middle" font-size="28" font-weight="700" fill="white" font-family="Segoe UI, Arial, sans-serif">${badgeSymbol}</text>
    </svg>
  `;

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

function showMainWindow() {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  }
}

async function checkForUpdates() {
  const preferences = await serverHandle?.services?.preferenceStore?.get?.();
  const manifestUrl = String(preferences?.updateManifestUrl || "").trim();

  if (!manifestUrl) {
    return {
      ok: false,
      reason: "更新地址未配置。",
      updateAvailable: false
    };
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(manifestUrl, {
      headers: {
        Accept: "application/json"
      },
      signal: controller.signal
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return {
        ok: false,
        reason: `更新检查失败：HTTP ${response.status}`,
        updateAvailable: false
      };
    }

    const payload = await response.json();
    const latestVersion = String(payload.version || payload.latestVersion || payload.tag || "").trim();
    const downloadUrl = String(payload.downloadUrl || payload.url || payload.releaseUrl || "").trim();
    const releaseNotes = String(payload.notes || payload.releaseNotes || payload.changelog || "").trim();

    const normalize = (input) => String(input || "0.0.0").replace(/^v/i, "").split(/[^0-9]+/).filter(Boolean).map((part) => Number(part) || 0);
    const compare = (left, right) => {
      const a = normalize(left);
      const b = normalize(right);
      const length = Math.max(a.length, b.length);
      for (let index = 0; index < length; index += 1) {
        const lv = a[index] || 0;
        const rv = b[index] || 0;
        if (lv > rv) return 1;
        if (lv < rv) return -1;
      }
      return 0;
    };

    const updateAvailable = latestVersion ? compare(latestVersion, appVersion) > 0 : false;

    return {
      ok: true,
      updateAvailable,
      currentVersion: appVersion,
      latestVersion,
      downloadUrl,
      releaseNotes,
      manifestUrl
    };
  } catch (error) {
    return {
      ok: false,
      reason: error.message || "更新检查失败。",
      updateAvailable: false
    };
  }
}

async function notifyUpdateResult(result) {
  if (!result?.ok) {
    showDesktopNotification("磁盘清理大虾", result?.reason || "更新检查失败。");
    return;
  }

  if (result.updateAvailable) {
    showDesktopNotification("磁盘清理大虾", `发现新版本 ${result.latestVersion}，请在设置页查看详情。`);
  } else {
    showDesktopNotification("磁盘清理大虾", `当前已是最新版本 ${result.currentVersion}。`);
  }
}

async function openExternalUrl(url) {
  if (!url) {
    return { ok: false };
  }

  await shell.openExternal(url);
  return { ok: true };
}

async function dispatchOpenPath(pathValue) {
  if (!pathValue) {
    return;
  }

  pendingOpenPath = pathValue;

  if (mainWindow) {
    showMainWindow();
    await mainWindow.webContents.executeJavaScript(
      `window.dispatchEvent(new CustomEvent("diskclaw:open-path", { detail: ${JSON.stringify(pathValue)} }))`
    );
    pendingOpenPath = null;
  }
}

async function handleTrayTaskAction(action) {
  const taskStore = serverHandle?.services?.taskStore;
  const tasks = taskStore?.list?.() || [];
  const activeTask = tasks.find((task) => ["queued", "running", "paused"].includes(task.status)) || null;

  if (!activeTask) {
    return;
  }

  if (action === "pause") {
    taskStore.pause(activeTask.taskId);
  } else if (action === "resume") {
    taskStore.resume(activeTask.taskId);
  } else if (action === "cancel") {
    taskStore.cancel(activeTask.taskId);
  }

  await refreshTrayPresentation();
  showMainWindow();
}

function buildTrayContextMenu(snapshot) {
  return Menu.buildFromTemplate([
    {
      label: `状态：${snapshot.label}`,
      enabled: false
    },
    {
      label: snapshot.detail,
      enabled: false
    },
    { type: "separator" },
    {
      label: "打开主窗口",
      click: () => showMainWindow()
    },
    {
      label: snapshot.active
        ? (snapshot.state === "paused" ? "继续当前任务" : "暂停当前任务")
        : "快速扫描",
      click: async () => {
        if (snapshot.active) {
          await handleTrayTaskAction(snapshot.state === "paused" ? "resume" : "pause");
          return;
        }

        showMainWindow();
        const recentTarget = serverHandle?.services?.preferenceStore
          ? (await serverHandle.services.preferenceStore.get())?.defaultScanTarget
          : "";
        if (recentTarget) {
          await dispatchOpenPath(recentTarget);
          return;
        }

        showDesktopNotification("磁盘清理大虾", "请先在设置页选择默认扫描目录。");
      }
    },
    {
      label: snapshot.active ? "取消当前任务" : "选择扫描目录",
      click: async () => {
        if (snapshot.active) {
          await handleTrayTaskAction("cancel");
          return;
        }

        showMainWindow();
        showDesktopNotification("磁盘清理大虾", "请在首页或设置页选择扫描目录后开始扫描。");
      }
    },
    { type: "separator" },
    {
      label: "退出应用",
      click: () => app.quit()
    }
  ]);
}

async function refreshTrayPresentation() {
  if (!tray) {
    return;
  }

  const snapshot = getActiveTaskSnapshot();
  const trayIcon = await buildTrayIconDataUrl(snapshot);
  tray.setImage(nativeImage.createFromDataURL(trayIcon));
  tray.setToolTip(`磁盘清理大虾 · ${snapshot.label}${snapshot.active ? ` · ${snapshot.detail}` : ""}`);
  tray.setContextMenu(buildTrayContextMenu(snapshot));
}

function extractProtocolPath(rawUrl) {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== "diskclaw:") {
      return null;
    }

    return url.searchParams.get("path") || url.pathname.replace(/^\/+/, "") || null;
  } catch {
    return null;
  }
}

function showDesktopNotification(title, body) {
  if (!Notification.isSupported()) {
    return;
  }

  const notification = new Notification({
    title,
    body,
    icon: iconPath
  });

  notification.on("click", () => {
    if (mainWindow) {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  notification.show();
}

function buildAppMenu(windowStateStore) {
  return Menu.buildFromTemplate([
    {
      label: "应用",
      submenu: [
        {
          label: "关于磁盘清理大虾",
          click: async () => {
            await dialog.showMessageBox({
              type: "info",
              title: "关于磁盘清理大虾",
              message: "磁盘清理大虾",
              detail: [
                "版本：0.1.0",
                "团队：DiskClaw Team",
                "桌面端磁盘清理 AI Agent",
                "当前构建包含扫描、方案生成、清理执行、隔离恢复、任务追踪与报告回看能力。",
                "发布阶段：桌面 MVP"
              ].join("\\n")
            });
          }
        },
        { type: "separator" },
        {
          label: "总是置顶",
          type: "checkbox",
          checked: Boolean(mainWindow?.isAlwaysOnTop()),
          click: async (menuItem) => {
            if (mainWindow) {
              mainWindow.setAlwaysOnTop(menuItem.checked);
              await windowStateStore.save({
                ...(await windowStateStore.get()),
                isAlwaysOnTop: menuItem.checked
              });
            }
          }
        },
        { type: "separator" },
        { role: "quit", label: "退出" }
      ]
    },
    {
      label: "窗口",
      submenu: [
        { role: "reload", label: "重新加载" },
        { role: "toggledevtools", label: "开发者工具" },
        { type: "separator" },
        { role: "minimize", label: "最小化" }
      ]
    }
  ]);
}

async function createMainWindow() {
  serverHandle = await startDiskClawServer(
    process.env.PORT ? { port: process.env.PORT } : { port: 0 }
  );

  const { windowStateStore } = serverHandle.services;
  const windowState = await windowStateStore.get();

  app.setLoginItemSettings({
    openAtLogin: Boolean(windowState.openAtLogin)
  });

  Menu.setApplicationMenu(buildAppMenu(windowStateStore));

  if (!tray) {
    tray = new Tray(nativeImage.createFromPath(iconPath));
    tray.setToolTip("磁盘清理大虾");
    tray.on("click", () => {
      showMainWindow();
    });
  }

  mainWindow = new BrowserWindow({
    width: windowState.width || 1440,
    height: windowState.height || 960,
    x: windowState.x,
    y: windowState.y,
    minWidth: 1100,
    minHeight: 720,
    backgroundColor: "#f3efe4",
    title: "磁盘清理大虾",
    icon: iconPath,
    autoHideMenuBar: true,
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      sandbox: false
    }
  });

  mainWindow.setAlwaysOnTop(Boolean(windowState.isAlwaysOnTop));

  await mainWindow.loadURL(`http://localhost:${serverHandle.port}`);

  if (pendingOpenPath) {
    await mainWindow.webContents.executeJavaScript(
      `window.dispatchEvent(new CustomEvent("diskclaw:open-path", { detail: ${JSON.stringify(pendingOpenPath)} }))`
    );
    pendingOpenPath = null;
  }

  mainWindow.on("close", async (event) => {
    const latestState = await windowStateStore.get();

    if (latestState.closeBehavior === "tray") {
      event.preventDefault();
      mainWindow.hide();
      showDesktopNotification("磁盘清理大虾", "应用已最小化到托盘。");
      return;
    }

    if (latestState.closeBehavior === "ask") {
      const result = await dialog.showMessageBox(mainWindow, {
        type: "question",
        title: "关闭应用",
        message: "关闭窗口时，你希望退出应用，还是最小化到托盘？",
        buttons: ["最小化到托盘", "退出应用"],
        cancelId: 0,
        defaultId: 0
      });

      if (result.response === 0) {
        event.preventDefault();
        await windowStateStore.save({
          ...latestState,
          closeBehavior: "tray"
        });
        mainWindow.hide();
        showDesktopNotification("磁盘清理大虾", "应用已最小化到托盘。");
      }
    }
  });

  const persistWindowState = async () => {
    if (!mainWindow || mainWindow.isDestroyed()) {
      return;
    }

    const bounds = mainWindow.getBounds();
    await windowStateStore.save({
      ...bounds,
      isAlwaysOnTop: mainWindow.isAlwaysOnTop(),
      closeBehavior: (await windowStateStore.get()).closeBehavior
    });
  };

  mainWindow.on("resize", persistWindowState);
  mainWindow.on("move", persistWindowState);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  await refreshTrayPresentation();
}

app.whenReady().then(async () => {
  if (process.platform === "win32") {
    app.setAsDefaultProtocolClient(protocolScheme);
  }

  ipcMain.handle("desktop:getWindowState", async () => {
    if (!serverHandle?.services?.windowStateStore) {
      return null;
    }
    return serverHandle.services.windowStateStore.get();
  });

  ipcMain.handle("desktop:setWindowState", async (_event, payload) => {
    if (!serverHandle?.services?.windowStateStore) {
      return null;
    }
    const saved = await serverHandle.services.windowStateStore.save(payload);
    app.setLoginItemSettings({
      openAtLogin: Boolean(saved.openAtLogin)
    });
    return saved;
  });

  ipcMain.handle("desktop:chooseFolder", async () => {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"]
    });
    if (result.canceled || !result.filePaths?.length) {
      return null;
    }
    return result.filePaths[0];
  });

  ipcMain.handle("desktop:notify", async (_event, payload) => {
    showDesktopNotification(payload?.title || "磁盘清理大虾", payload?.body || "");
    return { ok: true };
  });

  ipcMain.handle("desktop:openPath", async (_event, payload) => {
    if (!payload?.targetPath) {
      return { ok: false };
    }
    const result = await shell.openPath(payload.targetPath);
    return {
      ok: !result,
      error: result || ""
    };
  });

  ipcMain.handle("desktop:getAppVersion", async () => ({ version: appVersion }));

  ipcMain.handle("desktop:checkUpdate", async () => {
    const result = await checkForUpdates();
    return result;
  });

  ipcMain.handle("desktop:openExternal", async (_event, payload) => openExternalUrl(payload?.url));

  app.on("open-file", async (_event, filePath) => {
    await dispatchOpenPath(filePath);
  });

  await createMainWindow();

  if (!trayRefreshTimer) {
    trayRefreshTimer = setInterval(() => {
      void refreshTrayPresentation().catch(() => {});
    }, 15000);
    trayRefreshTimer.unref?.();
  }

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createMainWindow();
    }
  });

  app.on("second-instance", async (_event, commandLine) => {
    const protocolUrl = commandLine.find((value) => String(value).startsWith(`${protocolScheme}://`)) || null;
    const filePath = protocolUrl ? extractProtocolPath(protocolUrl) : null;

    if (filePath) {
      await dispatchOpenPath(filePath);
      return;
    }

    showMainWindow();
  });

  if (process.platform === "darwin") {
    app.on("open-url", async (event, url) => {
      event.preventDefault();
      await dispatchOpenPath(extractProtocolPath(url));
    });
  }
});

app.on("window-all-closed", async () => {
  if (serverHandle?.server) {
    await new Promise((resolve) => serverHandle.server.close(() => resolve()));
  }

  if (trayRefreshTimer) {
    clearInterval(trayRefreshTimer);
    trayRefreshTimer = null;
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});
