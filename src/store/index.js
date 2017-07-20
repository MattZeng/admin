/**
 * Created by zxh on 2017/6/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import state from './modules/state'
import terminalBattery from './modules/terminalBattery'
import terminalAd from './modules/terminalAd'
import order from './modules/order'
import withdraw from './modules/withdraw'
import merchants from './modules/merchants'

Vue.use(Vuex);

// const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  mutations,
  modules: {
    state,
    terminalBattery,
    terminalAd,
    order,
    withdraw,
    merchants
  },
  // strict: process.env.NODE_ENV !== 'production'
  // plugins: debug ? [createLogger()] : []
})
