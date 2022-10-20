<!-- 登录注册 -->
<template>
  <div>
    <ab-header></ab-header>
    <div class="container">
      <h1 class="loginTitle">

      </h1>
      <!-- 登录注册 -->
      <div class="">
        <div v-if="login==1" class="loginBox">
          <div class="lr-title">
            <h1>登录</h1>
            <p>
              新用户<a href="#/Login?login=0" class="tcolors">注册</a>
            </p>
          </div>
          <el-alert
            v-show="loginErr"
            :title="loginTitle"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="text"
            placeholder="用户名"
            v-model="username">
          </el-input>
          <el-input
            type="password"
            placeholder="密码"
            @keyup.enter.native="loginEnterFun"
            v-model="password">
          </el-input>
          <div>
            <el-input
              type="text"
              placeholder="验证码"
              v-model="verify_code"
              style="
                width: 50%;
                box-sizing: border-box;
                display: inline-block;
                padding-right: 10px;
              "
              maxlength="4"
              show-word-limit
            >
            </el-input>
            <el-button
              style="width: 50%;float: right;"
              id="img_btn"
              type="primary"
              @click="freshCode()"
            >获取图像验证码
            </el-button>
            <img id="img_code1"
               style="
               display: none;
               width: 50%;
              " :src="verify_url" alt="点击更换验证码" class="verify_code" @click="freshCode()"></img>
          </div>

          <div class="lr-btn tcolors-bg" @click="gotoHome">登录</div>

          <div style="text-align: center">
          <el-button  @click="centerDialogVisible = true" icon="el-icon-message" circle></el-button>
          </div>
          <el-dialog
            title="邮箱登录"
            :visible.sync="centerDialogVisible"
            width = "340px"
            center>
            <div>
              <el-input
                type="email"
                placeholder="邮箱"
                clearable
                v-model="nemail">
              </el-input>
              <el-alert
                v-show="lemailErr"
                title="邮箱错误"
                type="error"
                show-icon>
              </el-alert>

              <el-input
                type="text"
                title="emailVerifyCode"
                placeholder="邮箱验证码"
                style="
                width: 50%;
                box-sizing: border-box;
                display: inline-block;
                padding-right: 10px;
              "
                v-model="verify_email_code"
                maxlength="6"
                show-word-limit
              >
              </el-input>
              <el-button
                style="width: 50%;float: right;"
                type="primary"
                @click="btnSendEmail"
                :disabled.sync="btn_disable"
              >{{ buttonName }}</el-button>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="gotoHomeByEmail">登 录</el-button>
            </span>
          </el-dialog>

        </div>
        <div v-else class="registerBox">
          <div class="lr-title">
            <h1>注册</h1>
            <p>
              已有账号<a href="#/Login?login=1" class="tcolors">登录</a>
            </p>
          </div>
          <el-alert
            v-show="registerErr"
            :title="registerTitle"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="text"
            placeholder="用户名"
            required
            v-model="nusername">
          </el-input>
          <el-alert
            v-show="nusernameErr"
            title="用户名错误"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="text"
            placeholder="昵称"
            v-model="nickName">
          </el-input>
          <el-input
            type="email"
            placeholder="邮箱"
            v-model="nemail">
          </el-input>
          <div>
            <el-input
              type="text"
              title="emailVerifyCode"
              placeholder="邮箱验证码"
              style="
                width: 50%;
                box-sizing: border-box;
                display: inline-block;
                padding-right: 10px;
              "
              v-model="verify_email_code"
              maxlength="6"
              show-word-limit
              >
            </el-input>
            <el-button
              style="width: 50%;float: right;"
              type="primary"
              @click="btnSendEmail"
            >{{ buttonName }}</el-button>
          </div>
          <el-alert
            v-show="nemailErr"
            title="邮箱错误"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="password"
            placeholder="密码:6-12位英文、数字、下划线"
            v-model="npassword">
          </el-input>
          <el-alert
            v-show="npasswordErr"
            title="密码错误"
            type="error"
            show-icon :closable="false">
          </el-alert>
          <el-input
            type="password"
            placeholder="确认密码"
            @keyup.enter.native="registerEnterFun"
            v-model="npassword2">
          </el-input>
          <el-alert
            v-show="npassword2Err"
            title="重复密码有误"
            type="error"
            show-icon :closable="false">
          </el-alert>

          <div>
            <el-input
              type="text"
              placeholder="图片验证码"
              v-model="verify_code"
              style="
                width: 50%;
                box-sizing: border-box;
                display: inline-block;
                padding-right: 10px;
              "
              maxlength="4"
              show-word-limit
            >
            </el-input>
            <el-button
              style="width: 50%;float: right;"
              id="img_btn1"
              type="primary"
              @click="freshCode()"
            >获取图像验证码
            </el-button>
            <img id="img_code" style="display: none;" :src="verify_url" alt="点击更换验证码" class="verify_code" @click="freshCode()"></img>
          </div>
          <div class="lr-btn tcolors-bg" @click="newRegister" v-loading.fullscreen.lock="fullscreenLoading"
               element-loading-text="提交中">注册
          </div>
        </div>
      </div>

    </div>
