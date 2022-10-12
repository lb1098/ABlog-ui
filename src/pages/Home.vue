<!-- 首页 -->
<template>
  <div>
    <sg-navbar></sg-navbar>
    <ab-head-img-box></ab-head-img-box>
    <div class="container">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="18" style="transition:all .5s ease-out;margin-bottom:30px;">
          <sg-articlelist></sg-articlelist>
        </el-col>
        <el-col :xs="24" :sm="6">
          <sg-rightlist></sg-rightlist>
        </el-col>
      </el-row>
    </div>
    <ab-footer></ab-footer>
  </div>
</template>

<script>
import header from '../components/header.vue'
import articlelist from '../components/articlelist.vue'
import rightlist from '../components/rightlist.vue'
import footer from "../components/footer";
import headImgBox from "../components/part/headImgBox";

export default {
  name: 'Home',
  data() { //选项 / 数据
    return {}
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    'sg-navbar': header,
    'ab-head-img-box':headImgBox,
    'sg-articlelist': articlelist,
    'sg-rightlist': rightlist,
    'ab-footer': footer,
  },
  created() { //生命周期函数

  }
}
</script>

<style>

</style>
