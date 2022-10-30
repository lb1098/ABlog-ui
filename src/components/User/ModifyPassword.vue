<template>
  <div>
    <div class="tcommonBox">
      <section>
        <el-form label-position="center" label-width="80px" >
          <el-form-item label="原密码">
            <el-input
              placeholder="原密码"
              type="password"
              maxlength="16"
              show-word-limit
              v-model="originPassword"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input
              placeholder="新密码"
              type="password"
              maxlength="16"
              show-word-limit
              v-model="newPassword1"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input
              placeholder="确认新密码"
              type="password"
              maxlength="16"
              show-word-limit
              v-model="newPassword2"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="motifyPwd">修改密码</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>
import {resetPassword} from "../../api/user";

export default {
  name: "ModifyPassword",
  data(){
    return {
      originPassword:"",
      newPassword1:"",
      newPassword2:"",
    }
  },
  methods:{
    motifyPwd(){
      if(this.originPassword.length<3){
        this.$message({
          message: '原密码过短',
          type: 'warning'
        });
        return;
      } else if(this.newPassword1!=this.newPassword2){
        this.$message({
          message: '新密码不一致',
          type: 'warning'
        });
        return;
      } else if(this.newPassword1.length<3){
        this.$message({
          message: '新密码长度过短',
          type: 'warning'
        });
        return;
      }
      resetPassword(this.originPassword,this.newPassword1).then((response)=>{
        this.$notify({
          message: '修改成功',
          type: 'success'
        });
      });

    },
  },
}
</script>

<style scoped>
* {
  list-style: none;
}
.el-input{
  max-width: 200px;
}
</style>
