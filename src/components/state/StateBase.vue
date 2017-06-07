<template>
  <div id="">
    <h3>{{this.$route.meta.title}}</h3>
    <el-table :data="stateDate" border stripe style="width: 100%" :default-sort="{prop: 'device_id', order: 'ascending'}">
      <el-table-column prop="device_id" label="编号" sortable ></el-table-column>
      <el-table-column prop="name" label="网点"></el-table-column>
      <el-table-column prop="leaseCount" label="租借次数" sortable></el-table-column>
      <el-table-column prop="android" label="安卓(条)" sortable></el-table-column>
      <el-table-column prop="iphone" label="苹果(条)" sortable></el-table-column>
      <el-table-column prop="typeC" label="type-c(条)" sortable></el-table-column>
      <el-table-column prop="leaseIncome" label="租金收入" sortable></el-table-column>
      <el-table-column prop="itemIncome" label="数据线收入" sortable></el-table-column>
    </el-table>


    <button @click="fetchData"></button>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'StateBase',
    components: {},
    computed: mapGetters({
      stateDate: 'stateDate'
    }),
    data () {
      return {
        meta: {}
      }
    },
    methods: mapActions([
      'fetchData'
    ]),
    created () {
//      this.$store.dispatch('')//action
      this.$store.commit('init', this.$route.meta);
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route' () {
        this.$store.commit('init', this.$route.meta);
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
