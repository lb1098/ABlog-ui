<!-- 右侧固定导航栏 -->
<template>
  <div class="rightlistBox">

    <div class="ab-right">
      <div class="ab-title">
        <h1>热门文章</h1>
      </div>
      <div class="hot-article-list">
        <div v-for="(item, index) in browseList" :key="'browseList' + index">
          <el-link :href="'#/DetailArticle?aid=' + item.id" target="_blank" type="info">{{item.title }}</el-link>
        </div>
      </div>
    </div>

    <!-- 分类标签 -->
    <div class="ab-right">
      <div class="ab-title">
        <h1>类别</h1>
      </div>
      <div class="hot-article-list">
        <el-tag
          style="margin: 0 5px 5px 0;cursor: pointer;"
          v-for="(item, index) in categoryList" :key="'tag' + index"
          effect="plain"
          size="mini"
          @click="goToHomeByCategoryId(item.id)">{{item.name}}</el-tag>
      </div>
    </div>
    <!--  标签   -->
    <div class="ab-right">
      <div class="ab-title">
        <h1>标签</h1>
      </div>
      <div class="hot-article-list">
        <el-tag
          style="margin: 0 5px 5px 0;cursor: pointer;"
          v-for="(item, index) in tags" :key="'tag' + index"
          type="info"
          effect="plain"
          @click="goToHomeByTagId(item.id)"
          size="mini">{{item.name}}</el-tag>
      </div>
    </div>


    <!--  联系站长   -->
    <div class="ab-right">
      <div class="ab-title">
        <h1>联系站长</h1>
      </div>
      <div class="hot-article-list">
        <div style="text-indent: 2em; line-height: 20px;">如果您对我的博客有什么感兴趣的地方，欢迎联系!</div>
        <div class="ab-catch-me">
          <el-tooltip class="item" effect="dark" content="QQ" placement="bottom">
            <a :href="catchMeObj.qq" target="_blank"
            > <i class="iconfont icon-QQ"></i> </a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="微信" placement="bottom">
            <a :href="catchMeObj.wechat" target="_blank"
            > <i class="iconfont icon-wechat"></i> </a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="力扣" placement="bottom">
            <a :href="catchMeObj.leetcode" target="_blank"
            > <i class="iconfont icon-leetcode"></i> </a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="哔哩哔哩" placement="bottom">
            <a :href="catchMeObj.bilibili" target="_blank"
            > <i class="iconfont icon-bilibili-line"></i> </a>
          </el-tooltip>
          <el-tooltip class="item" content="Github" placement="bottom">
            <a :href="catchMeObj.git" target="_blank">
              <i class="iconfont icon-github"></i>
            </a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Gitee" placement="bottom">
            <a :href="catchMeObj.gitee" target="_blank"
            > <i class="iconfont icon-gitee"></i> </a>
          </el-tooltip>
        </div>
      </div>
    </div>

    <!-- 右侧上滑小图片 -->
    <div v-if="this.$store.state.themeObj.user_start != 0"
      :class="gotoTop ? 'toTop hidden' : 'toTop goTop hidden'"
      @click="toTopfun">
      <img :src="this.$store.state.themeObj.right_img
            ? this.$store.state.themeObj.right_img
            : 'static/img/scroll.png'  "  alt=""/>
    </div>


    <div
      v-else
      :class="gotoTop ? 'toTophui hidden' : 'toTophui goTophui hidden'"
      @click="toTopfun"
    >
      <img
        :src="
          this.$store.state.themeObj.right_img
            ? this.$store.state.themeObj.right_img
            : 'static/img/scroll.png'
        "
        alt=""
      />
    </div>
  </div>
</template>


<script>
import {hotArticleList} from "../api/article";
import {tagList} from "../api/tag"
import {getCategoryList} from "../api/category";

export default {
  data() {
    //选项 / 数据
    return {
      fixDo: false,
      loveme: false,
      gotoTop: false, //返回顶部
      going: false, //是否正在执行上滑动作
      browseList: "", //热门文章 浏览量最多
      artCommentList: "", //最新评论

      catchMeObj: {
        //个人信息
        git: "https://github.com/lb1098",
        gitee: "https://gitee.com/lb1098",
        leetcode: "https://leetcode.cn/u/glb2023/",
        qq: "/static/img/qq.jpg",
        wechat: "/static/img/wechat.jpg",
        bilibili: "https://space.bilibili.com/17417010",
      },
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
    getHotArticleList() {
      hotArticleList().then((response) => {
        this.browseList = response;
      });
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
    this.getHotArticleList();
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
.ab-right{
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
}
.ab-text{
  display: inline-block;
  white-space: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow:ellipsis;
}
</style>
