<!-- 头部公用 -->
<template>
  <div>

    <div class="headBack">
      <el-row class="container">
        <el-col :span="24">
          <!-- pc端导航 -->
          <div class="headBox">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
              <el-menu-item index="/Home"><i class="fa fa-wa fa-home ab-white"></i> 首页</el-menu-item>
              <el-menu-item index="/Archive"><i class="fa fa-wa fa-archive ab-white"></i> 归档</el-menu-item>
              <el-menu-item index="/Reward"><i class="fa fa-wa fa-cny ab-white"></i> 赞赏</el-menu-item>
              <el-menu-item index="/Info"><i class="fa fa-wa fa-vcard ab-white"></i> 关于</el-menu-item>
              <el-menu-item index="/Friendslink"><i class="fa fa-wa fa-users ab-white"></i> 友链</el-menu-item>
              <div class="userInfo">
                <div v-show="!haslogin" class="nologin">
                  <a href="javascript:void(0);" @click="logoinFun(1)">登录&nbsp;</a>
                  |
                  <a href="javascript:void(0);" @click="logoinFun(0)">&nbsp;注册</a>
                </div>
                <div v-show="haslogin" class="haslogin">
                  <i class="fa fa-fw fa-user-circle userImg"></i>
                  <span v-text="userInfo.nickName"></span>
                  <el-badge class="mark" v-if="this.notifyCount>0" :value="this.notifyCount" />
                  <ul class="haslogin-info">
                    <li>
                      <a href="#/Notify">通知
                        <el-badge class="mark" v-if="this.notifyCount>0" :value="this.notifyCount" />
                      </a>
                    </li>
                    <li>
                      <a href="#/User">个人中心</a>
                    </li>

                    <li>
                      <a href="javascript:void(0);" @click="userlogout">退出登录</a>
                    </li>
                  </ul>
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
              <div v-show="haslogin" class="haslogin">

                <i class="fa fa-fw fa-user-circle userImg"></i>
                <span v-text="userInfo.nickName"></span>
                <el-badge class="mark" v-if="this.notifyCount>0" :value="this.notifyCount" />

                <ul class="haslogin-info">
                  <li>
                    <a href="#/Notify">通知
                      <el-badge class="mark" v-if="this.notifyCount>0" :value="this.notifyCount" />
                    </a>
                  </li>
                  <li>
                    <a href="#/User">个人中心</a>
                  </li>
                  <li>
                    <a href="javascript:void(0);" @click="userlogout">退出登录</a>
                  </li>
                </ul>
              </div>
            </div>
            <!--  侧边栏         -->
            <el-row class="tac ab-tac" v-if="mobileShowTar">

              <el-menu
                :default-active="activeIndex"
                class="el-menu-vertical-demo my-menu"
                :router="true"
              >
                <el-menu-item index="/Home"><i class="fa fa-wa fa-home ab-white"></i> 首页</el-menu-item>
                <el-menu-item index="/Archive"><i class="fa fa-wa fa-archive ab-white"></i> 归档</el-menu-item>
                <el-menu-item index="/Friendslink"><i class="fa fa-wa fa-users ab-white"></i> 友链</el-menu-item>
                <el-menu-item index="/Reward"><i class="fa fa-wa fa-cny ab-white"></i> 赞赏</el-menu-item>
                <el-menu-item index="/Info"><i class="fa fa-wa fa-vcard ab-white"></i> 关于</el-menu-item>
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
      if(that.haslogin){
        // 获取通知信息
        getUnreadCount(this.queryParams).then((response)=>{
          if(response==undefined) return;
          this.notifyCount = response.total;
        });
      }


    },
    toggleTac(){
      this.mobileShowTar = !this.mobileShowTar;
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

  }
}
</script>

<style>
/*********头部导航栏********/

/*头部导航栏盒子*/

.headBack {
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
  height: 100%;
  line-height: 38px;
  position: absolute;
  right: 30px;
  top: 0;
  color: #909399;
}

.headBox .userInfo a {
  color: #909399;
  font-size: 13px;
  transition: all 0.2s ease-out;
}

.headBox .userInfo a:hover {
  color: #056de8;
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

.hideMenu .el-menu-item,
.el-submenu__title {
  height: 40px;
  line-height: 40px;
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
  height: 40px;
  line-height: 40px;

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
</style>

