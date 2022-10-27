<template>
  <div>
    <ab-header></ab-header>
    <ab-head-img-box title="忘记密码" ></ab-head-img-box>
    <div class="content">
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :xs="20" :sm="12" :lg=8 :xl="6">
          <el-steps style="margin-bottom: 20px" :active="nowStatue" align-center finish-status="success">
            <el-step title="邮箱验证"></el-step>
            <el-step title="修改密码"></el-step>
          </el-steps>
          <div v-if="nowStatue==0" class="ab-content">
            <div>
              <el-input
              type="email"
              placeholder="邮箱"
              clearable
              v-model="email">
              </el-input>

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
                type="info"
                @click="btnSendEmail"
                :disabled.sync="btn_disable"
              >{{ buttonName }}</el-button>
              <div>
                <el-button style="width: 100%;" type="primary"  @click="goVerifyCode">验证验证码</el-button>
              </div>
            </div>
          </div>
          <div v-else-if="nowStatue==1" class="ab-content">
            <div>
              <el-alert
                style="margin-bottom: 10px"
                title="密码长度为6~20之间"
                type="info">
              </el-alert>
              <el-input
                type="text"
                placeholder="新密码"
                v-model="pwd1"
                minlength="6"
                maxlength="16"
                clearable
                show-word-limit
              >
              </el-input>
              <el-input
                type="text"
                placeholder="重复输入新密码"
                v-model="pwd2"
                minlength="6"
                maxlength="16"
                clearable
                show-word-limit
              >
              </el-input>
              <el-button style="width: 100%;" type="primary" @click="changePassword">修改密码</el-button>
            </div>
          </div>
          <div v-else-if="nowStatue==2" class="ab-content">
            <div>
              <p>恭喜！密码已经成功修改！</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <ab-footer></ab-footer>
  </div>
</template>

<script>
import footer from "../components/footer";
import header from "../components/header";
import {sendEmail, verifyForget} from "../api/email";
import headImgBox from "../components/part/headImgBox";
import {updateUserPassword} from "../api/user";

export default {
  name: "ForgetPassword",
  data(){
    return {
      nowStatue: 0 ,
      buttonName:"获取验证码",
      verify_email_code:"",
      email:"",
      btn_disable:false,
      uuid:"",// 用于后续验证
      count:59,
      pwd1:"",
      pwd2:"",
    }
  },
  components: { //定义组件
    'ab-footer': footer,
    'ab-header':header,
    'ab-head-img-box':headImgBox,
  },
  methods:{
    btnSendEmail(){
      if(this.btn_disable)
        return
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
      sendEmail(this.email).then((response) => {
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
    goVerifyCode(){
      console.log("验证密码")
      verifyForget(this.email,this.verify_email_code).then((response)=>{
        this.uuid = response;
        this.nowStatue=1;
      })
    },
    changePassword(){
      if(this.pwd1!=this.pwd2){
        this.$message({
          message: '两次密码输入不一致',
          type: 'warning'
        });
        return;
      }
      if(this.pwd1.length<6 || this.pwd2.length<6){
        this.$message({
          message: '密码长度过短',
          type: 'warning'
        });
        return;
      }
      // 修改密码
      updateUserPassword(this.uuid,this.pwd1).then((response)=>{
        this.nowStatue=2;
        this.$message({
          message: '密码修改成功',
          type: 'success'
        });
      })
    },
  },
  mounted() {

  },
}
</script>

<style scoped>

.content {
  margin-top: 20px;
}
.el-input {
  margin-bottom: 10px;
}
.ab-content{
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}
</style>
