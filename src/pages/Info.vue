<template>
  <div>
    <sg-nav></sg-nav>
    <ab-head-img-box></ab-head-img-box>
    <div class="container">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="18" style="transition:all .5s ease-out;margin-bottom:30px;">
          <div class="leftRight">
            <el-alert
              title="博客前端"
              type="success"
              :closable="false"
              description="博客采用前后端分离开发。 前端采用 Vue + ElementUI + Axios + Mavon Editor + jQuery(部分)">
            </el-alert>

            <el-alert
              title="博客后端"
              type="success"
              :closable="false"
              description="后端采用 SpringBoot + Spring Security + JWT + MySQL +
            Redis + MinIO + MyBatis-Plus + Lombok + Swagger">
            </el-alert>
            <br>
            <el-alert
              title="博客即将进行大更新。预计增加左边栏、页头及更多新功能"
              type="info"
              :closable="false"
              show-icon>
            </el-alert>

            <div class="block">
              <div class="top">更新信息
              </div>

              <div class="radio">
                <el-radio-group v-model="reverse">
                  <el-radio :label="false">正序</el-radio>
                  <el-radio :label="true">倒序</el-radio>
                </el-radio-group>
              </div>

              <el-timeline style="padding: 20px 0" :reverse="reverse">
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.timestamp">
                  {{ activity.content }}
                </el-timeline-item>
              </el-timeline>
            </div>



          </div>
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
import rightlist from '../components/rightlist.vue'
import footer from "../components/footer";
import headImgBox from "../components/part/headImgBox";

export default {
  name: "Info",
  data() { //选项 / 数据
    return {
      reverse: false,
      activities: [
        {
          content: '消息回复小修',
          timestamp: '2022-10-14'
        },
        {
          content: '首页样式、侧边栏、文章页大修',
          timestamp: '2022-10-13'
        },
        {
          content: '增加通过标签或分类标签定位功能',
          timestamp: '2022-10-12'
        },
        {
          content: '前端UI结构调整',
          timestamp: '2022-10-12'
        },
        {
          content: '增加消息通知功能',
          timestamp: '2022-10-03'
        },
        {
          content: '前端UI调整',
          timestamp: '2022-09-23'
        },
        {
          content: '博客系统初版正式上线',
          timestamp: '2022-09-15'
        },
      ]
    }
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    'sg-nav': header,
    'ab-head-img-box': headImgBox,
    'sg-rightlist': rightlist,
    'ab-footer': footer,
  },
  created() { //生命周期函数

  },
  mounted() {

  },
}

</script>

<style scoped>
.top {
  font-size: 25px;
  font-weight: 700;
  text-align: left;
  padding: 30px 0;
}

.leftRight {
  font-size: 18px;
  background: #fff;
  padding: 15px 50px 50px;
  border-radius: 5px;
  margin-bottom: 40px;
  /*border: 1px solid #d4d4d5;*/
}

p {
  /*text-indent: 2em;*/
}

div p {
  line-height: 34px;
}
</style>
