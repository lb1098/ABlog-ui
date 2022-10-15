<!-- 文章列表 -->
<template>
  <div>

    <el-row class="ab-article-list">
      <!-- 新版 -->

      <el-col class="ab-content-list">

        <!-- 内容 -->
        <el-row class="ab-content" v-for="(item,index) in articleList" :key="'ab_article'+index">
          <a v-if="item.thumbnail" :href="'#/DetailArticle?aid='+item.id" target="_blank">
          <div class="item-thumb"
               v-if="item.thumbnail"
               :style="{
                 'background-image':'url('+item.thumbnail+')'
               }"
          >
          </div>
          </a>
          <div class="ab-item">
            <a :href="'#/DetailArticle?aid='+item.id" target="_blank">
              <div class="ab-article-title">
                {{ item.title }}
              </div>
            </a>
            <div class="ab-article-summary" v-text="item.summary" v-if="item.summary"></div>
            <div class="ab-article-summary" v-else>暂无摘要</div>
            <el-divider></el-divider>
            <div class="ab-article-mark">
              <span>
                <i class="fa fa-fw fa-user"></i> {{item.createByNickname}}
              </span>
              <span>
                <i class="fa fa-fw fa-clock-o"></i> {{ showInitDate(item.createTime, 'all') }}
              </span>
              <span>
                <i class="fa fa-fw fa-eye"></i> {{ item.viewCount }}
              </span>
              <span>
                <i class="fa fa-fw fa-hashtag"></i>
                <el-tag size="mini" style="cursor: pointer;" effect="plain" @click="goToHomeByCategoryId(item.categoryId)">{{ item.categoryName }}</el-tag>
              </span>
              <span v-if="item.tagVos.length>0">
                <i class="fa fa-fw fa-tags"></i>
                <el-tag
                  style="margin: 0 5px 5px 0;cursor: pointer;"
                  v-for="(citem, cindex) in item.tagVos" :key="'tagVo' + cindex"
                  type="info"
                  effect="plain"
                  @click="goToHomeByTagId(citem.id)"
                  size="mini">{{citem.name}}</el-tag>
              </span>
            </div>
          </div>
        </el-row>
      </el-col>

      <!-- 底部 导航条 -->
      <el-col class="ab-page-nav">
        <el-pagination
          background
          layout=" total,prev, pager, next"
          :current-page="queryParams.pageNum"
          :page-size="queryParams.pageSize"
          @current-change="freshPage"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {initDate} from '../utils/server.js'
import {articleList, articleListByTagId} from '../api/article'
import {mavonEditor} from 'mavon-editor'
import "mavon-editor/dist/markdown/github-markdown.min.css";
import "mavon-editor/dist/highlightjs/styles/github-dark-dimmed.min.css";

