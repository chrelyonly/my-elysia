<script>
</script>
<style scoped>
.el-row{
  margin-top: 10px;
}
</style>
<template>
    <basic-container>
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
        </el-col>
      </el-row>
      <el-row class="el-row">
        <el-col :span="24">
            <el-button type="success" @click="$router.push('music')">
              音乐播放器
            </el-button>
        </el-col>
      </el-row>
    </basic-container>
</template>
