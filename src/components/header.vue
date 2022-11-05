<!-- 头部公用 -->
<template>
  <div>

    <div class="headBack">
      <el-row class="container">
        <el-col :span="24">
          <!-- pc端导航 -->
          <div class="headBox">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
              <el-menu-item index="/Guide"><i class="fa fa-wa fa-archive ab-white"></i> 教程</el-menu-item>
              <el-menu-item index="/Home"><i class="fa fa-wa fa-home ab-white"></i> 首页</el-menu-item>
              <el-menu-item index="/Archive"><i class="fa fa-wa fa-archive ab-white"></i> 归档</el-menu-item>
              <el-menu-item index="/Reward"><i class="fa fa-wa fa-cny ab-white"></i> 赞赏</el-menu-item>
              <el-menu-item index="/VIP" class="vip-color"><span class="iconfont icon-vip"></span> VIP</el-menu-item>
              <el-submenu index="">
                <template slot="title">其他</template>
                <el-menu-item index="/Friendslink"><i class="fa fa-wa fa-users ab-white"></i> 友链</el-menu-item>
                <el-menu-item index="/Info"><i class="fa fa-wa fa-vcard ab-white"></i> 关于</el-menu-item>
              </el-submenu>
              <div class="userInfo">
                <div v-show="!haslogin" class="nologin">
                  <a href="javascript:void(0);" @click="logoinFun(1)">登录&nbsp;</a>
                  |
                  <a href="javascript:void(0);" @click="logoinFun(0)">&nbsp;注册</a>
                </div>
                <div v-show="haslogin">
                  <div class="header-avatar">
                    <img :src="userInfo.avatar ? userInfo.avatar:this.$store.state.errorImg" class="user-avatar"></img>
                    <span
                      class="iconfont icon-vip avatar-bottom-right no-vip-color"
                      :class="{
                      'vip-color':this.vipList[0].vipId==1,
                      'svip-color':this.vipList[0].vipId==2,
                      }"
                    ></span>
                    <el-badge is-dot class="mark" v-if="this.notifyCount>0" :value="this.notifyCount" />
                  </div>

                  <div class="user-area">
                    <header class="avatar-header">
                      <div class="body-avatar">
                        <div class="header-avatar">
                          <img :src="userInfo.avatar ? userInfo.avatar:this.$store.state.errorImg" class="user-avatar"></img>
                          <span
                            class="iconfont icon-vip avatar-bottom-right no-vip-color"
                            :class="{
                              'vip-color':this.vipList[0].vipId==1,
                              'svip-color':this.vipList[0].vipId==2,
                              }"
                          ></span>
                        </div>
                        <div
                          class="header-username"
                          :class="{
                              'vip-color':this.vipList[0].vipId==1,
                              'svip-color':this.vipList[0].vipId==2,
                              }"
                        >{{userInfo.nickName}}</div>
                        <div class="header-vip-time">
                          <span v-if="this.vipList[0].vipExpiryTime.split(' ')[0]">{{ this.vipList[0].vipExpiryTime.split(' ')[0] }}</span>
                        </div>
                      </div>
                    </header>
                    <section>
                      <div class="fund">余额 <span v-text="formatNumber(this.userFund.fund)"></span></div>
                      <div class="last-cost">
                        <span>最近</span>
                        <span><span v-if="this.lastOneFund.dataVariation>=0">+</span>{{this.lastOneFund.dataVariation}}</span></div>
                    </section>
                    <section>
                      <div class="fund"><span v-text="this.vipList[0].vip.vipName"></span></div>
                      <div class="last-cost" v-if="this.vipList[0].vipExpiryTime.length>0">
                        <span v-text="this.vipList[0].vipExpiryTime.split(' ')[0]"></span> 到期
                      </div>
                    </section>
                    <footer>
                      <a href="#/User/Notify" class="item">
                        <span class="item-icon iconfont icon-message"></span>
                        <span class="item-word">通知</span>
                        <el-badge class="item-mark" v-if="this.notifyCount>0" :value="this.notifyCount" />
                      </a>
                      <a href="#/User/Money" class="item">
                        <span class="item-icon iconfont icon-chongzhi "></span>
                        <span class="item-word">充值</span>
                      </a>
                      <a class="item" href="#/VIP">
                        <span class="item-icon iconfont icon-vip vip-color"></span>
                        <span class="item-word">VIP</span>
                      </a>
                      <a href="#/User/Info" class="item">
                        <span class="item-icon iconfont icon-user-info"></span>
                        <span class="item-word">资料</span>
                      </a>
                      <a class="item" @click="userlogout">
                        <span class="item-icon iconfont icon-tuichu"></span>
                        <span class="item-word">退出</span>
                      </a>
                    </footer>
                  </div>

                </div>
              </div>
            </el-menu>
          </div>
          <!-- 移动端导航区域 -->
          <div class="headBox headBox-mobile">
            <div class="ab-menu" @click="toggleTac">
              <i class="el-icon-s-grid"></i> 菜单
            </div>
            <div class="userInfo">
              <div v-show="!haslogin" class="nologin">
                <a href="javascript:void(0);" @click="logoinFun(1)">登录&nbsp;</a>
                |
                <a href="javascript:void(0);" @click="logoinFun(0)">&nbsp;注册</a>
              </div>
              <div v-show="haslogin">
                <div class="header-avatar">
                  <img :src="userInfo.avatar ? userInfo.avatar:this.$store.state.errorImg" class="user-avatar"></img>
                  <span
                    class="iconfont icon-vip avatar-bottom-right no-vip-color"
                    :class="{
                      'vip-color':this.vipList[0].vipId==1,
                      'svip-color':this.vipList[0].vipId==2,
                      }"
                  ></span>
                  <el-badge is-dot class="mark" v-if="this.notifyCount>0" :value="this.notifyCount" />
                </div>

                <div class="user-area">
                  <header class="avatar-header">
                    <div class="body-avatar">
                      <div class="header-avatar">
                        <img :src="userInfo.avatar ? userInfo.avatar:this.$store.state.errorImg" class="user-avatar"></img>
                        <span
                          class="iconfont icon-vip avatar-bottom-right no-vip-color"
                          :class="{
                              'vip-color':this.vipList[0].vipId==1,
                              'svip-color':this.vipList[0].vipId==2,
                              }"
                        ></span>
                      </div>
                      <div
                        class="header-username"
                        :class="{
                              'vip-color':this.vipList[0].vipId==1,
                              'svip-color':this.vipList[0].vipId==2,
                              }"
                      >{{userInfo.nickName}}</div>
                      <div class="header-vip-time">
                        <span v-if="this.vipList[0].vipExpiryTime.split(' ')[0]">{{ this.vipList[0].vipExpiryTime.split(' ')[0] }}</span>
                      </div>
                    </div>
                  </header>
                  <section>
                    <div class="fund">余额 <span v-text="formatNumber(this.userFund.fund)"></span></div>
                    <div class="last-cost">
                      <span>最近</span>
                      <span><span v-if="this.lastOneFund.dataVariation>=0">+</span>{{this.lastOneFund.dataVariation}}</span></div>
                  </section>
                  <section>
                    <div class="fund"><span v-text="this.vipList[0].vip.vipName"></span></div>
                    <div class="last-cost" v-if="this.vipList[0].vipExpiryTime.length>0">
                      <span v-text="this.vipList[0].vipExpiryTime.split(' ')[0]"></span> 到期
                    </div>
                  </section>
                  <footer>
                    <a href="#/User/Notify" class="item">
                      <span class="item-icon iconfont icon-message"></span>
                      <span class="item-word">通知</span>
                      <el-badge class="item-mark" v-if="this.notifyCount>0" :value="this.notifyCount" />
                    </a>
                    <a href="#/User/Money" class="item">
                      <span class="item-icon iconfont icon-chongzhi "></span>
                      <span class="item-word">充值</span>
                    </a>
                    <a class="item" href="#/VIP">
                      <span class="item-icon iconfont icon-vip vip-color"></span>
                      <span class="item-word">VIP</span>
                    </a>
                    <a href="#/User/Info" class="item">
                      <span class="item-icon iconfont icon-user-info"></span>
                      <span class="item-word">资料</span>
                    </a>
                    <a class="item" @click="userlogout">
                      <span class="item-icon iconfont icon-tuichu"></span>
                      <span class="item-word">退出</span>
                    </a>
                  </footer>
                </div>

              </div>
            </div>
            <!--  侧边栏         -->
            <el-row class="tac ab-tac" v-if="mobileShowTar">

              <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo my-menu"
                :router="true"
              >
                  <el-menu-item index="/Guide"><i class="fa fa-wa fa-archive ab-white"></i> 教程</el-menu-item>
                  <el-menu-item index="/Home"><i class="fa fa-wa fa-home ab-white"></i> 首页</el-menu-item>
                  <el-menu-item index="/Archive"><i class="fa fa-wa fa-archive ab-white"></i> 归档</el-menu-item>
                  <el-menu-item index="/Reward"><i class="fa fa-wa fa-cny ab-white"></i> 赞赏</el-menu-item>
                  <el-menu-item index="/VIP" class="vip-color"><span class="iconfont icon-vip"></span> VIP</el-menu-item>
                  <el-submenu index="">
                    <template slot="title">其他</template>
                    <el-menu-item index="/Friendslink"><i class="fa fa-wa fa-users ab-white"></i> 友链</el-menu-item>
                    <el-menu-item index="/Info"><i class="fa fa-wa fa-vcard ab-white"></i> 关于</el-menu-item>
                  </el-submenu>
              </el-menu>

            </el-row>
          </div>
        </el-col>
      </el-row>


    </div>

  </div>
