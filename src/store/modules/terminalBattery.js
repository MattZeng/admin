/**
 * Created by zxh on 2017/6/8.
 */
import api from '@/api/terminalBattery'

const state = {
  terminalList: [],
  terminalLoading: false,
  pageable: {
    page: 1,
    pageSize: 10,
    totalPages: 0,
    totalElements: 0
  },
  regionOptions: [{label:'加载中'}],
  filter: {
    state: '',
    region: []
  }
};

const getters = {
  terminalList: state => state.terminalList,
  terminalPageable: state => state.pageable,
  terminalFilter: state => state.filter,
  regionOptions: state => state.regionOptions,
  terminalLoading: state => state.terminalLoading
};

const actions = {
  pageableChange ({commit, state, dispatch}, {page, pageSize}){
    commit('updateTerminalPageable', {page, pageSize});
    dispatch('searchTerminal', {page, pageSize});
  },
  searchTerminal ({commit, state}){
    commit('toggleTerminalLoading');
    api.fetchTerminalList({
      page: state.pageable.page,
      pageSize: state.pageable.pageSize,
      state: state.filter.state,
      region: state.filter.region}).then(function ({data}) {
        commit('receivedTerminalList', data);
        commit('toggleTerminalLoading');
    }).catch(function (e) {
        console.log(e);
        commit('toggleTerminalLoading');
        alert(e);
    });
  },

  updateTerminal (
    {commit, state},
    {deviceId, buildingName, address, name, regions, servingFrom, servingTo, server24H, businessPhone, servicePhone, merchantsPhone}
  ){
    let regionId = regions[2];
    let data = {deviceId, buildingName, address, name, regionId, servingFrom, servingTo, server24H, businessPhone, servicePhone, merchantsPhone};
    console.log(data);
    return api.updateTerminal(data);
  },
  initRegionOptions({commit, state}){
    if(state.regionOptions.length === 1){
      api.fetchRegionsOption().then(function ({data}) {
        commit('receivedRegions', data.regions);
      })
    }
  },
  getBattery({commit}, uuid){
    return api.fetchBattery(uuid);
  },
  injectBattery({commit}, {uuid, device_id}) {
    return api.injectBattery({uuid, device_id});
  }
};

const mutations = {
  updateFilter (state, {region_filter, state_filter}) {
    region_filter && (state.filter.region = region_filter);
    state_filter && (state.filter.state = state_filter);
  },

  updateTerminalPageable (state, {page, pageSize}) {
    //都不可能为0
    page && (state.pageable.page = page);
    pageSize && (state.pageable.pageSize = pageSize)
  },

  updateTerminalSuccess(state, terminal) {
    console.log(terminal);
    let tarminals = state.terminalList;
    let index = tarminals.findIndex(function (item) {
      return item.deviceId === terminal.deviceId;
    });
    terminal.regionId = terminal.regions[2];
    terminal.cityId = terminal.regions[1];
    terminal.provinceId = terminal.regions[0];
    terminal.server24H && (terminal.servingFrom = terminal.servingTo = null);
    console.log(terminal)
    tarminals.splice(index, 1, terminal);
    state.terminalList = tarminals;
  },

  receivedRegions (state, options) {
    state.regionOptions = options;
  },

  receivedTerminalList (state, {pageable, terminals}) {
    console.log(pageable, terminals);
    state.pageable = Object.assign({}, state.pageable, pageable);
    state.terminalList = terminals;
  },

  toggleTerminalLoading (state) {
    state.terminalLoading = !state.terminalLoading;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}
