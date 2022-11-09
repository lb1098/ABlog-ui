<template>
  <div>
    <sg-navbar></sg-navbar>
    <ab-head-img-box title="个人空间"></ab-head-img-box>
    <div class="container">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="6">
          <ab-userinfo></ab-userinfo>
        </el-col>
        <el-col :xs="24" :sm="18">
          <div class="tcommonBox">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="Ta的文章" name="first">
                <ab-user-article></ab-user-article>
              </el-tab-pane>
              <el-tab-pane label="Ta的教程" name="second">
                <ab-user-guide></ab-user-guide>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </div>
    <ab-footer></ab-footer>
  </div>
</template>

<script>
import header from "../../components/header";
import footer from "../../components/footer";
import {getToken} from "../../utils/auth";
import Userinfo from "../../components/Space/Userinfo";
import headImgBox from "../../components/part/headImgBox";
import UserArticle from "../../components/Space/UserArticle";
import UserGuide from "../../components/Space/UserGuide";


export default {
  name: "space",
  components: { //定义组件
    'sg-navbar': header,
    'ab-head-img-box':headImgBox,
    'ab-footer': footer,
    'ab-userinfo':Userinfo,
    'ab-user-article':UserArticle,
    'ab-user-guide':UserGuide,
  },
  data() { //选项 / 数据
    return {
      id:"-1",
      activeName:'first',
    }
  },
  computed:{

  },
  watch: {
    '$route': 'routeChange',
  },
  mounted() {
    this.routeChange();
  },
  methods: { //事件处理器
    routeChange() {
      // console.log(this.$route.path)
      this.id = this.$route.params.id;
    },
  },
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  box-sizing: border-box;
}
.tcommonBox {
  border-radius: 5px;
}
.nav .el-menu-item{
  font-size: 16px;
  font-weight: 500;
}
.nav .el-menu.el-menu--horizontal{
  border-bottom: none;
}
</style>
