<!-- 首页 -->
<template>
  <div>
    <sg-navbar></sg-navbar>
    <ab-head-img-box title="博文列表"></ab-head-img-box>
    <div class="container">
      <el-row :gutter="10">
        <el-col class="hidden-xs-only" :xs="24" :sm="5" >
          <ab-leftlist></ab-leftlist>
        </el-col>
        <el-col :xs="24" :sm="14" style="transition:all .5s ease-out;margin-bottom:30px;">
          <sg-articlelist></sg-articlelist>
        </el-col>
        <el-col :xs="24" :sm="5">
          <sg-rightlist></sg-rightlist>
        </el-col>
      </el-row>
    </div>
    <ab-footer></ab-footer>
  </div>
</template>

<script>
import header from '../components/header.vue'
import articlelist from '../components/articlelist.vue'
import rightlist from '../components/rightlist.vue'
import footer from "../components/footer";
import headImgBox from "../components/part/headImgBox";
import leftlist from "../components/leftlist";

export default {
  name: 'Home',
  components: { //定义组件
    'sg-navbar': header,
    'ab-head-img-box':headImgBox,
    'sg-articlelist': articlelist,
    'ab-leftlist':leftlist,
    'sg-rightlist': rightlist,
    'ab-footer': footer,
  },
  data() { //选项 / 数据
    return {

    }
  },
  watch: {
    '$route': 'routeChange',
  },
  mounted() {
    this.routeChange();
  },
  methods: { //事件处理器
    routeChange() {

    },
  },
}
</script>

<style>

</style>
