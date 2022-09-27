<!-- 文章列表 -->
<template>
  <div>
    <el-row class="ab-article-list">
      <!-- 新版 -->
      <!-- 头部  -->
      <el-col class="ab-title">
        <h1>文章列表</h1>
        <span>共 <i style="font-size: 24px;color:#E6A23C; ">{{ total }}</i> 篇  </span>
      </el-col>

      <el-col class="ab-content-list">
        <!-- 内容 -->
        <el-row class="ab-content" v-for="(item,index) in articleList" :key="'ab_article'+index">
          <a :href="'#/DetailArticle?aid='+item.id" target="_blank">
          <el-col :span="18" class="ab-content-left">
            <header>{{ item.title }}</header>
            <div class="markdown-body" v-text="item.summary" v-if="item.summary"></div>
            <div class="markdown-body" v-else>暂无摘要</div>
            <footer>
              <i class="fa fa-fw fa-clock-o"></i>
              <span v-html="showInitDate(item.createTime,'all')">{{ showInitDate(item.createTime, 'all') }}</span>
              <span>
                <i class="fa fa-fw fa-eye"></i>{{ item.viewCount }}次围观
              </span>
              <a class="category" :href="'#/Home?categoryId='+item.categoryId">
                <el-tag effect="plain">{{ item.categoryName }}
                </el-tag>
              </a>

            </footer>
          </el-col>
          </a>
          <el-col :span="6" class="ab-content-right" v-if="item.thumbnail">
            <el-image :src="item.thumbnail" class="maxW" lazy :preview-src-list="[item.thumbnail,]">

            </el-image>
          </el-col>
        </el-row>
      </el-col>
      <!-- 底部 导航条 -->
      <el-col class="ab-page-nav">
        <el-pagination
          layout="prev, pager, next"
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
import {articleList} from '../api/article'
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
        categoryId: 0
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
        this.articleList = this.articleList.concat(response.rows)
        this.total = response.total;
      })
    },
    // 分类选项
    freshPage :function (currentPage){
      this.queryParams.pageNum = currentPage;
      console.log(currentPage)
      var path = this.$route.path+'?categoryId='+this.queryParams.categoryId+'&pageNum='+this.queryParams.pageNum;
      this.$router.push(path)
    },
    showSearchShowList: function (initData) {//展示数据
      if (initData) {
        this.articleList = []

      }
      this.getList()
    },
    addMoreFun: function () {//查看更多
      this.showSearchShowList(false);
    },
    routeChange: function () {
      var that = this;
      console.log(this.queryParams)
      this.queryParams.pageNum = that.$route.query.pageNum == undefined ? 1 : parseInt(that.$route.query.pageNum);
      this.queryParams.categoryId = that.$route.query.categoryId == undefined ? 0 : parseInt(that.$route.query.categoryId);//获取传参的classId
      console.log(this.queryParams)
      this.showSearchShowList(true);
    }
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

.sharelistBox {
  transition: all 0.5s ease-out;
  font-size: 15px;
}

.markdown-body {
  max-height: 200px;
  overflow: hidden;
}

.box-card {
  padding: 14px;
}

.ab-article-list {
  background-color: #fff;
  border-radius: 5px;
}

.ab-title {
  border: 1px solid #d4d4d5;
  display: block;
  line-height: 20px;
  padding: 14px;
  border-radius: 5px 5px 0 0;
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
  border-left: 1px solid #d4d4d5;
  border-right: 1px solid #d4d4d5;
  /*border-bottom: 1px solid #d4d4d5;*/
  position: relative;
}
.ab-content-list footer {


}
.ab-content {
  padding: 14px 0;
  margin:0 14px;
  border-bottom: 1px solid #d4d4d5;
  max-height: 150px;
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
.ab-content-right {
  box-sizing: border-box;
  overflow: hidden;
  position: absolute;
  height: 100%;
  right: 0;
  top: 0;
  padding: 10px;
  text-align: center;
}
.maxW {
  border-radius: 5px;
  max-height: 100%;
  overflow: hidden;
  border:1px solid #d4d4d5;
}
.category {
  position: absolute;
  bottom: 0;
  right: 5px;
}

.ab-page-nav {
  padding: 14px 0;
  border: 1px solid #d4d4d5;
  border-radius: 0 0 5px 5px;
}
</style>