<!--    <ab-footer style="position: fixed;bottom: 0;"></ab-footer>-->
  </div>
</template>

<script>
import {userLogin, userRegister,userLoginByEmail} from '../api/user.js'
import {setToken} from '../utils/auth.js'
import {MessageBox} from "element-ui";
import footer from "../components/footer";
import header from "../components/header";
import Cookies from 'js-cookie'
import {sendEmail} from "../api/email";

export default {
  name: 'Login',
  data() { //选项 / 数据
    return {
      username: '',//用户名
      email: '',//邮箱
      password: '',//密码
      nusername: '',//新用户注册名
      nickName: '', // 昵称
      nemail: '',//新用户注册邮箱
      npassword: '',//新用户注册密码
      npassword2: '',//新用户注册重复密码
      login: 0,//是否已经登录
      loginErr: false,//登录错误
      loginTitle: '用户名或密码错误',
      nusernameErr: false,//新用户注册用户名错误
      nemailErr: false,//新用户注册邮箱错误
      npasswordErr: false,//新用户注册密码错误
      npassword2Err: false,//新用户注册重复密码错误
      registerErr: false,//已注册错误
      registerTitle: '该邮箱已注册',
      step: 1,//注册进度
      fullscreenLoading: false,//全屏loading
      urlstate: 0,//重新注册
      lemailErr:false,

      verify_url :this.$store.state.baseURL+'img/verify_code',
      verify_code:"",
      verify_email_code:"",
      btn_disable : false,
      count :59,
      buttonName:"获取验证码",

      // tooltip
      centerDialogVisible: false
    }
  },
  methods: { //事件处理器
    routeChange: function () {
      $("#img_btn").show()
      $("#img_btn1").show()
      var that = this;
      that.login = that.$route.query.login == undefined ? 1 : parseInt(that.$route.query.login);//获取传参的login
      that.urlstate = that.$route.query.urlstate == undefined ? 0 : that.$route.query.urlstate;//获取传参的usrlstate状态码
    },
    loginEnterFun: function (e) {
      var keyCode = window.event ? e.keyCode : e.which;
      // console.log('回车登录',keyCode,e);
      if (keyCode == 13) {
        this.gotoHome();
      }
    },
    gotoHome: function () {
      //用户登录
      userLogin(this.username, this.password, this.verify_code, Cookies.get("VerifyCode")).then((response) => {
        // 登录成功记录token和用户信息，登录失败给对应提示
        setToken(response.token) // 会话关闭后就关闭了。
        // 存储用户信息
        localStorage.setItem("userInfo", JSON.stringify(response.userInfo)) // 设置用户信息
        if (localStorage.getItem('logUrl')) {
          this.$router.push({path: localStorage.getItem('logUrl')});
        } else {
          this.$router.push({path: '/'});
        }
        this.$notify({
          title: '登录成功',
          message: '欢迎回来 （自动关闭）',
          type: 'success',
          duration: 3000,
        });
      })

    },
    gotoHomeByEmail(){
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (reg.test(this.nemail)) {
        this.lemailErr = false;
      } else {
        this.lemailErr = true;
      }

      userLoginByEmail(this.nemail,this.verify_email_code).then((response)=>{
        this.centerDialogVisible = false;
        // 登录成功记录token和用户信息，登录失败给对应提示
        setToken(response.token) // 会话关闭后就关闭了。
        // 存储用户信息
        localStorage.setItem("userInfo", JSON.stringify(response.userInfo)) // 设置用户信息
        if (localStorage.getItem('logUrl')) {
          this.$router.push({path: localStorage.getItem('logUrl')});
        } else {
          this.$router.push({path: '/'});
        }
        this.$notify({
          title: '登录成功',
          message: '欢迎回来 （自动关闭）',
          type: 'success',
          duration: 3000,
        });
      });
    },
    registerEnterFun: function (e) {
      var keyCode = window.event ? e.keyCode : e.which;
      // console.log('回车注册',keyCode,e);
      if (keyCode == 13) {
        this.newRegister();
      }
    },
    newRegister: function () {//注册提交
      var that = this;
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      var preg = /^(\w){6,12}$/;
      if (that.nusername) {
        that.nusernameErr = false;
      } else {
        that.nusernameErr = true;
      }
      if (reg.test(that.nemail)) {
        that.nemailErr = false;
      } else {
        that.nemailErr = true;
      }
      if (that.npassword && preg.test(that.npassword)) {
        that.npasswordErr = false;
        if (that.npassword == that.npassword2) {
          that.npassword2Err = false;
        } else {
          that.npassword2Err = true;
        }
      } else {
        that.npasswordErr = true;
      }
      if (!that.nusernameErr && !that.nemailErr && !that.npasswordErr) {
        that.fullscreenLoading = true;
        userRegister(that.nusername, that.nickName, that.nemail, that.npassword, this.verify_code, Cookies.get("VerifyCode"),
          this.verify_email_code).then((response) => {
          //注册成功后调整到登录
          that.goLogin()
          this.$notify({
            title: '注册成功',
            message: '您可以顺利登录了',
            type: 'success',
            duration: 3000,
          });
        }).catch((error) => {
          that.fullscreenLoading = false;
        })
      }
    },
    goLogin: function () {//去登陆
      this.$router.push({path: '/Login?login=1'});
    },
    goRegister: function () {//去注册
      this.$router.push({path: '/Login?login=0'});
    },
    freshCode:function (){
      this.verify_url = this.$store.state.baseURL+'img/verify_code?t=' + new Date().getTime()
      $("#img_btn").hide()
      $("#img_btn1").hide()
      $("#img_code").show()
      $("#img_code1").show()
    },
    btnSendEmail(){
      this.btn_disable = true;
      this.buttonName ="60s后重发";
      var timeout= setInterval(() => {
        if (this.count < 1) {
          this.btn_disable = false;
          this.buttonName = "获取验证码";
          this.count = 59;
          clearInterval(timeout);
        } else {
          this.buttonName = this.count-- + "s后重发";
        }
      }, 1000);
      sendEmail(this.nemail).then((response) => {
        this.$notify({
          title: '成功',
          message: '已成功发送验证码到邮箱中',
          type: 'success'
        });
      }).catch(()=>{
        this.btn_disable = false;
        this.buttonName = "获取验证码";
        this.count = 59;
        clearInterval(timeout);
        this.$notify.error({
          title: '错误',
          message: '发送失败'
        });
      });
    },
  },
  components: { //定义组件
    'ab-footer': footer,
    'ab-header':header,
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange'
  },
  mounted() {

  },
  created() { //生命周期函数
    var that = this;
    that.routeChange();

  }
}
</script>

