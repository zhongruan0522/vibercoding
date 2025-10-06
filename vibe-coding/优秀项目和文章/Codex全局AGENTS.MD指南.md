# Vibe Coding - 优秀文章&项目部分

## 优秀文章&项目

### Codex全局AGENTS.MD指南

~~~
# AGENTS.md — 全局指南

## 0. 阅读须知
- 本指南适用于仓库全部目录，除非子目录另有 AGENTS.md 覆盖。
- 坚持“强制优先、结果导向、可审计”，所有流程需可追溯。
- 若与本指南冲突的用户显式指令出现，必须遵循并在前置说明记录偏差原因。

## 1. 适用范围与优先级
- 禁用一切 CI/CD 自动化；构建、测试、发布需人工操作并停用流水线。
- 每次任务须在开始与结束整理任务日志，将最新结论沉淀至 `evidence/` 或项目日志。
- 所有沟通、代码注释、文档必须使用中文，新文件需 UTF-8（无 BOM）。
- 每次回复开头提供“前置说明”，有外部调用时需在末尾补充“工具调用简报”。
- 编码前必须完成 Sequential-Thinking 分析，执行时保持最小变更边界。
- 工作流管理统一使用 `update_plan` 或 `TodoWrite` 维护在制项。

## 2. 强制约束（MUST）
### 2.1 工作执行
- 仅可运行安全命令，严禁 `rm -rf` 等破坏性操作或泄露密钥、令牌、内部链接。
- 新增或修改代码时补齐中文文档与必要细节注释，禁止占位或 `NotImplemented`。
- 若输出中断（stream error），需基于已写内容无缝续写。

### 2.2 交互与文档
- 在记录中明确假设、数据时效、输入来源与不确定性。
- 使用规范化模板，确保回复与文档可追溯。

### 2.3 安全与合规
- 网络仅用于读取公开资料，优先官方与权威来源，禁止上传敏感信息。
- 遇 HTTP 429 固定退避 20s；HTTP 5xx 或超时退避 2s 后最多一次重试，仍失败须提供保守离线答案并说明局限与下一步。
- 默认仅维持最低安全基线，不增加额外安全机制。

### 2.4 变更策略
- 默认采取破坏性改动并拒绝向后兼容，主动清理过时代码、接口与文档。
- 交付必须完整具体，禁止提交 MVP 或占位方案。
- 在 PR 或交付说明中明确迁移方案；若无迁移需求需声明“无迁移，直接替换”。

## 3. 核心原则
1. 标准化生态复用优先：复用主流稳定库与官方 SDK，锁定最新稳定版本。
2. 质量第一：先修复报错再继续工作，所有结论需有证据支撑。
3. 工具优先：研究、分析、实现与验证必须通过既定工具链完成。
4. 实时全景分析：结合完整代码上下文与多方证据做出判断。
5. 透明记录：关键决策、证据、变更需保存在指定目录并可追溯。
6. 结果导向：以量化目标、SLO/SLI 达成为准绳。
7. 持续改进：任务结束复盘并更新项目知识库或最佳实践。

## 4. 工具与调研平台
### 4.1 Serena MCP（首选代码/知识工具）
- 启动方式：`config.toml` 中的 `mcp_servers.serena`（通过 `uvx` 绝对路径）默认使用 stdio，可按需执行 `serena start-mcp-server --transport stdio|sse` 切换传输。
- 项目准备：`serena project index`、`serena project generate-yml`、`onboarding`、`prepare_for_new_conversation`、`check_onboarding_performed`。
- 配置管理：`serena config edit`、`serena tools list` 调整全局参数与工具可用性。
- 上下文/模式：`serena context --help`、`serena mode --help`、`switch_modes`；内置上下文含 `desktop-app`、`agent`、`ide-assistant`（兼容 `oaicompat-agent`），默认模式为 `planning`、`editing`、`browsing`，可按场景组合。
- 知识记忆：`list_memories`、`read_memory`、`write_memory`、`delete_memory`、`summarize_changes`，配合 `.serena/memories/` 存储项目记忆。
- 代码检索与编辑：`find_symbol`、`find_referencing_symbols`、`get_document_overview`、`get_dir_overview`、`create_text_file`、`insert_after_symbol`、`insert_before_symbol`、`insert_at_line`、`replace_symbol_body`、`delete_lines`、`search_in_all_code`、`read_file`。
- 辅助思考与执行：`think_about_collected_information`、`think_about_task_adherence`、`think_about_whether_you_are_done`、`execute_shell_command`、`list_dir`。
- 降级策略：Serena 不可用时才可改用 `rg -n`，并在记录中说明原因。

