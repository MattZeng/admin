/**
 * Created by zxh on 2017/6/6.
 */
/**
 * Created by zxh on 2017/6/6.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as mutations from './mutations'
import state from './modules/state'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  actions,
  mutations,
  modules: {
    state
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
