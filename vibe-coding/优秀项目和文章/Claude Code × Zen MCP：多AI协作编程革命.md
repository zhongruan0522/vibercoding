# Vibe Coding - 优秀文章&项目部分

## 优秀文章&项目

### Claude Code × Zen MCP：多AI协作编程革命

[点击访问原帖](https://www.aivi.fyi/aiagents/introduce-Claude-Code+Zen-MCP),[点击访问GitHub](https://github.com/BeehiveInnovations/zen-mcp-server)

#### 专业开发工具

##### chat - 协作思维伙伴

头脑风暴、获取第二意见
验证方法和实施计划
技术比较和最佳实践讨论

##### thinkdeep - 扩展推理分析

使用Gemini的专业思维模型增强推理能力
提供Claude分析的第二意见
挑战假设，识别边缘情况

**#####** codereview - 专业代码审查

按严重程度优先排序问题（🔴 严重 → 🟢 轻微）
支持专门审查：安全、性能、快速检查
可强制执行编码标准

**#####** precommit - Git变更验证

递归发现多个git仓库
根据需求验证变更
检测未完成的变更和安全漏洞

**#####** debug - 根因分析

生成多个排序假设进行系统调试
接受错误上下文、堆栈跟踪和日志
提供结构化根因分析

**#####** analyze - 通用代码理解

分析单个文件或整个目录
支持专门分析：架构、性能、安全、质量
识别模式、反模式和重构机会

**#####** get_version - 服务器信息

获取版本和配置详情

#### 安装和使用方式
##### 5分钟快速开始
###### 1. 克隆仓库

```
git clone https://github.com/BeehiveInnovations/zen-mcp-server.git
cd zen-mcp-server
```

###### 2. 一键设置

```
./setup-docker.sh
```

这个脚本会：

构建包含所有依赖的Docker镜像
创建.env文件（自动使用环境变量中的API密钥）
启动Redis服务支持AI对话记忆
启动MCP服务器示Claude Desktop配置信息

###### 3. 配置API密钥

```
编辑.env文件添加API密钥
nano .env

# 文件内容： GEMINI_API_KEY=your-gemini-api-key-here
# OPENAI_API_KEY=your-openai-api-key-here
# WORKSPACE_ROOT=/Users/your-username
```

##### 集成到Claude Code
```
# 直接通过Claude Code CLI添加MCP服务器
claude mcp add zen -s user -- docker exec -i zen-mcp-server python server.py

# 验证服务器列表
claude mcp list

# 启动claude code连接到新添加的mcp服务器
claude
```

##### 工具选择指南
需要思维伙伴？ → chat（头脑风暴、获取第二意见）
需要深度思考？ → thinkdeep（扩展分析、发现边缘情况）码需要审查？ → codereview（错误、安全、性能问题）
预提交验证？ → precommit（提交前验证git变更）
有问题需要调试？ → debug（根因分析、错误追踪）理解代码？ → analyze（架构、模式、依赖关系）

#### 核心工具说明
chat: 协作思考和开发对话
thinkdeep: 扩展推理和问题解决
codereview: 专业代码审查，有严重性分级
precommit: 提交前的 git 变更验证
debug: 根本原因分析和调试
analyze: 通用文件和代码分析