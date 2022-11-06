<template>
  <el-submenu  :index="this.navData.id" :title="this.navData.name" :disabled="this.navData.status==1">
    <template slot="title" >
      <i class="fa fa-folder" aria-hidden="true"></i>
      <span> {{ this.navData.name }}</span>
    </template>
    <el-menu-item
      :title="article.title"
      class="ab-text-overflow"
      :index="'/Guide/Article/'+article.id"
      :key="'/Guide/Article/'+article.id"
      v-for="article in this.navData.articles">
      <i style="color: green" class="fa fa-unlock-alt" aria-hidden="true"></i>
      <i style="color: orange" class="fa fa-lock" aria-hidden="true"></i>
      {{ article.title }}
    </el-menu-item>
    <NavItem
      v-for="nav in this.navData.childs"
      :key="'nav-'+nav.id"
      :nav-data="nav"></NavItem>
  </el-submenu>

</template>

<script>
export default {
  name: "NavItem",
  props:{
    navData: {},
  },
}
</script>

<style>
.el-submenu__title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.leftTreeNav .el-submenu__icon-arrow {
  font-size: 18px;
  font-weight: 900;
  margin-top:0;
  transform: translateY(-50%);
}

.leftTreeNav .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
  -webkit-transform: translateY(-50%) rotateZ(180deg);
  transform: translateY(-50%) rotateZ(180deg);
}
</style>
