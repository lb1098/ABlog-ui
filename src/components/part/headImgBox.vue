<template>
  <div id="headImgBox" class="headImgBox"
       :style="{backgroundImage:this.$store.state.themeObj.top_image?'url('+this.$store.state.themeObj.top_image+')':'url(static/img/headbg05.jpg)'}">
    <div class="scene">
      <div><span id="luke"></span></div>

    </div>
    <div class="h-information">
      <img
        :src="this.$store.state.themeObj.head_portrait?this.$store.state.themeObj.head_portrait:'static/img/tou.png'"
        alt="">
      <h2 class="h-description">
        {{ this.$store.state.themeObj.autograph ? this.$store.state.themeObj.autograph : "每一步，都是更接近目标的一步" }}
      </h2>

      <div class="bottom-body">
        <div class="catch-me">
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
    <div class="ab-bottom-tip">
      <div>向下滚动</div>
      <div><i class="el-icon-arrow-down"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headImgBox",
  data() {
    return {
      catchMeObj: {
        //个人信息
        git: "https://github.com/lb1098",
        gitee: "https://gitee.com/lb1098",
        leetcode: "https://leetcode.cn/u/glb2023/",
        qq: "/static/img/qq.jpg",
        wechat: "/static/img/wechat.jpg",
        bilibili: "https://space.bilibili.com/17417010",
      },
    }
  },
  mounted: function () {
    $(".headImgBox").height($(window).height() *0.8)
    $(window).resize(function () {
      $(".headImgBox").height($(window).height()*0.8)
    });
  }
}
</script>

<style scoped>
/*头部背景图*/
* {
  user-select: none;
}
.headImgBox {
  height: 650px;
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  margin-bottom: 50px;
  z-index: 3;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

.h-information {
  text-align: center;
  width: 100%;
  margin: auto;
  position: absolute;
  bottom: 10%;
  padding: 40px 0;
  font-size: 16px;
  opacity: 0.98;
  /*background: rgba(230, 244, 249, 0.8);*/
  border-radius: 5px;
  z-index: 1;
  animation: b 1s ease-out;
  -webkit-animation: b 1s ease-out;
}

.h-description {
  color: white;
}
.bottom-body {
  margin-top: 15px;
}
.catch-me a{
  display: inline-block;
  margin-bottom: 7px;
  position: relative;
  text-decoration: none;
  width: 50px;

}
.catch-me a i{
  font-size: 30px;
  color: white;
  opacity: 85%;
}
.ab-bottom-tip{
  position: absolute;
  bottom: 5px;
  text-align: center;
  width: 100%;
  color: white;
}
.ab-bottom-tip i {
  font-size: 24px;
}
</style>