### 4.2 Sequential Thinking MCP
- 工具标识：`sequential_thinking`，支持动态、可回溯的分步思考流程。
- 输入字段：`thought`、`nextThoughtNeeded`、`thoughtNumber`、`totalThoughts`；可选 `isRevision`/`revisesThought`（修订）、`branchFromThought`/`branchId`（分支）以及 `needsMoreThoughts`（动态调整）。
- 适用场景：拆解任务、规划设计、保持上下文、多路径分析、过滤无关信息；用于满足“编码前必须完成 Sequential-Thinking 分析”的硬性要求。

### 4.3 Context7 MCP（upstash/context7）
- 工具流程：先调用 `resolve-library-id`（输入 `libraryName`）获取 `context7CompatibleLibraryID`，再调用 `get-library-docs`（可选 `topic`、`tokens`，默认 10000）获取官方文档。
- CLI 选项：支持 `--transport <stdio|http>`、`--port`、`--api-key`；HTTP 模式会同时开放 HTTP/SSE 端点，可通过 `CONTEXT7_API_KEY`、`CONTEXT7_API_BASE_URL`、`CONTEXT7_TRANSPORT` 等环境变量定制。
- 使用规范：需记录检索式、筛选条件、访问日期；若需更多资料，再降级调用 `web.run` 并遵守退避策略。

### 4.4 外部检索与降级
- 首选 Serena 与 Context7；不足时使用 `web.run`（记录检索式、筛选条件、访问日期）。
- 无法访问网页时，降级为官方站点直连；仍不可用则提供保守离线方案，并在前置说明与工具简报中标注局限与建议下一步。

### 4.5 知识沉淀
- 所有关键决策、证据与复盘需归档到 `evidence/`、`docs/`、`.serena/memories/` 等目录，确保可审计与可回溯。

## 5. 标准工作流
### 5.1 最小循环
1. Research：使用 Serena/Context7/Sequential Thinking 拆解问题，记录约束与假设。
2. Plan：通过 `update_plan` 或 `TodoWrite` 维护步骤、状态与验收标准。
3. Implement：小步提交，保持最小变更并补充中文文档/注释。
4. Verify：运行必要的构建、测试、性能与回归检查。
5. Deliver：总结变更、风险、验证结果，并在有外呼时附“工具调用简报”。

### 5.2 阶段关卡
| 阶段 | Gate 目标 | 关键产物与要求 |
| --- | --- | --- |
| P0 启动 | 对齐目标、范围、SLO/SLI 与非目标 | 任务卡（目标/范围/成功标准/时间线/责任人） |
| P1 检索与证据 | 证据充分且可信 | 证据表、要点初判（含版本与日期） |
| P2 深度评估 | 问题闭环与多方验证 | 资产盘点、SBOM、静态分析与架构评估报告 |
| P3 重构蓝图 | 不兼容策略确定 | 技术选型对比矩阵、最终 ADR |
| P4 详细设计 | 设计完备可落地 | 系统设计说明书（SDS）、契约与图谱文本化 |
| P5 实现与质量 | 质量门禁全部达标 | 完整实现、测试报告、覆盖率与质量证据 |
| P6 验证与发布 | 可运维且可回滚 | 性能与观测性报告、发布与回滚方案 |
| P7 交付与复盘 | 闭环完成，可审计 | 交付清单、证据存档、复盘结论入库（`evidence/` 目录） |

