# Contributing to DiskClaw

感谢你为磁盘清理大虾做贡献。

这份文档的目标是帮你快速理解项目结构，尽量在正确的模块里改代码，避免"功能能跑，但架构越来越乱"。

---

## 项目结构

```text
DiskClaw/
|-- src/                           # 后端核心（零运行时依赖，纯 Node.js）
|   |-- server.js                  # 入口（3 行）
|   |-- startServer.js             # HTTP 启动、数据目录初始化、维护计划同步
|   |-- app.js                     # 依赖注入工厂（手动装配 15 个 Service）
|   |-- routes.js                  # 30+ API 路由（原生 node:http，约 546 行）
|   |-- config/
|   |   `-- defaults.js            # 所有默认配置、路径常量、保护规则、默认偏好
|   |-- services/
|   |   |-- agent/
|   |   |   `-- diskCleanupAgent.js  # 核心编排器：scan → analyze → LLM → execute
|   |   |-- scan/
|   |   |   `-- fileScanner.js       # 递归目录遍历、文件分类、重复/热点检测
|   |   |-- analysis/
|   |   |   |-- scanAnalyzer.js      # 扫描结果分析、分类聚合、推荐生成
|   |   |   `-- riskEngine.js        # 三级风险评估、白名单/系统路径保护
|   |   |-- execution/
|   |   |   `-- cleanupExecutor.js   # 5 种清理模式 + 隔离区管理 + manifest 追踪
|   |   |-- llm/
|   |   |   |-- llmGateway.js        # LLM 网关：chat / reason / summary 三用途
|   |   |   |-- openAiCompatibleClient.js # OpenAI 兼容协议客户端（原生 fetch）
|   |   |   `-- llmConfigStore.js    # LLM 配置读写 + AES-256-GCM 加密存储
|   |   |-- config/
|   |   |   `-- configService.js     # 全量备份 / 恢复 / 出厂重置
|   |   |-- report/
|   |   |   `-- reportStore.js       # 报告存储、索引、详情、导出（JSON/MD）、分析
|   |   |-- tasks/
|   |   |   `-- taskStore.js         # 异步任务队列：pause / resume / cancel + 进度回调
|   |   |-- schedules/
|   |   |   |-- schedulerService.js  # 定时引擎（30 秒轮询）+ 过期清理
|   |   |   |-- scheduleStore.js     # 定时任务 CRUD
|   |   |   `-- systemScheduleSync.js # 系统维护计划同步（基于用户偏好）
|   |   |-- rules/
|   |   |   `-- ruleStore.js         # 扫描规则（排除路径 / 白名单 / 黑名单）
|   |   |-- preferences/
|   |   |   `-- preferenceStore.js   # 用户偏好持久化
|   |   |-- onboarding/
|   |   |   `-- onboardingStore.js   # 首次引导状态
|   |   |-- update/
|   |   |   `-- updateService.js     # 版本比较 + 更新检查
|   |   `-- window/
|   |       `-- windowStateStore.js  # 窗口位置/大小持久化
|   |-- ui/
|   |   `-- dashboard.js             # 单文件 SPA 仪表盘（~5,200 行，Vanilla JS）
|   `-- utils/
|       |-- crypto.js                # AES-256-GCM 加密（API Key 保护）
|       |-- fs.js                    # 文件系统辅助（ensureDirectory 等）
|       |-- http.js                  # HTTP 响应/请求工具函数
|       `-- validation.js            # 所有 API 请求体校验
|-- electron/
|   |-- main.js                      # Electron 主进程（单实例锁、托盘、通知、IPC、协议）
|   |-- preload.js                   # contextBridge 安全桥接（8 个 API）
|   |-- icon.png / icon.ico          # 应用图标
|   `-- installer.nsh                # NSIS 安装器自定义脚本
|-- scripts/
|   |-- run-tests.js                 # 测试套件（~50+ 用例，node:assert/strict）
|   |-- create-demo-data.js          # 演示数据生成
|   |-- smoke-demo-flow.js           # 烟雾测试（e2e）
|   |-- smoke-desktop-app.js         # 桌面端烟雾测试
|   `-- verify-release.js            # 发布产物校验
|-- docs/                            # 23 个文档（需求/验收/发布/文案/排期）
|-- demo/demo-data/                  # 演示用模拟文件
|-- dist/                            # electron-builder 打包输出
|-- release/                         # 发布包
|-- config.example.json              # LLM 配置示例
|-- package.json                     # 项目元数据 + npm scripts
|-- electron-builder.yml             # Electron 打包配置
|-- README.md                        # 项目说明
`-- CONTRIBUTING.md                  # 本文件
```

