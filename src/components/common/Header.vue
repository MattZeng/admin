<template>
  <div id="header">
    <el-row>
      <el-col :xs="12" :sm="12" :md="4">
        <div class="logo">
          <span class="logo_prefix">YouDian</span><span class="logo_suffix">Admin</span>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">

  export default {
    name: 'Header',
    components: {},
    data () {
      return {}
    },
    props: [''],
    methods: {}
  }
</script>

<style lang="less" scoped>
  #header{
    height: auto;
    font-size: .14rem;
    position: fixed;
    top: 0;
    width: 100%;

    line-height: 66px;
    background-color:#324157;
    box-shadow:2px 0 3px rgba(0,0,0,.5);
    z-index:1000;
    padding:0 .32rem 0 .4rem;
    overflow:hidden;
    .logo{
      float: left;
      cursor:pointer;
      font-size: 22px;
      .logo_prefix{
        color:#209e91;
      }
      .logo_suffix{
        color:#fff;
      }
    }
  }
</style>
