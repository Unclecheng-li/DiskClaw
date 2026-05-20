# DiskClaw LLM 深度参与清理决策更新开发文档

## 1. 背景

当前 DiskClaw 的主流程是：

```text
本地扫描 -> 本地规则分类 -> 本地风险分析 -> LLM 生成说明 -> 用户确认 -> 隔离区清理
```

在这个流程里，LLM 主要承担“解释扫描结果”和“生成清理建议文案”的角色，不直接参与候选文件判断。也就是说，哪些文件进入清理候选，主要由 `FileScanner`、`ScanAnalyzer`、`RiskEngine` 三个本地模块决定。

用户提出的新方向是：扫描完成后，让 LLM 更深度参与判断哪些文件可以删、哪些文件不能删，尤其处理用户自己也不确定的大文件、旧文件、安装包、压缩包、重复文件和低频使用文件。

这个方向是可行的，而且非常适合 DiskClaw 的产品定位。但实现时必须坚持一个原则：

> LLM 参与判断和解释，但不能绕过本地安全策略，也不能直接获得删除权。

## 2. 产品判断

这个思路值得做，因为它解决的是磁盘清理里最真实的用户焦虑：

- 文件很大，但不知道是什么。
- 文件看起来能删，但担心删错。
- 文件很久没用，但不确定是否仍被某个软件依赖。
- 重复文件很多，但不知道保留哪一个。
- 安装包、压缩包、导出文件、缓存目录混在一起，用户很难快速判断。

传统清理工具通常只按扩展名、路径和时间判断，这很机械。LLM 的价值在于把这些元信息组合起来，给出更像人的判断：

- 这个文件可能是什么用途。
- 为什么建议清理或保留。
- 删除前需要用户确认什么。
- 哪些文件适合隔离，哪些只适合人工复核。

因此，升级目标不是让 LLM “替用户删除”，而是让它成为一个更聪明、更保守的清理审查员。

## 3. 更新目标

### 3.1 核心目标

将 DiskClaw 的规划流程升级为：

```text
本地扫描
  -> 本地基础分类
  -> 本地风险边界
  -> LLM 深度审查
  -> 本地安全合并
  -> 用户可理解的清理计划
  -> 用户确认
  -> 隔离区执行
```

### 3.2 用户体验目标

扫描完成后，用户看到的不只是“可清理空间 xxx MB”，而是一个更可信的判断结果：

- 可以放心清理：低风险缓存、临时文件、日志等。
- 建议隔离后观察：大文件、安装包、旧压缩包、可疑重复文件等。
- 不建议自动清理：系统路径、文档桌面、工程源码、数据库、虚拟机镜像、证书、钱包、密钥、配置目录等。
- 需要用户确认：LLM 不能判断用途，但能提示用户重点看什么。

### 3.3 技术目标

- LLM 输入只传文件元数据，不上传文件内容。
- LLM 输出必须是严格 JSON。
- 本地安全规则拥有最终否决权。
- 所有 LLM 判断都要保存到报告，便于追溯。
- 没有配置 LLM 时，系统继续使用现有本地规则流程。

## 4. 新流程设计

### 4.1 阶段一：本地扫描

继续由 `src/services/scan/fileScanner.js` 负责遍历目录。

扫描结果需要保留或增强以下元数据：

- `path`
- `name`
- `extension`
- `directory`
- `sizeBytes`
- `modifiedAt`
- `accessedAt`
- `categories`
- `reasons`
- `duplicateKey`
- `policy.whitelisted`
- `policy.blacklisted`

建议新增可选元数据：

- `parentDirectoryName`
- `pathDepth`
- `ageDays`
- `lastAccessDays`
- `isInCommonUserDirectory`
- `isInDevelopmentDirectory`
- `isLikelyProjectArtifact`
- `isLikelyMediaFile`
- `isLikelyArchiveOrInstaller`

注意：默认不读取文件内容，不上传文件内容，不解析私密文件。