---

## 如何快速定位代码

### 1. 修改后端服务逻辑时，优先看 `src/services/`

DiskClaw 后端采用 **分层 Service + Agent 编排**架构。每个 Service 职责单一、通过 `app.js` 手动注入依赖。

**关键原则**：不要在 `routes.js` 里写业务逻辑。路由层只做三件事：解析请求 → 校验输入 → 调用 Service/Agent → 返回 JSON。

| 你想改什么 | 去哪个文件 |
|-----------|-----------|
| 文件扫描行为（深度、分类、重复判定） | `src/services/scan/fileScanner.js` |
| 风险评级逻辑（白名单、阈值） | `src/services/analysis/riskEngine.js` |
| 分析结果聚合与推荐 | `src/services/analysis/scanAnalyzer.js` |
| 清理执行方式（新增/修改清理模式） | `src/services/execution/cleanupExecutor.js` |
| LLM 调用、降级策略 | `src/services/llm/llmGateway.js` + `openAiCompatibleClient.js` |
| LLM 配置存储与加密 | `src/services/llm/llmConfigStore.js` + `src/utils/crypto.js` |
| 报告格式、导出逻辑 | `src/services/report/reportStore.js` |
| 任务队列行为 | `src/services/tasks/taskStore.js` |
| 定时任务逻辑 | `src/services/schedules/schedulerService.js` |

### 2. 修改编排流程时，看 `src/services/agent/diskCleanupAgent.js`

`DiskCleanupAgent` 是核心编排器，协调 scan → analyze → LLM → execute 全流程。它本身不包含具体实现，而是组装各 Service 的调用顺序。

适用场景：
- 调整扫描→分析→规划→执行的主流程
- 修改 LLM prompt 构建逻辑（`buildPlanningMessages`、`buildAskMessages`）
- 修改 LLM 响应解析（`safeParseJson`、`extractJsonBlock`）
- 修改扫描/规划/清理的执行进度回调

### 3. 新增或修改 API 时，看 `src/routes.js` + `src/utils/validation.js`

所有 30+ API 端点集中在 `routes.js` 一个文件（约 546 行），按功能分组排列。新增端点时需要：

1. 在 `routes.js` 里添加新的 `if (key === "...")` 分支
2. 如果需要请求体校验，在 `src/utils/validation.js` 里添加对应的 validate 函数
3. 业务逻辑不要写在路由里，调用 `services.agent.xxx()` 或对应的 Service

### 4. 修改默认配置时，看 `src/config/defaults.js`

这里定义了所有默认值：
- `appPaths` — 数据目录路径（`.diskclaw/`、`reports/`、`quarantine/` 等）
- `defaultScanOptions` — 扫描参数（深度、文件数、文件大小阈值等）
- `defaultLlmConfig` — LLM 默认配置
- `defaultRulesConfig` — 扫描规则默认值
- `defaultPreferences` — 用户偏好默认值
- `protectedPathPatterns` — 系统受保护路径正则

### 5. 修改依赖注入关系时，看 `src/app.js`

`createDiskClawApp()` 是整个后端的**装配中心**。所有 Service 实例在这里创建并注入依赖。新增 Service 时需要：
1. 在 `app.js` 顶部 `import`
2. 在 `createDiskClawApp()` 里 `new` 并注入依赖
3. 在 `return` 对象里暴露（如果需要被路由或 Electron 主进程使用）

### 6. 修改 Electron 桌面行为时，看 `electron/`

