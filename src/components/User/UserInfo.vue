<!-- 用户中心 -->
<template>
  <div>
    <div v-show="isEdit" class="tcommonBox">
      <section>
        <el-form label-position="center" label-width="80px">
          <el-form-item label="用户名">
            <span class="disabled">{{userInfoObj.userName}}</span>
          </el-form-item>
          <el-form-item label="注册时间">
            <span class="disabled">{{userInfoObj.createTime}}</span>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              name="img"
              :action="uploadURL"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="userInfoObj.avatar" :src="userInfoObj.avatar?userInfoObj.avatar:'static/img/tou.jpg'"
                   :onerror="$store.state.errorImg" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">点击上传头像，只能上传jpg/png文件，且不超过1mb</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input
              placeholder="昵称"
              type="text"
              v-model="userInfoObj.nickName"
            ></el-input>
          </el-form-item>
          <el-form-item label="电子邮件">
            <span class="disabled">{{ userInfoObj.email ? userInfoObj.email : "无" }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <template>
              <el-radio class="radio" v-model="userInfoObj.sex" label="0">男</el-radio>
              <el-radio class="radio" v-model="userInfoObj.sex" label="1">女</el-radio>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button @click="isEdit=!isEdit">返 回</el-button>
            <el-button type="success"  @click="saveInfoFun">保 存</el-button>
          </el-form-item>
        </el-form>

      </section>
    </div>
    <div v-show="!isEdit" class="tcommonBox">
      <section>
        <el-form label-position="center" label-width="80px" >
          <el-form-item label="用户名">
            <span class="disabled">{{userInfoObj.userName}}</span>
          </el-form-item>
          <el-form-item label="注册时间">
            <span class="disabled">{{userInfoObj.createTime}}</span>
          </el-form-item>
          <el-form-item label="头像">
            <div class="avatar-uploader">
              <img :src="userInfoObj.avatar?userInfoObj.avatar:'static/img/tou.png'"
                   class="avatar">
            </div>
          </el-form-item>
          <el-form-item label="昵称">
            <span>{{ userInfoObj.nickName ? userInfoObj.nickName : "无" }}</span>
          </el-form-item>
          <el-form-item label="电子邮件">
            <span class="disabled">{{ userInfoObj.email ? userInfoObj.email : "无" }}</span>
          </el-form-item>
          <el-form-item label="性别">
            <span>{{ userInfoObj.sex == 0 ? '男' : '女' }}</span>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="isEdit=!isEdit">编 辑</el-button>
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>

<script>

import {getUserInfo, savaUserInfo} from '../../api/user.js'//获取用户信息，保存用户信息
import store from '../../store'


export default {
  name: 'UserInfo',
  data() { //选项 / 数据
    return {
      uploadURL: '',
      isEdit: false,
      userInfo: {},//本地存储的用户信
      userInfoObj: '',//用户的信息
    }
  },
  methods: { //事件处理器
    handleAvatarSuccess(res, file) {//上传头像
      if (res.code == 200) {
        this.userInfoObj.avatar = res.data;
        this.userInfoObj.head_start = 1;
      } else {
        this.$message.error('上传图片失败');
      }

    },
    beforeAvatarUpload(file) {//判断头像大小
      const isJPG = file.type == 'image/png' || file.type == 'image/jpg' || file.type == 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 1;
      // console.log(file);
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/JPEG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!');
      }
      return isJPG && isLt2M;
    },

    saveInfoFun: function () {//保存编辑的用户信息
      var that = this;
      if (!that.userInfoObj.nickName) { //昵称为必填
        that.$message.error('昵称为必填项，请填写昵称');
        return;
      }

      savaUserInfo(that.userInfoObj).then((response) => {//保存信息接口，返回展示页
        that.$message.success('保存成功！');
        that.isEdit = false;
        that.routeChange();
      })
    },
    routeChange: function () {//展示页面信息
      var that = this;
      // console.log(this.$router,this.$route);
      if (localStorage.getItem('userInfo')) {
        that.haslogin = true;
        that.userInfo = JSON.parse(localStorage.getItem('userInfo'));
        that.userId = that.userInfo.id;
        getUserInfo(that.userId).then((response) => {
          that.userInfoObj = response;
          that.userInfoObj.head_start = 0;
        })
      } else {
        that.haslogin = false;
      }

    }
  },
  components: { //定义组件

  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange'
  },
  created() { //生命周期函数
    this.routeChange();
    this.uploadURL = store.state.baseURL + 'upload'
  }
}
</script>

<style scoped>
.el-input{
  max-width: 200px;
}
.userInfoBox {
  list-style: none;
}

.userInfoBox .avatarlist {
  position: relative;

}

.avatar-uploader {
  display: inline-block;
  vertical-align: top;
}

.avatar-uploader .el-upload {
  border: 4px dashed #d9d9d9;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 40px;
  height: 40px;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}
</style>
