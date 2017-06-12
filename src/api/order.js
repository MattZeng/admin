/**
 * Created by zxh on 2017/6/8.
 */
import axios from 'axios'
import {baseUrl} from './apiConfig'
import qs from 'qs'

const orderListUrl = `${baseUrl}/users/orderList`;
const returnBatteryUrl = `${baseUrl}/users/return`;
const returnLineUrl = `${baseUrl}/users/returnLine`;

export default {
  findByAccount (name){
    return axios.get(orderListUrl,{params:{
      account: name,
      time: new Date().getTime()
    }})
  },
  returnBattery ({uuid, rent, returnDate}){
    let data = qs.stringify({uuid, rent, returnDate});
    console.log(data);
    return axios.post(returnBatteryUrl, data)
  },
  returnLine (uuid){
    return axios.post(returnLineUrl, qs.stringify({uuid}))
  }
}
