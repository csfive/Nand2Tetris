import DefaultTheme from 'vitepress/theme-without-fonts'
import 'vitepress-theme-flexoki/index.css'
import './style.css'

import { ImageGroup } from '@miletorix/vitepress-image-group'
import ImageViewerP from '@miletorix/vitepress-image-viewer'
import '@miletorix/vitepress-image-viewer/style.css'
import '@miletorix/vitepress-image-group/style.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    ImageViewerP(app)
    app.component('ImageGroup', ImageGroup)
  },
}
