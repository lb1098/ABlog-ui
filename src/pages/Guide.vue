<template>
  <div >
    <sg-navbar></sg-navbar>
    <main>
      <aside id="leftTreeNav">
        <left-tree-nav> </left-tree-nav>
      </aside>
      <section>
        <!--  定制 隐藏导航栏      -->
        <div class="hidden-aside-tree-nav" @click="hiddenAside()" >
          <i class="fa fa-arrow-right"
             :class="{'rotate180':open}"
             aria-hidden="true"></i>
        </div>

        <!--  定制 面包屑      -->

        <!--   主题内容     -->
        <guide-main></guide-main>
      </section>
    </main>
  </div>
</template>

<script>
import header from "../components/header";
import headImgBox from "../components/part/headImgBox";
import footer from "../components/footer";
import LeftTreeNav from "../components/Guide/LeftTreeNav"
import GuideMain from "../components/Guide/GuideMain"

export default {
  name: "Guide",
  data() { //选项 / 数据
    return {
      open:true,// 侧边栏是否打开
    }
  },
  methods: { //事件处理器
    hiddenAside(){
      if(this.open){
        this.open = false;
        $('#leftTreeNav').animate({'width':'0%'},300);
      } else{
        this.open = true;
        $('#leftTreeNav').animate({'width':'100%'},300);
      }
    },
  },
  components: { //定义组件
    'sg-navbar': header,
    'ab-head-img-box':headImgBox,
    'left-tree-nav':LeftTreeNav,
    'guide-main':GuideMain,
  },
  created() { //生命周期函数

  }
}
</script>

<style scoped>
main {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  padding-top: 38px;
  background-color: #fff;
  height: 100vh;
  width: 100%;
}
aside {
  z-index: 4;
  width: 100%;
  max-width: 300px;
  position: relative;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
}
section{
  position: relative;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
}
.hidden-aside-tree-nav {
  height: 100%;
  width: 40px;
  position: absolute;
  left: 0;
  z-index: 100;
  text-align: center;
  transition: background-color .3s;
  cursor: pointer;
}
.hidden-aside-tree-nav:hover{
  background-color: rgba(127, 127, 127, 0.05);
}
.hidden-aside-tree-nav .fa-arrow-right{
  position: absolute;
  width: 100%;
  text-align: center;
  top:45%;
  left: 0;
  font-size: 18px;
  transition: transform 0.5s;
}
.rotate180 {
  transform: rotate(-180deg);
}

</style>
