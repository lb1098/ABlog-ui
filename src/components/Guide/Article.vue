<template>
  <div class="GuideMain" v-loading="articleLoading">
    <!-- 右侧上滑小图片 -->
    <el-backtop
      target=".GuideMain"
      :visibility-height="50"
      :right="100"
      :bottom="100"
    >
    </el-backtop>
    <div class="contentMain">
      <div class="contentTitle">
<!--        <i v-if="articleObj.buyed" style="color: green" class="fa fa-unlock-alt" aria-hidden="true"></i>-->
<!--        <i v-else style="color: orange" class="fa fa-lock" aria-hidden="true"></i>-->
        {{ articleObj.title }}
      </div>
      <div class="ab-detail-mark">
        <span>
          <i class="fa fa-fw fa-user"></i><a style="color: #409eff" :href="'#/Space/'+articleObj.createBy">{{ articleObj.createByNickname }}</a>
        </span>
        <span>
          <i class="fa fa-fw fa-clock-o"></i> {{ articleObj.createTime }}
        </span>
        <span>
          <i class="fa fa-pie-chart" aria-hidden="true"></i> 全文约 {{ articleObj.allWordSize }} 字
        </span>
        <span v-if="articleObj.hasHidden">
          <i class="fa fa-pie-chart" aria-hidden="true"></i> 隐藏内容约 {{ articleObj.hiddenWordSize }} 字
        </span>
        <span v-if="!articleObj.buyed">
          <i class="fa fa-lock" aria-hidden="true"></i>
          <span >需{{ articleObj.fundLimit }}积分</span>
          <span v-if="articleObj.vipLevelLimit>0">&
            <span
              :class="{'vip-color':articleObj.vipLevelLimit==1,'svip-color': articleObj.vipLevelLimit==2}"
              class="iconfont icon-vip"></span>
          </span>
        </span>
        <span v-else><i class="fa fa-unlock-alt" aria-hidden="true"></i> 已解锁</span>
      </div>
      <hr>
      <div class="ab-detail-summary markdown-body" v-if="articleObj.summary" v-html="articleObj.summary"></div>
      <div style="height: 400px" v-if="articleObj.guideVideoUrl">
        <iframe :src="articleObj.guideVideoUrl"
                height=100% width=100% scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>
      </div>
      <div class="content-style">
        <mavon-editor
          :subfield="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :editable="false"
          :ishljs="true"
          :navigation="false"
          v-model="articleObj.content"
          style="
            min-height: auto;
            box-shadow: none;
            z-index: 0;
          "
        >
        </mavon-editor>
      </div>

      <div class="hidden-section" v-if="articleObj.hasHidden">
        <div v-if="!haslogin">
          <div><b>您当前暂未登录，无法查看隐藏内容</b></div>
        </div>
        <div v-else>
          <div v-if="!articleObj.buyed">
            <b v-if="articleObj.nowViplevel<articleObj.vipLevelLimit">您当前不是
              <span
                :class="{'vip-color':articleObj.vipLevelLimit==1,'svip-color': articleObj.vipLevelLimit==2}"
                class="iconfont icon-vip"></span> 会员 ，前往升级
              <span class="btn-update-vip" @click="goToVip()">升级VIP</span>
            </b>
            <b v-else>
              此内容查看价格为 {{ articleObj.fundLimit }} 积分 <span class="btn-buy" @click="buyArticle">立即购买</span>
            </b>
          </div>
        </div>
        <div class="hidden-content hidden-data" v-if="articleObj.hiddenData && articleObj.hiddenData.length>0">
          <div class="hidden-title">隐藏资源</div>
          <mavon-editor
            :subfield="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :editable="false"
            :ishljs="true"
            :navigation="false"
            v-model="articleObj.hiddenData"
            style="
                  min-height: auto;
                  box-shadow: none;
                  z-index: 0;
                  "
          >
          </mavon-editor>
        </div>
        <div class="hidden-content hidden-guide" v-if="articleObj.hiddenGuide && articleObj.hiddenGuide.length>0">
          <div class="hidden-title">隐藏内容</div>
          <mavon-editor
            :subfield="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :editable="false"
            :ishljs="true"
            :navigation="false"
            v-model="articleObj.hiddenGuide"
            style="
                  min-height: auto;
                  box-shadow: none;
                  z-index: 0;
                  "
          >
          </mavon-editor>
        </div>
      </div>

      <div class="donate">
        <el-row :class="pdonate?'donate-body':'donate-body donate-body-show'" :gutter="30">
          <el-col :span="12" class="donate-item">
            <div class="donate-tip">
              <img src="static/img/wx_pay.png"/>
              <span>微信扫一扫，向我赞赏</span>
            </div>
          </el-col>
          <el-col :span="12" class="donate-item">
            <div class="donate-tip">
              <img src="static/img/ali_pay.jpg"/>
              <span>支付宝扫一扫，向我赞赏</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="ab-detail-bottom">
        <el-row>
          <el-col :span="8">
                <span>
                  <i class="fa fa-fw fa-clock-o"></i>上次编辑于：{{ articleObj.updateTime }}
                </span>
          </el-col>

          <el-col :span="8" style="text-align: center">
            <el-link type="warning" @click="pdonate=!pdonate">
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

      <hr>
      <ab-footer></ab-footer>
    </div>
    <!--  TODO 右边导航栏，后续增加   -->

  </div>