</template>
<script>
import {logout} from '../api/user'
import {removeToken, getToken} from '../utils/auth'
import {getUnreadCount} from '../api/notify.js'
import {getUserFund, lastOneFundHistory, signal} from "../api/fund";
import {vipStatus} from "../api/vip";

export default {
  data() { //选项 / 数据
    return {
      userInfo: '', //用户信息
      haslogin: false, //是否已登录
      classListObj: '', //分类
      activeIndex: '/', //当前选择的路由模块
      state: '', //icon点击状态
      pMenu: true, //手机端菜单打开
      // path:'',//当前打开页面的路径
      input: '', //input输入内容
      headTou: '', //头像
      projectList: '', //项目列表
      mobileShowTar:false, // 侧边栏
      // 通知的数量
      notifyCount:0,
      // 通知的查询
      queryParams: {
        pageNum: 1,
        pageSize: 2,
      },
      // 用户积分对象
      userFund:{},
      // 是否签过到
      isSignal:false,
      // 最近一次积分变动对象
      lastOneFund: {},
      // vip 状态列表
      vipList:[{
        vipId:0,
        vipExpiryTime:"",
        vip:{
          vipName:"暂无会员"
        }
      }],
    }
  },
  methods: { //事件处理器
    logoinFun: function (msg) { //用户登录和注册跳转
      // console.log(msg);
      localStorage.setItem('logUrl', this.$route.fullPath);
      // console.log(666,this.$router.currentRoute.fullPath);
      if (msg == 0) {
        this.$router.push({
          path: '/Login?login=0'
        });
      } else {
        this.$router.push({
          path: '/Login?login=1'
        });
      }
    },
    // 用户退出登录
    userlogout: function () {
      var that = this;
      this.$confirm('是否确认退出?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(that.$route.path);
        // 获取判断有无token，如果没有，直接退出即可
        if (getToken()) {
          // 如果得到了Token
          logout().then((response) => {
            removeToken()
            localStorage.removeItem('userInfo');
            that.haslogin = false;
            that.$notify({
              type: 'success',
              message: '退出成功!'
            });
            if (that.$route.path === '/UserInfo') {
              that.$router.push({
                path: '/Home'
              });
            }
          })
        } else {
          // 如果没有，就直接删除userInfo
          localStorage.removeItem('userInfo');
          that.$notify({
            type: 'success',
            message: '退出成功!'
          });
          that.$router.push({
            path: '/'
          });
        }

      }).catch(() => {
        //
        console.log("失败")
      });

    },
    routeChange: function () {
      var that = this;
      that.pMenu = true
      this.activeIndex = this.$route.path == '/' ? '/Home' : this.$route.path;
      if (localStorage.getItem('userInfo') && getToken()) { //存储用户信息
        that.haslogin = true;
        that.userInfo = JSON.parse(localStorage.getItem('userInfo'));

      } else {
        that.haslogin = false;
      }
      if ((this.$route.name == "Share" || this.$route.name == "Home") && this.$store.state.keywords) {
        this.input = this.$store.state.keywords;
      } else {
        this.input = '';
        this.$store.state.keywords = '';
      }
      // 是否登录了
      if(that.haslogin){
        // 获取通知信息
        getUnreadCount(this.queryParams).then((response)=>{
          if(response==undefined) return;
          this.notifyCount = response.total;
        });
        // 获取用户积分
        getUserFund().then((response)=>{
          this.userFund = response
        });
        // 获取用户最新的一次消费
        lastOneFundHistory().then((response)=>{
          this.lastOneFund = response;
        });
        // VIP 状态
        vipStatus().then((res)=>{
          if(res.length>0)
            this.vipList = res;
        })
      }
    },
    toggleTac(){
      this.mobileShowTar = !this.mobileShowTar;
    },
    /*******
     * num：待处理数字
     * precision：保留小数位
     * separator：分隔符
     * eg:formatNumber(100000000) 结果"100,000,000"
     * formatNumber(100000000,2); 结果："100,000,000.00"
     * formatNumber(100000000,2,"?"); 结果："100?000?000.00"
     *********/
    formatNumber(num, precision, separator) {
      var parts;
      // 判断是否为数字
      if (!isNaN(parseFloat(num)) && isFinite(num)) {
        // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
        // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
        // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
        // 的值变成了 12312312.123456713
        num = Number(num);
        // 处理小数点位数
        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
        // 分离数字的小数部分和整数部分
        parts = num.split('.');
        // 整数部分加[separator]分隔, 借用一个著名的正则表达式
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

        return parts.join('.');
      }
      return NaN;
    },
  },
  components: { //定义组件

  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange'
  },
  created() { //生命周期函数
    //判断当前页面是否被隐藏
    var that = this;
    var hiddenProperty = 'hidden' in document ? 'hidden' :
      'webkitHidden' in document ? 'webkitHidden' :
        'mozHidden' in document ? 'mozHidden' :
          null;
    var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
    var onVisibilityChange = function () {
      if (!document[hiddenProperty]) {
        // 没有被隐藏！
        $(document).attr("title", "欢迎回来~O(∩_∩)O");
      } else {
        // 被隐藏了！
        $(document).attr("title", "等你下课~┭┮﹏┭┮");
      }
    }
    document.addEventListener(visibilityChangeEvent, onVisibilityChange); // 页面可见性改变事件
    // console.log();
    this.routeChange();


  },
  mounted() { //页面元素加载完成
    // 特效设置
    $('.userInfo').on( "mouseenter",function (){
      $('.user-area').finish().fadeIn(200);
    });
    $('.userInfo').on( "mouseleave",function (){
      $('.user-area').finish().fadeOut(200);
    });

  }
}
</script>

