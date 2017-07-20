<template>
  <div>
    <el-form :inline="true" :model="account" class="">
      <el-form-item label="账号:">
        <el-input v-model="account.name" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search(account)">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="20">
      <el-col :span="12">
        <h3>充值记录</h3>
        <el-collapse v-model="activeName1">
          <el-collapse-item :title="payment.p_amount/100 + '元'" :name="payment.id" v-for="payment in paymentList" key="payment.id">
            <div>商户订单号：{{payment.uuid}}</div>
            <div>充值日期：{{new Date(payment.p_finished).format('yyyy-MM-dd HH:mm')}}</div>
            <div>已提现部分：</div>
            <ul>
              <li v-for="withdraw in payment.withdrawed">
                {{`${withdraw.wp_amount/100}元-微信退款单号${withdraw.refund_id}`}}
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-col>
      <el-col :span="12">
        <h3>提现记录</h3>
        <el-collapse v-model="activeName2" >
          <el-collapse-item :title="`${withdraw.w_amount/100}元`" name="withdraw.uuid" v-for="withdraw in withdrawList" key="withdraw.uuid">
            <div>提现日期：{{new Date(withdraw.date).format('yyyy-MM-dd HH:mm')}}</div>
            <div>完成日期：{{withdraw.w_finished&&(new Date(withdraw.w_finished).format('yyyy-MM-dd HH:mm'))}}</div>
            <div>退款记录：</div>
            <ul class="ul-withdraw-payment">
              <li v-for="withdrawPayment in withdraw.withdrawPayments">
                <section>金额：{{withdrawPayment.wp_amount/100}}元</section>
                <section>商户支付订单号：{{withdrawPayment.p_uuid}}</section>
                <section>微信退款单号：{{withdrawPayment.refund_id}}</section>
                <section>结果：{{withdrawPayment.wp_state}}</section>
              </li>
            </ul>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCollapseTransition from "element-ui/src/transitions/collapse-transition";

  export default {
    name: 'WithdrawManage',
    components: {ElCollapseTransition, ElRow},
    computed: {
      ...mapGetters(['withdrawList','paymentList']),
    },
    data () {
      return {
        account: {
          name: ''
        },
        activeName1: [],
        activeName2: []
      }
    },
    methods: {
      ...mapActions({
        search: 'searchWithdraw'
      }),
    }
  }
</script>

<style lang="less" scoped>
  .ul-withdraw-payment{
    li{
      border: 1px solid black;
      margin-bottom: .1rem;
      padding-left: .1rem;
    }
  }
</style>
