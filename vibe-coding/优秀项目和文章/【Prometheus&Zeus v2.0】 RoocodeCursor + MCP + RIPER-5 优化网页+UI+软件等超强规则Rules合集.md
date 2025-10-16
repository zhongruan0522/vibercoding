# Vibe Coding - 优秀文章&项目部分

## 优秀文章&项目

### 【Prometheus&Zeus v2.0】 Roocode/Cursor + MCP + RIPER-5 优化网页+UI+软件等超强规则Rules合集

[点击访问原帖](https://linux.do/t/topic/838816)

#### MCP配置

~~~json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    },
    "sequential-thinking": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sequential-thinking"]
    },
    "mcp-feedback-enhanced": {
      "command": "uvx",
      "args": ["mcp-feedback-enhanced@latest"],
      "timeout": 600,
      "autoApprove": ["interactive_feedback"]
    },
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    },
    "mcp-server-time": {
      "command": "uvx",
      "args": ["mcp-server-time", "--local-timezone=Asia/Shanghai"]
    },
    "shrimp-task-manager": {
      "command": "npx",
      "args": ["-y", "mcp-shrimp-task-manager"],
      "env": {
        "DATA_DIR": "D:/workspace/tools/mcp-shrimp-task-manager/data",
        "TEMPLATES_USE": "en",
        "ENABLE_GUI": "true"
      }
    },
    "mcp-deepwiki": {
      "command": "npx",
      "args": ["-y", "mcp-deepwiki@latest"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"],
      "env": {
        "MEMORY_FILE_PATH": "D:/workspace/tools/server-memory/memory.json"
      }
    }
  }
}
~~~

#### Prometheus_CN.txt
[点击下载，注意直接在浏览器打开会乱码](https://apidata.zxiaoruan.cn/Prometheus_CN.txt)

#### ROO/Kilo专用版本
[点击下载，注意直接在浏览器打开会乱码](https://apidata.zxiaoruan.cn/kilo&roo.zip)