export default {
  name: 'Share',
  data() { //选项 / 数据
    return {
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 5,
        categoryId: -1,
        tagId:-1
      },
      articleList: [],
      total: 0,
    }
  },

  methods: { //事件处理器
    showInitDate: function (oldDate, full) {
      return initDate(oldDate, full)
    },
    getList() {
      articleList(this.queryParams).then((response) => {
        const markdownIt = mavonEditor.getMarkdownIt()
        var jsonArray = response.rows;
        for (var i in jsonArray) {
          var obj = jsonArray[i]
          if (obj.content != null) {
            obj.content = markdownIt.render(obj.content);
          }
        }
        this.articleList = response.rows;
        this.total = response.total;
      })
    },
    getListByTagId() {
      articleListByTagId(this.queryParams).then((response) => {
        const markdownIt = mavonEditor.getMarkdownIt()
        var jsonArray = response.rows;
        for (var i in jsonArray) {
          var obj = jsonArray[i]
          if (obj.content != null) {
            obj.content = markdownIt.render(obj.content);
          }
        }
        this.articleList = response.rows;
        this.total = response.total;
      })
    },
    // 分类选项
    freshPage :function (currentPage){
      this.queryParams.pageNum = currentPage;
      // console.log(currentPage)
      var path = this.$route.path+'?categoryId='+this.queryParams.categoryId+'&pageNum='+this.queryParams.pageNum;
      this.$router.push(path)
    },
    routeChange: function () {
      var that = this;
      // console.log(this.queryParams)
      this.queryParams.pageNum = that.$route.query.pageNum == undefined ? 1 : parseInt(that.$route.query.pageNum);
      this.queryParams.categoryId = that.$route.query.categoryId == undefined ? -1 : parseInt(that.$route.query.categoryId);//获取传参的classId
      this.queryParams.tagId = that.$route.query.tagId == undefined ? -1 : parseInt(that.$route.query.tagId);
      // console.log(this.queryParams)
      if(this.queryParams.categoryId>=0)
        this.getList();
      else if(this.queryParams.tagId>=0)
        this.getListByTagId();
      else{
        this.getList();
      }
    },
    goToHomeByTagId(id){
      this.$router.push("/Home?tagId="+id);
    },
    goToHomeByCategoryId(id){
      this.$router.push("/Home?categoryId="+id);
    },
  },
  components: { //定义组件

  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange',
    '$store.state.keywords': 'routeChange'
  },
  created() { //生命周期函数
    // console.log(this.$route);
    var that = this;
    that.routeChange();
  }
}
</script>

<style scoped>

.shareclassTwo li {
  display: inline-block;
}

.shareclassTwo li a {
  display: inline-block;
  padding: 3px 7px;
  margin: 5px 10px;
  color: #fff;
  border-radius: 4px;
  background: #64609E;
  border: 1px solid #64609E;
  transition: transform 0.2s linear;
  -webkit-transition: transform 0.2s linear;
}

.shareclassTwo li a:hover {
  transform: translate(0, -3px);
  -webkit-transform: translate(0, -3px);
}

.shareclassTwo li a.active {
  background: #fff;
  color: #64609E;

}


.ab-article-list {
  border-radius: 5px;
}



.ab-title h1 {
  float: left;
  font-weight: 700;
  font-size: 20px;
  color: #409EFF;
}

.ab-title span {
  float: right;
  font-size: 18px;
}
.ab-content-list {
  /*padding: 0 20px;*/
  /*background: #f1f3f4;*/
  /*border-left: 1px solid #d4d4d5;*/
  /*border-right: 1px solid #d4d4d5;*/
  /*border-bottom: 1px solid #d4d4d5;*/
  position: relative;
}
.ab-content-list footer {


}
.ab-content {
  /*padding: 14px 0;*/
  /*margin:0 14px;*/
  border: none;
  border-radius: 6px!important;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 1px 1px rgba(0,0,0,.05);
  background-color: #fff;
}
.ab-content:last-child {
  border: 0;
}
.ab-content-left{
  position: relative;
}
.ab-content-left header{
  font-size: 1.25rem;
  font-weight: 700;
  padding-bottom: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.ab-content-left
.markdown-body {
  text-indent: 2em;
  font-weight: 300;
  padding-bottom: 10px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space:nowrap;
  /*margin-bottom: 10px;*/
}



.ab-page-nav {
  padding: 0 20px 10px;
  text-align: center;
  /*background: #f1f3f4;*/
}
/*新版本*/
.item-thumb {
  min-height: 190px;
  background-position: center center;
  background-size: cover;
  transition: transform .5s;
}
.item-thumb:hover{
  transform: scale3d(1.1,1.1,1);
}
.ab-item {

}
.ab-article-title {
  /*border: 1px solid #d4d4d5;*/
  font-size: 22px;
  color: rgb(85, 85, 85);
  margin-bottom: 10px;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
}
.ab-article-summary {
  color: #98a6ad;
  /*margin-bottom: 10px;*/
}
.el-divider{
  margin: 15px 0;
}
.ab-article-mark {
  color: #98a6ad;
  display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
}
.ab-article-header {
  padding: 20px;
  /*background-color: #f9f9f9;*/
  font-weight: 300;
  color: #000;
  font-size: 36px;
}
</style>
