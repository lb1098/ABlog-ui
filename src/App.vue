<template>
  <div id="app">
    <keep-alive :include="['Home','Archive','Info', 'FriendsLink', 'Reward', 'VIP']">
      <!--  :include="['Aboutme', 'Message', 'FriendsLink', 'Reward']"  -->
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css';

export default {
  name: 'App'
}
</script>

<style lang="less">
// 原博客主提色
@tcolors: #409EFF; //按钮和标签颜色
@tcolorm: #64609E; //分类的选中的颜色
@tcolord: #48456D; //按钮hover 的颜色

// /***** 粉红色主题****/
// @tcolors:#97dffd;//按钮和标签颜色
// @tcolorm:#64609E;//分类的选中的颜色
// @tcolord:#48456D;//按钮hover 的颜色
//
// /******淡黄色主题*****/
// @tcolors:#97dffd;//按钮和标签颜色
// @tcolorm:#64609E;//分类的选中的颜色
// @tcolord:#48456D;//按钮hover 的颜色
//
// /****** 淡紫色主题 ****/
// @tcolors:#97dffd;//按钮和标签颜色
// @tcolorm:#64609E;//分类的选中的颜色
// @tcolord:#48456D;//按钮hover 的颜色

/*reset*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
}

body {
  font-family: Arial, "STHeiti", Helvetica, sans-serif;
  background: #f5f6f7;
  background: url(../static/bgc/bgc1.png);
  font-size: 14px;
  color: #444 !important;
  min-height: 100vh;
  width: 100%;
  //overflow-x: hidden;
  //-webkit-overflow-x: hidden;
  -webkit-tap-highlight-color: transparent;
}

table {
  border-collapse: collapse;
  border-spacing: 0
}

fieldset, img {
  border: 0
}

legend {
  display: none
}

// address, caption, cite, code, dfn, em, strong, th, var{
//   font-style:normal;
//   font-weight:normal
// }
ol, ul {
  //list-style:none
}

caption, th {
  text-align: left
}

h1, h2, h3, h4, h5, h6 {
  font-size: 100%;
  font-weight: normal
}

q:before, q:after {
  content: ''
}

abbr, acronym {
  border: 0
}

a {
  text-decoration: none;
}

html {
  -webkit-text-size-adjust: none;
  width: 100%;
  height: 100%
}

/*????iphone??safari????????????*/
input[type="text"], input[type="button"], input[type="submit"], input[type="search"] {
  -webkit-appearance: none;

}

/*************其他内容*************/
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  //overflow-x: hidden;
  //-webkit-overflow-x: hidden;
  color: #444;
}

h1, h2 {
  font-weight: normal;
}

a {
  color: #444;
}

.ab-padding {
  padding: 15px 50px 50px;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 10px;
  // overflow-x: hidden;
  // -webkit-overflow-x: hidden;
}

//时间和标题
.s-round-date {
  position: absolute;
  top: -20px;
  left: -35px;
  height: 60px;
  width: 70px;
  padding-top: 10px;
  border-radius: 100px;
  color: #fff;
  background: @tcolors;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
}

.s-round-date span {
  text-align: center;
  display: block;
}

.s-round-date .day {
  font-size: 30px;
  font-weight: 700;
}

// 相同的标题副标题
.tcommonBox {
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  position: relative;
  background: #fff;
  padding: 15px;
  //border-radius: 5px;
  //margin-bottom: 40px;
  font-size: 15px;
  z-index: 2;
}

.tcommonBox header {
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
}

.tcommonBox header h1 {
  margin: 10px 0;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  line-height: 30px;
}

.tcommonBox header h2 {
  margin: 10px 0;
  line-height: 24px;
  text-align: center;
  color: #555;
  font-size: 14px;
}

.tcommonBox section p {
  line-height: 24px;
  margin: 10px 0;
}

.tcommonBox header h2 .el-rate, .rateBox {
  display: inline-block;
}

.tcommonBox header h2 .el-rate i {
  font-size: 16px;
}

.s-item .article-coontent {
  font-size: 15px;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
}

//标题和按钮
.s-item .article-content p {
  margin: 10px 0;
  line-height: 24px;
}

.s-item .viewdetail {
  margin: 10px 0;
  line-height: 24px;
  text-align: center;
}

.s-item .viewdetail a {
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 5px;
}

.viewmore {
  text-align: center;
  width: 100%;
}

.viewmore a {
  /*background:  #97dffd;*/
  /*padding:6px 0;*/
  border-radius: 5px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  height: 30px;
  line-height: 30px;
  display: block;
}

@media screen and (max-width: 500px) {
  //500px 手机尺寸
  .dlikeColBox { //点赞收藏手机端换行
    display: block !important;
    float: none !important;
    margin: 10px auto !important;
    text-align: center !important;
  }

  .el-message-box { //提示弹框手机框展示
    max-width: 80%;
  }

  .userInfoBox .el-input, .userInfoBox .el-textarea { //用户中心表框
    max-width: 280px !important;
  }

  .tFriendsBox .tf-item a { //好友列表自适应缩小尺寸
    padding: 0 5px 0 60px !important;

    img {
      width: 50px !important;
      height: 50px !important;
      left: 5px !important;
    }
  }
}

