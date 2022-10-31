<template>
  <div>
    <div class="leftRight">
      <el-table
        :data="this.notifyList">

        <el-table-column
          label="评论人"
          width="80px"
        >
          <template slot-scope="scope">
            <span class="ab-text-overflow" v-if="scope.row.commentUserName">{{scope.row.commentUserName}}</span>
            <span class="ab-text-overflow" v-else>游客</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="content"
          label="评论内容"
        >
        </el-table-column>
        <el-table-column
          label="链接"
          width="80px"
        >
          <template slot-scope="scope">
            <el-link type="primary" :href="'#'+scope.row.url">查看</el-link>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="通知时间"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          width="80px"
        >
          <template slot-scope="scope">
            <el-button
              type="success"
              icon="el-icon-check"
              circle
              v-if="scope.row.isRead==0"
              @click=" readNotify(scope.row.id)  "
            ></el-button>
            <el-tag type="info" size="medium" v-else>已读</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <div class="ab-page">
        <el-pagination
          background
          layout="prev, pager, next"
          :current-page.sync="queryParams.pageNum"
          :page-size="queryParams.pageSize"
          :total="notifyAllCount"
          @current-change="freshPage"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import header from '../header.vue'
import rightlist from '../rightlist.vue'
import footer from "../footer";
import headImgBox from "../part/headImgBox";
import {getUnreadCount,getList,userReadNotify} from '../../api/notify.js'
import leftlist from "../leftlist";

export default {
  name: "ab-Notify",
  data() { //选项 / 数据
    return {
      notifyList:[],
      notifyAllCount:0,
      // 查询参数
      queryParams: {
        pageNum: 0,
        pageSize: 10,
      },

    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange',
  },
  methods: { //事件处理器
    // 分类选项
    freshPage :function (currentPage){
      this.queryParams.pageNum = currentPage;
      this.routeChange()
    },
    routeChange: function () {
      var that = this;
      getList(this.queryParams).then(response=>{
        this.notifyList = response.rows;
        this.notifyAllCount = response.total;
      });
    },
    readNotify: function (id){

      userReadNotify(id).then(response=>{
        this.$notify({
          title: '成功已读',
          message: '已读该信息',
          type: 'success',
          duration: 1000
        });
        this.routeChange();
      }).catch(()=>{
        this.$notify.error({
          title: '失败',
          message: '无法完成已读',
          duration: 1000
        });
      });

    },
  },
  components: { //定义组件
    'sg-nav': header,
    'ab-head-img-box': headImgBox,
    'ab-leftlist':leftlist,
    'sg-rightlist': rightlist,
    'ab-footer': footer,
  },
  created() { //生命周期函数

  },
  mounted() {
    this.routeChange();
  },
}

</script>

<style scoped>
.ab-page {
  padding: 15px;

}
.leftRight {
  /*border: 1px solid #d4d4d5;*/
  box-sizing: border-box;
  padding: 5px;
  /*border-radius: 5px;*/
  background-color: #fff;
}
</style>
