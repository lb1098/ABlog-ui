<template>
  <div class="GuideMain">
    <div class="contentMain">
      <div class="contentTitle">
        <i style="color: green" class="fa fa-unlock-alt" aria-hidden="true"></i>
        <i style="color: orange" class="fa fa-lock" aria-hidden="true"></i>
        {{ detailObj.title }}
      </div>
      <div class="ab-detail-mark">
        <span>
          <i class="fa fa-fw fa-user"></i> {{ detailObj.createByNickname }}
        </span>
        <span>
          <i class="fa fa-fw fa-clock-o"></i> {{ detailObj.createTime }}
        </span>
        <span>
          <i class="fa fa-book" aria-hidden="true"></i> 约 100 字
        </span>
        <span>
          <i class="fa fa-lock" aria-hidden="true"></i> 需13积分 或 <span class="iconfont icon-vip vip-color"></span>
        </span>
      </div>
      <hr>
      <div class="ab-detail-summary markdown-body" v-if="detailObj.summary" v-html="detailObj.summary"></div>
      <div class="content-style">
        <mavon-editor
          :subfield="false"
          defaultOpen="preview"
          :toolbarsFlag="false"
          :editable="false"
          :ishljs="true"
          :navigation="false"
          v-model="detailObj.content"
          style="
            min-height: auto;
            box-shadow: none;
            z-index: 0;
          "
        >
        </mavon-editor>
      </div>
      <div class="hidden-section">
        <b>此内容查看价格为13积分（VIP免费 <span class="btn-update-vip">升级VIP</span>）<span class="btn-buy">立即购买</span></b>
      </div>

      <div class="hidden-section">
        <div class="hidden-content hidden-data">
          <div class="hidden-title">付费资源</div>
          <mavon-editor
            :subfield="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :editable="false"
            :ishljs="true"
            :navigation="false"
            v-model="detailObj.hiddenData"
            style="
                min-height: auto;
                box-shadow: none;
                z-index: 0;
                "
          >
          </mavon-editor>
        </div>

        <div class="hidden-content hidden-guide">
          <div class="hidden-title">付费内容</div>
          <mavon-editor
            :subfield="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            :editable="false"
            :ishljs="true"
            :navigation="false"
            v-model="detailObj.hiddenContent"
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
      <div class="ab-detail-bottom">
        <el-row>
          <el-col :span="8">
                <span>
                  <i class="fa fa-fw fa-clock-o"></i>上次编辑于：{{ detailObj.updateTime }}
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


export default {
  name: "GuideMain",
  data() { //选项 / 数据
    return {
      pdonate: true,
      detailObj: {
        "categoryId": "7",
        "categoryName": "博客",
        "content": "# Blog升级需求分析\n\n## 当前已经完成的功能\n\n- 用户模块\n   - 登录、注册、图像、邮箱验证\n   - 通知模块\n   - 个人资料修改\n- 博文模块\n   - 博文归档\n   - 详细博文\n   - 博文评论\n- 友链+留言录\n\n## 博客1.1小版本更新规划\n\n### 需要修复（已修复）\n- ~~修复 友链的评论 ，页面修为留言板~~ \n- ~~修复 登录、注册页面对齐调优~~\n- ~~修复 修改首页页面，增加页头或面包屑~~\n- ~~修复 图片变化较大的问题~~\n- ~~修复 各个页面的背景图需要大修,每个对应每个页面等。~~\n- ~~修复 导航栏大修，更新为原始版本的Element UI~~\n- ~~修复 通知界面，修改为b站那样~~\n\n### 小功能补充（已修复）\n- ~~新增 文章最新评论~~\n- ~~新增 最新留言（留言板）~~\n- ~~新增 忘记密码~~、\n  - bug - 忘记密码修改密码后需要刷新，否则会出错。\n\n## 博客2.0大版本更新规划\n\n### 新增功能\n- 增加使用[Spring Validation](https://bbs.huaweicloud.com/blogs/352491)\n\n- 会员积分系统\n   - 积分 与 RMB 比例 1:100\n   - 打卡\n      - 获得积分\n   - 会员积分\n   - 积分充值记录\n   - 积分购买、获得与消费记录\n   - 充值系统\n      - 由于无SDK，只能审核充值\n   - 是普通会员、是VIP会员\n\n- 教程页（独立于之前的博文，增加新的列属性）\n   - 树状显示路径\n   - 教程MD页面+评论区\n   - 付费教程\n\n- 资源页（同教程页，但是type类型不同）\n   - 树状显示路径\n   - MD页面+评论区\n   - 付费链接\n\n- 个人空间\n  - 包括个人发的博文、教程、资源信息、以及个人信息\n  - 新增 前台博文发表（审核--需要权限）\n  - 新增 博客回收站 （真实删除文章--需要权限）\n  - 新增 外部添加友链功能（个人空间设置）\n  - 新增 修改密码（个人空间设置） \n  - 个人资料页\n    - 调整页面。\n  - 聊天留言\n    - 结合通知页面。\n \n- 备忘录\n\n- QQ 授权登录\n\n### 数据维护\n- minio 文件备份\n- mysql 数据备份\n\n### 后台重新维护\n- 角色权限细化、后端权限细化、前台细化\n- 新增上述模块对应后台维护\n- 新增数据维护（资料）\n",
        "createBy": "1",
        "createByNickname": "abin",
        "createTime": "2022-10-19 19:20:22",
        "id": "23",
        "isComment": "0",
        "summary": "接下来的博客更新需求设计",
        "tagVos": [
          {
            "id": "9",
            "name": "SpringBoot"
          },
          {
            "id": "11",
            "name": "Java"
          },
          {
            "id": "13",
            "name": "更新"
          }
        ],
        "thumbnail": "http://43.143.115.189:9000/public/public_1666178374524.jpg",
        "title": "ABinBlog升级计划",
        "updateTime": "2022-10-28 22:55:53",
        "viewCount": "328",
        'hiddenContent': '方式一：\n' +
          '```\n' +
          ':> filename\n' +
          '```\n' +
          '\n' +
          '方式二：\n' +
          '```\n' +
          '> filename\n' +
          '```\n' +
          '\n' +
          '方式三：\n' +
          '```\n' +
          'echo "" > filename\n' +
          '```\n' +
          '\n' +
          '方式四：\n' +
          '```\n' +
          'echo filename\n' +
          '```\n' +
          '\n' +
          '> 个人推荐方式二，直接 > filename',
        'hiddenData': '百度网盘链接：https://pan.baidu.com/s/xxx123123123213',
      },//返回详情数据
    }
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    "ab-footer": footer,
  },
  created() { //生命周期函数

  }
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
  border: 2px dashed rgba(255, 95, 51, .3);
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
  left: 0;
  font-weight: 700;
  color: #ff5f33;
  font-size: 20px;
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
.ab-detail-mark span {
  margin-right: 5px;
}

</style>
