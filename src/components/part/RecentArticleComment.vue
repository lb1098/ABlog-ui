<template>
  <div>
    <div class="ab-sidebar">
      <div class="ab-title">
        <h1>最新文章评论</h1>
      </div>
      <div class="recent-comment-list">
        <div v-for="(item, index) in recentArticleComment" :key="'recentArticleComment' + index">
          <!--  <el-link @click="goToHref(item.articleId,item.id)" type="info">{{item.content }}</el-link>-->
          <div class="comment-block" @click="goToHref(item.articleId,item.id)" style=" ">
            <img style="position: absolute; left: 0;top: 50%;transform: translateY(-50%);" class="ab-left-avatar" :src="item.avatar ? item.avatar :$store.state.errorImg">
            <div class="ab-text-overflow">
              <b style="font-weight: 700;">{{item.username}}</b>
              <i v-if="item.rootId>=0">回复
                <b style="font-weight: 700;">{{item.toCommentUserName}}</b>
              </i>
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


import {recentArticleComment} from "../../api/comment";

export default {
  name: "RecentArticleComment",
  data(){
    return {
      recentArticleComment:"",
    }
  },
  mounted() {
    this.getRecentArticleComment();
  },
  methods:{
    getRecentArticleComment(){
      recentArticleComment().then((response) => {
        this.recentArticleComment = response;
      });
    },
    goToHref(id,cid){
      this.$router.push('/DetailArticle?aid=' + id +'&cid='+cid);
    },
  }
}
</script>

<style scoped>

</style>
