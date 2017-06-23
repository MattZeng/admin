<template>
  <div id="">
    <h3>扫描统计</h3>
    <el-date-picker
      v-model="range"
      type="datetimerange"
      :picker-options="pickerOptions"
      placeholder="选择时间范围"
      format="yyyy年MM月dd日 HH:mm:ss"
      align="right"
      v-on:change="changeHandle">
    </el-date-picker>
    <el-table :data="scanlogList" border stripe style="width: 100%" :default-sort="{prop: 'device_id', order: 'ascending'}">
      <el-table-column prop="device_id" label="编号" sortable ></el-table-column>
      <el-table-column prop="name" label="网点"></el-table-column>
      <el-table-column prop="count" label="扫描次数" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'ScanStatement',
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
    methods: {
      ...mapActions({
        fatchScanlog: 'fatchScanlog'
      }),
      changeHandle(){
        const start = this.range[0].getTime();
        const end = this.range[1].getTime();
        this.fatchScanlog({start, end})
      }
    },
    computed: {
      ...mapGetters({
        scanlogList: 'scanlogList'
      })
    }
  }
</script>

<style lang="less" scoped>
</style>
