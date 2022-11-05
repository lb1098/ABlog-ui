<template>
  <div >
    <sg-navbar></sg-navbar>
    <div class="fix-btn-toggle" @click="hiddenAside">
      <i v-if="!openLeftNav" class="fa fa-th-list" aria-hidden="true"></i>
      <i v-else class="fa fa-times" aria-hidden="true"></i>
    </div>
    <div v-if="openLeftNav" @click="hiddenAside" class="fix-btn-shadow"></div>
    <main>
      <aside id="leftTreeNav">
        <left-tree-nav></left-tree-nav>
      </aside>
      <section>
        <!--  定制 隐藏导航栏      -->
        <div class="hidden-aside-tree-nav hidden-xs-only" @click="hiddenAside()" >
          <i class="fa fa-arrow-right"
             :class="{'rotate180':openRotate}"
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
      openLeftNav:true,
      openRotate:true,// 侧边栏是否打开
    }
  },
  methods: { //事件处理器
    hiddenAside(){
      if(this.openLeftNav){
        this.openLeftNav = false
        this.openRotate = !this.openRotate;
        $('#leftTreeNav').finish().animate({'width':'0%'},300);
      } else{
        this.openLeftNav = true
        this.openRotate = !this.openRotate;
        $('#leftTreeNav').finish().animate({'width':'100%'},300);
      }
    },
    miniWindow(){

    },
    largeWindow(){

    },
  },
  components: { //定义组件
    'sg-navbar': header,
    'ab-head-img-box':headImgBox,
    'left-tree-nav':LeftTreeNav,
    'guide-main':GuideMain,
  },
  mounted() {
    if($(window).width()<=768 ){
      this.openLeftNav = false;
      $('#leftTreeNav').finish().animate({'width':'0%'},0);
    } else {
      this.openLeftNav = true;
    }

  },
  created() { //生命周期函数
    var that = this;
    $(window).resize( function  () {           //当浏览器大小变化时
      if(that.openLeftNav && $(window).width()<=768 ){
        that.openLeftNav = false;
        $('#leftTreeNav').finish().animate({'width':'0%'},300);
      } else {
        if(!that.openLeftNav && $(window).width()>768){
          that.openLeftNav = true;
          that.openRotate = true;
          $('#leftTreeNav').finish().animate({'width':'100%'},300);
        }
      }
    });
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
  background-color: #FFF;
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
.fix-btn-toggle {
  position: fixed;
  z-index: 6;
  height: 38px;
  line-height: 38px;
  padding: 0 15px;
  top: 0;
  left: 0;
  color: rgb(5,109,232);
  cursor: pointer;
}
.fix-btn-shadow {
  /*display: none;*/
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background-color: #00000026;
}

</style>
