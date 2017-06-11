/**
 * Created by zxh on 2017/6/8.
 */
import  api from '@/api/order'

const state = {
};

const getters = {

};

const actions = {
  searchOrder ({commit, dispacth, state}, {name}){
    api.findByAccount(name).then(function ({date}) {
      console.log(date)
    }).catch(function (e) {
      alert(e)
    })
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
