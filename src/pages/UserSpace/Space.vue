<template>
  <div>
    <sg-navbar></sg-navbar>
    <div class="container">

    </div>


    <ab-footer></ab-footer>
  </div>
</template>

<script>
import header from "../../components/header";

import footer from "../../components/footer";

export default {
  name: "space",
  data() { //选项 / 数据
    return {}
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    'sg-navbar': header,

    'ab-footer': footer,
  },
  created() { //生命周期函数

  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
