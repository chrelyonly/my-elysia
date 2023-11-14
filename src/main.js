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
// 引入全局mqtt
import mqtt from "mqtt";
import {SOCKET_SERVICE} from "@/util/mqtt";
let mqttServer = null;
try {
  let userId =  new Date().Format("yyyyMMddhhmmssSSS");
  mqttServer = mqtt.connect(SOCKET_SERVICE, {
    username: "chrelyonly",
    password: "chrelyonly"
  });
  // 用户订阅id
  const singleTopic = "/userId" + userId;
  // 在线人数订阅
  const onlineUserNum = "/onlineUserNum";
  // 聊天窗订阅
  const tempVue = "/tempVue";
  mqttServer.on("connect", () => {
    console.log("连接成功");
    mqttServer.subscribe(singleTopic, err => {
      if (!err) {
        console.log("订阅成功:" + singleTopic);
      }
    });
    mqttServer.subscribe(onlineUserNum, err => {
      if (!err) {
        console.log("订阅成功:" + onlineUserNum);
      }
    });
    mqttServer.subscribe(tempVue, err => {
      if (!err) {
        console.log("订阅成功:" + tempVue);
      }
    });
  });
  app.config.globalProperties.$mqttServer = mqttServer;
}catch (e) {
  console.log(e);
  console.log("mqtt连接失败");
}
// 自定义结束 ************************************************************
app.use(createPinia())
app.use(router)
app.mount('#app')
