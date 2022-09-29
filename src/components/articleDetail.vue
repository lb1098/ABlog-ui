<!-- 文章详情模块 -->
<template>
  <div>
    <div class="detailBox tcommonBox">
      <header>
        <a class="category" :href="'#/Home?categoryId='+detailObj.categoryId">
          <el-tag effect="plain">{{ detailObj.categoryName }}
          </el-tag>
        </a>
        <h1>
          <a>
            {{ detailObj.title }}
          </a>
        </h1>
        <h2>
          <i class="fa fa-fw fa-clock-o"></i><span> {{ detailObj.createTime }}</span>
          <i class="fa fa-fw fa-eye"></i> {{ detailObj.viewCount }} 次围观
        </h2>

      </header>
      <div id="article1" class="article-content markdown-body" v-html="detailObj.content"></div>

      <div class="donate">
        <div class="donate-word">
          <span @click="pdonate=!pdonate">赞赏</span>
        </div>
        <el-row :class="pdonate?'donate-body':'donate-body donate-body-show'" :gutter="30">
          <el-col :span="12" class="donate-item">
            <div class="donate-tip">
              <img :src="detailObj.wechat_image?detailObj.wechat_image: 'static/img/wx_pay.png'"
                   :onerror="$store.state.errorImg"/>
              <span>微信扫一扫，向我赞赏</span>
            </div>
          </el-col>
          <el-col :span="12" class="donate-item">
            <div class="donate-tip">
              <img :src="detailObj.alipay_image?detailObj.alipay_image:'static/img/ali_pay.jpg'"
                   :onerror="$store.state.errorImg"/>
              <span>支付宝扫一扫，向我赞赏</span>
            </div>
          </el-col>
        </el-row>
        <div class="last_update_time" v-if="detailObj.updateTime">最后更新时间：{{detailObj.updateTime}}</div>
      </div>
    </div>
    <tree-nav ref="treenav"></tree-nav>
    <sg-message v-if="detailObj.isComment==0"></sg-message>
  </div>
</template>

<script>
import {initDate} from '../utils/server.js'
import {getArticle, updateViewCount} from '../api/article.js'
import {mavonEditor} from 'mavon-editor'
import message from '../components/message.vue'
import treeNav from "./part/treeNav";
import "mavon-editor/dist/markdown/github-markdown.min.css";
import "mavon-editor/dist/highlightjs/styles/github-dark-dimmed.min.css";

export default {
  data() { //选项 / 数据
    return {
      aid: '',//文章ID
      pdonate: true,//打开赞赏控制,
      detailObj: {},//返回详情数据
      haslogin: false,//是否已经登录
      userId: '',//用户id
    }
  },
  methods: { //事件处理器
    showInitDate: function (date, full) {//年月日的编辑
      // console.log(detailObj.create_time,date,full);
      return initDate(date, full);
    },
    getArticleDetail: function () {
      getArticle(this.aid).then((response) => {
        this.detailObj = response
        const markdownIt = mavonEditor.getMarkdownIt()
        // markdownIt.re
        this.detailObj.content = markdownIt.render(response.content);
        // markdown 侧边滚动
        // this.$refs.treenav.tocAndCli();
      })
    },
    routeChange: function () {
      var that = this;
      that.aid = that.$route.query.aid == undefined ? 1 : parseInt(that.$route.query.aid);//获取传参的aid
      //判断用户是否存在
      if (localStorage.getItem('userInfo')) {
        that.haslogin = true;
        that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        that.userId = that.userInfo.userId;
        // console.log(that.userInfo);
      } else {
        that.haslogin = false;
      }
      //获取详情接口
      this.getArticleDetail()
      updateViewCount(that.aid)
    },

  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange'
  },
  components: { //定义组件
    'sg-message': message,
    treeNav,

  },
  created() { //生命周期函数
    var that = this;

    this.routeChange();
  },

}
</script>

<style lang="less">
.detailBox {
  border: 1px solid #d4d4d5;
  position: relative;
}
.category {
  position: absolute;
  top:15px;
}
.last_update_time {
  text-align: right;
  font-size: 20px;
  font-family: 微软雅黑;
  font-style: italic;
}

/*点赞 收藏*/
.dlikeColBox {
  display: inline-block;
  float: right;
}

.dlikeBox, .dcollectBox {
  display: inline-block;
  padding: 0 10px;
  height: 35px;
  color: #e26d6d;
  line-height: 35px;
  border-radius: 35px;
  border: 1px solid #e26d6d;
  cursor: pointer;
}

/*赞赏*/
.donate-word {
  margin: 40px 0;
  text-align: center;
}

.donate-word span {
  display: inline-block;
  width: 80px;
  height: 34px;
  line-height: 34px;
  color: #fff;
  background: #e26d6d;
  margin: 0 auto;
  border-radius: 4px;
  cursor: pointer;
}

.donate-body {
  display: none;
}

.donate-body-show {
  display: block;
}

.donate-item {
  text-align: right;
}

.donate-item:last-child {
  text-align: left;
}

.donate-item img {
  width: 100%;
  display: block;
  height: auto;
}

.donate-item div {
  display: inline-block;
  width: 150px;
  padding: 0 6px;
  box-sizing: border-box;
  text-align: center;
}

.donate-item div span {
  display: inline-block;
  width: 100%;
  margin: 10px 0;
  text-align: center;
}

.donate-body .donate-item:first-of-type div {
  color: #44b549;
}

.donate-body .donate-item:nth-of-type(2) div {
  color: #00a0e9;
}

.bd_weixin_popup {
  position: fixed !important;
}

</style>
