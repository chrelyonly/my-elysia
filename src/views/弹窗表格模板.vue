<template>
  <el-dialog
      title="选择"
      :visible.sync="centerDialogVisible"
      :append-to-body="true"
      :modal-append-to-body="true"
      top="3vh"
      width="70%"
      center>
    <basic-container>
      <avue-crud :option="option"
                 :table-loading="loading"
                 :data="data"
                 :page.sync="page"
                 v-model="form"
                 ref="crud"
                 @search-change="searchChange"
                 @search-reset="searchReset"
                 @selection-change="selectionChange"
                 @current-change="currentChange"
                 @size-change="sizeChange"
                 @refresh-change="refreshChange"
                 @on-load="onLoad">
      </avue-crud>
      <el-col :span="24">
             <span style="float: right">
               <el-button @click="cleanForm">关闭</el-button>
               <el-button  type="primary" @click="submitForm">确定</el-button>
                </span>
      </el-col>
    </basic-container>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        centerDialogVisible: false,
        form: {},
        query: {},
        loading: true,
        page: {
          pageSize: 10,
          currentPage: 1,
          total: 0
        },
        selectionList: [],
        option: {
          calcHeight: 30,
          tip: false,
          searchShow: false,
          searchMenuSpan: 6,
          border: true,
          index: true,
          viewBtn: true,
          selection: true,
          menu: false,
          addBtn: false,
          delBtn: false,
          dialogClickModal: false,
          labelWidth: 200,
          column: [
            {
              label: "姓名",
              prop: "name",
              search: true,
            },
          ]
        },
        data: [],
        parentData: ""
      };
    },
    methods: {
      init(parentData){
        this.parentData = parentData
        this.centerDialogVisible = true;
      },
      searchReset() {
        this.query = {};
        this.onLoad(this.page);
      },
      searchChange(params, done) {
        this.query = params;
        this.page.currentPage = 1;
        this.onLoad(this.page, params);
        done();
      },
      selectionChange(list) {
        this.selectionList = list;
      },
      selectionClear() {
        this.selectionList = [];
        this.$refs.crud.toggleSelection();
      },
      currentChange(currentPage){
        this.page.currentPage = currentPage;
      },
      sizeChange(pageSize){
        this.page.pageSize = pageSize;
      },
      refreshChange() {
        this.onLoad(this.page, this.query);
      },
      onLoad(page, params = {}) {
        this.loading = true;
        let temp = {
          "current":page.currentPage,
          "size":page.pageSize,
          ...params,
          ...this.query
        }
        this.$https("/api/read/read/list","get",temp,1,{}).then((res) => {
          const data = res.data.data;
          this.page.total = data.total;
          this.data = data.records;
          this.loading = false;
          this.selectionClear();
        })
      },
      //关闭
      cleanForm(){
        this.centerDialogVisible = false;
        this.videoId = "";
      },
      submitForm(){
        if (this.selectionList.length !== 1) {
          this.$message.warning("请选择一条数据");
          return;
        }
        let title = "";
        this.$confirm(title, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let param = {
            "id": this.parentData.id,
            "elderId" : this.selectionList[0].id,
            "elderName" : this.selectionList[0].name
          }
          this.$https("/api/blade-equipment/aiarmlist/update","post",param,2,{}).then((() => {
            this.$message.success("操作成功")
            this.centerDialogVisible = false;
            this.$emit("submit")
            this.videoId = "";
          }))
        })
      },
    }
  };
</script>

<style>
</style>