<style>
/*********头部导航栏********/

/*头部导航栏盒子*/
.headBack {
  box-sizing: border-box;
  padding: 0 15px;
  width: 100%;
  background: rgb(255, 255, 255);
  /*margin-bottom:30px;*/
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 5;
}
.haslogin-info {
  list-style: none;
  box-shadow: 0 5px 20px rgb(18 18 18 / 10%);
}
.headBox li.is-active {
  /*background: #48456C;*/
  color: #056de8!important;
  /*background: rgba(73, 69, 107, 0.7);*/
}

.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
  border-bottom: none !important;
}

.headBox .el-menu {
  background: transparent;
  border-bottom: none !important;
}

.headBox .el-menu-demo li.el-menu-item,
.headBox .el-menu--horizontal .el-submenu .el-submenu__title {
  height: 38px;
  line-height: 38px;
  border-bottom: none !important;

}

.headBox .el-submenu li.el-menu-item {
  height: 38px;
  line-height: 38px;
}

.headBox li .fa-wa {
  vertical-align: baseline;
}

.headBox .el-menu--horizontal .el-submenu > .el-menu {
  top: 38px;
  border: none;
  padding: 0;
}

.headBox > ul .el-submenu .el-menu .el-menu-item:hover {
  color: #056de8;
}

