<template>
  <div>
    <sg-navbar></sg-navbar>
    <ab-head-img-box title="操作中心"></ab-head-img-box>
    <div class="container">
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6">
          <ab-user-left-list></ab-user-left-list>
        </el-col>
        <el-col :xs="16" :sm="18">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
    <ab-footer></ab-footer>
  </div>
</template>

<script>
import header from "../../components/header";
import headImgBox from "../../components/part/headImgBox";
import footer from "../../components/footer";
import UserLeftList from "../../components/User/UserLeftList";

export default {
  name: "User",
  components:{
    'sg-navbar': header,
    'ab-head-img-box':headImgBox,
    'ab-user-left-list':UserLeftList,
    'ab-footer': footer,
  },

}
</script>

<style scoped>

</style>
