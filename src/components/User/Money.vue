<template>
  <div class="tcommonBox">
    <el-row :gutter="10">
      <el-col :sm="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px;">可用余额</span>
            <el-button v-if="!isSignal" @click="userSignal()" type="danger" style="float: right;" size="mini">签到
            </el-button>
            <el-button v-else type="info" style="float: right;" size="mini">已签到</el-button>
          </div>
          <span class="money" v-text="formatNumber(fund)"></span> 积分
        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="10" >
      <el-col :sm="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px;">捐助申请渠道</span>
          </div>
          <div>  <span class="fa fa-cny"></span> 与 积分 的兑换比例为1:100，可以支持任何时段的捐助兑换，目前<b>只能通过后台人工审核，申请后请联系站长通过。</b></div>
          <div>注意：每天仅能申请三次！</div>
          <br>
          <el-form ref="form"  label-width="80px" >
            <el-row :gutter="10">
              <el-col :sm="12">
                <el-form-item label="支付时间" required>
                  <el-date-picker
                    type="date"
                    placeholder="选择之前赞赏的日期，方便审核"
                    v-model="form.date"
                    value-format="yyyy-MM-dd"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :sm="12">
                <el-form-item label="支付方式" required>
                  <el-select v-model="form.type" placeholder="请选择支付方式">
                    <el-option label="支付宝" value="支付宝"></el-option>
                    <el-option label="微信" value="微信"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="支付凭证" required>
              <el-input placeholder="支付票据，可以填写赞赏的账单ID" v-model="form.payId"></el-input>
            </el-form-item>
            <el-row :gutter="10">
              <el-col :sm="12">
                <el-form-item label="支付金额" required>
                  <el-input-number
                    size="small"
                    placeholder="捐助金额（元）"
                    v-model="form.payNumber"
                    :min="1"
                    :max="10000"
                  >
                    <template slot="append">元</template>
                  </el-input-number>
                </el-form-item>
              </el-col>
              <el-col :sm="12">
                <el-form-item label="可兑换:" v-if="form.payNumber>0">
                  <span class="money" v-text="formatNumber(form.payNumber*100)"></span> 积分
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item>
              <el-button type="primary" @click="apply()">立即申请</el-button>
            </el-form-item>
          </el-form>

        </el-card>
      </el-col>
    </el-row>
    <br>
    <el-row :gutter="10">
      <el-col :sm="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px;">自动充值渠道</span>
          </div>
          <div><b>暂未开放！</b></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {apply, getUserFund, signal} from "../../api/fund";

export default {
  name: "Money",
  data() {
    return {
      userfund: {
        fund: 0,
        isSignal: false,
      },
      fund:0,
      isSignal: false,
      form:{
        type:"",
        date:"",
        payId:"",
        payNumber:"",
      },

    };
  },
  methods: {
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
    userSignal() {
      if (!this.userfund.isSignal) {
        signal().then((response) => {
          var now = Number(response.fund)
          var before = Number(this.userfund.fund)
          var fundDis = now - before;
          this.$notify({
            type: 'success',
            message: '签到成功！积分增加 ' + fundDis,
            duration: 9000,
          });
          this.userFund = response;
          this.fund = response.fund;
          this.isSignal = true;
        });
      }
    },
    routeChange: function () {
      getUserFund().then((response) => {
        this.userfund = response;
        this.fund = response.fund;
        this.isSignal = response.isSignal
      });
    },
    apply(){
      var form = this.form;
      apply(form.type,form.date,form.payId,form.payNumber).then((response)=>{
        this.$notify({
          type: 'success',
          message: '申请成功，请等待人工审查',
        });
        this.form = {
          type:"",
            date:"",
            payId:"",
            payNumber:"",
        };
      });
    },
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'routeChange'
  },
  mounted() {
    this.routeChange();
  },
}
</script>

<style>
b {
  font-weight: 700;
}
.money {
  font-size: 32px;
  font-weight: 700;
}

.el-card__header {
  padding: 8px 20px 0;
  border-bottom: none;
  font-size: 14px;
  color: #777;
}

.el-card__body {
  padding: 8px 20px 10px;
}

.el-card.is-always-shadow {
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
