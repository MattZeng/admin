/**
 * Created by zxh on 2017/6/8.
 */
import  api from '@/api/withdraw'

const state = {
  withdrawList: [],
  paymentList: [],
  withdrawPaymentList: []
};

const getters = {
};

const actions = {
  searchWithdraw ({commit, dispacth, state}, {name}){
    api.findByAccount(name).then(function ({data}) {
      console.log(data);
      commit('receivedWithdrawList', data)
    }).catch(function (e) {
      alert(e)
    })
  }
};

const mutations = {
  receivedWithdrawList(state, data){
    console.log(data)
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
