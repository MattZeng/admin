<template>
  <div id="sidebar">
    <el-menu  @open="" @close="" theme="dark" unique-opened router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-document"></i>报表</template>
        <el-menu-item-group>
          <template slot="title">基本统计</template>
          <el-menu-item index="state-today">今日新增</el-menu-item>
          <el-menu-item index="state-month">当月新增</el-menu-item>
          <el-menu-item index="state-accumulate">累计统计</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">订单统计</template>
          <el-menu-item index="state-lease-3day">租借超3天</el-menu-item>
          <el-menu-item index="state-order">累计统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>机器管理</template>
        <el-menu-item index="terminal">机器电池</el-menu-item>
        <el-menu-item index="terminal-ad">广告管理</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-date"></i>商户管理</template>
        <el-menu-item index="merchants">商户信息</el-menu-item>
        <el-menu-item index="merchants-terminal">机器关联</el-menu-item>
      </el-submenu>
      <el-menu-item index="order-manage"><i class="el-icon-setting"></i>订单管理</el-menu-item>
      <el-menu-item index="withdraw-manage"><i class="el-icon-setting"></i>提现管理</el-menu-item>
    </el-menu>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'Sidebar',
    components: {},
    data () {
      return {}
    },
    props: [''],
    methods: {}
  }
</script>

<style lang="less" scoped>
  #sidebar{
    height: 100%;
    ul{
      height: 100%;
    }
  }
</style>
