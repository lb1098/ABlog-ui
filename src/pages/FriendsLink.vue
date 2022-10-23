<!-- 友情链接 -->
<template>
  <div>
    <sg-nav></sg-nav>
    <ab-head-img-box title="友链和留言板"></ab-head-img-box>
    <div class="container">
      <el-row :gutter="10">
        <el-col class="hidden-xs-only" :xs="24" :sm="5" >
          <ab-leftlist></ab-leftlist>
        </el-col>
        <el-col :xs="24" :sm="14" style="transition:all .5s ease-out;margin-bottom:30px;">
          <sg-friends></sg-friends>
          <h1 style="
            background: #fff;
            padding: 15px;
            text-align: center;
            padding-bottom: 0;
            border-radius: 5px;
            font-size: 32px;
            font-weight: 700;
            "
          >留言板</h1>
          <sg-message></sg-message>
        </el-col>
        <el-col :xs="24" :sm="5">
          <sg-rightlist></sg-rightlist>
        </el-col>
      </el-row>
    </div>
    <ab-footer></ab-footer>
  </div>
</template>

<script>
import header from '../components/header.vue'
import friends from '../components/friends.vue'
import rightlist from '../components/rightlist.vue'
import message from '../components/message.vue'
import footer from "../components/footer";
import headImgBox from "../components/part/headImgBox";
import leftlist from "../components/leftlist";

export default {
  name: 'FriendsLink',
  data() { //选项 / 数据
    return {}
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    'sg-nav': header,
    'ab-head-img-box':headImgBox,
    'sg-message': message,
    'sg-friends': friends,
    'ab-leftlist':leftlist,
    'sg-rightlist': rightlist,
    'ab-footer': footer,
  },
  created() { //生命周期函数

  }
}
</script>

<style>

</style>
