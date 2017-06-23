/**
 * Created by zxh on 2017/6/6.
 */
import axios from 'axios'
import {baseUrl} from './apiConfig'


// const {baseUrl} = apiConfig;
const getStateBase = `${baseUrl}/getState`;
const scanlogUrl = `${baseUrl}/getState/scan`;
const orderUrl = `${baseUrl}/getState/order`;

export default {
  fetchData (kind) {
    return axios.get(getStateBase, {params: {
      kind: kind,
      time: new Date().getTime()
    }})
  },
  fatchScanlog ({start, end}) {
    return axios.get(scanlogUrl, {params: {
      start,
      end
    }})
  },
  fatchOrderList ({start, end}) {
    return axios.get(orderUrl, {params: {
      start,
      end
    }})
  }
}