/*pc搜索框*/

.headBox .userInfo {
  height: 38px;
  line-height: 38px;
  position: absolute;
  right: 32px;
  top: 0;
  /*color: #909399;*/
}


.headBox .nologin {
  text-align: right;
}

.headBox .haslogin {
  text-align: right;
  position: relative;
  min-width: 80px;
  cursor: pointer;
}

.headBox .haslogin:hover ul {
  visibility: visible;
  opacity: 1;
}

.headBox .haslogin ul {
  background: #ffffff;
  padding: 5px 10px;
  position: absolute;
  right: 0;
  visibility: hidden;
  opacity: 0;
  transition: all 0.3s ease-out;
}

.headBox .haslogin ul li {
  border-bottom: 1px solid #48456C;
}

.headBox .haslogin ul li:last-child {
  border-bottom: 1px solid transparent;
}

/*******移动端*******/

.mobileBox {
  position: relative;
  height: 38px;
  line-height: 38px;
  color: #909399;
}

.hideMenu {
  position: relative;
  width: 100%;
  height: 100%;
  line-height: 38px;
}

.hideMenu ul.mlistmenu {
  width: 100%;
  position: absolute;
  left: 0;
  top: 100%;
  box-sizing: border-box;
  z-index: 999;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .12), 0 0 8px 0 rgba(0, 0, 0, .04);
  background: #48456C;
  color: #909399;
  border-right: none;
}

