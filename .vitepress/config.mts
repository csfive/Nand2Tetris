import { defineConfig, type DefaultTheme, type HeadConfig } from 'vitepress'
import { chipApiLanguage } from './chip-api'
import { hackAsmLanguage } from './hack-asm'
import { hdlLanguage } from './hdl'

const configs = {
  lang: 'zh-CN',
  title: 'Nand2Tetris',
  description: 'Building a Modern Computer From First Principles',
  repo: 'csfive/nand2tetris',
  umamiId: '',
  chineseFont:
    'https://chinese-fonts-cdn.netlify.app/packages/stdgt/dist/%E4%B8%8A%E5%9B%BE%E4%B8%9C%E8%A7%82%E4%BD%93-%E5%B8%B8%E8%A7%84/result.css',
  googleFont:
    'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap',
}

export default defineConfig({
  lang: configs.lang,
  title: configs.title,
  titleTemplate: ':title',
  description: configs.description,
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  markdown: {
    math: true,
    image: {
      lazyLoading: true,
    },
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    languages: [hdlLanguage, chipApiLanguage, hackAsmLanguage],
  },
  themeConfig: {
    logo: '/logo.svg',
    sidebar: [
      {
        text: 'Hardware',
        items: [
          { text: '01. Elementary Logic Gates', link: '/notes/01' },
          { text: '02. Boolean Arithmetic', link: '/notes/02' },
          { text: '03. Memory', link: '/notes/03' },
          { text: '04. Machine Language', link: '/notes/04' },
          { text: '05. Computer Architecture', link: '/notes/05' },
          { text: '06. Assembler', link: '/notes/06' },
        ],
      },
      {
        text: 'Software',
        items: [
          { text: '07. VM I: Stack Arithmetic', link: '/notes/07' },
          { text: '08. VM II: Program Control', link: '/notes/08' },
          { text: '09. High-Level Language', link: '/notes/09' },
          { text: '10. Compiler I: Parsing', link: '/notes/10' },
          { text: '11. Compiler II: Code Generation', link: '/notes/11' },
          { text: '12. Operating System', link: '/notes/12' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: `https://github.com/${configs.repo}` }],
    outline: 'deep',
    ...getLabel(),
  },
  head: getHead(),
})

function getHead() {
  const head: HeadConfig[] = [['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }]]
  if (configs.chineseFont) {
    head.push(['link', { rel: 'stylesheet', href: configs.chineseFont }])
  }
  if (configs.googleFont) {
    head.push(['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }])
    head.push(['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }])
    head.push(['link', { rel: 'stylesheet', href: configs.googleFont }])
  }
  if (configs.umamiId) {
    head.push([
      'script',
      { defer: '', src: 'https://a.mancuoj.me/script.js', 'data-website-id': configs.umamiId },
    ])
  }
  return head
}

function getLabel(): DefaultTheme.Config {
  if (configs.lang === 'zh-CN') {
    return {
      editLink: {
        pattern: `https://github.com/${configs.repo}/edit/main/:path`,
        text: '在 GitHub 上编辑此页面',
      },
      lastUpdated: {
        text: '最近更新于',
        formatOptions: { dateStyle: 'short', timeStyle: 'short' },
      },
      docFooter: { prev: '上一页', next: '下一页' },
      outlineTitle: '大纲',
      langMenuLabel: '切换语言',
      returnToTopLabel: '返回顶部',
      sidebarMenuLabel: '侧边栏目录',
      skipToContentLabel: '跳转至内容',
      darkModeSwitchTitle: '切换到暗色模式',
      lightModeSwitchTitle: '切换到亮色模式',
      darkModeSwitchLabel: '切换主题',
    }
  }
  return {
    editLink: {
      pattern: `https://github.com/${configs.repo}/edit/main/:path`,
    },
    lastUpdated: {
      formatOptions: { dateStyle: 'short', timeStyle: 'short' },
    },
  }
}
