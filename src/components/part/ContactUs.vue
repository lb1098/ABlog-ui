<template>
  <!--  联系站长   -->
  <div class="ab-sidebar">
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
        <!--          <el-tooltip class="item" effect="dark" content="微信" placement="bottom">-->
        <!--            <a :href="catchMeObj.wechat" target="_blank"-->
        <!--            > <i class="iconfont icon-wechat"></i> </a>-->
        <!--          </el-tooltip>-->
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
</template>

<script>
export default {
  name: "ContactUs",
  data() {
    //选项 / 数据
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

    };
  },
}
</script>

<style scoped>

</style>