### 4.2 阶段二：本地基础风险边界

继续由 `src/services/analysis/riskEngine.js` 负责不可突破的安全边界。

这些规则必须优先于 LLM：

- 系统路径永远不能自动清理。
- 白名单路径永远不能自动清理。
- 桌面、文档等用户关键区域默认高风险。
- 高风险项目必须人工确认。
- LLM 不能把本地判定为 `deletionAllowed: false` 的文件改成可自动清理。

### 4.3 阶段三：候选项分批

LLM 不应该分析全量文件列表，而应该分析“值得判断的候选项”。否则 token 成本高，响应慢，而且容易污染判断。

建议进入 LLM 深度审查的候选项：

- 本地已识别为清理候选的文件。
- 大文件。
- 久未访问文件。
- 安装包、压缩包、镜像文件。
- 重复文件组。
- 热点目录中的大文件。
- 用户黑名单命中的文件。
- 本地风险为 `medium` 的文件。

建议不发送给 LLM 的项目：

- 明确低风险的小型缓存。
- 明确受保护的系统路径。
- 太小且影响不大的文件。
- 文件内容本身。

分批策略：

- 每批 20 到 50 个文件。
- 大型扫描最多审查前 200 个高价值候选。
- 按 `sizeBytes`、`risk.level`、`categories`、`directoryHotspots` 排序优先。

### 4.4 阶段四：LLM 深度审查

新增模块建议：

```text
src/services/analysis/llmCleanupReviewer.js
```

职责：

- 接收本地分析结果。
- 构造安全的 LLM 输入。
- 分批调用 LLM。
- 校验 LLM 输出。
- 将 LLM 判断合并回候选项。

LLM 输出字段建议：

```json
{
  "items": [
    {
      "id": "file-id",
      "path": "C:\\Users\\User\\Downloads\\example.iso",
      "verdict": "quarantine",
      "confidence": 0.72,
      "riskLevel": "medium",
      "reason": "看起来是旧安装镜像，体积较大，通常可在确认不再需要后隔离。",
      "userCheck": "确认是否还需要用它安装或恢复某个软件。",
      "recommendedAction": "quarantine",
      "autoCleanAllowed": false
    }
  ],
  "summary": "本批次主要包含旧安装包和大文件，建议优先隔离而不是永久删除。",
  "cautions": [
    "不要自动清理项目源码、数据库、虚拟机镜像和证书相关文件。"
  ]
}
```

字段约束：

- `verdict`: `safe-clean`、`quarantine`、`manual-review`、`keep`
- `confidence`: 0 到 1
- `riskLevel`: `low`、`medium`、`high`
- `recommendedAction`: `delete`、`quarantine`、`manual-review`、`keep`
- `autoCleanAllowed`: 布尔值

### 4.5 阶段五：本地安全合并

新增合并规则：

```text
LocalRisk + LlmReview -> FinalCleanupDecision
```

合并原则：

- 本地高风险，最终必须是 `manual-review` 或 `keep`。
- LLM 判断为 `keep`，最终不能自动清理。
- LLM 判断为 `manual-review`，最终不能自动清理。
- 本地低风险且 LLM 认为 `safe-clean`，可进入一键清理。
- 本地中风险且 LLM 认为 `quarantine`，只允许进入隔离区清理。
- 本地与 LLM 分歧时，选择更保守的动作。
- 永久删除不能由 LLM 自动触发。

推荐决策矩阵：

| 本地风险 | LLM 判断 | 最终动作 |
|---|---|---|
| low | safe-clean | quarantine 或 delete，默认 quarantine |
| low | quarantine | quarantine |
| low | manual-review | manual-review |
| low | keep | keep |
| medium | safe-clean | quarantine |
| medium | quarantine | quarantine |
| medium | manual-review | manual-review |
| medium | keep | keep |
| high | 任意 | manual-review 或 keep |

