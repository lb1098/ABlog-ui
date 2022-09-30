<template>
  <div class="listBox">
    <el-row>
      <div class="top">归档</div>
    </el-row>
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
    <el-row v-if="tagList.length>0">
      <h3 class="label">标签</h3>
      <el-row class="ab-select-category">
        <a :class="['ab-select-tag-link',{'ab-select-tag-link-active': tag.id == queryParams.tagId }]"
           type="primary"
           v-for="(tag,index) in tagList"
           :key="index"
           @click="selectTagList(tag.id)"
        >
          {{ tag.name }}
        </a>
      </el-row>

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
      background
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
import {articleListAndTag,getTagByCategoryId} from "../api/article";
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
        pageSize: 10,
        categoryId: 0,
        tagId:0,
      },

      articleList:[],
      tagList:[],
      // hasMore:true,
      articleCount:0,

    }
  },
  created() {
    this.routeChange();
    // this.getAllCategoryList();
  },
  watch:{
    $route:function(){
      this.routeChange();
    },
    queryParams : {
      deep:true,
      handler:function () {
        if(this.queryParams.categoryId>0){
          getTagByCategoryId(this.queryParams.categoryId).then((response)=>{
            this.tagList=response;
            // console.log(this.tagList)
          });
        } else {
          this.tagList = [];
        }
      }
    }
  },
  methods:{
    routeChange : function(){
      var that = this;
      this.queryParams.categoryId = (that.$route.query.categoryId==undefined?0:parseInt(that.$route.query.categoryId));//获取传参的classId
      this.queryParams.pageNum = (that.$route.query.pageNum==undefined?0:parseInt(that.$route.query.pageNum));
      this.queryParams.tagId = (that.$route.query.tagId==undefined?0:parseInt(that.$route.query.tagId));
      // console.log(this.queryParams)
      this.getList();
      this.getAllCategoryList();
    },
    getList:function(){
      articleListAndTag(this.queryParams).then((response)=>{
        this.articleList = response.rows;
        this.articleCount = response.total;
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
      var path = this.$route.path+'?categoryId='+this.queryParams.categoryId+'&pageNum='+this.queryParams.pageNum;
      if(this.queryParams.tagId>0)
        path += '&tagId='+this.queryParams.tagId
      this.$router.push(path)
    },
    // 查询标签信息
    selectTagList:function (tagId){
      this.queryParams.tagId = tagId;
      // console.log(this.queryParams)
      this.$router.push(this.$route.path+
          '?categoryId='+this.queryParams.categoryId+
          '&pageNum='+1+
        '&tagId='+this.queryParams.tagId
      )
    }

  },


}
</script>

<style scoped>
.top {
  font-size: 25px;
  font-weight: 700;
  text-align: center;
  padding: 30px 0;
}
.listBox{
  background: #fff;
  padding: 15px;
  padding-left: 50px;
  padding-right: 50px;
  border-radius: 5px;
  margin-bottom: 40px;
  border: 1px solid #d4d4d5;
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
  line-height: 40px;
}
.ab-select-category-link {
  padding: 8px 10px;
  color: #E6A23C;
  font-weight: 700;
  margin: 0 3px;
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
.ab-select-tag-link {
  padding: 8px 10px;
  color: #F56C6C;
  font-weight: 700;
  margin: 0 3px;
  cursor: pointer;
}
.ab-select-tag-link-active {
  padding: 8px 10px;
  background-color: #F56C6C;
  color: white;
  font-weight: 700;
  border-radius: 4px;
  margin: 0 3px;
}
.ab-select-tag-link:hover {
  padding: 8px 10px;
  background-color: #F56C6C;
  color: white;
  font-weight: 700;
  border-radius: 4px;
  margin: 0 3px;
}
</style>
