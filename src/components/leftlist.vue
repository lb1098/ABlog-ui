<!-- 右侧固定导航栏 -->
<template>
  <div class="rightlistBox">
    <!-- 最热文章 -->
    <hot-article-list></hot-article-list>
    <!--  最近 的 文章 评论  -->
    <recent-article-comment></recent-article-comment>
    <!--  最近 的 留言板 评论  -->
    <message-board></message-board>
    <!--  联系站长   -->
    <contact-us></contact-us>

    <div class="ab-sidebar" >
      <div class="other-problem">
        问题反馈：<el-link type="primary">abinblog@163.com</el-link>
      </div>
    </div>

  </div>
</template>


<script>
import {tagList} from "../api/tag"
import {getCategoryList} from "../api/category";
import ContactUs from "./part/ContactUs";
import HotArticleList from "./part/HotArticleList";
import RecentArticleComment from "./part/RecentArticleComment";
import MessageBoard from "./part/MessageBoard";

export default {
  data() {
    //选项 / 数据
    return {
      fixDo: false,
      loveme: false,
      gotoTop: false, //返回顶部
      going: false, //是否正在执行上滑动作
      artCommentList: "", //最新评论

      // 标签
      tags:[],
      categoryList:[],

    };
  },
  methods: {
    //事件处理器
    toTopfun: function (e) {
      var that = this;
      this.gotoTop = false;
      this.going = true;
      var timer = setInterval(function () {
        //获取滚动条距离顶部高度
        var osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-osTop / 7);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        //到达顶部，清除定时器
        if (osTop == 0) {
          that.going = false;
          clearInterval(timer);
          timer = null;
        }
      }, 30);
    },
    goToHomeByCategoryId(id){
      this.$router.push("/Home?categoryId="+id);
    },
    goToHomeByTagId(id){
      this.$router.push("/Home?tagId="+id);
    },
    getAllTagList(){
      tagList().then((response) =>{
        this.tags = response;
      });
    },
    getAllCategoryList(){
      getCategoryList().then((response) => {
        this.categoryList = response;
      });
    },
  },
  components: {
    //定义组件
    ContactUs,
    HotArticleList,
    RecentArticleComment,
    MessageBoard,
  },

  created() {
    //生命周期函数
    var that = this;
    window.onscroll = function () {
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(t);
      if (!that.going) {
        if (t > 600) {
          that.gotoTop = true;
        } else {
          that.gotoTop = false;
        }
      }
      if (t > 1200) {
        that.fixDo = true;
      } else {
        that.fixDo = false;
      }
    };
    //查询浏览量最多的10篇文章数据
    this.getAllTagList();
    this.getAllCategoryList();
  },
};
</script>

<style lang="less">
.rightlistBox {
  position: relative;
}
.ab-catch-me {
  text-align: center;
}
.ab-catch-me a{
  display: inline-block;
  text-decoration: none;
  //height: 50px;
  width: auto!important;
  padding-right: 10px;
}
.ab-catch-me a i{
  font-size: 32px;
  line-height: 40px ;
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
  padding: 14px ;
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
.hot-article-list div:last-child{
  //border-bottom: 0;
}
.hot-article-list span {

}
.ab-text{
  display: inline-block;
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow:ellipsis;
}
// 头像
.ab-left-avatar {
  width: 32px;
  border-radius: 50%;
}
.recent-comment-list{
  padding:14px;
}
.ab-comment-time {
  color: #8c939d;
}
.comment-block {
  padding-left: 40px!important;
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
