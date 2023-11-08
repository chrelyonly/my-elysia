<script>
import {deepClone} from "@/util/util";

export default {
  name: 'my-minio-view',
  data(){
    return{
      dataList: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init(){
      let params = {

      }
      this.$https("/oss/endpoint/list","get",{},1,{}).then(res=>{
        this.lazyLoad(res.data.data)
      })
    },
    lazyLoad(data){
      if (data.length <= 0){
        return
      }
      setTimeout(()=>{
          // 接受一下临时用
          let dataTemp = deepClone(data)
      //   每次push5张图片到dataList
        for (let i = 0; i < 1; i++) {
          if (dataTemp.length <= 0){
            return
          }
          this.dataList.push(dataTemp[i])
        //   删除对应数据
          data.splice(0,1)
        }
        this.lazyLoad(data)
      },10)
    }
  }
}
</script>

<template>
  <basic-container>
    <el-row>
      <el-col :span="24" >
        <div style="float:left;width: 100%;">
          <div v-for="(item,index) in dataList" :key="index" style="float: left;max-width: 100px"   class="animate__animated animate__fadeInDown" >
            <el-image :src="item" style="width: 100%;height: 100%" :preview-src-list="[item]" :lazy="true" :preview-teleported="true"></el-image>
          </div>
        </div>
      </el-col>
    </el-row>
  </basic-container>
</template>

<style scoped></style>