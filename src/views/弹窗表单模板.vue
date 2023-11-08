<template>
  <div>
    <el-dialog
      :title="title"
      append-to-body
      :visible.sync="visible"
    width="70%"
      top="3vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true"
    >
      <avue-form :option="option"  ref="formData" v-model="form" @submit="handleSubmit"></avue-form>
    </el-dialog>
  </div>
</template>

<script>
let this1;
export default {
  data () {
    return {
      title: '弹窗表单模板',
      visible: false,
      loading: false,
      parentData: {},
      parentType: "1",
      form:{},
      option:{
        submitText: "提交",
        emptyBtn: false,
        column: [
          {
            label: "包名",
            prop: "name",
            rules: [{
              required: true,
              message: "请输入文件名",
              trigger: "blur"
            }]
          },
          {
            label: "备注",
            prop: "remark",
          },
        ]
      }
    }
  },
  components: {
  },
  created() {
    this1 = this
  },
  methods: {
    inits (parentData,title) {
      this1.visible = true;
      this1.$nextTick(function () {
        let str;
        if (title === "payType"){
          str = "缴费类型";
          this.parentType = "1";
        }else  if (title === "payInfo"){
          str = "缴费记录";
          this.parentType = "2";
        }
        this1.$refs.formData.resetForm();
        this1.parentType = title;
        this1.parentData = parentData;
        this1.title = "数据归档操作[" + this1.parentData.name + "]" + str;
      })
    },
    // 关闭
    handleSubmit(form,done){
      this.$confirm("确定将选择数据进行归档处理?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let param = {
            ...form,
            "parendId": this1.parentData.id
          }
          let url;
          if (this.parentType === "payType"){
            url = "/api/yykj-school/paytypetime/updateDataLazyPayType";
          }else  if (this.parentType === "payInfo"){
            url = "/api/yykj-school/paytypetime/updateDataLazyPayInfo";
          }
          this1.$https(url,"post",param,2,{}).then((res) => {
            this1.$message.success(res.data.msg)
            this.$refs.formData.resetForm();
            this1.parentData = {}
            this1.visible = false
          })
        });
      done()
    }
  }
}
</script>