| 你想改什么 | 去哪个文件 |
|-----------|-----------|
| 窗口大小、标题、菜单 | `electron/main.js` — `createMainWindow()` |
| 系统托盘图标、菜单、通知 | `electron/main.js` — `createTray()` / `buildTrayIconDataUrl()` |
| 右键菜单、`diskclaw://` 协议 | `electron/main.js` — `app.setAsDefaultProtocolClient()` |
| 渲染进程与主进程通信 | `electron/preload.js` — `contextBridge` API |
| 安装器行为（NSIS） | `electron/installer.nsh` + `electron-builder.yml` |
| 应用打包配置 | `electron-builder.yml` |

### 7. 修改前端仪表盘时，看 `src/ui/dashboard.js`

仪表盘是一个**单文件 SPA**（~5,200 行），纯 HTML + CSS + Vanilla JavaScript。它通过 `renderDashboardHtml()` 函数输出完整 HTML 字符串。

当前 v0.1.0 的仪表盘是开发者工具风格，信息密度高。v2.0 计划改为侧边栏导航 + 简约 ToC 风格。

> ⚠️ 这是整个项目最大的单文件。如果重构 UI，建议按页面/视图拆分为多个模块。

### 8. 修改启动流程时，看 `src/server.js` + `src/startServer.js`

- `server.js`：入口，3 行，调用 `startDiskClawServer()`
- `startServer.js`：创建 HTTP 服务、初始化数据目录、启动定时器、监听 `close` 事件停止调度器
- 端口默认 `3100`，可通过 `PORT` 环境变量或 `options.port` 覆盖

### 9. 修改打包 / 发布流程时，看 `scripts/` + `electron-builder.yml`

| 你想做什么 | 去哪里 |
|-----------|--------|
| 本地测试打包 | `npm run pack` → 输出 `dist/win-unpacked/` |
| 生成安装包 | `npm run dist:win` → 输出 `dist/DiskClaw-Setup-0.1.0.exe` |
| 发布前验证 | `npm run verify:release` 或 `node scripts/verify-release.js` |
| 生成演示数据 | `npm run demo:prepare` 或 `node scripts/create-demo-data.js` |
| 烟雾测试 | `npm run smoke:e2e` / `npm run smoke:desktop` |
| 运行测试 | `npm test` 或 `node scripts/run-tests.js` |

---

## 架构原则

改代码时请尽量遵循以下原则：

1. **路由不写业务逻辑** — `routes.js` 只做：解析请求 → 校验输入 → 调用 Agent/Service → 返回 JSON
2. **Service 职责单一** — 每个 Service 模块只做一件事，不要往一个文件里堆多个不相关的功能
3. **Agent 是编排层** — `DiskCleanupAgent` 不包含具体实现，只组装调用顺序
4. **通过 `app.js` 注入依赖** — 不要在 Service 内部用全局变量或直接 import 其他 Service
5. **前端用原生 JS** — 不引入 React/Vue 等框架，保持零依赖
6. **LLM 是可选增强** — 所有功能在 LLM 不可用时必须能降级为纯本地模式运行
7. **默认走隔离区** — 清理操作默认使用 `quarantine` 模式，不要默认永久删除

---

## 提交 PR 前建议确认

至少检查：

1. `npm test` 测试通过
2. 新接口有对应的输入校验（`src/utils/validation.js`）
3. 业务逻辑在正确的 Service 模块里，不在 `routes.js` 里
4. 如果新增 Service，`src/app.js` 的 DI 装配已更新
5. 如果改了 API，README.md 的相关表格已同步
6. 如果改了 Electron 行为，同时检查 `preload.js` 的安全暴露是否合理
7. LLM 不可用时的降级路径仍然有效

---

## 开发者快速上手

```bash
# 1. 克隆 + 安装
git clone https://github.com/Unclecheng-li/DiskClaw.git
cd DiskClaw
npm install

# 2. 启动开发服务（浏览器访问 http://localhost:3100）
npm run dev                # 带 --watch 热重载

# 3. 运行测试
npm test

# 4. 启动桌面客户端
npm run electron

# 5. 打包验证
npm run pack               # 解包目录
npm run dist:win           # 安装包
```
