/**
 * Created by zxh on 2017/6/8.
 */
import  api from '@/api/withdraw'

const state = {
  withdrawList: [],
  paymentList: [],
  // withdrawPaymentList: []
};

const getters = {
  withdrawList: state => state.withdrawList,
  paymentList: state => state.paymentList
};

const actions = {
  searchWithdraw ({commit, dispacth, state}, {name}){
    api.findByAccount(name).then(function ({data}) {
      commit('receivedWithdrawList', data)
    }).catch(function (e) {
      alert(e)
    });
  }
};

const mutations = {
  receivedWithdrawList(state, data){
    state.withdrawList = data.withdraw;
    state.paymentList = data.payment;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
