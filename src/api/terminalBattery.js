/**
 * Created by zxh on 2017/6/8.
 */
import axios from 'axios'
import {baseUrl} from './apiConfig'

const terminalListUrl = `${baseUrl}/terminal/list`;
const updateTerminalUrl = `${baseUrl}/terminal/update`;
const regionsOptionsUrl = `${baseUrl}/terminal/regions`;
const batteryUrl = `${baseUrl}/terminal/battery`;
const injectUrl = `${baseUrl}/terminal/inject`;

export default {
  fetchTerminalList ({page, pageSize, state, region}){
    console.log(page, pageSize, state, region);
    let [provinceId, cityId, regionId] = region;
    //后台page从0开始
    page--;
    return axios.get(terminalListUrl, {params:{
      page, pageSize, state, provinceId, cityId, regionId, v: new Date().getTime()
    }})
  },
  updateTerminal (data){
    return axios.post(updateTerminalUrl, data)
  },
  fetchRegionsOption () {
    return axios.get(regionsOptionsUrl)
  },
  fetchBattery (uuid){
    return axios.get(batteryUrl, {params:{uuid, t: new Date().getTime()}})
  },
  injectBattery ({uuid, device_id}) {
    console.log(uuid, device_id);
    return axios.post(injectUrl, {uuid, device_id})
  }
}
