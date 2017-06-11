/**
 * Created by zxh on 2017/6/8.
 */
import axios from 'axios'
import {baseUrl} from './apiConfig'


const orderListUrl = `${baseUrl}/users/userInfo`
export default {
  findByAccount (name){
    return axios.get(orderListUrl,{params:{
      phone: name,
      time: new Date().getTime()
    }})
  }
}
