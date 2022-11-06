<template>
  <div class="leftTreeNav">
    <el-menu
      class="el-menu-vertical-demo"
      router
    >
      <NavItem v-for="nav in navList" :key="'nav-'+nav.id" :nav-data="nav"></NavItem>
    </el-menu>
  </div>
</template>

<script>

import {getGuideNav} from "../../api/guide";
import NavItem from "./part/NavItem";
export default {
  name: "LeftTreeNav",
  data() { //选项 / 数据
    return {
      navList:[],
    }
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    NavItem,
  },
  mounted() {
    var that = this;
    getGuideNav().then(res=>{
      that.navList=res;
    })
  },
  created() { //生命周期函数

  }
}
</script>

<style scoped>
::-webkit-scrollbar-track{
  background-color: #fff;
}

.el-menu{
  border-right: none;
}

.leftTreeNav {
  box-sizing: border-box;
  z-index: 4;
  /*position: fixed;*/
  /*overflow-x:auto;*/
  height: 100%;
  overflow-y: scroll;

}

</style>

<style>
.leftTreeNav {
  color: rgb(44,62,80);
  user-select: none;
}
.leftTreeNav .el-menu-item.is-active{
  box-sizing: border-box;
  /*margin-left: 20px;*/
  border-left:3px solid rgb(41, 128, 185);
  background-color: rgba(41, 128, 185, 0.15);
  font-weight: 700;
}
.leftTreeNav .el-menu-item,
.leftTreeNav .el-submenu__title,
.leftTreeNav .el-submenu .el-menu-item {
  height: 46px!important;
  line-height: 46px!important;
  font-size: 16px;
}
</style>
