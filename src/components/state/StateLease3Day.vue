<template>
  <div id="">
    <h3>{{this.$route.meta.title}}</h3><el-button type="primary" :loading="loading" @click="Lease3DayDataReflesh">刷新</el-button>
    <el-table :data="lease3day" border stripe style="width: 100%" :default-sort="{prop: 'device_id', order: 'ascending'}">
      <el-table-column prop="device_id" label="设备编号" ></el-table-column>
      <!-- <el-table-column prop="name" label="网点"></el-table-column> -->
      <el-table-column prop="building_name" label="站点名称"></el-table-column>
      <el-table-column label="日期" prop="date" sortable>
      </el-table-column>
      <el-table-column label="状态" prop="state">
      </el-table-column>
      <el-table-column label="归还日期" sortable prop="return_date">
      </el-table-column>
      <el-table-column prop="deposit_amount" label="保证金(元)" sortable></el-table-column>
    </el-table>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: 'StateLease3Day',
    components: {},
    computed: {
      ...mapGetters({
        lease3day: 'lease3day',
        loading: 'loading'
      }),
      filterr(row,column) {
        console.log("das");
        console.log(row);
        console.log(column);
        //return 555;
      }
    },
    data () {
      return {
        meta: {}
      }
    },
    methods: Object.assign(mapActions([
      'fetchLease3DayData',
      'Lease3DayDataReflesh'
    ]),
      {
      }
    ),
    created () {
      this.$store.dispatch('fetchLease3DayData');//action
      //this.$store.commit('init', this.$route.meta);
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route' () {
        //this.$store.commit('init', this.$route.meta);
        this.$store.dispatch('fetchLease3DayData');
      }
    }
  }
</script>

<style lang="less" scoped>
</style>
