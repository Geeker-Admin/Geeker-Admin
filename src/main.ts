import { createApp } from 'vue'
import App from './App.vue'
// unocss
import 'uno.css'
// CSS common style sheet
import '@/styles/common.scss'
// element css
import 'element-plus/dist/index.css'
// element dark css
import 'element-plus/theme-chalk/dark/css-vars.css'
// custom element dark css
import '@/styles/element-dark.scss'
// custom element css
import '@/styles/element.scss'
// element plus
import ElementPlus from 'element-plus'
// element icons
import * as Icons from '@element-plus/icons-vue'
// custom directives
import directives from '@/directives/index'
// vue Router
import router from '@/routers'
// vue i18n
import I18n from '@/locales/index'
// pinia store
import pinia from '@/stores'
// errorHandler
import errorHandler from '@/utils/errorHandler'

const app = createApp(App)

app.config.errorHandler = errorHandler

// register the element Icons component
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

app.use(ElementPlus).use(directives).use(router).use(I18n).use(pinia).mount('#app')
