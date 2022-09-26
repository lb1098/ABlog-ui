<template>
  <div>
    <sg-nav></sg-nav>
    <ab-head-img-box></ab-head-img-box>
    <div class="container">
      <el-row :gutter="30">
        <el-col :sm="24" :md="16" style="transition:all .5s ease-out;margin-bottom:30px;">
          <div class="leftRight">

            <el-row>
              <div class="top">关于作者</div>
              <el-card class="box-card">
                <p>
                  23应届生求职中~
                </p>
              </el-card>
            </el-row>
            <el-row>
              <div class="top">关于项目</div>
              <el-card class="box-card">
                <div>
                  <p >
                    博客采用前后端分离开发
                  </p>
                  <p >
                    前端采用 Vue + ElementUI + Axios + Mavon Editor + jQuery(部分)
                  </p>
                  <p >
                    后端采用 SpringBoot + Spring Security + JWT + MySQL +
                    Redis + MinIO + MyBatis-Plus + Lombok + Swagger
                  </p>
                </div>
              </el-card>
            </el-row>
            <el-row>
              <div class="top">后续升级计划</div>
              <div>
                <el-card class="box-card">
                  <p>1. 留言板</p>
                  <p>2. ElasticSearch并用于搜索</p>
                  <p>3. 消息通知</p>
                  <p>...</p>
                </el-card>
              </div>
            </el-row>
          </div>
        </el-col>
        <el-col :sm="24" :md="8">
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

    }
  },
  methods: { //事件处理器

  },
  components: { //定义组件
    'sg-nav': header,
    'ab-head-img-box':headImgBox,
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

}
p {
  text-indent: 2em;
}
div p {
  line-height: 34px;
}
</style>
