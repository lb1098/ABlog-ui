<template>
  <div>
    <div class="ab-sidebar">
      <div class="ab-title">
        <h1>最新留言板</h1>
      </div>
      <div class="recent-comment-list">
        <div v-for="(item, index) in recentLinkComment" :key="'recentLinkComment' + index">
          <!--  <el-link @click="goToHref(item.articleId,item.id)" type="info">{{item.content }}</el-link>-->
          <div class="comment-block" @click="goToLinkHref(item.id)" style=" ">
            <img style="position: absolute; left: 0;top: 50%;transform: translateY(-50%);" class="ab-left-avatar" :src="item.avatar ? item.avatar :$store.state.errorImg">
            <div class="ab-text-overflow">
              <b style="font-weight: 700;">{{item.username}}</b>
              <span v-if="item.rootId>-1">回复
                <b style="font-weight: 700;">{{item.toCommentUserName}}</b>
              </span>
            </div>
            <div class="ab-text-overflow ab-comment-time" >{{item.createTime}}</div>
            <div class="ab-text-overflow ab-comment-content">{{item.content}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import {recentLinkComment} from "../../api/comment";

export default {
  name: "MessageBoard",
  data(){
    return {
      recentLinkComment:"",
    }
  },
  mounted() {
    this.getRecentLinkComment()
  },
  methods:{
    getRecentLinkComment(){
      recentLinkComment().then((response) => {
        this.recentLinkComment = response;
      });
    },
    goToLinkHref(cid){
      this.$router.push('/Friendslink?cid='+cid);
    },
  }
}
</script>

<style scoped>

</style>
