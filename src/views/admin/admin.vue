<template>
  <basic-container>
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               v-model:page="page"
               v-model="form"
               ref="crud"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @search-change="searchChange"
               @search-reset="searchReset"
               @selection-change="selectionChange"
               @current-change="currentChange"
               @size-change="sizeChange"
               @refresh-change="refreshChange"
               @on-load="onLoad">

    </avue-crud>
  </basic-container>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      query: {},
      loading: true,
      page: {
        total: 1000,
        currentPage: 1,
        pageSize: 10
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
        addBtn: true,
        delBtn: false,
        dialogClickModal: false,
        labelWidth: 200,
        column: [
          {
            label: "标题",
            prop: "title",
          },
          {
            label: "标题",
            prop: "des",
          },
        ]
      },
      data: [],
    };
  },
  methods: {
    rowSave(row, done, loading) {
      this.$https("/menu-left/submit","post",row,2,{}).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      }, error => {
        loading();
        window.console.log(error);
      });
    },
    rowUpdate(row, index, done, loading) {
      this.$https("/menu-left/submit","post",row,2,{}).then(() => {
        this.onLoad(this.page);
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      }, error => {
        loading();
        console.log(error);
      });
    },
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
          .then(() => {
            return this.$https("/menu-left/remove","post", {id: row.id},1,{})
          })
          .then(() => {
            this.onLoad(this.page);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          });
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
      this.$https("/menu-left/list","get",temp,1,{}).then((res) => {
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

<style scoped></style>