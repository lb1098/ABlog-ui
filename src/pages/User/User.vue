<template>
  <div>
    <sg-navbar></sg-navbar>
    <ab-head-img-box title="个人中心"></ab-head-img-box>
    <div class="container">
      <el-row :gutter="10">
        <el-col :xs="8" :sm="6">
          <ab-user-left-list></ab-user-left-list>
        </el-col>
        <el-col :xs="16" :sm="18">
          <router-view></router-view>
        </el-col>
      </el-row>
    </div>
    <ab-footer></ab-footer>
  </div>
</template>

<script>
import header from "../../components/header";
import headImgBox from "../../components/part/headImgBox";
import footer from "../../components/footer";
import UserLeftList from "../../components/User/UserLeftList";

export default {
  name: "User",
  components:{
    'sg-navbar': header,
    'ab-head-img-box':headImgBox,
    'ab-user-left-list':UserLeftList,
    'ab-footer': footer,
  },

}
</script>

<style>
.container {
  max-width: 1000px;
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

.disabled {
  color: #999;
}
</style>
