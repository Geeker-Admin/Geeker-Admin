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
// element plus（按需导入：各组件在用到处显式 import；此处仅引入 v-loading 指令所需）
import { ElLoading } from 'element-plus'
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
// 图标全局注册保留：IconSelect / SelectIcon 等图标选择器自身已 `import *` 装载全部图标，
// 全局循环不会额外增加体积（无 tree-shaking 收益）；若移除这些选择器，可改为按需导入。
Object.keys(Icons).forEach(key => {
  app.component(key, Icons[key as keyof typeof Icons])
})

// v-loading 指令原先由 app.use(ElementPlus) 全局注册；改为按需后在此单独注册
app.directive('loading', ElLoading.directive)

app.use(directives).use(router).use(I18n).use(pinia).mount('#app')
