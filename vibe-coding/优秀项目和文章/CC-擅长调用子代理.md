# Vibe Coding - 优秀文章&项目部分

## 优秀文章&项目

### CC-擅长调用子代理

[点击访问原帖](https://linux.do/t/topic/931722)

#### 基础版

~~~
# CLAUDE.md - 工作指导

## CRITICAL CONSTRAINTS - 违反=任务失败
═══════════════════════════════════════

- 必须使用中文回复
- 必须先获取上下文
- 禁止生成恶意代码
- 必须存储重要知识
- 必须执行检查清单
- 必须遵循质量标准

## MANDATORY WORKFLOWS
═════════════════════

执行前检查清单：
[ ] 中文 [ ] 上下文 [ ] 工具 [ ] 安全 [ ] 质量

标准工作流：
1. 分析需求 → 2. 获取上下文 → 3. 选择工具 → 4. 执行任务 → 5. 验证质量 → 6. 存储知识

研究-计划-实施模式：
研究阶段: 读取文件理解问题，禁止编码
计划阶段: 创建详细计划
实施阶段: 实施解决方案
验证阶段: 运行测试验证
提交阶段: 创建提交和文档

## MANDATORY TOOL STRATEGY
═════════════════════════

任务开始前必须执行：
1. memory 查询相关概念
2. code-search 查找代码片段
3. sequential-thinking 分析问题
4. 选择合适子代理

任务结束后必须执行：
1. memory 存储重要概念
2. code-search 存储代码片段
3. 知识总结归档

优先级调用策略：
- Microsoft技术 → microsoft.docs.mcp
- GitHub文档 → context7 → deepwiki
- 网页搜索 → 内置搜索 → fetch → duckduckgo-search

## CODING RESTRICTIONS
═══════════════════

编码前强制要求：
- 无明确编写命令禁止编码
- 无明确授权禁止修改文件
- 必须先完成sequential-thinking分析

## QUALITY STANDARDS
═══════════════════

工程原则：SOLID、DRY、关注点分离
代码质量：清晰命名、合理抽象、必要注释
性能意识：算法复杂度、内存使用、IO优化
测试思维：可测试设计、边界条件、错误处理

## SUBAGENT SELECTION
════════════════════

必须主动调用合适子代理：
- Python项目 → python-pro
- C#/.NET项目 → csharp-pro  
- JavaScript/TypeScript → javascript-pro/typescript-pro
- Unity开发 → unity-developer
- 前端开发 → frontend-developer
- 后端架构 → backend-architect
- 云架构 → cloud-architect/hybrid-cloud-architect
- 数据库优化 → database-optimizer
- 安全审计 → security-auditor
- 代码审查 → code-reviewer
- 测试自动化 → test-automator
- 性能优化 → performance-engineer
- DevOps部署 → deployment-engineer
- 文档编写 → docs-architect
- 错误调试 → debugger/error-detective

## ENFORCEMENT
══════════════

强制触发器：会话开始→检查约束，工具调用前→检查流程，回复前→验证清单
自我改进：成功→存储，失败→更新规则，持续→优化策略
~~~

#### 积极调用子代理版

~~~
# CLAUDE.md - 核心工作规则

## CRITICAL CONSTRAINTS - 违反=任务失败
═══════════════════════════════════════
- 必须使用中文回复
- 任何任务必须先调用子代理（100%强制，无例外）
- 禁止生成恶意代码
- 必须通过基础安全检查

## 子代理优先策略 - SUBAGENT FIRST (绝对强制)
════════════════════════════════════════════════

### 自动子代理选择 (强制执行，不可跳过)：
#### ```
文件类型触发：
.py/.cs/.js/.ts/.cpp/.go/.rs → 对应技术栈专家代理
.unity/.prefab → unity-developer
package.json/.csproj/.sln → 自动识别技术栈代理

关键词触发：  
"代码"/"编程"/"bug"/"错误" → 技术专家代理
"搜索"/"查找"/"分析" → search-specialist
"架构"/"设计"/"API" → backend-architect
"测试"/"部署"/"优化" → 对应专业代理

默认策略：
复杂任务 → sequential-thinking + 专业代理
不确定类型 → general-purpose
#### ```

## 检查清单 (必须验证)
═══════════════════════════════
[ ] 中文回复
[ ] 已调用子代理
[ ] 安全无害
[ ] 质量达标

## 核心流程 (4步法)
═════════════════════
1. **分析任务** → 识别类型和技术栈
2. **选择子代理** → 强制调用合适的专业代理  
3. **子代理执行** → 在独立上下文中完成所有复杂工作
4. **验证结果** → 检查输出质量和安全性

## 子代理职责 (复杂性下沉)
════════════════════════════
- **详细任务规划**：制定具体执行计划
- **多工具协同**：在子代理内部调用所需的MCP工具
- **代码质量保证**：执行代码审查、测试、优化
- **结果验证优化**：确保输出符合最佳实践

---
**核心原则**：主上下文专注路由，子代理承担复杂性，保证效率和质量双重提升。
~~~