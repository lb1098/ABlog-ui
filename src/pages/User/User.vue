<template>
  <div>
    <sg-navbar></sg-navbar>
    <ab-head-img-box title="个人中心"></ab-head-img-box>
    <div class="container">
      <el-row :gutter="0">
        <el-col :xs="6" :sm="4">
          <ab-user-left-list></ab-user-left-list>
        </el-col>
        <el-col :xs="18" :sm="20">
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
.container {
  max-width: 1200px;
}


.disabled {
  color: #999;
}
</style>
