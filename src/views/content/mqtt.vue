<script>
import BasicContainer from "@/components/basic-container/main.vue";

export default {
  name: 'mqtt',
  components: {BasicContainer},
  data(){
    return{
      tailForm: {
        tailQQ: "",
        tailName: "",
        tailType: "1",
        tailContent: "hello world",
        tailFrom: "1",
      },
      option:{
        submitText: "提交",
        column: [
          {
            label: "说话QQ号",
            prop: "tailQQ",
            maxlength: 20,
            span: 6,
            rules: [{
              required: true,
              message: "请输入QQ号",
              trigger: "blur"
            }]
          },
          {
            label: "昵称",
            prop: "tailName",
            maxlength: 20,
            span: 6,
            rules: [{
              required: true,
              message: "请输入昵称",
              trigger: "blur"
            }]
          },
          {
            label: "语言类型",
            prop: "tailType",
            type: "select",
            dataType: "string",
            span: 6,
            value:"1",
            dicData:[
              {
                label:"文本",
                value: "1"
              },
              {
                label:"语音(待实现)",
                value: "2"
              },
            ],
            rules: [{
              required: true,
              message: "请选择语言类型",
              trigger: "change"
            }]
          },
          {
            label: "发言内容",
            prop: "tailContent",
            type:"textarea",
            maxlength: 100,
            placeholder: "请输入发言内容(语音模式:自动转语音)",
            span: 6,
            rules: [{
              required: true,
              message: "请输入内容",
              trigger: "blur"
            }]
          },
        ]
      },
      data: [],
    }
  },
  mounted() {
    this.init()
  },
  methods:{
    init(){
      let params = {
        size: 10,
      }
      this.$https("/mqtt-msg-record/list","get",params,1,{}).then( res=> {
        this.data = res.data.data.records
        // 监听消息
        this.$mqttServer.on("message", (topic, message) => {
          if (topic === "/tempVue"){
            console.log("回复消息")
            console.log(message.toString())
            this.data.unshift(JSON.parse(message.toString()))
          }
        });
      })
    },
    handleSubmit(form,done){
      let params = {
        tailId: form.tailQQ,
        tailType: form.tailType,
        tailContent: form.tailContent,
        tailFrom: form.tailFrom,
        tailName: form.tailName,
      }
      this.$https("/mqtt-msg-record/add","post",params,2,{}).then( res=> {
        this.$message.success(res.data.msg)
        // this.$refs.formData.resetForm();
        done()
      })
    }
  },
}
</script>

<template>
  <basic-container>
    <div>
      <el-tag type="success"> 提供mqtt服务的子协议 (注意: 请使用wss协议),自行订阅主题,其他客户端连接后可同步消息</el-tag>
    </div>
    <div>
      <el-tag> 链接地址: wss://temp-img.chrelyonly.cn/mqtt </el-tag>
    </div>
    <div>
      <el-tag> 账号: chrelyonly </el-tag>
    </div>
    <div>
      <el-tag> 密码: chrelyonly </el-tag>
    </div>
    <el-row :gutter="24" style="margin-top: 20px; text-align: center; overflow: hidden">
      <el-col :span="4">
        <el-row :gutter="24">
          <el-col>
            <div style="width: 100%; font-weight: bold">当前订阅</div>
            <basic-container>
              <el-tag effect="dark" type="success" style="width: 100%">临时聊天窗 /tempVue</el-tag>
            </basic-container>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="20">
        <el-row :gutter="24">
          <el-col>
            <div style="width: 100%; font-weight: bold">聊天内容</div>
            <basic-container>
              <div style="width: 100%; height: 50vh">
                <el-tag effect="dark">已连接至服务器</el-tag>
                  <div style="height: 50vh;overflow-y: auto" >
                    <div v-for="(item,index) in data" :key="index" >
                      <div><el-tag effect="dark" type="info">时间: {{item.createTime}}</el-tag></div>
                      <el-row :gutter="0" style="border-bottom: 1px solid #dce0dc;margin: 10px;">
                        <el-col :span="1">
                          <div>
                            <el-image :src="item.tailImg" style="width: 50px;height: 50px;border-radius: 50%" :preview-src-list="[item.tailImg]"></el-image>
                          </div>
                        </el-col>
                        <el-col :span="23" style="text-align: left">
                          <div><el-tag effect="dark" type="success">昵称: {{item.tailName}}</el-tag></div>
                          <div><el-tag effect="dark">消息: {{item.tailContent}}</el-tag></div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
              </div>
            </basic-container>
            <basic-container>
              <avue-form
                :option="option"
                ref="formData"
                v-model="tailForm"
                @submit="handleSubmit"
              ></avue-form>
            </basic-container>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </basic-container>
</template>

<style scoped></style>