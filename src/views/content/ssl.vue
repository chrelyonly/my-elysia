<template>
  <basic-container>
    <h1>提供一个ssl申请工具简化申请的步骤,使用java语言开发,并以开源到github(自行打包jar使用)</h1>
    <h1>现已打包为exe文件,方便从win控制证书申请过程</h1>
    <h1>我创建了个群,加我好友一起学习</h1>
    <el-image src="/my.png" style="width: 200px" :preview-src-list="['/my.png']"></el-image>
    <h2>先准备一个域名并解析到服务器,我这里准备 apply.chrelyonly.cn</h2>
    <el-image src="/ssldoc/apply1.png"  style="width: 200px" :preview-src-list="['/ssldoc/apply1.png']"></el-image>
    <h2>目前没有添加证书</h2>
    <el-image src="/ssldoc/apply2.png" style="width: 200px" :preview-src-list="['/ssldoc/apply2.png']"></el-image>
    <h2>运行ssl工具,后接域名参数可以是多个,输入后运行</h2>
    <el-image src="/ssldoc/apply3.png" style="width: 200px" :preview-src-list="['/ssldoc/apply3.png']"></el-image>
    <h2>我这里使用 apply.chrelyonly.cn这个作为域名,并使用http文件进行校验</h2>
    <el-image src="/ssldoc/apply4.png" style="width: 200px" :preview-src-list="['/ssldoc/apply4.png']"></el-image>
    <h1>输入1后使用http校验方式,会弹出对话框,先别点确定,在你的网站目录上传对应的验证文件使其能够通过http访问</h1>
    <el-image src="/ssldoc/apply5.png" style="width: 200px" :preview-src-list="['/ssldoc/apply5.png']"></el-image>
    <h2>建立对应文件夹并上传目录下生成的校验文件</h2>
    <el-image src="/ssldoc/apply6.png" style="width: 200px" :preview-src-list="['/ssldoc/apply6.png']"></el-image>
    <h2>手动访问下校验地址,然后点击确认</h2>
    <el-image src="/ssldoc/apply7.png" style="width: 200px" :preview-src-list="['/ssldoc/apply7.png']"></el-image>(自行进行crt转换其他证书)
    <h2>如验证成功就会生成证书私钥key,与证书crt文件</h2>
    <el-image src="/ssldoc/apply8.png" style="width: 200px" :preview-src-list="['/ssldoc/apply8.png']"></el-image>
    <h2>将证书信息填写到对应的web服务器即可</h2>
    <el-image src="/ssldoc/apply9.png" style="width: 200px" :preview-src-list="['/ssldoc/apply9.png']"></el-image>
    <h2>这里我使用的是nginx,将证书信息填写到对应的配置文件</h2>
    <el-image src="/ssldoc/apply10.png" style="width: 200px" :preview-src-list="['/ssldoc/apply10.png']"></el-image>
    <h2>重启nginx,访问https://apply.chrelyonly.cn,就可以看到效果了</h2>
    <el-image src="/ssldoc/apply11.png" style="width: 200px" :preview-src-list="['/ssldoc/apply11.png']"></el-image>
    <h1>如选择dns模式,一样,准备好域名,我这里准备  apply2.chrelyonly.cn这个域名,并申请泛域名证书</h1>
    <el-image src="/ssldoc/apply12.png" style="width: 200px" :preview-src-list="['/ssldoc/apply12.png']"></el-image>
    <h2>接着去你域名后台新增一条txt记录</h2>
    <el-image src="/ssldoc/apply13.png" style="width: 200px" :preview-src-list="['/ssldoc/apply13.png']"></el-image>
    <h2>添加完成后点击确认后就会生成证书了</h2>
    <el-image src="/ssldoc/apply14.png" style="width: 200px" :preview-src-list="['/ssldoc/apply14.png']"></el-image>
  </basic-container>
</template>

<script>
export default {
  name: "ssl",
  data () {
    return {
    };
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
};
</script>

<style>
</style>
