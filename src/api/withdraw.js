/**
 * Created by zxh on 2017/6/8.
 */
import axios from 'axios'
import {baseUrl} from './apiConfig'
import qs from 'qs'

const withdrawPaymentUrl = `${baseUrl}/users/withdrawPayment`;

export default {
  findByAccount (name){
    return axios.get(withdrawPaymentUrl,{params:{account: name, v:new Date().getTime()}})
  }
}
