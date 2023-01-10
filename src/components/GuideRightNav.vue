<!-- 右侧固定导航栏 -->
<template>
  <div class="rightlistBox">
    <div  v-if="$route.path!='/Guide'" class="ab-sidebar ab-sidebar-toc hidden-xs-only">
      <div class="ab-toc">
        <article-toc></article-toc>
      </div>
    </div>


    <!-- 右侧上滑小图片 -->
    <el-backtop
      :bottom="100"
      :visibility-height="50"
      :right="50"
      @click="freshToc()"
    >
    </el-backtop>
  </div>
</template>


<script>
import ContactUs from '../components/part/ContactUs'
import ArticleToc from "./part/ArticleToc";


export default {
  data() {
    //选项 / 数据
    return {
      tocTop:-1,

      catchMeObj: {
        //个人信息
        git: "https://github.com/lb1098",
        gitee: "https://gitee.com/lb1098",
        leetcode: "https://leetcode.cn/u/glb2023/",
        qq: "/static/img/qq.jpg",
        wechat: "/static/img/wechat.jpg",
        bilibili: "https://space.bilibili.com/17417010",
      },

    };
  },
  methods: {
    freshToc(){
      $('.ab-sidebar-toc').css({
        "position":'static',
      });
    },
  },
  components: {
    //定义组件
    ContactUs,
    ArticleToc,
  },
  created() {

  },
  mounted() {
    var that = this;
    $(window).on('mousewheel scroll', function() {
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
          "position":'static',
        });
      }
    });
  }
};
</script>

<style lang="less">
.rightlistBox {
  position: relative;
}

.ab-catch-me {
  text-align: center;
}

.ab-catch-me a {
  display: inline-block;
  text-decoration: none;
  //height: 50px;
  width: auto !important;
  padding-right: 10px;
}

.ab-catch-me a i {
  font-size: 32px;
  line-height: 40px;
  //color: white;
  opacity: 85%;
}

.ab-call-image {
  text-align: center;
  height: 100px;
}

.ab-call-image img {
  height: 100px;
  border-radius: 50%;
}

/*回到顶部*/
/*返回到顶部*/
.toTop {
  position: fixed;
  right: 40px;
  top: -150px;
  z-index: 99;
  width: 70px;
  height: 900px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
}

.goTop {
  top: -950px;
}

.toTop img,
.toTophui img {
  width: 100%;
  height: auto;
}

.toTophui {
  position: fixed;
  right: 10px;
  bottom: 80px;
  z-index: 99;
  width: 120px;
  height: 120px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
  animation: toflow 2s ease-in-out infinite;
}

@keyframes toflow {
  0% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
  50% {
    /*top:410px;*/
    transform: scale(1) translate(0, 0px);
  }
  100% {
    /*top:400px;*/
    transform: scale(0.95) translate(0, 10px);
  }
}

.goTophui {
  bottom: 120vh;
}

.ab-title {
  //border: 1px solid #d4d4d5;
  display: block;
  line-height: 20px;
  padding: 14px;
  padding-bottom: 0;
  border-radius: 5px 5px 0 0;
  background-color: #fff;
}

.ab-title h1 {
  font-weight: 300;
  font-size: 20px;
  //color: #409EFF;
}

.hot-article-list {
  padding: 14px;
  //border: 1px solid #d4d4d5;
  border-top: 0;
  user-select: none;
}

.hot-article-list div {
  line-height: 14px;
  font-size: 14px;
  padding: 5px 0;
  //border-bottom: 1px solid #d4d4d5;
}

.hot-article-list div:last-child {
  //border-bottom: 0;
}

.hot-article-list span {

}

.ab-text {
  display: inline-block;
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}

// 头像
.ab-left-avatar {
  width: 32px;
  border-radius: 50%;
}

.recent-comment-list {
  padding: 14px;
}

.ab-comment-time {
  color: #8c939d;
}

.comment-block {
  padding-left: 40px !important;
  height: 60px !important;
  position: relative;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.5s;
}

.comment-block:hover {
  background-color: #eee;
}

.comment-block:hover .ab-comment-content {
  color: #409EFF;
  text-decoration: underline;
}

.other-problem {
  padding: 15px;
  text-align: center;
}
</style>
