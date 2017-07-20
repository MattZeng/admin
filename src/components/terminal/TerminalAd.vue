<template>
  <div id="">
    <el-row :gutter="20">
      <el-col :span="12">
        <h3>添加广告</h3>
        <p>输入机器编号，机器编号间用回车分割</p>
        <el-form :model="addAd" ref="addAdForm" label-width=".8rem" class="add-ad-form">
          <el-form-item
            label="编号"
            :prop="addAd.deviceId"
            :rules="{required: true, message: '机器编号不能为空', trigger: 'blur'}">
            <el-input type="textarea" v-model="addAd.deviceId"></el-input>
          </el-form-item>
          <el-form-item
            v-for="(ad, index) in addAd.ads"
            :label="`广告${index+1}`"
            :key="ad.key"
            :prop="'ads.' + index + '.value'"
            :rules="{required: true, message: '广告url不能为空', trigger: 'blur'}">
            <el-input v-model="ad.value"></el-input><el-button @click.prevent="removeAd(ad)">删除</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addAdSubmit" :loading="loading" >提 交</el-button>
            <el-button @click="addAdInput" :loading="loading" >新增广告</el-button>
            <el-button @click="resetForm('addAdForm')" :loading="loading" >重 置</el-button>
          </el-form-item>
        </el-form>


      </el-col>
      <el-col :span="12">
        <h3>删除广告</h3>
        <el-form :inline="true" :model="deleteAd" class="">
          <el-form-item label="编号:">
            <el-input v-model="deleteAd.deviceId" placeholder="机器编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchAdHandle()">查询</el-button>
          </el-form-item>
        </el-form>
        <div v-if="adList">
          <section v-for="ad in adList" class="card-section">
            <el-card :body-style="{ padding: '0px' }">
              <img :src="ad.picture" class="image">
              <div style="padding: 14px;">
                <!--<span>好吃的汉堡</span>-->
                <div class="bottom clearfix">
                  <time class="time">{{ new Date(ad.date).format('yyyy-MM-dd HH:mm') }}</time>
                  <el-button type="text" class="button" @click="deleteAdHandle({terminal: ad.t_id, terminalAd: ad.ta_id})">删除</el-button>
                </div>
              </div>
            </el-card>
          </section>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/javascript">
  import {mapGetters, mapActions} from 'vuex'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";

  export default {
    name: 'TerminalAd',
    components: {ElCol, ElRow},
    data() {
      return {
        deleteAd: {
          deviceId: ''
        },
        addAd: {
          deviceId: '',
          ads: [{value:''}],
        }
      };
    },
    methods: {
      searchAdHandle(){
        this.getAdList(this.deleteAd.deviceId.trim())
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeAd(item) {
        var index = this.addAd.ads.indexOf(item)
        if (index !== -1) {
          this.addAd.ads.splice(index, 1)
        }
      },
      addAdInput() {
        this.addAd.ads.push({
          value: '',
          key: Date.now()
        });
      },
      addAdSubmit(){
        let vm  = this;
        let deviceIds = vm.addAd.deviceId.trim().split('\n');
        vm.$store.commit('toggleTerminalAdLoading');
        console.log('addad')
        vm.addAdHandle({deviceIds, ads: vm.addAd.ads}).then(function () {
          vm.$store.commit('toggleTerminalAdLoading');
          alert('添加成功');
        }).catch(function (e) {
          console.log(arguments);
          vm.$store.commit('toggleTerminalAdLoading');
          alert(e);
        });
      },
      ...mapActions({
        getAdList: 'fetchAdList',
        deleteAdHandle: 'deleteAd',
        addAdHandle: 'addAd'
      })
    },
    computed: {
      ...mapGetters({
        adList: 'adList',
        loading: 'terminalAdLoading'
      })
    }
  }
</script>

<style lang="less" scoped>
  .add-ad-form{
    .el-input,.el-textarea{
      margin-right: .1rem;
      width: 2.7rem;
    }
  }

  .card-section{
    width: 70%;
    margin-bottom: .1rem;
    position: relative;
    left:50%;
    transform: translateX(-50%);
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
