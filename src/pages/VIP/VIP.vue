<template>
  <div>
    <ab-header></ab-header>
    <ab-head-img-box title="VIP"></ab-head-img-box>
    <div class="container">
      <span class="title center">支付后如果未自动开通，请联系站长QQ</span>
      <br>
      <el-row :gutter="10">
        <el-col :sm="8" class="vip-main" v-for="(storeVip,index) in this.storeVipList" :key="storeVip.id">
          <header :style="{
            'background-color': storeVip.vip.id==1 ?'#fbb715':'#6f0ee6',
            }" class="vip-header">{{ storeVip.storeName }}</header>
          <section class="vip-content">
            <div class="money-content">
              <span class="money">
                <span :style="{'color': storeVip.discount<1?'rgb(76,107,34)':'inherit'}">{{formatNumber( storeVip.price*storeVip.discount )}}</span>
                <span class="discount" v-if="storeVip.discount<1">-{{formatNumber( (1-storeVip.discount)*100,0 )}}%</span>
              </span>
              <span class="small">积分</span>
            </div>
            <div class="money-discount">
              <span style="color: #999">原价:
                <span :style="{'text-decoration': storeVip.discount<1?'line-through':'none'}">{{formatNumber( storeVip.price )}}</span>
              </span>
            </div>
            <div class="vip-time">
              <span>{{storeVip.buyMonth}}个月</span>
            </div>
            <ul>
              <li>所有{{storeVip.vip.vipName}}资源开放</li>
              <li>所有{{storeVip.vip.vipName}}以下付费资源免积分</li>
            </ul>
            <footer>
              <el-button
                :style="{
                'background-color': storeVip.vip.id==1 ?'#fbb715':'#6f0ee6',
                'color':'#fff',
                'border': '0'}"
                round @click="updateVip(storeVip.id,storeVip.storeName,formatNumber(storeVip.price*storeVip.discount))">立即升级</el-button>
            </footer>
          </section>
        </el-col>
      </el-row>
    </div>
    <ab-footer></ab-footer>
  </div>
</template>

<script>
import footer from "../../components/footer";
import header from "../../components/header";
import headImgBox from "../../components/part/headImgBox";
import {storeVip, updateVip} from "../../api/vip";

export default {
  name: "VIP",
  data() { //选项 / 数据
    return {
      storeVipList:[],
    }
  },
  methods: { //事件处理器
    getStoreVip(){
      storeVip().then((res)=>{
        this.storeVipList = res;
      })
    },
    updateVip(id,name,money){
      this.$confirm('你确定要花费'+money+'积分，购买'+name+'?')
        .then(_ => {
          updateVip(id).then((res)=>{
            this.$notify({
              message: '购买成功',
              type: 'success'
            });
            this.$router.push("/User/Money");
          })
        })

    },
    routeChange: function () {

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
  components: { //定义组件
    'ab-footer': footer,
    'ab-head-img-box':headImgBox,
    'ab-header':header,
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange'
  },
  mounted() {
    this.getStoreVip();
  },
  created() { //生命周期函数
    var that = this;
    that.routeChange();

  }
}
</script>

<style scoped>
.container {
  max-width: 900px;
}
.money {
  position: relative;
  font-size: 32px;
  font-weight: 700;
}
.small {
  font-weight: 600;
}
.title{
  color: #999;
  display: block;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
}
.vip-main {
  box-sizing: border-box;
  text-align: center;
  margin-bottom: 10px;
}
.vip-content{
  border-radius: 0 0 8px 8px;
  background-color: #ffffff;
}
.vip-header{
  font-size: 20px;
  padding: 15px 0;
  font-weight: normal;
  color: #fff;
  border-radius: 8px 8px 0 0;
}
.money-content {
  display: block;
  padding: 20px 0 5px
}
.vip-time {
  padding-bottom: 50px;
  text-align: center;
}
.vip-time span{
  background: #f5f5f5;
  border-radius: 30px;
  padding: 7px 12px 5px;
  color: #333;
  display: inline-block;
  line-height: 1;
  font-size: 13px;
}
.vip-main ul li {
  font-size: 15px;
  padding-bottom: 10px;
  list-style: none;
}
.el-divider--horizontal{
  margin: 0;
}
section footer {
  padding: 10px 0;
}
.money-discount {
  padding-bottom: 10px;
}
.discount{
  font-family: "Microsoft JhengHei Light";
  border: none;
  position: absolute;
  display: inline-block;
  padding: 5px;
  color: rgb(190,238,17);
  background-color: rgb(76,107,34);
  margin-right: 10px;
  top: 50%;

  font-size: 16px;
  left: -10px;
  transform: translate(-100%,-50%);
}
</style>
