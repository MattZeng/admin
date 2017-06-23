<template>
  <div id="">
    <h3>订单统计</h3>
    <el-date-picker
      v-model="range"
      type="datetimerange"
      :picker-options="pickerOptions"
      placeholder="选择时间范围"
      format="yyyy年MM月dd日 HH:mm:ss"
      align="right"
      v-on:change="changeHandle">
    </el-date-picker>
    <el-table :data="orderList" border stripe style="width: 100%" :default-sort="{prop: 'device_id', order: 'ascending'}">
      <el-table-column prop="date" label="日期" :formatter="formatterDate"></el-table-column>
      <el-table-column prop="terminal" label="网点"></el-table-column>
      <el-table-column prop="user" label="用户昵称"></el-table-column>
      <el-table-column prop="android" label="安卓"></el-table-column>
      <el-table-column prop="iphone" label="iphone"></el-table-column>
      <el-table-column prop="type_c" label="type-c"></el-table-column>
      <el-table-column prop="cash_pledge" label="押金"></el-table-column>
      <el-table-column prop="lease_date" label="租借日期" :formatter="formatterDate"></el-table-column>
      <el-table-column prop="return_date" label="归还日期" :formatter="formatterDate"></el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'OrderStateMent',
    components: {},
    data () {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        range: []
      }
    },
    computed: {
      ...mapGetters({
        orderList: 'orderStatement'
      }),
    },
    methods: {
      ...mapActions({
        fatchOrderStatement: 'fatchOrderStatement'
      }),
      changeHandle (){
        const start = this.range[0].getTime();
        const end = this.range[1].getTime();
        this.fatchOrderStatement({start, end})
      },
      formatterDate (row, column) {
        return row[column.property] ? new Date(row[column.property]).format('yyyy-MM-dd HH:mm') : ''
      },
    }
  }
</script>

<style lang="less" scoped>
</style>
