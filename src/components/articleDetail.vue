<!-- 文章详情模块 -->
<template>
  <div>
    <div>
      <div class="ab-detail-article">
        <div class="ab-detail-title">{{ detailObj.title }}</div>
        <el-divider></el-divider>
        <div class="ab-detail-mark">
          <span>
            <i class="fa fa-fw fa-user"></i> {{ detailObj.createByNickname }}
          </span>
          <span>
            <i class="fa fa-fw fa-clock-o"></i> {{ detailObj.createTime }}
          </span>
          <span>
            <i class="fa fa-fw fa-eye"></i> {{ detailObj.viewCount }}
          </span>
          <span>
            <i class="fa fa-fw fa-hashtag"></i>
            <el-tag size="mini" style="cursor: pointer;" effect="plain"
                    @click="goToHomeByCategoryId(detailObj.categoryId)">{{ detailObj.categoryName }}</el-tag>
          </span>
          <span v-if="detailObj.tagVos && detailObj.tagVos.length>0">
            <i class="fa fa-fw fa-tags"></i>
            <el-tag
              style="margin: 0 5px 5px 0;cursor: pointer;"
              v-for="(citem, cindex) in detailObj.tagVos" :key="'tagVo' + cindex"
              type="info"
              effect="plain"
              @click="goToHomeByTagId(citem.id)"
              size="mini">{{ citem.name }}</el-tag>
          </span>
        </div>
      </div>

      <div class="ab-detail-centent">
        <div class="item-thumb"
             v-if="detailObj.thumbnail"
             :style="{
                 'background-image':'url('+detailObj.thumbnail+')'
               }"
        >
        </div>
        <div class="ab-detail">
          <div class="ab-detail-summary markdown-body" v-if="detailObj.summary" v-html="detailObj.summary"></div>

          <!-- <div class="article-content markdown-body" v-html="detailObj.content"></div>-->

          <mavon-editor
            class="md"
            :subfield="false"
            :defaultOpen="'preview'"
            :toolbarsFlag="false"
            :editable="false"
            :scrollStyle="true"
            :ishljs="true"
            v-html="detailObj.content"
            style="min-height: auto;box-shadow: none;z-index: 0"
          >

          </mavon-editor>

          <div class="ab-detail-bottom">
            <el-row>
              <el-col :span="8">
                <span>
                  <i class="fa fa-fw fa-clock-o"></i>最后修改：{{ detailObj.updateTime }}
                </span>
              </el-col>

              <el-col :span="8" style="text-align: center">
                <el-link type="warning" @click="pdonate=!pdonate" >
                  <i class="fa fa-fw fa-cny"></i>赞赏
                </el-link>
              </el-col>

              <el-col :span="8">
                <el-tooltip class="item" effect="dark" content="转载请保留本文转载地址，著作权归作者所有" placement="top">
                  <span style="float: right;">
                    <i class="fa fa-fw fa-copyright"></i>允许规范转载
                  </span>
                </el-tooltip>
              </el-col>

            </el-row>
          </div>
          <div class="donate">
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
          </div>
        </div>
      </div>
    </div>

    <sg-message v-if="detailObj.isComment==0"></sg-message>
  </div>
</template>

<script>
import {initDate} from '../utils/server.js'
import {getArticle, updateViewCount} from '../api/article.js'
import {mavonEditor} from 'mavon-editor'
import message from '../components/message.vue'
import treeNav from "./part/treeNav";
import 'mavon-editor/dist/markdown/github-markdown.min.css';

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
    getArticleDetail: function () {
      getArticle(this.aid).then((response) => {
        this.detailObj = response
        const markdownIt = mavonEditor.getMarkdownIt()
        this.detailObj.content = markdownIt.render(response.content);
        if(response.summary)
          this.detailObj.summary = markdownIt.render('> '+response.summary);
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
      } else {
        that.haslogin = false;
      }
      //获取详情接口
      this.getArticleDetail()
      updateViewCount(that.aid)
    },
    goToHomeByTagId(id){
      this.$router.push("/Home?tagId="+id);
    },
    goToHomeByCategoryId(id){
      this.$router.push("/Home?categoryId="+id);
    },
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange'
  },
  components: {
    //定义组件
    'sg-message': message,
    treeNav,
  },
  created() {
    //生命周期函数
    this.routeChange();
  },

}
</script>

<style lang="less">
.detailBox {
  position: relative;
}

.category {

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
  margin: 0px 0;
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

.ab-img {
  width: 100px;
  display: block;
}

.ab-detail-article {
  border-radius: 5px;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 20px;
}

.el-divider {
  margin: 12px 0;
}

.ab-detail-title {
  color: #000;
  font-size: 36px;
}

.item-thumb {
  min-height: 190px;
  background-position: center center;
  background-size: cover;
  transition: transform .5s;
}

.item-thumb:hover {
  transform: scale3d(1.1, 1.1, 1);
}

.ab-detail-centent {
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
  margin-bottom: 20px;
}
.ab-detail {
  padding: 20px;
}
.ab-detail-summary {
  padding-bottom: 20px;
}

.ab-detail-bottom {
  margin: 20px 0 ;
  color: rgb(155, 155, 155);
}

</style>
