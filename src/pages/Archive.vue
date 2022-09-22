<template>
  <div>
    <sg-navbar></sg-navbar>
    <div class="container">
      <el-row  :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <ab-archiveList></ab-archiveList>
        </el-col>
        <el-col :sm="24"  :md="8" >
          <sg-rightlist></sg-rightlist>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import header from "../components/header";
import rightlist from "../components/rightlist";
import archiveList from "../components/ArchiveList";
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
    'sg-rightlist':rightlist,
  },
  created() { //生命周期函数

  }

}
</script>

<style scoped>

</style>
