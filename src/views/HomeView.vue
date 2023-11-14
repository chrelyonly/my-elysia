<script>

export default {
  data(){
    return{
      searchValue: "",
    }
  },
  methods: {
    viewDetail(e){
      this.$router.push(e)
    }
  }
}
</script>
<style scoped>
.el-row{
  margin-top: 10px;
}
</style>
<template>
    <basic-container>
      <!--          顶部head-->
      <el-row class="el-row" style="height: 10vh;overflow:hidden;">
        <el-col :span="24">
          <el-row class="el-row">
            <el-col :span="24">
              <el-tag>
                纯绿色,无任何添加剂,请放心食用
              </el-tag>
            </el-col>
          </el-row>
          <el-row class="el-row">
            <el-col :span="24">
              <el-button type="success" @click="$router.push('file-upload')">文件上传
              </el-button>
              <el-button type="success" @click="$router.push('music')">
                音乐播放器
              </el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
<!--body-->
      <el-row class="el-row" style="height: 75vh">
        <el-col :span="3" class="left">
<!--          left-menu-->
          <el-row class="el-row">
            <el-col :span="24">
               <el-button class="left-menu" type="primary">AIGG</el-button>
            </el-col>
            <el-col :span="24">
               <el-button class="left-menu" type="primary">搜索引擎</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="21">
          <!--          right body-->
          <el-row class="el-row">
            <el-col :span="8">
            </el-col>
            <el-col :span="8">
              <el-input v-model="searchValue" :rows="5" placeholder="输入关键词"></el-input>
            </el-col>
            <el-col :span="8">
            </el-col>
          </el-row>
          <el-row class="el-row" style="height: 100%;width: 100%;padding: 10px">
            <el-col :span="24" style="background-color:#F2F4F5;;border-radius: 10px;overflow:hidden;;">
              <el-row class="el-row" :gutter="10">
                <el-col :span="24">
                  <el-tag>热门搜索</el-tag>
                </el-col>
              </el-row>
              <el-row class="el-row" :gutter="10">
                <el-col :span="4">
                  <basicContainer>
                    <div style="height:100px;width: 100%;;border-radius: 20px;text-align: center" @click="viewDetail('moyu')">
                      摸鱼人日历
                    </div>
                  </basicContainer>
                </el-col>
                <el-col :span="4">
                  <basicContainer>
                    <div style="height:100px;width: 100%;;border-radius: 20px;text-align: center" @click="viewDetail('my-minio-view')">
                      自用图床图片预览
                    </div>
                  </basicContainer>
                </el-col>
                <el-col :span="4">
                  <basicContainer>
                    <div style="height:100px;width: 100%;;border-radius: 20px;text-align: center" @click="viewDetail('mqtt')">
                      连接至MQTT协议
                    </div>
                  </basicContainer>
                </el-col>
                <el-col :span="4">
                  <div style="height:100px;width: 100%;background-color:red;border-radius: 10px"></div>
                </el-col>
                <el-col :span="4">
                  <div style="height:100px;width: 100%;background-color:red;border-radius: 10px"></div>
                </el-col>
                <el-col :span="4">
                  <div style="height:100px;width: 100%;background-color:red;border-radius: 10px"></div>
                </el-col>
                <el-col :span="4">
                  <div style="height:100px;width: 100%;background-color:red;border-radius: 10px"></div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </basic-container>
</template>
<style scoped>
.left{
  overflow:hidden;
  border-right: 1px solid #d7d6d6;
  text-align: center;
}
.left-menu{
  margin: 1px;
  width: 90%;
}
</style>