@media screen and (max-width: 768px) {
  .headBox {
    display: none;
  }

  .headBox-mobile {
    display: block;
  }

  .mobileBox { //手机端导航栏显示
    display: block;
  }

  .headImgBox {

  }

  .GuideMain {
    margin-left: 0 !important;
  }

  .h-information {
    //display:none;
  }

  .headImgBox .scene {
    font-size: 50px !important;
    top: 120px;
  }

  .ab-tac {
    left: 40px !important;
  }

  #leftTreeNav {
    position: fixed;
    height: 100vh;
    background-color: #fff;
  }

  .fix-btn-toggle {
    display: block;
  }
}


@media screen and (min-width: 768px) {
  .headBox {
    display: block;
  }

  .headBox-mobile {
    display: none;
  }

  .mobileBox {
    display: none;
  }

  .fix-btn-toggle {
    display: none;
  }

  .fix-btn-shadow {
    display: none;
  }
}

@media screen and  (max-width: 800px) {
  .container {
    max-width: 100% !important;
    margin: 0 auto;
  }

  .s-round-date {
    width: 0 !important;
  }

  .ui.label {
    left: -18px !important;
    padding-left: 18px !important;
  }

  .ui.label::after {
    border: none !important;
  }

  .headBox li.el-menu-item, .headBox .el-submenu__title {
    padding: 0 10px;
  }

  .headBox li.el-menu-item, .headBox .el-submenu__title:first-child {
    padding-left: 20px;
  }

  .toTop {
    display: none !important;
  }

  //隐藏上滑图标
  .hidden {
    display: none !important;
  }

  .ab-item {
    padding: 15px;
  }

  .ab-article-title {
    /*border: 1px solid #d4d4d5;*/
    font-size: 17px;
  }
}

@media screen and  (min-width: 801px) {
  .headBox li.el-menu-item, .headBox .el-submenu__title {

  }

  .ab-item {
    padding: 20px;
  }

}

@media screen and  (max-width: 990px) {
  // .hidden{
  //     display: none!important;
  // }
  div.rightlistBox .rs2.fixed {
    position: relative;
    top: 0;
    width: auto;
  }
}

@media screen and  (min-width: 991px) {
  .headBox li.el-menu-item, .headBox .el-submenu__title {
    padding: 0 20px;
  }
}

.tcolors {
  color: @tcolors;
}

.tcolorm {
  color: @tcolorm;
}

.tcolord {
  color: @tcolord;
}

.tcolors-bg {
  background: @tcolors;
  transition: all .3s ease-in-out;
}

.tcolord-bg {
  background: @tcolord;
}

.tcolors-bg:hover {
  background: @tcolord;
}

.paginationBox li.active {
  background: @tcolorm;
}

.paginationBox li:hover {
  color: @tcolord;
}

.el-pagination button:hover {
  color: @tcolord;
}


.fitImg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.maxW {
  max-width: 100%;
}

.fwb {
  font-weight: bold;
}

.right {
  float: right;
}

.left {
  float: left;
}

.btnone {
  border-top: none !important;
}

.brone {
  border-right: medium none !important;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.smalltitle {
  /*height:36px;*/
  /*line-height: 36px;*/
}

.logoImg {
  width: 160px;;
  height: 50px;
  display: inline-block;
  padding: 5px 5px;
  vertical-align: top;
}

.logoImg img {
  width: 100%;
  height: 100%;
}

//公共标签
.ui.label {
  border-color: @tcolors;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  background-color: #97dffd;
  margin: 5px 0 15px 2px;
  font-size: 14px;
  position: relative;
  left: -32px;
  border-radius: 0 4px 4px 0;
  padding: 7px 11.2px 7px 32px;
  display: inline-block;
  color: #fff;
}

.ui.label::after {
  position: absolute;
  content: '';
  top: 100%;
  left: 0;
  border-top: 0 solid transparent;
  border-right-width: 1em;
  border-right-color: @tcolord;
  border-right-style: solid;
  border-bottom: 1em solid transparent;
  border-left: 0 solid transparent;
  width: 0;
  height: 0;
}

.ui.label a {
  color: #fff;
  line-height: 100%;
}


/*css主要部分的样式*/
/*定义滚动条宽高及背景，宽高分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 5px; /*对垂直流动条有效*/
  height: 10px; /*对水平流动条有效*/
}

/*定义滚动条的轨道颜色、内阴影及圆角*/
::-webkit-scrollbar-track {
  background-color: #eee;
}

/*定义滑块颜色、内阴影及圆角*/
::-webkit-scrollbar-thumb {
  background-color: rgb(41, 128, 185);
}


.ab-text-overflow {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ab-sidebar {
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);
}
.ab-toc {
  padding: 14px 0;
}
.no-vip-color {
  color: #999 !important;
}

.vip-color {
  color: #fbb715 !important;
}

.svip-color {
  color: rgb(111, 14, 230) !important;
}
</style>
