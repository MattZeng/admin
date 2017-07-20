import axios from 'axios'
import {baseUrl} from './apiConfig'

const adList = `${baseUrl}/ad/list`;
const deleteUrl = `${baseUrl}/ad/delete`;
const addUrl = `${baseUrl}/ad/add`;

export default {
  fetchAdList(deviceId){
    return axios.get(adList, {params:{
      deviceId, v: new Date().getTime()
    }})
  },
  deleteAd({terminal, terminalAd}){
    return axios.post(deleteUrl, {terminal, terminalAd})
  },
  addAd({deviceIds, ads}){
    return axios.post(addUrl, {deviceIds, ads})
  }
}