## 5. 后端改造方案

### 5.1 新增 LLM 审查服务

新增文件：

```text
src/services/analysis/llmCleanupReviewer.js
```

建议 API：

```js
export class LlmCleanupReviewer {
  constructor({ llmGateway }) {}

  async review({ scanResult, analysis, options = {}, runtime = {} }) {
    return {
      ok: true,
      degraded: false,
      reviewedAt: new Date().toISOString(),
      batches: [],
      itemReviews: [],
      summary: "",
      cautions: []
    };
  }
}
```

失败降级：

- LLM 未配置：返回 `degraded: true`，继续使用本地分析。
- LLM 超时：返回局部结果或本地结果。
- JSON 解析失败：记录错误，继续本地结果。
- 输出字段非法：丢弃该条 LLM 判断。

### 5.2 改造 DiskCleanupAgent.plan()

当前流程：

```text
scanner.scan -> analyzer.analyze -> llmGateway.chat -> reportStore.save
```

升级后：

```text
scanner.scan
  -> analyzer.analyze
  -> llmCleanupReviewer.review
  -> mergeCleanupDecisions
  -> reportStore.save
```

建议 `plan` 返回结构新增：

```json
{
  "type": "plan",
  "scanResult": {},
  "analysis": {},
  "llmReview": {
    "ok": true,
    "degraded": false,
    "itemReviews": []
  },
  "decision": {
    "recommendedItems": [],
    "manualReviewItems": [],
    "keepItems": [],
    "safeCleanupBytes": 0,
    "quarantineBytes": 0
  }
}
```

### 5.3 改造一键清理取数逻辑

当前首页一键清理使用 `getOneClickCleanupItems(appState.home.plan)`。

升级后应优先使用：

```text
plan.decision.recommendedItems
```

并且只允许包含：

- `finalAction: quarantine`
- `finalAction: delete` 但默认仍转成 `quarantine`
- `autoCleanAllowed: true`
- 本地未标记高风险

### 5.4 报告系统改造

报告中新增：

- LLM 是否参与审查。
- 审查模型。
- 审查时间。
- 每个文件的 LLM 判断。
- 本地判断与 LLM 判断是否有分歧。
- 最终动作为什么更保守。

这样用户以后发现“这个文件为什么没清理”或“为什么建议隔离”，可以在报告里看到原因。

## 6. 前端改造方案

### 6.1 首页扫描结果页

当前结果页主要显示可清理空间和分类。

建议升级为四个分区：

- `建议一键清理`：低风险且本地与 LLM 都认为可清理。
- `建议隔离观察`：大文件、旧安装包、旧压缩包、重复文件等。
- `需要确认`：LLM 不确定或本地中高风险。
- `建议保留`：可能是项目、文档、配置、数据库、虚拟机、证书等。

### 6.2 文件详情说明

每个候选文件增加一句“为什么这样建议”：

```text
可能是旧安装包，位于 Downloads，超过 1 年未访问。建议先隔离，不建议永久删除。
```

同时显示：

- 本地分类原因。
- LLM 判断原因。
- 最终动作。
- 是否可一键清理。

### 6.3 用户确认弹窗

一键清理确认弹窗需要更明确：

```text
本次会处理 18 个文件，全部先移动到隔离区。
另有 7 个文件需要您手动确认，DiskClaw 不会自动处理它们。
```

## 7. Prompt 设计

### 7.1 System Prompt

```text
你是 DiskClaw 的磁盘清理审查员。
你只能根据文件元数据判断风险，不能假设已经读取文件内容。
你的目标是帮助用户安全释放空间，而不是最大化删除数量。
遇到系统文件、用户文档、源码、数据库、虚拟机、证书、密钥、钱包、配置目录时必须保守。
你不能建议永久删除，只能建议保留、人工确认、隔离或低风险清理。
必须返回严格 JSON。
```

### 7.2 User Payload

