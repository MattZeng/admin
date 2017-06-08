/**
 * Created by zxh on 2017/6/6.
 */
import axios from 'axios'
import {baseUrl} from './apiConfig'


// const {baseUrl} = apiConfig;
const getStateBase = `${baseUrl}/getState`;

export default {
  fetchData (kind) {
    return axios.get(getStateBase, {params: {
      kind: kind,
      time: new Date().getTime()
    }})
  }
}
