<!-- 文章详情 -->
<template>
  <div>
    <sg-nav></sg-nav>
    <ab-head-img-box></ab-head-img-box>
    <div class="container" id="detail">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <sg-articleDetail></sg-articleDetail>
          <!--  <sg-message></sg-message>-->
        </el-col>
        <el-col :sm="24" :md="8">
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

export default {
  name: 'DetailShare',
  data() { //选项 / 数据
    return {}
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    'sg-nav': header,
    'sg-articleDetail': articleDetail,
    // 'sg-message':message,
    'sg-rightlist': rightlist,
    'ab-footer': footer,
    'ab-head-img-box':headImgBox,
  },
  created() { //生命周期函数

  },
  mounted() {
    var anchor = document.querySelector("#detail");
    // console.log(anchor,anchor.offsetTop);
    var top = anchor.offsetTop - 60;
    document.body.scrollTop = top;
    // Firefox
    document.documentElement.scrollTop = top;
    // Safari
    window.pageYOffset = top;
  }
}
</script>

<style>
</style>
