<template>
  <el-row class="el-row ab-footer  ">
    <el-col>域名正在备案中~</el-col>
    <el-col>托管于 <a href="https://cloud.tencent.com/">腾讯云</a> 轻量应用服务器.</el-col>
    <el-col>Made By ABin.</el-col>
  </el-row>
</template>

<script>
export default {
  name: "ab-footer"
}
</script>

<style scoped>
.ab-footer {
  background: #232323;
  padding: 15px 10px 10px 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%!important;
  text-align: center;
  color: #888;
}
.ab-footer div {
  margin: 5px 0;
}
.ab-footer a {
  color: #795548;
  font-size: inherit;
}
</style>
