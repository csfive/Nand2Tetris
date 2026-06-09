import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import enhanceApp from 'virtual:enhance-app'
import 'vitepress-theme-flexoki/index.css'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    enhanceApp(ctx)
  },
} satisfies Theme
