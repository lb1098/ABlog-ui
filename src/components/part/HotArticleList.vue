<template>
  <div>
    <div class="ab-sidebar">
      <div class="ab-title">
        <h1>热门文章</h1>
      </div>
      <div class="hot-article-list">
        <div v-for="(item, index) in browseList" :key="'browseList' + index">
          <el-link :href="'#/DetailArticle?aid=' + item.id" type="info">{{item.title }}</el-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {hotArticleList} from "../../api/article";

export default {
  name: "HotArticleList",
  data(){
    return {
      browseList: "", //热门文章 浏览量最多
    }
  },
  mounted() {
    this.getHotArticleList();
  },
  methods:{
    getHotArticleList() {
      hotArticleList().then((response) => {
        this.browseList = response;
      });
    },
  }
}
</script>

<style scoped>

</style>
