<template>
  <div class="listBox">
    <el-row>
      <h1 class="title">分类</h1>
      <el-row class="ab-select-category">
        <a :class="['ab-select-category-link',{'ab-select-category-link-active': category.id == queryParams.categoryId }]"
           type="primary"
           v-for="(category,index) in categoryList"
           :key="index"
           :href="'#/Archive?categoryId='+category.id"

        >
          {{ category.name }}
        </a>
      </el-row>
    </el-row>
    <el-row>
      <h3 class="label">标签</h3>


    </el-row>

    <el-row>
      <div>
        <el-timeline>
          <el-timeline-item
            v-for="(article, index) in articleList"
            :key="index"
            :timestamp="article.createTime"
            :type="activities.type"
            :color="activities.color"
            :size="activities.size"
            class="ab-li-article"
          >

            <el-link :href="'#/DetailArticle?aid='+article.id" target="_blank">
              {{article.title}}
            </el-link>
            <el-tag size="mini" v-if="article.isTop>0" effect="plain">置顶</el-tag>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-row>
    <el-pagination
      layout="prev, pager, next"
      :current-page="queryParams.pageNum"
      :page-size="queryParams.pageSize"
      :total="articleCount"
      @current-change="freshPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import {articleList} from "../api/article";
import axios from 'axios';
import {getCategoryList} from "../api/category";

export default {
  name: "ArchiveList",
  components: {

  },
  data() { //选项 / 数据
    return {
      activities:{
        size: 'normal',
        type: 'primary',
        icon: 'el-icon-more',
        color: '#00a7e0'
      },
      categoryList:[],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 2,
        categoryId: 0
      },
      articleList:[],
      // hasMore:true,
      articleCount:0,

    }
  },
  created() {
    this.routeChange();
    // this.getAllCategoryList();
  },
  watch:{
    '$route':function(){
      this.routeChange();
    },
  },
  methods:{
    routeChange : function(){
      var that = this;
      this.queryParams.categoryId = (that.$route.query.categoryId==undefined?0:parseInt(that.$route.query.categoryId));//获取传参的classId
      this.queryParams.pageNum = (that.$route.query.page==undefined?0:parseInt(that.$route.query.page));//获取传参的classId
      this.showSearchShowList(true);
      this.getAllCategoryList();
    },
    showSearchShowList:function(initData){//展示数据
      if(initData){
        this.articleList = []
      }
      this.getList()
    },
    getList:function(){
      articleList(this.queryParams).then((response)=>{
        this.articleList = this.articleList.concat(response.rows)
        this.articleCount = response.total;
        // if(response.total<=this.articleList.length){
        //   this.hasMore=false
        // }else{
        //   this.hasMore=true
        //   this.queryParams.pageNum++
        // }
      })
    },
    getAllCategoryList:function (){
      getCategoryList().then((response)=>{
        this.categoryList = [];
        this.categoryList.push({
          id: '0',
          name:'全部'
        });
        this.categoryList = this.categoryList.concat(response);

      });
    },
    // 分类选项
    freshPage :function (currentPage){
      this.queryParams.pageNum = currentPage;
      // console.log(this.$route.path)
      this.$router.push(this.$route.path+'?categoryId='+this.queryParams.categoryId+'&page='+this.queryParams.pageNum)
    }


  },


}
</script>

<style scoped>
.listBox{
  background: #fff;
  padding: 15px;
  padding-left: 50px;
  padding-right: 50px;
  border-radius: 5px;
  margin-bottom: 40px;
}
.title{
  text-align: left;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 30px;
}
.label {
  font-weight: 700;
  margin-bottom: 30px;
  text-align: left;
  font-size: 18px;
}
.ab-li-article {
  padding-bottom: 15px;
}
.ab-select-category{
  padding: 0 10px;
  margin-bottom: 40px;
}
.ab-select-category-link {
  padding: 8px 10px;
  color: #E6A23C;
  margin: 0 5px;
}
.ab-select-category-link-active {
  background-color: #E6A23C;
  color: white;
  border-radius: 4px;
  border: 0;
}
.ab-select-category-link:hover {
  background-color: #E6A23C;
  color: white;
  border-radius: 4px;
  border: 0;
}
</style>
