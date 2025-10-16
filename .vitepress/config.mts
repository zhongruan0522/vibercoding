import { defineConfig } from 'vitepress'
import { RSSOptions, RssPlugin } from "vitepress-plugin-rss"
import mdItObsidianCallouts from 'markdown-it-obsidian-callouts'

const RSS: RSSOptions = {
  title: "Vibe Coding - AI协同编程指南",
  baseUrl: "https://vibercoding.zxiaoruan.cn",
  copyright: "zhongruan0522",
  author: { name: "zhongruan0522" },
  filter: (post) => !post.filepath.includes("README.md"),
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  lang: "zh-CN",
  lastUpdated: true,
  title: "Vibe Coding",
  description: "探索AI与编程的完美结合，提升开发效率与创新能力",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: "Vibe Coding",
    nav: [
      { text: '首页', link: '/' },
      { text: 'Vibe Coding', link: '/vibe-coding/欢迎' },
      { text: '讨论区', link: 'https://linux.do/t/topic/990446' },
    ],

    sidebar: [
      {
        text: 'AI协同编程',
        items: [
          { text: '欢迎', link: '/vibe-coding/欢迎' },
          { text: '安装教程', link: '/vibe-coding/安装' },
          { text: '基础配置', link: '/vibe-coding/基础配置' },
          { text: '优秀项目和文章', link: '/vibe-coding/优秀项目和文章' },
          { text: '疑难杂症', link: '/vibe-coding/疑难杂症' },
        ]
      },
            {
        text: '低价服务',
        items: [
          { text: '欢迎', link: '/低价服务/欢迎.md' },
        ]
      },
      {
        text: '推广专区',
        items: [
          { text: '欢迎', link: '/推广专区/欢迎.md' },
        ]
      },
      {
        text: 'AI协同编程-基础-优秀项目&&文章展示',
        items: [
          { text: 'vibe coding(氛围编程)总是产出一坨垃圾? 你可能需要些技巧', link: '/vibe-coding/优秀项目和文章/vibecoding(氛围编程)总是产出一坨垃圾你可能需要些技巧.md' },
          { text: '6A工作流  AI + Figma 产品设计自动化解决方案', link: '/vibe-coding/优秀项目和文章/6A工作流  AI + Figma 产品设计自动化解决方案.md' },
          { text: 'AI代理的上下文工程：构建Manus的经验教训', link: '/vibe-coding/优秀项目和文章/AI代理的上下文工程：构建Manus的经验教训.md' },
          { text: '私域知识工程实战：如何让 AI 一次性写出高质量代码？', link: '/vibe-coding/优秀项目和文章/私域知识工程实战：如何让 AI 一次性写出高质量代码？.md' },
        ]
      },
      {
        text: 'AI协同编程-联动-优秀项目&&文章展示',
        items: [
          { text: 'CC&Codex系统提示词推荐', link: '/vibe-coding/优秀项目和文章/CC&Codex系统提示词推荐.md' },
          { text: '实验性：Claude Code + Codex 进行协作开发', link: '/vibe-coding/优秀项目和文章/实验性：Claude Code + Codex 进行协作开发.md' },
        ]
      },
      {
        text: 'AI协同编程-CC-优秀项目&&文章展示',
        items: [
          { text: 'ClaudeCode小白指引贴.md', link: '/vibe-coding/优秀项目和文章/ClaudeCode小白指引贴.md' },
          { text: 'Claude Code GLM-4.5系统提示词', link: '/vibe-coding/优秀项目和文章/CC-GLM-4.5系统提示词.md' },
          { text: 'Claude Code GLM-4.6系统提示词', link: '/vibe-coding/优秀项目和文章/CC-GLM-4.6系统提示词.md' },
          { text: 'Claude Code 动态生成Agents', link: '/vibe-coding/优秀项目和文章/CC-动态生成Agents.md' },
          { text: 'Claude Code 擅长调用子代理', link: '/vibe-coding/优秀项目和文章/CC-擅长调用子代理.md' },
          { text: 'Claude Code Spec Workflow', link: '/vibe-coding/优秀项目和文章/Claude Code Spec Workflow.md' },
          { text: 'Claude Code Sub-Agents：从手工作坊到自动化工厂', link: '/vibe-coding/优秀项目和文章/Claude Code Sub-Agents：从手工作坊到自动化工厂.md' },
          { text: 'Claude Code × Zen MCP：多AI协作编程革命', link: '/vibe-coding/优秀项目和文章/Claude Code × Zen MCP：多AI协作编程革命.md' },
          { text: 'Claude Code 调用 Codex：分工协作开发', link: '/vibe-coding/优秀项目和文章/Claude Code 调用 Codex：分工协作开发.md' },
          { text: 'SuperClaude × Claude Code：MCP驱动的AI编程爆改指南', link: '/vibe-coding/优秀项目和文章/SuperClaude × Claude Code：MCP驱动的AI编程爆改指南.md' },
          { text: '【实事求是】CC+GLM4.5长期体验和方法分享', link: '/vibe-coding/优秀项目和文章/【实事求是】CC+GLM4.5长期体验和方法分享.md' },
          { text: '一次跑通！省钱又可靠的顾问式编码！', link: '/vibe-coding/优秀项目和文章/一次跑通！省钱又可靠的顾问式编码！.md' },
          { text: '一键生成项目架构图', link: '/vibe-coding/优秀项目和文章/一键生成项目架构图.md' },
          { text: '使用Claude Code Sub-Agent的最佳实践工作流', link: '/vibe-coding/优秀项目和文章/使用Claude Code Sub-Agent的最佳实践工作流.md' },
        ]
      },
      {
        text: 'AI协同编程-Codex-优秀项目&&文章展示',
        items: [
          { text: 'CC&Codex系统提示词推荐', link: '/vibe-coding/优秀项目和文章/CC&Codex系统提示词推荐.md' },
          { text: 'Codex全局AGENTS.MD指南', link: '/vibe-coding/优秀项目和文章/Codex全局AGENTS.MD指南.md' },
          { text: 'Codex杂谈', link: '/vibe-coding/优秀项目和文章/Codex杂谈.md' },
          { text: '后端Codex AGENTS', link: '/vibe-coding/优秀项目和文章/后端Codex AGENTS.md' },
          { text: '让 WSL 成功使用 Codex', link: '/vibe-coding/优秀项目和文章/让 WSL 成功使用 Codex.md' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhongruan0522/vibercoding' }
    ],

    // VitePress 自带的检索全文功能
    search: {
      provider: "local",
      options: {
        miniSearch: {
          options: {
            tokenize: (text) => {
              return text.match(/[A-Za-z0-9]+|./g)?.filter(Boolean) ?? [];
            },
          },
          searchOptions: {
            combineWith: "AND",
          },
        },
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            displayDetails: "显示详细搜索结果",
            resetButtonTitle: "清空搜索关键字",
            backButtonTitle: "返回",
            noResultsText: "无法找到",
            footer: {
              selectText: "选择",
              selectKeyAriaLabel: "Enter 键",
              navigateText: "切换",
              navigateUpKeyAriaLabel: "向上箭头",
              navigateDownKeyAriaLabel: "向下箭头",
              closeText: "关闭",
              closeKeyAriaLabel: "Esc 键",
            },
          },
        },
      },
    },

    // 本地化文本
    lastUpdated: {
      text: "最后更新于",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      level: [2,3],
      label: "目录",
    },

    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
  },
  vite: {
    plugins: [RssPlugin(RSS)],
  },
  // 引入obsidian的样式
  markdown: {
    config: (md) => {
      md.use(mdItObsidianCallouts)
    }
  },
})