<template>
  <div id="headImgBox" class="headImgBox"
       :style="{background: 'center',backgroundImage:'url(static/img/bgc.jpg)'}">

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
    // $(".headImgBox").height($(window).height() *0.8)
    // $(window).resize(function () {
    //   $(".headImgBox").height($(window).height()*0.8)
    // });
  }
}
</script>

<style scoped>
/*头部背景图*/
* {
  user-select: none;
}
.headImgBox {
  height: 350px;
  position: relative;
  width: 100%;
  background-size: cover;
  background-position: center 50%;
  background-repeat: no-repeat;
  margin-bottom: 50px;
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
