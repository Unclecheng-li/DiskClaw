<div align="center">

# 磁盘清理大虾

> *安全、智能、说人话的磁盘清理 AI Agent。*

[![Electron](https://img.shields.io/badge/Electron-37.x-blue)](https://www.electronjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-ES_Modules-green)](https://nodejs.org/)
[![Platform](https://img.shields.io/badge/Platform-Windows_10%2B-lightgrey)](https://www.microsoft.com/windows)
[![API](https://img.shields.io/badge/API-OpenAI_Compatible-orange)](https://platform.openai.com/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![MVP](https://img.shields.io/badge/Stage-MVP-brightgreen)]()

<br>

**不是清理脚本，是可运行的桌面 AI 清理 Agent。**

本地扫描 → 风险分级 → LLM 智能规划 → 隔离区执行，
帮助用户安全地发现空间问题、理解清理建议，逐步完成磁盘治理。

[快速开始](#快速开始) · [能力速览](#它能做什么) · [架构设计](#-架构) · [API 参考](#-api-参考) · [版本路线](#️-版本路线)

</div>

<img width="200" height="129" alt="DisClaw logo" src="https://github.com/user-attachments/assets/59956242-a60e-4cac-aded-b0fb68d215b8" />

---

## 它能做什么

打开软件，一键扫描，DiskClaw 自动完成整个分析链路：

```
用户操作：选择目录 → 点击「一键扫描」

DiskClaw 自动执行：
  扫描阶段:  递归遍历目录，按类型分类（缓存/临时/日志/安装包/大文件/陈旧文件）
  分析阶段:  识别重复文件、热点目录，白名单保护系统路径，三级风险评估
  LLM 规划:   将分析结果发给 AI，生成用户能看懂的清理建议和优先级
  清理执行:  隔离区（默认）、归档、回收站、永久删除、DryRun — 五种模式可选
```
<img width="1444" height="885" alt="DiskClaw" src="https://github.com/user-attachments/assets/4ccef4f4-b06a-4f00-b620-4ec7684ec487" />
适用于普通用户的日常磁盘清理、开发者工作目录治理、企业 IT 磁盘健康巡检等场景。

---

## 特性

- **AI 智能规划** — 接入第三方 LLM（OpenAI 兼容 API），自动生成清理方案和用户友好说明；LLM 不可用时自动降级为纯本地分析
- **安全优先** — 默认隔离区模式，文件先移入 `.diskclaw/quarantine/` 而非直接删除；系统关键路径白名单保护
- **五种清理模式** — 隔离区 / 归档 / 回收站 / 永久删除 / DryRun，按需选择
- **三级风险评估** — low（可清理）/ medium（需确认）/ high（需人工审查），高风险项跳过
- **重复文件识别** — 基于文件哈希比对，自动建议保留策略
- **热点目录识别** — 找出占用空间最大的目录，优先治理
- **零运行时依赖** — 纯 Node.js 原生实现，HTTP 服务用 `node:http`，无需 Express/Koa 等第三方框架
- **AES-256-GCM 加密** — API Key 本地加密存储，消息中脱敏显示
- **Electron 桌面壳** — 系统托盘（动态状态图标）、Windows 通知、`diskclaw://` 自定义协议
- **任务队列** — 异步任务支持暂停/恢复/取消，实时进度反馈
- **定时任务** — 支持每日/每周/每月自动扫描和清理
- **完整报告系统** — 自动保存所有操作报告，支持 JSON/Markdown 导出，7 天/30 天统计分析
- **配置管理** — 全量备份/恢复/出厂重置，所有状态 JSON 文件化

---

## 快速开始

### 环境要求

- **Node.js** ≥ 18.x（ES Modules）
- **Windows 10/11**（当前优先支持）
- 可选：OpenAI 兼容 API Key（不配置也能离线使用）

### 安装与启动

```bash
# 1. 克隆仓库
git clone https://github.com/Unclecheng-li/DiskClaw.git
cd DiskClaw

# 2. 安装依赖（仅 electron + electron-builder）
npm install

# 3. 本地服务模式 — 浏览器访问 http://localhost:3100
npm start

# 4. 桌面客户端模式 — Electron 窗口运行
npm run electron
```

### 配置 LLM（可选）

在项目根目录创建 `config.json`，参考 `config.example.json`：

```json
{
  "llm": {
    "enabled": true,
    "provider": "openai-compatible",
    "baseUrl": "https://api.openai.com/v1",
    "apiKey": "sk-your-api-key",
    "models": {
      "chat": "gpt-4.1-mini",
      "reason": "gpt-4.1",
      "summary": "gpt-4.1-mini"
    }
  },
  "scan": {
    "maxDepth": 5,
    "maxFiles": 3000,
    "largeFileThresholdBytes": 536870912,
    "staleDays": 90
  }
}
```

> 💡 不配置 LLM 也能完整使用扫描、分析和清理功能，只是跳过 AI 规划环节。

---

## 使用方式

### 方式一：桌面客户端（推荐）

```bash
npm run electron
```

启动后出现 Windows 原生窗口，底部系统托盘显示动态状态图标：

| 托盘图标 | 状态 | 说明 |
|:---:|------|------|
| 闲 | 空闲 | 准备就绪，等待操作 |
| 扫 | 扫描中 | 正在遍历文件系统 |
| 清 | 清理中 | 正在执行清理动作 |
| 停 | 已暂停 | 任务已暂停，可恢复 |

托盘右键菜单支持：显示主窗口、开始扫描、暂停/恢复任务、退出。

### 方式二：浏览器 Web 界面

```bash
npm start
```

浏览器打开 `http://localhost:3100`，即可使用完整功能的仪表盘界面。

---

## 架构

```
┌──────────────────────────────────────────────┐
│              Electron 桌面壳                  │
│  单实例锁 | 系统托盘 | 通知 | diskclaw://协议  │
├──────────────────────────────────────────────┤
│         Node HTTP Server (port 3100)          │
│              30+ REST API 端点                │
├──────────────────────────────────────────────┤
│          DiskCleanupAgent (编排层)            │
│        scan → analyze → LLM → execute         │
├──────────────────────────────────────────────┤
│             15 个独立 Service 模块             │
│  FileScanner / ScanAnalyzer / RiskEngine      │
│  CleanupExecutor / LlmGateway / Scheduler     │
│  ReportStore / TaskStore / ConfigService ...  │
├──────────────────────────────────────────────┤
│  Utils (crypto / fs / http / validation)      │
│  存储层: .diskclaw/ 目录 (JSON 文件持久化)     │
└──────────────────────────────────────────────┘
```

### 核心模块

| 模块 | 文件 | 说明 |
|------|------|------|
| **入口** | `src/server.js` | Node.js 服务入口，3 行 |
| **启动器** | `src/startServer.js` | HTTP 服务启动、数据目录初始化、维护计划同步 |
| **DI 工厂** | `src/app.js` | 手动依赖注入，创建所有服务实例并装配 |
| **路由** | `src/routes.js` | 30+ API 端点，纯 `node:http` 实现 |
| **编排器** | `src/services/agent/diskCleanupAgent.js` | 核心控制器，协调扫描→分析→LLM→执行全流程 |
| **文件扫描** | `src/services/scan/fileScanner.js` | 递归目录遍历，文件分类，重复/热点检测 |
| **风险分析** | `src/services/analysis/scanAnalyzer.js` + `riskEngine.js` | 白名单保护 + 三级风险评估 + 分类聚合 |
| **清理执行** | `src/services/execution/cleanupExecutor.js` | 5 种清理模式 + 隔离区管理 + manifest 追踪 |
| **LLM 网关** | `src/services/llm/llmGateway.js` + `openAiCompatibleClient.js` | OpenAI 兼容协议客户端，三种用途模型（chat/reason/summary） |
| **配置管理** | `src/services/config/configService.js` | 全量备份/恢复/重置 |
| **报告系统** | `src/services/report/reportStore.js` | 存储/索引/详情/导出/7天&30天分析 |
| **任务队列** | `src/services/tasks/taskStore.js` | pause/resume/cancel + 进度回调 |
| **定时引擎** | `src/services/schedules/schedulerService.js` | 30 秒轮询 + 过期清理 + 系统维护计划 |
| **加密工具** | `src/utils/crypto.js` | AES-256-GCM API Key 加密 |
| **Electron 主进程** | `electron/main.js` | 窗口管理、托盘（动态 SVG 图标合成）、通知、IPC、协议注册 |
| **安全桥接** | `electron/preload.js` | contextBridge 暴露 8 个安全 API |
| **仪表盘 UI** | `src/ui/dashboard.js` | 单文件 SPA（~5,200 行），零框架 Vanilla JS |

---

## API 参考

所有接口均返回 JSON。异步任务接口返回 `202` + 任务对象，同步接口返回 `200`。

### 系统与配置

| 方法 | 端点 | 说明 |
|------|------|------|
| `GET` | `/api/health` | 健康检查（含 LLM 连接状态） |
| `GET` | `/api/config/llm` | 查看 LLM 配置（脱敏） |
| `POST` | `/api/config/llm` | 更新 LLM 配置 |
| `POST` | `/api/config/llm/test` | 测试 LLM 连接 |
| `GET` | `/api/config/backup` | 全量配置备份 |
| `POST` | `/api/config/restore` | 从备份恢复 |
| `POST` | `/api/config/reset-all` | 恢复出厂设置 |
| `GET` | `/api/rules` | 查看扫描规则 |
| `POST` | `/api/rules` | 更新扫描规则 |
| `GET` | `/api/preferences` | 查看用户偏好 |
| `POST` | `/api/preferences` | 更新用户偏好 |
| `GET` | `/api/onboarding` | 查看引导状态 |
| `POST` | `/api/onboarding/complete` | 完成引导 |
| `POST` | `/api/onboarding/dismiss` | 跳过引导 |

### 扫描与分析

| 方法 | 端点 | 说明 |
|------|------|------|
| `POST` | `/api/scan` | 同步扫描 |
| `POST` | `/api/tasks/scan` | 异步扫描（返回任务，含进度） |
| `POST` | `/api/agent/plan` | 同步：扫描 + 分析 + LLM 规划 |
| `POST` | `/api/tasks/agent/plan` | 异步：扫描 + 分析 + LLM 规划 |
| `POST` | `/api/agent/ask` | AI 问答（关于清理建议等） |

### 清理执行

| 方法 | 端点 | 说明 |
|------|------|------|
| `POST` | `/api/cleanup/execute` | 同步清理 |
| `POST` | `/api/tasks/cleanup/execute` | 异步清理 |
| `POST` | `/api/cleanup/duplicates/execute` | 重复文件清理 |
| `POST` | `/api/cleanup/hotspots/execute` | 热点目录清理 |
| `GET` | `/api/quarantine` | 查看隔离区 |
| `POST` | `/api/quarantine/restore` | 恢复隔离文件 |
| `POST` | `/api/quarantine/delete` | 删除隔离文件 |
| `POST` | `/api/quarantine/clear` | 清空隔离区 |

### 任务与报告

| 方法 | 端点 | 说明 |
|------|------|------|
| `GET` | `/api/tasks` | 任务列表 |
| `GET` | `/api/tasks/:id` | 任务详情 |
| `POST` | `/api/tasks/:id/pause` | 暂停任务 |
| `POST` | `/api/tasks/:id/resume` | 恢复任务 |
| `POST` | `/api/tasks/:id/cancel` | 取消任务 |
| `GET` | `/api/reports` | 报告索引 |
| `DELETE` | `/api/reports` | 批量删除报告 |
| `GET` | `/api/reports/analytics` | 7 天 / 30 天统计分析 |
| `GET` | `/api/reports/:id` | 报告详情 |
| `POST` | `/api/reports/:id/export` | 导出报告（JSON / Markdown） |

### 定时任务

| 方法 | 端点 | 说明 |
|------|------|------|
| `GET` | `/api/schedules` | 定时任务列表 |
| `POST` | `/api/schedules` | 创建定时任务 |
| `DELETE` | `/api/schedules/:id` | 删除定时任务 |
| `POST` | `/api/schedules/:id/run` | 立即执行 |

---

## 清理模式

| 模式 | 说明 | 默认 |
|------|------|:---:|
| `quarantine` | 移到 `.diskclaw/quarantine/` 隔离区，可恢复 | ✅ |
| `archive` | 移到归档目录，保留以备查 | |
| `recycle-bin` | 通过 PowerShell 移到系统回收站 | |
| `permanent` | 直接 `fs.unlink` 永久删除 | |
| `dryRun` | 仅模拟，不实际操作，用于预览 | |

> ⚠️ `permanent` 模式不可逆，需显式确认。高风险文件（系统路径、用户桌面/文档等）在任何模式下都会被跳过。

---

## 配置项

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `llm.enabled` | `false` | 是否启用 LLM |
| `llm.provider` | `openai-compatible` | LLM 提供商 |
| `llm.models.chat` | `""` | 问答模型 |
| `llm.models.reason` | `""` | 规划模型 |
| `llm.models.summary` | `""` | 摘要模型 |
| `scan.maxDepth` | `5` | 扫描最大目录深度 |
| `scan.maxFiles` | `3000` | 扫描最大文件数 |
| `scan.largeFileThresholdBytes` | `536870912` | 大文件阈值（512MB） |
| `scan.staleDays` | `90` | 陈旧文件判定天数 |

---

## 打包发布

```bash
# 生成解包目录（调试用）
npm run pack
# 输出: dist/win-unpacked/

# 生成 Windows 安装包
npm run dist:win
# 输出: dist/DiskClaw-Setup-0.1.0.exe
```

安装包包含：
- NSIS 安装向导（自定义安装路径）
- 桌面快捷方式 + 开始菜单
- `diskclaw://` 自定义协议注册
- 右键菜单「用磁盘清理大虾扫描」

---

## 项目统计

| 指标 | 数值 |
|------|------|
| 源文件 | ~25 个 (.js) |
| 后端代码 | ~8,500 行 |
| 前端 UI | ~5,200 行（单文件 SPA） |
| API 端点 | 30 个 |
| Service 模块 | 15 个 |
| 清理模式 | 5 种 |
| 文件分类 | 8 类 |
| 风险等级 | 3 级 |
| 运行时依赖 | 0 个 |
| 开发依赖 | 2 个（electron + electron-builder） |
| 测试用例 | ~50+ 个 |

---

## 版本路线

| 版本 | 目标 | 状态 |
|------|------|:---:|
| v0.1.0 | 桌面 MVP：扫描/分析/LLM/清理/隔离区/报告/Electron 壳 | ✅ 已完成 |
| v1.0 | 核心稳定性打磨、错误处理完善、跨平台适配 | 📋 |
| v2.0 | ToC 简约风 UI 重构：侧边栏导航 + 一键扫描/清理 + 现代设计 | 📋 设计中 |

---

## 隐私与安全

- **本地优先**：所有文件扫描和清理操作在本地完成，不上传任何文件内容到云端
- **加密存储**：LLM API Key 使用 AES-256-GCM 加密后存储于 `.diskclaw/master.key`
- **隔离区设计**：默认不删除文件，先进入隔离区，30 天自动清理
- **LLM 可选**：AI 功能完全可选，不配置 API Key 仍可使用完整的扫描和清理功能

---

## 许可证

[MIT License](LICENSE)

---

<div align="center">

> 🦐 **磁盘清理大虾** — 清理磁盘，AI 帮你拿主意。

</div>
