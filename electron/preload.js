import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("diskClawDesktop", {
  getWindowState: () => ipcRenderer.invoke("desktop:getWindowState"),
  setWindowState: (payload) => ipcRenderer.invoke("desktop:setWindowState", payload),
  chooseFolder: () => ipcRenderer.invoke("desktop:chooseFolder"),
  notify: (title, body) => ipcRenderer.invoke("desktop:notify", { title, body }),
  openPath: (targetPath) => ipcRenderer.invoke("desktop:openPath", { targetPath }),
  openExternal: (url) => ipcRenderer.invoke("desktop:openExternal", { url }),
  getAppVersion: () => ipcRenderer.invoke("desktop:getAppVersion"),
  checkUpdate: (payload) => ipcRenderer.invoke("desktop:checkUpdate", payload || {})
});
