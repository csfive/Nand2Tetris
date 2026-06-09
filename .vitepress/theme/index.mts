import DefaultTheme from 'vitepress/theme-without-fonts'
import type { Theme } from 'vitepress'
import { enhanceAppWithPDF } from 'vitepress-plugin-pdf/client'
import 'vitepress-theme-flexoki/index.css'
import './style.css'

export default {
  extends: DefaultTheme,
  enhanceApp(ctx) {
    enhanceAppWithPDF(ctx)
  },
} satisfies Theme