.hideMenu .el-menu-item,
.hideMenu .el-submenu__title {
  color: #fff;
}

.hideMenu > i {
  position: absolute;
  left: 10px;
  top: 12px;
  width: 30px;
  height: 30px;
  font-size: 16px;
  color: #fff;
  cursor: pointer;
}

.el-menu-item,
.el-submenu__title,
.el-submenu .el-menu-item{
  height: 38px;
  line-height: 38px;
}

.mobileBox .searchBox {
  padding-left: 40px;
  width: 100%;
  box-sizing: border-box;
}

.mobileBox .searchBox .el-input__inner {
  display: block;
  border-radius: 2px;
  border: none;
  height: 25px;
}

.hideMenu ul.mlistmenu.pshow {
  display: block;
}

.hideMenu ul.mlistmenu .el-submenu__icon-arrow,
.mobileBox li.el-menu-item a {
  color: #fff;
}

.hideMenu > ul li.el-menu-item:hover,
.hideMenu > ul li.el-menu-item.is-active {
  /*background: #48576a;*/
  color: #056de8;
}


@-webkit-keyframes b {
  0% {
    -webkit-transform: translateY(90px);
    transform: translateY(90px);
  }
  80% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px)
  }
  90% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px)
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0)
  }
}

@keyframes b {
  0% {
    -webkit-transform: translateY(90px);
    transform: translateY(90px);
  }
  80% {
    -webkit-transform: translateY(5px);
    transform: translateY(5px)
  }
  90% {
    -webkit-transform: translateY(-5px);
    transform: translateY(-5px)
  }
  to {
    -webkit-transform: translateY(0);
    transform: translateY(0)
  }
}

.h-information img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
  transition: all .4s ease-in-out;
  -webkit-transition: all .4s ease-in-out;
  object-fit: cover;
}

.h-information img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
}

.h-information h2 {
  margin-top: 20px;
  font-size: 18px;
  font-weight: 700;
  /*font-family: 'Sigmar One';*/
}

