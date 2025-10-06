# Vibe Coding - 优秀文章&项目部分

## 优秀文章&项目

### SuperClaude × Claude Code：MCP驱动的AI编程爆改指南

[点击访问原帖](https://www.aivi.fyi/aiagents/introduce-SuperClaude)

#### 主要作用
##### 1. 认知专业化
architect：系统设计和可扩展性
frontend：用户体验和React开发
backend：API开发和性能优化
security：威胁建模和安全代码
analyzer：根因分析和调试
mentor：教学和指导
refactorer：代码质量和简化
performance：性能优化
qa：质量保证和测试

##### 2. 工作流程标准化
提供了18个专业化的斜杠命令，涵盖开发的各个方面：发命令：/user:build、/user:dev-setup、/user:test
分析命令：/user:analyze、/user:troubleshoot、/user:improve维命令：/user:deploy、/user:migrate、/user:scan计命令：/user:design

##### 3. 智能文档查找
通过Context7自动查找和引用官方文档，确保代码实现基于最新的最佳实践。

#### 安装和使用方式
##### 安装步骤
```
1. 克隆项目
git clone https://github.com/NomenAK/SuperClaude.git
cd SuperClaude

# 2. 执行安装脚本
./install.sh

# 3. 验证安装
ls -la ~/.claude/  # 应该显示4个主要文件
ls -la ~/.claude/commands/  # 应该显示17个文件
```

#### 📋 命令格式规范
##### 基本格式
```
/命令名 --标志1 --标志2 --persona-角色名 "任务描述"
```

##### 重要说明
✅ 使用直接斜杠格式：/build, /analyze, /review
✅ 标志使用双破折号：--flag
✅ Persona作为通用标志使用：--persona-名称

#### 🏗️ 开发构建类命令
##### 1. React项目开发
```
/build --react --magic --tdd --persona-frontend
```

用途： 使用React框架开发项目，集成Magic UI构建器和测试驱动开发

##### 2. API后端开发
```
/build --api --tdd --coverage --persona-backend
```

用途： 构建后端API，采用测试驱动开发和代码覆盖率检查

##### 3. 项目初始化
```
/build --init --magic --c7 --plan --persona-frontend
```

用途： 初始化新项目，启用Magic UI构建器和Context7文档查找

##### 4. 功能开发
```
/build --feature --tdd --persona-frontend
```

用途： 开发特定功能，采用测试驱动开发方法

#### 🚀必要的MCP Server添加命令
```
添加context7
claude mcp add --transport http context7 https://mcp.context7.com/mcp

# 添加sequential-thinking
claude mcp add sequential-thinking npx @modelcontextprotocol/server-sequential-thinking

# 添加puppeteer
npx @modelcontextprotocol/server-puppeteer

claude mcp add puppeteer npx @modelcontextprotocol/server-puppeteer

# 添加magic (https://21st.dev/magic/onboarding?step=create-component)
claude mcp add magic npx @21st-dev/magic@latest --env API_KEY=你的api key
```

#### 🚀测试用例
```
# 分析开源项目
/analyze --architecture --persona-architect  --seq

# 组合命令
/build --react --magic "简单的todo list 应用"build --init --c7 --plan --persona-frontend "创建一个模拟太阳系的HTML动画，包含8大行星的轨道运动"

/build --react --magic "todo应用原型"

# 分析架构
/analyze --architecture --persona-architect

# 调用MCP分析架构
/analyze --architecture --seq

# 规划整体技术架构
/design --api --ddd "用户管理系统" --persona-architect

# 生成产品需求文档
/design --api --prd "进销存管理系统"

# 生成产品需求文档
/design --prd "移动端社交应用" --persona-frontend

# 定义REST或GraphQL API规范
/design --api --openapi "电商订单API" --persona-backend

# 教育平台设计
/design --api --openapi "在线学习管理系统" --persona-backend
```

#### 🎯 Persona角色系统
##### 可用角色
--persona-architect - 系统架构师，专注设计和可扩展性
--persona-frontend - 前端专家，专注UX和React开发
--persona-backend - 后端专家，专注API和性能
--persona-security - 安全专家，专注威胁建模和安全代码
--persona-qa - 质量保证专家，专注测试和质量
--persona-performance - 性能专家，专注优化和瓶颈分析
--persona-analyzer - 分析专家，专注根因分析和调试
--persona-mentor - 导师专家，专注教学和指导
--persona-refactorer - 重构专家，专注代码质量和简化

#### 🚩 通用标志说明
##### 规划与思考
--plan - 显示执行计划（在执行前预览）
--think - 标准分析模式
--think-hard - 深度分析模式
--ultrathink - 关键分析模式

##### MCP服务器控制
--c7 - 启用Context7文档查找
--seq - 启用Sequential深度思维
--magic - 启用Magic UI构建器
--pup - 启用Puppeteer浏览器测试

##### 输出控制
--uc - UltraCompressed模式（约70%令牌减少）
--verbose - 详细输出模式

##### 特定功能标志
--init - 项目初始化
--feature - 功能开发
--tdd - 测试驱动开发
--coverage - 代码覆盖率
--e2e - 端到端测试
--dry-run - 预演模式
--rollback - 回滚准备

#### 📈 复杂工作流示例
##### 完整开发流程
```
1. 项目规划
/design --api --ddd --plan --persona-architect

# 2. 前端开发
/build --react --magic --tdd --persona-frontend

# 3. 后端开发
/build --api --tdd --coverage --persona-backend

# 4. 质量检查
/review --quality --evidence --persona-qa

# 5. 安全扫描
/scan --security --owasp --persona-security

# 6. 性能优化
/improve --performance --iterate --persona-performance

# 7. 部署准备
/deploy --env staging --plan --persona-architect
```

##### 问题排查流程
```
# 1. 问题分析
/troubleshoot --investigate --prod --persona-analyzer

# 2. 根因分析
/troubleshoot --prod --five-whys --seq --persona-analyzer

# 3. 性能分析
/analyze --profile --perf --seq --persona-performance

# 4. 修复实施
/improve --quality --threshold 95% --persona-refactorer
```