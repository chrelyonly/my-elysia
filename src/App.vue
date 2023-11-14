<script >
export default {
  data(){
    return{
      userCount: 0,
      innerWidth: 0
    }
  },
  created() {
    this.innerWidth = window.innerWidth
    if (this.innerWidth < 1450){
      this.$message.error("不支持的分辨率,请使用1450以上分辨率")
    }
    // 监听消息
    this.$mqttServer.on("message", (topic, message) => {
      if (topic === "/onlineUserNum"){
        this.userCount = + message;
      }
    });
  },
  methods:{

  }
}
</script>

<template>
  <div>
    <div style="position: fixed;right: 10px;top: 10px;">
        <el-tag type="success">当前在线人数: {{userCount}}</el-tag>
    </div>
    <transition name="fade" v-if="innerWidth > 1450">
      <RouterView />
    </transition>
  </div>
</template>

<style >
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
/* 滚动条样式 */
::-webkit-scrollbar {
  width: 10px; /* 滚动条宽度 */
}

/* 滑块样式 */
::-webkit-scrollbar-thumb {
  background-color: #888; /* 滑块颜色 */
  border-radius: 5px; /* 滑块圆角 */
}

/* 轨道样式 */
::-webkit-scrollbar-track {
  background-color: #f1f1f1; /* 轨道颜色 */
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
