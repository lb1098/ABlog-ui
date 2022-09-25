<template>
  <div>
    <sg-nav></sg-nav>
    <div class="container">
      <el-row class="error404">
        <div style="font-size: 80px">404 页面未找到</div>
      </el-row>
    </div>
    <ab-footer></ab-footer>
  </div>
</template>

<script>
import header from '../components/header.vue'
import footer from "../components/footer";

export default {
  name: "Error",
  data() { //选项 / 数据
    return {

    }
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    'sg-nav': header,
    'ab-footer': footer,
  },
  created() { //生命周期函数

  }
}

</script>

<style scoped>
.error404 {
  padding: 30px 0;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
}
</style>
