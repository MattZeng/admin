/**
 * Created by zxh on 2017/6/6.
 */
import axios from 'axios'

const baseUrl = 'http://localhost:9091';
const getStateBase = `${baseUrl}/getState`;

export default {
  fetchData (kind) {
    return axios.get(getStateBase, {params: {
      kind: kind,
      time: new Date().getTime()
    }})
  }
}
