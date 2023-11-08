import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// 自定义开始 ************************************************************
// 饿了么ui-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus,{locale: zhCn})
// avue组件
import Avue from '@smallwei/avue';
import Locale from '@smallwei/avue/lib/locale/lang/zh'
// import Locale from '@smallwei/avue/lib/locale/lang/en'
import '@smallwei/avue/lib/index.css';
app.use(Avue,{locale: Locale})
// 全局自定义组件
import BasicContainer from "@/components/basic-container/main.vue";
import basicBlock from "@/components/basic-block/main.vue";
app.component('BasicContainer', BasicContainer)
app.component('basicBlock', basicBlock)
// 引入时间扩展工具
import "@/util/datePrototype"
// 引入全局通用请求
import {http} from '@/util/https.js';
app.config.globalProperties.$https = http;
// 自定义结束 ************************************************************
app.use(createPinia())
app.use(router)

app.mount('#app')