</template>

<script>
import footer from "../footer";
import {buyGuideArticle, getGuideArticle} from "../../api/guide";
import {getToken} from '../../utils/auth'

export default {
  name: "GuideMain",
  data() { //选项 / 数据
    return {
      articleLoading:true,
      haslogin: false, //是否已登录
      pdonate: true,
      articleObj: {},//返回详情数据
      articleId: 0,
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange',
  },
  mounted() {
    this.routeChange();
  },
  methods: { //事件处理器
    routeChange() {
      var that = this;
      that.articleLoading = true;
      // 判断是否登录
      if (getToken() && localStorage.getItem("userInfo"))
        that.haslogin = true;
      else
        that.haslogin = false;
      // 获取ID号
      that.id = that.$route.params.id
      getGuideArticle(that.id).then(res => {
        that.articleObj = res;
        that.articleLoading = false;
      })
    },
    goToVip() {
      // 先判断是否登录过
      if (this.haslogin) {
        this.$confirm('您当前已经登录，是否前往升级会员？', '提示', {
          confirmButtonText: '前往升级会员',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push("/VIP")
        })
      } else {
        this.$confirm('您当前未登录，请先前往登录', '提示', {
          confirmButtonText: '登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push("/Login?login=1")
        })
      }
    },
    buyArticle() {
      this.$confirm('你确定要花费' + this.articleObj.fundLimit + '积分购买吗？', '购买', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        buyGuideArticle(this.id).then(res=>{
          this.$notify({
            message: '购买成功',
            type: 'success'
          });
          this.$router.go(0);
        })
      })

    },
  },
  components: { //定义组件
    "ab-footer": footer,
  },
}
</script>

<style>
b {
  font-weight: 700;
}

.GuideMain {
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 0 25px;
  margin-left: 40px;
}

.v-note-wrapper .v-note-panel .v-note-show .v-show-content {
  background-color: inherit !important;
  padding: 0 !important;
}

.contentMain {
  max-width: 960px;
  width: 100%;
  margin: auto;
}

.contentTitle {
  font-size: 2.2rem;
  margin-top: 3rem;
  margin-bottom: 16px;
  position: relative;
}

.contentTitle > i {

}

.ab-detail-summary {
  padding: 13px 45px !important;
  border-left: 3px solid #dde6e9 !important;
  background-color: #f3f5f7;
}

.ab-detail-mark {

}

hr {
  border: 0;
  border-top: 1px solid #eaecef;
}

.hidden-content {
  padding: 40px 0px 10px;
  position: relative;
}

.content-style {

}

.hidden-section {
  margin-top: 10px;
  border: 1px dashed rgba(255, 95, 51, .3);
  padding: 10px 15px;
  border-radius: 5px;
}

.hidden-guide {
  /*border: 2px dashed #ff5f33;*/

}

.hidden-data {
  /*border: 2px dashed #ff5f33;*/
}

.hidden-title {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 700;
  color: rgba(0,0,0,0.3);
  font-size: 16px;
  z-index: 2;
}

.btn-update-vip {
  border-radius: 20px;
  display: inline-block;
  background-image: linear-gradient(90deg, rgba(240, 214, 141, 1) 0%, rgba(224, 191, 115, 1) 100%);
  color: #4e342e !important;
  padding: 7px 18px;
  text-decoration: none !important;
  font-size: 14px;
  line-height: 1;

  user-select: none;
  cursor: pointer;
}

.btn-buy {
  border-radius: 20px;
  display: inline-block;
  background: #ff5f33;
  color: #fff !important;
  padding: 7px 18px;
  text-decoration: none !important;
  font-size: 14px;
  line-height: 1;
  user-select: none;
  cursor: pointer;
}

.ab-detail-bottom {
  margin-top: 40px;
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

.ab-detail-mark > span {
  margin-right: 5px;
}

</style>
