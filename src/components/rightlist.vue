<!-- 右侧固定导航栏 -->
<template>
  <div class="rightlistBox">
    <div>
      <div class="ab-title">
        <h1>热门文章</h1>
      </div>

      <div class="hot-article-list">
        <div v-for="(item, index) in browseList" :key="'browseList' + index">
          <a :href="'#/DetailArticle?aid=' + item.id" target="_blank">{{item.title }}</a>
          <span>—— {{ item.viewCount }} 次围观</span>
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
    getHotArticleList() {
      hotArticleList().then((response) => {
        this.browseList = response;
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

  },
};
</script>

<style lang="less">
.rightlistBox {
  position: relative;
  background-color: #fff;
  z-index: 3;
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
  border: 1px solid #d4d4d5;
  display: block;
  line-height: 20px;
  padding: 14px;
  border-radius: 5px 5px 0 0;
  background-color: #fff;
}

.ab-title h1 {
  font-weight: 700;
  font-size: 20px;
  color: #409EFF;
}
.hot-article-list {
  padding: 14px;
  border: 1px solid #d4d4d5;
  border-top: 0;
}
.hot-article-list div {
  line-height: 16px;
  font-size: 16px;
  padding: 5px 0;
}
.hot-article-list a {
  display: inline-block;
  width:50%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space:nowrap;
}
.hot-article-list span {
  float: right;
}
</style>
