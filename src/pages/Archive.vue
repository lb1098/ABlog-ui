<template>
  <div>
    <sg-navbar></sg-navbar>
    <ab-head-img-box></ab-head-img-box>
    <div class="container">
      <el-row  :gutter="10">
        <el-col class="hidden-xs-only" :xs="24" :sm="5" >
          <ab-leftlist></ab-leftlist>
        </el-col>
        <el-col :xs="24" :sm="14" style="transition:all .5s ease-out;margin-bottom:30px;">
          <ab-archiveList></ab-archiveList>
        </el-col>
        <el-col :xs="24" :sm="5" >
          <sg-rightlist></sg-rightlist>
        </el-col>
      </el-row>
    </div>
    <ab-footer></ab-footer>
  </div>
</template>

<script>
import header from "../components/header";
import rightlist from "../components/rightlist";
import archiveList from "../components/ArchiveList";
import footer from "../components/footer";
import headImgBox from '../components/part/headImgBox'
import leftlist from "../components/leftlist";

export default {
  name: "Archive",
  data() { //选项 / 数据
    return {

    }
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    'sg-navbar':header,
    'ab-archiveList':archiveList,
    'ab-leftlist':leftlist,
    'sg-rightlist':rightlist,
    'ab-footer': footer,
    'ab-head-img-box':headImgBox,
  },
  created() { //生命周期函数

  }

}
</script>

<style scoped>

</style>
