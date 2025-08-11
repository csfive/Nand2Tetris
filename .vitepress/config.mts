import { defineConfig, type DefaultTheme } from 'vitepress'

export const SIDEBAR: DefaultTheme.Sidebar = [
  {
    items: [{ text: 'Project 1: Boolean Logic', link: '/01/README' }],
  },
]

export default defineConfig({
  title: 'Nand2Tetris',
  description: 'Building a Modern Computer From First Principles',
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  markdown: {
    math: true,
    image: {
      lazyLoading: true,
    },
  },
  themeConfig: {
    logo: '/logo.svg',
    sidebar: SIDEBAR,
    socialLinks: [{ icon: 'github', link: 'https://github.com/csfive' }],
    editLink: {
      pattern: 'https://github.com/csfive/nand2tetris/edit/main/:path',
    },
    lastUpdated: {
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'short',
      },
    },
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Libre+Caslon+Text:ital,wght@0,400;0,700;1,400&display=swap',
      },
    ],
    [
      'script',
      {
        defer: '',
        src: 'https://a.mancuoj.me/script.js',
        'data-website-id': 'c539d121-756d-405e-8402-e3fbb79a812f',
      },
    ],
  ],
})
