<template>
  <div >
    <sg-nav></sg-nav>
    <ab-head-img-box address="GuideBlock" title="我的教程"></ab-head-img-box>
    <div class="container" >
      <el-row :gutter="10">
        <el-col  :xs="24" :sm="5" >
          <guide-left-nav></guide-left-nav>
        </el-col>
        <el-col :xs="24" :sm="14" id="article1">
          <router-view></router-view>
        </el-col>
        <el-col :xs="24" :sm="5">
          <guide-right-nav></guide-right-nav>
        </el-col>
      </el-row>
    </div>
    <ab-footer></ab-footer>
  </div>
</template>

<script>
import header from "../components/header";
import headImgBox from "../components/part/headImgBox";
import footer from "../components/footer";
import ArticleToc from "../components/part/ArticleToc";
import GuideLeftNav from "../components/GuideLeftNav";
import GuideRightNav from "../components/GuideRightNav";

export default {
  name: "GuideBlock",
  components: { //定义组件
    'sg-nav': header,
    'ab-footer': footer,
    'ab-head-img-box':headImgBox,
    ArticleToc,
    GuideLeftNav,
    GuideRightNav,
  },
}
</script>

<style scoped>

</style>
