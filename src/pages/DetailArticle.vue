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
          <div class="ab-sidebar ab-sidebar-toc">
            <div class="ab-toc">
              <article-toc></article-toc>
            </div>
          </div>
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
import ArticleToc from "../components/part/ArticleToc";

export default {
  name: 'DetailArticle',
  data() { //选项 / 数据
    return {
      tocTop:-1,
    }
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
    ArticleToc,
  },
  created() { //生命周期函数

  },
  mounted() {
    var that = this;
    $(window).on('mousewheel', function() {
      var siderWidth = $('.ab-sidebar').width();
      if(that.tocTop===-1 && $(".ab-sidebar-toc").offset().top!==undefined)
        that.tocTop =  $(".ab-sidebar-toc").offset().top;
      // console.log(that.tocTop)
      if($(window).scrollTop()>that.tocTop){
        $('.ab-sidebar-toc').css({
          "position":'fixed',
          "top":"46px",
          "width":siderWidth+"px",
        });
      } else  {
          $('.ab-sidebar-toc').css({
            "position":'inherit',
          });
      }
    });
  }
}
</script>

<style>
.ab-sidebar-toc {
  /*width: 100%;*/
}
</style>
