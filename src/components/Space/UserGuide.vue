<template>
  <div class="ab-box">
    <el-row class="ab-article-list">
      <!-- 新版 -->
      <el-col class="ab-content-list">
        <!-- 内容 -->
        <el-row class="ab-content" v-for="(item,index) in articleList" :key="'ab_article'+index">
          <div class="ab-item">
            <a :href="'#/Guide/Article/'+item.id">
              <div class="ab-article-title">
                <span v-if="item.vipLevelLimit>0">
                  <span
                    :class="{'vip-color':item.vipLevelLimit==1,'svip-color': item.vipLevelLimit==2}"
                    class="iconfont icon-vip"></span>
                </span>
                {{ item.title }}
              </div>
            </a>
            <div class="ab-article-summary" v-text="item.summary" v-if="item.summary"></div>
            <div class="ab-article-summary" v-else>暂无摘要</div>
            <el-divider></el-divider>
            <div class="ab-article-mark">
              <span v-if="item.fundLimit">
                <i class="fa fa-money" aria-hidden="true"></i>
                {{ item.fundLimit }}
              </span>
              <span>
                <i class="fa fa-fw fa-user"></i> {{item.createByNickname}}
              </span>
              <span>
                <i class="fa fa-fw fa-clock-o"></i> {{ showInitDate(item.createTime, 'all') }}
              </span>

              <span v-if="item.category">
                <i class="fa fa-fw fa-hashtag"></i>
                <el-tag size="mini" effect="plain">{{ item.category.name }} </el-tag>
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

import {initDate} from "../../utils/server";
import {guideArticleByUserId} from "../../api/guide";

export default {
  name: "UserGuide",
  components: { //定义组件
  },
  data() { //选项 / 数据
    return {
      // 查询参数
      queryParams: {
        userId:-1,
        pageNum: 1,
        pageSize: 5,
      },
      articleList: [],
      total: 0,
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
      this.queryParams.userId = this.$route.params.id;
      this.queryParams.pageNum = this.$route.query.pageNum == undefined ? 1 : parseInt(this.$route.query.pageNum);
      this.getList();

    },
    getList(){
      guideArticleByUserId(this.queryParams).then(res=>{
        this.articleList = res.rows;
        this.total = res.total;
      })
    },
    // 分类选项
    freshPage :function (currentPage){
      this.queryParams.pageNum = currentPage;
      this.getList();
    },
    showInitDate: function (oldDate, full) {
      return initDate(oldDate, full)
    },
  },
}
</script>

<style scoped>
.ab-box {
  margin-top: 20px;
}
.ab-content {
  border-radius: 5px;
  box-shadow: 0 1px 3px 1px rgba(0,0,0,0.1);
  margin-bottom: 20px;
}
.ab-article-mark {
  color: #98a6ad;
  display: inline-block;
  width: 100%;
}
.ab-article-title {
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
.ab-content-list {
  padding: 5px;
}
</style>
