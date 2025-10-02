import { defineConfig } from 'vitepress'
import { RSSOptions, RssPlugin } from "vitepress-plugin-rss"

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
  description: "AI协同编程技巧与工具使用指南",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: "Vibe Coding",
    nav: [
      { text: '首页', link: '/' },
      { text: 'Vibe Coding', link: '/vibe-coding/欢迎' },
      { text: '普通AI使用', link: '/AI' },
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
      },{
        text: '日常AI使用',
        items: [
          { text: 'AI指南', link: '/AI' },
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
      level: [2, 3, 4, 5],
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
})