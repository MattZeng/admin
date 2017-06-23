<template>
  <div id="app">
    <v-head></v-head>
    <el-row type="flex" id="container">
      <el-col :span="4"><v-sidebar></v-sidebar></el-col>
      <el-col :span="20"><router-view class="content"></router-view></el-col>
    </el-row>
  </div>
</template>

<script>
  import vHead from '@/components/common/Header.vue';
  import vSidebar from '@/components/common/Sidebar.vue';
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  export default {
    name: 'app',
    components:{
      ElCol, ElRow, vHead,
      vSidebar
    }
  }
</script>

<style lang="less">
  html{
    font-size: 100px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    body{
      font-size: .14rem;
      margin:0;
      padding:0;
    }
    #container{
      padding-top:.66rem;
      box-sizing: border-box;
      height: 100vh;
      .content{
        background: none repeat scroll 0 0 #f0f3f4;
        height:100%;
        padding: .1rem;
        box-sizing: border-box;
        overflow: auto;
      }
    }
    h3{
      font-size: .2rem;
      margin: .1rem;
    }
  }
  .right_btn{
    margin: .2rem;
    float: right;
  }
</style>
