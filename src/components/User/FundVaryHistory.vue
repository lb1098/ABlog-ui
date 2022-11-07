<template>
  <div>
    <div class="tcommonBox">
      <el-table
        :data="fundVaryHistoryList"
        style="width: 100%"
        align="left"
        header-align="center"
      >
        <el-table-column
          prop="createTime"
          label="日期"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          label="变动操作"

          align="center"
        >
          <template slot-scope="scope">
            <span class="ab-text-overflow">{{scope.row.operation}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="积分变动"
          align="center"
          width="200"
        >
          <template slot-scope="scope">
            <span
              :style="{
                'font-weight': 700,
                'color': scope.row.dataVariation>0? 'red':'green',
              }"
              :title="formatNumber(scope.row.dataVariation)"
            >
              <span v-if="scope.row.dataVariation>=0">+</span>{{formatNumber(scope.row.dataVariation) }}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout=" total,prev, pager, next"
        :current-page="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        @current-change="freshPage"
        :total="total">
      </el-pagination>

    </div>
  </div>
</template>

<script>
import {applyList, fundHistoryList} from "../../api/fund";

export default {
  name: "FundVaryHistory",
  data(){
    return {
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
      fundVaryHistoryList:[],
      total:0,
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange',
  },
  mounted() {
    this.routeChange();
  },
  methods:{
    routeChange() {
      this.queryParams.pageNum = this.$route.query.pageNum == undefined ? 1 : parseInt(this.$route.query.pageNum);
      fundHistoryList(this.queryParams).then((response)=>{
        this.fundVaryHistoryList = response.rows;
        this.total = response.total;
      })
    },
    // 分类选项
    freshPage :function (currentPage){
      this.queryParams.pageNum = currentPage;
      var path = this.$route.path+'?pageNum='+this.queryParams.pageNum;
      this.$router.push(path)
    },
    formatNumber(num, precision, separator) {
      /*******
       * num：待处理数字
       * precision：保留小数位
       * separator：分隔符
       * eg:formatNumber(100000000) 结果"100,000,000"
       * formatNumber(100000000,2); 结果："100,000,000.00"
       * formatNumber(100000000,2,"?"); 结果："100?000?000.00"
       *********/
      var parts;
      // 判断是否为数字
      if (!isNaN(parseFloat(num)) && isFinite(num)) {
        // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
        // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
        // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
        // 的值变成了 12312312.123456713
        num = Number(num);
        // 处理小数点位数
        num = (typeof precision !== 'undefined' ? num.toFixed(precision) : num).toString();
        // 分离数字的小数部分和整数部分
        parts = num.split('.');
        // 整数部分加[separator]分隔, 借用一个著名的正则表达式
        parts[0] = parts[0].toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + (separator || ','));

        return parts.join('.');
      }
      return NaN;
    },
  },
}
</script>

<style scoped>

</style>