<style>
/*登录注册标题*/
.loginTitle {
  text-align: center;
  font-size: 26px;
  padding-top: 50px;
  margin-bottom: 20px;
}

.loginBox, .registerBox {
  background: #fff;
  padding: 40px;
  max-width: 320px;
  margin: 0 auto;
}

.loginBox {
  /*padding-bottom: 0;*/
}

.lr-title {
  position: relative;
  height: 32px;
  line-height: 32px;
  margin-bottom: 20px;
}

.lr-title h1 {
  font-size: 24px;
  color: #666;
  font-weight: bold;
  /*width:50%;*/
}

.lr-title p {
  font-size: 12px;
  color: #999;
  position: absolute;
  right: 0;
  top: 0;
}

.lr-btn {
  color: #fff;
  text-align: center;
  letter-spacing: 5px;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 30px;
}

.loginBox .el-input, .registerBox .el-input {
  margin-bottom: 20px;
}

.loginBox .el-alert, .registerBox .el-alert {
  top: -18px;
  /*background-color: #888;*/
}

.loginBox .el-input input, .registerBox .el-input input {
  border-radius: 4px;
}

.loginBox h3, .registerBox h3 {
  text-align: right;
  margin-bottom: 20px;
}

.loginBox h3 a, .registerBox h3 a {
  font-size: 13px;
  color: #999;
}

.loginBox .otherLogin {
  max-width: 320px;
  padding: 30px 40px;
  background: #ddd;
  text-align: center;
  margin-left: -40px;
  margin-right: -40px;
  visibility: hidden;
}

.loginBox .otherLogin p {
  margin-bottom: 20px;
  font-size: 16px;
}

.loginBox .otherLogin a i {
  display: inline-block;
  width: 42px;
  height: 42px;
  line-height: 42px;
  font-size: 18px;
  border-radius: 50%;
  color: #fff;
  margin: 0 10px;
}

.loginBox .otherLogin a i.fa-wechat {
  background: #7bc549;
}

.loginBox .otherLogin a i.fa-qq {
  background: #56b6e7;
}

.loginBox .otherLogin a i.fa-weibo {
  background: #ff763b;
}

/*登录成功*/
.registerSuc {
  padding: 40px;
  margin: 0 auto;
}

.registerSuc .sucIcon {
  text-align: center;
  margin-bottom: 30px;
  padding-left: 60px;
}

.registerSuc .sucContent {
  line-height: 1.5;
  font-size: 15px;
  text-align: center;
}

.registerSuc .sucContent p {
  margin-top: 10px;
  font-size: 13px;
  color: #999;
}

.registerSuc .sucContent .lastbtn {
  display: inline-block;
  font-size: 14px;
  padding: 3px 10px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}

.registerSuc .sucContent .el-icon-close {
  fong-size: 13px;
}
.verify_code {
  float: right;
  height: 40px;
  width: 50%;
  /*padding-right:10px;*/
}
</style>
