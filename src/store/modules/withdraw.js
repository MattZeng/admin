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
    console.log(name);
  }
};

const mutations = {

};

export default {
  state,
  getters,
  actions,
  mutations
}
