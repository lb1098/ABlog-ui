<!-- 文章详情 -->
<template>
  <div>
    <sg-nav></sg-nav>
    <ab-head-img-box address="DetailArticle" ></ab-head-img-box>
    <div class="container" id="detail">
      <el-row :gutter="10">
        <el-col class="hidden-xs-only" :xs="24" :sm="5" >
          <ab-leftlist></ab-leftlist>
        </el-col>
        <el-col :xs="24" :sm="14" style="transition:all .5s ease-out;margin-bottom:30px;">
          <sg-articleDetail></sg-articleDetail>
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
import rightlist from '../components/rightlist.vue'
import articleDetail from '../components/articleDetail.vue'
import footer from "../components/footer";
import headImgBox from "../components/part/headImgBox";
import leftlist from "../components/leftlist";
export default {
  name: 'DetailArticle',
  data() { //选项 / 数据
    return {}
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    'sg-nav': header,
    'sg-articleDetail': articleDetail,
    // 'sg-message':message,
    'ab-leftlist':leftlist,
    'sg-rightlist': rightlist,
    'ab-footer': footer,
    'ab-head-img-box':headImgBox,

  },
  created() { //生命周期函数

  },
  mounted() {

  }
}
</script>

<style>
</style>
