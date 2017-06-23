/**
 * Created by zxh on 2017/6/8.
 */
import axios from 'axios'
import {baseUrl} from './apiConfig'

const fetchMerchantlUrl = `${baseUrl}/merchant/list`;
const createMerchantUrl = `${baseUrl}/merchant/create`;
const deleteMerchantUrl = `${baseUrl}/merchant/delete`;
const updateMerchantUrl = `${baseUrl}/merchant/update`;
const merchantTerminalUrl = `${baseUrl}/merchant/terminals`;
const deleteTerminalUrl = `${baseUrl}/merchant/deleteTerminal`;
const addTerminalUrl = `${baseUrl}/merchant/addTerminal`;

export default {
  fetchMerchantList() {
    return axios.get(fetchMerchantlUrl, {params: {v:new Date().getTime()}})
  },
  createMerchant(data) {
    return axios.post(createMerchantUrl, data)
  },
  deleteMerchant(data) {
    return axios.post(deleteMerchantUrl, data)
  },
  updateMerchant(data) {
    return axios.post(updateMerchantUrl, data)
  },
  merchantTerminal ({id}) {
    return axios.get(merchantTerminalUrl, {params: {id, v: new Date().getTime()}})
  },
  deleteTerminal(data) {
    return axios.post(deleteTerminalUrl, data)
  },
  addTerminal(data) {
    return axios.post(addTerminalUrl, data)
  }
}
