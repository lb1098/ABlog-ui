<template>
  <div>
    <el-menu
      class="el-menu-demo"
      :default-active="activeIndex"
      :router="true"
      background-color="#fbfbfb"
      text-color="#888"
      style="text-align: center"
    >
      <el-menu-item index="/User/Info">
        <span slot="title" >用户资料</span>
      </el-menu-item>
      <el-menu-item index="/User/Notify">
        <span slot="title" >评论通知</span>
      </el-menu-item>
      <el-menu-item index="/User/ModifyPassword">
        <span slot="title" >修改密码</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: "UserLeftList",
  data() { //选项 / 数据
    return {
      activeIndex: '/', //当前选择的路由模块
    }
  },
  methods:{
    routeChange: function () {
      this.activeIndex = this.$route.path == '/' ? '/Home' : this.$route.path;

    },
  },
  created() {
    this.routeChange();
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange'
  },
}
</script>

<style scoped>
.el-menu{
  border-right: 0;
}
.el-menu-item{
  height: 40px;
  line-height: 40px;
}
</style>