```json
{
  "scanContext": {
    "target": "C:\\Users\\User\\Downloads",
    "totalFiles": 3000,
    "candidateFiles": 120,
    "reclaimableBytes": 987654321
  },
  "localRules": {
    "protectedPaths": ["C:\\Windows", "C:\\Program Files"],
    "defaultCleanupMode": "quarantine"
  },
  "items": [
    {
      "id": "abc",
      "path": "C:\\Users\\User\\Downloads\\old-installer.iso",
      "name": "old-installer.iso",
      "extension": ".iso",
      "sizeBytes": 4294967296,
      "modifiedAt": "2024-01-01T00:00:00.000Z",
      "accessedAt": "2024-01-02T00:00:00.000Z",
      "categories": ["installer", "large-file", "stale"],
      "localRisk": {
        "level": "medium",
        "deletionAllowed": true,
        "recommendedAction": "quarantine"
      }
    }
  ]
}
```

## 8. 隐私与安全边界

必须明确告知用户：

- 默认只上传文件元数据给 LLM。
- 不上传文件内容。
- 文件名和路径可能包含隐私信息。
- 用户可以关闭 LLM 审查。
- 可以提供“仅本地规则模式”。

设置页建议新增：

- `启用 LLM 深度审查`
- `允许发送文件路径`
- `路径脱敏模式`
- `每次最多审查文件数`
- `仅审查大文件和中风险文件`

路径脱敏示例：

```text
C:\Users\Alice\Documents\Finance\2025-tax.xlsx
```

脱敏后：

```text
<USER_HOME>\Documents\Finance\2025-tax.xlsx
```

可选更强脱敏：

```text
<USER_HOME>\<DIR_1>\<DIR_2>\2025-tax.xlsx
```

## 9. 开发里程碑

### M1：LLM 审查服务骨架

- 新增 `llmCleanupReviewer.js`
- 新增批量输入构造
- 新增 JSON 校验
- LLM 不可用时正常降级

### M2：决策合并层

- 新增 `mergeCleanupDecisions`
- 生成 `plan.decision`
- 首页一键清理改用最终决策
- 高风险本地否决生效

### M3：前端结果页升级

- 扫描结果页拆分为四类结果
- 文件详情显示 LLM 判断原因
- 一键清理确认弹窗显示自动处理与人工确认数量

### M4：隐私设置

- 设置页增加 LLM 深度审查开关
- 增加路径脱敏选项
- 增加最大审查文件数
- 报告记录 LLM 审查是否启用

### M5：测试与验收

- LLM 未配置时保持旧流程可用
- LLM 返回非法 JSON 时不影响扫描
- 高风险文件即使 LLM 说可删，也不会自动清理
- 大文件建议默认隔离，不永久删除
- 报告中能追溯本地判断、LLM 判断和最终判断

## 10. 验收标准

必须满足：

- 扫描后能看到 LLM 深度审查结果。
- 一键清理只处理最终允许自动清理的项目。
- 高风险文件不会进入一键清理。
- LLM 失败不会导致扫描失败。
- LLM 失败不会导致清理失败。
- 用户能在报告中看到每个文件的判断理由。
- 默认清理模式仍然是隔离区。
- 永久删除仍然需要显式选择和二次确认。

## 11. 推荐结论

建议实施这个升级。

DiskClaw 现在已经有本地扫描、风险引擎、隔离区和报告系统，安全底座是够的。让 LLM 参与“扫描后的文件用途判断”和“清理决策解释”，会明显增强产品的智能感，也更贴近用户真实需求。

但实现时要坚持保守策略：

- LLM 不扫描磁盘。
- LLM 不读取文件内容。
- LLM 不直接执行删除。
- LLM 不能覆盖本地高风险判断。
- LLM 的作用是审查、解释、排序、提醒和辅助决策。

这样 DiskClaw 会从“带 AI 说明的清理工具”，升级成“有 AI 审查能力的安全磁盘清理助手”。
