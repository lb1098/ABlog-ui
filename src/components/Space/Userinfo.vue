<template>
  <div>
    <div class="tcommonBox userinfo" v-loading="loading">
      <div class="userinfo-avatar">
        <img :src="userInfo.avatar ? userInfo.avatar:this.$store.state.errorImg" class="user-avatar"></img>
      </div>
      <div class="nickName">
        <i class="fa fa-mars" aria-hidden="true" style="color: deepskyblue" v-if="userInfo.sex==0"></i>
        <i class="fa fa-venus" aria-hidden="true" style="color: deeppink" v-else></i>
        {{userInfo.nickName}}
      </div>
      <div style="text-align: center;margin-top: 10px;">
        <el-row>
          <el-col :span="8"  class="ab-text-overflow">
            <i class="fa fa-envelope" aria-hidden="true"></i> EMAIL
          </el-col>
          <el-col :span="16" class="ab-text-overflow ab-gery" :title="userInfo.email">
          {{userInfo.email}}
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8"  class="ab-text-overflow">
            <i class="fa fa-calendar" aria-hidden="true"></i> 注册日期
          </el-col>
          <el-col :span="16" class="ab-text-overflow ab-gery" v-if="userInfo.createTime" :title="userInfo.createTime">
            {{showInitDate(userInfo.createTime,'all')}}
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {getUserInfoById} from "../../api/user";
import {initDate} from "../../utils/server";

export default {
  name: "Userinfo",
  data() { //选项 / 数据
    return {
      id:"-1",
      userInfo:{},
      loading:true,
    }
  },
  watch: {
    '$route': 'routeChange',
  },
  mounted() {
    this.routeChange();
  },
  methods: { //事件处理器
    routeChange() {
      // 获取ID号
      this.id = this.$route.params.id
      this.getUserInfo();
    },
    getUserInfo(){
      getUserInfoById(this.id).then(res=>{
        this.userInfo = res;
        this.loading = false;
      });
    },
    showInitDate: function (oldDate, full) {
      return initDate(oldDate, full)
    },
  },
}
</script>

<style scoped>
.userinfo {
  border-radius: 5px;
  margin-bottom: 10px;
}
.userinfo-avatar {
  text-align: center;
}
.userinfo-avatar .user-avatar {
  height: 60px;
  width: 60px;
}
.nickName {
  font-weight: 500;
  font-size: 26px;
  text-align: center;
}
.ab-gery {
  color: #777;
  font-weight: 700;
}

</style>