.h-information h2 a {
  background: linear-gradient(to right, #DF2050, #48456D);
  -webkit-background-clip: text;
  color: transparent;
}

.headImgBox .scene {
  width: 100%;
  /*height:300px;*/
  text-align: center;
  font-size: 100px;
  font-weight: 200;
  color: #fff;
  position: absolute;
  left: 0;
  top: 160px;
  font-family: 'Sigmar One', Arial;
  text-shadow: 0 2px 2px #47456d;
}

.headImgBox .scene span {
  transform: matrix(1, 0, 0, 1, 0, 0);
  -webkit-transform: matrix(1, 0, 0, 1, 0, 0);
  text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
}

.saying:after {
  content: "|";
  font-family: Arial, sans-serif;
  font-size: 1em;
  /*line-height: 0;*/
  display: inline-block;
  vertical-align: baseline;
  opacity: 1;
  text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
  animation: caret 500ms infinite;
}

@keyframes caret {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.headBox-mobile {
  height: 38px;
  line-height: 38px;

  padding: 0 10px;
}

.ab-menu {
  color: #909399;
  display: inline-block;
  padding: 0 10px;
  transition: background-color linear 0.1s;
  cursor: pointer;
  resize: none;
  outline: none;
  user-select: none;
}

.ab-menu:active {
  background-color: #fff;
}

.ab-tac {
  position: fixed;
  left: 0;
  width: auto;
  background-color: #fefefe;
  border-radius: 5px;
  padding: 0 20px;
  box-shadow: 0 5px 20px rgba(18,18,18,.1);
}
.ab-tac .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.my-menu {
  border: 0;
}
.userImg {

}

.header-avatar {
  position: absolute;
  top: 3px;
}
.user-avatar {
  height: 32px;
  width: 32px;
  border-radius: 50%;
}
.avatar-bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translateX(25%);
  font-size: 14px;
}
.user-area {
  display: none;
  position: absolute;
  top: 20px;
  border-radius: 5px;
  padding: 5px 10px 6px;
  box-sizing: border-box;
  transform: translateY(10%);
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  right: -32px;
  width: 250px;
  background-color: #fff;
  z-index: 10;
}
.user-area::before{
  content: "";
  position: absolute;
  top: -16px;
  right: 5px;
  width: 0px;
  height: 0px;
  border: 8px solid;
  border-color: transparent;
  border-bottom-color:  #fff;
}
.avatar-header{

}
.body-avatar {
  position: relative;
  height: 38px;
  line-height: 38px;
  box-sizing: border-box;
  padding-left: 40px;
}
.body-avatar .header-avatar{
  left: 0;
}
.header-username {
  display: inline-block;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.header-vip-time {
  position: absolute;
  display: inline-block;
  top: 0;
  margin-left: 10px;
}
.header-vip-time span{
  background: #fbb715;
  color: #fff;
  padding: 2px 8px;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 12px;
}
.user-area section{
  margin-top: 8px;
  height: 32px;
  line-height: 32px;
  box-sizing: border-box;
  background: #f5f5f5;
  padding: 0 8px;
  border-radius: 5px;
  font-size: 12px;
}
.fund {
  width: 45%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.last-cost{
  width: 45%;
  float: right;
  display: inline-block;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #777;
}
.user-area footer{
  margin-top: 8px;
  height: 42px;
  line-height: 42px;
  box-sizing: border-box;
  text-align: center;
}
.user-area footer .item {
  position: relative;
  display: inline-block;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: #eee;
  cursor: pointer;
  user-select: none;
}
.item-icon {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  position: absolute;
}
.item-word{
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  display: block;
  position: absolute;
  width: 30px;
  font-size: 12px;
}
.mark {
  position: absolute;
  height: 0;
  width: 0;
  display: block;
  right: 8px;
  top: -8px;
  z-index: 12;
}
.item-mark{
  position: absolute;
  height: 0;
  width: 0;
  display: block;
  right: 17px;
  top: -8px;
  z-index: 12;
}
.el-menu--horizontal .el-submenu__title,
.el-menu--horizontal .el-menu .el-menu-item{
  color: #909399;
}
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title,
.el-menu--horizontal .el-menu .el-menu-item.is-active{
  color: #056de8!important;
}

.el-submenu .el-menu-item ,.el-menu--popup{
  min-width: auto;
}
</style>