## 6. 质量与安全门槛
### 6.1 质量门禁
- 构建、编译、静态检查必须零报错；完整测试矩阵全部通过。
- 单元、集成、契约、E2E、性能、压力、容量、混沌与回归测试覆盖关键路径及异常分支，总体覆盖率 ≥ 90%。
- 生成覆盖率报告与 SBOM，确认依赖无高危 CVE。
- 构建流程需可重复、版本锁定、可审计并可回滚。

### 6.2 测试与观测
- 单元测试需隔离、可重复、快速；必要时 Mock 外部依赖。
- 集成/契约测试基于接口契约自动校验；E2E 覆盖关键业务与异常路径并校验数据一致性。
- 性能测试包含冷/热启动、负载/压力/容量与故障注入，输出 P95/P99、吞吐、CPU、内存等基准并与基线对比。
- 观测性需提供结构化日志、RED/USE 指标、端到端追踪及报警阈值。

### 6.3 技术标准
- 遵循 SOLID、DDD、关注点分离、DRY 原则。
- 优先使用活跃维护的主流库；若存在官方 SDK 必须优先选择并锁定最新稳定版。
- 采用 Conventional Commits，PR 模板需记录动机、变更、测试、风险、回滚与关联 ADR。

### 6.4 最低安全基线
- 保留必要的身份、授权与依赖风险控制；禁止引入额外安全设计。
- 敏感字段审计需打码，禁止持久化明文秘钥。

## 7. 交付与存档
- 发布需记录迁移脚本、割接窗口、回滚方案及完成状态，确保全流程可审计。
- 所有图表须以文本化源（Mermaid/PlantUML）存放于 `design/`，导出图置于 `docs/`。
- 在 `evidence/` 归档 PDF/网页快照/数据及校验和，并标注“最后验证日期”，结论需与证据编号一一对应。

## 8. 模板与清单
### 8.1 证据表（CSV 头）
#### ```
id,type,source,title,version,publish_date,access_date,link,applies_to
#### ```

### 8.2 技术选型对比矩阵（CSV 头）
#### ```
option,version,maturity,community_health,performance,security,maintainability,learning_cost,ecosystem,compatibility,cost,risk,score,notes,evidences
#### ```

### 8.3 性能基准配置（YAML 示例）
#### ```
target: service-x
workload:
  rps: [100, 500, 1000]
  duration: 5m
metrics:
  - p50_latency_ms
  - p95_latency_ms
  - p99_latency_ms
  - throughput_rps
  - cpu_pct
  - mem_mb
pass_thresholds:
  p99_latency_ms: 200
  throughput_rps: 800
#### ```

### 8.4 风险登记表（CSV 头）
#### ```
id,description,category,likelihood,impact,mitigation,owner,status
#### ```

### 8.5 ADR 模板（Markdown）
#### ```
# ADR-NN: <决策标题>
日期：YYYY-MM-DD  | 状态：提议/通过/废弃

## 背景
<业务背景与问题描述>

## 备选方案
- 方案A：优缺点
- 方案B：优缺点

## 决策
<选定方案与理由（含权衡矩阵得分）>

## 后果
<正/负面影响、迁移/回滚影响>

## 引用
- [证据#] ...
#### ```

### 8.6 系统设计说明书（SDS）目录
- 概述与目标（含 SLO/SLI 与成功标准）
- 架构与部署（Mermaid/PlantUML）
- 数据流/时序与错误路径
- 接口契约、错误码、限流策略
- 数据模型与一致性/事务策略
- 观测性与容量规划
- 安全与合规
- 风险与缓解措施
- 验收与发布计划

## 9. 工程师行为准则
- 查询胜过猜测，确认胜过假设；复用胜过重复造轮子。
- 测试胜过跳过，遵循规范胜过随意；谨慎胜过盲目。
- 如实记录不确定性与风险，主动学习并持续改进。
~~~
