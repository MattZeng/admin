/**
 * Created by zxh on 2017/6/8.
 */
import axios from 'axios'
import {baseUrl} from './apiConfig'

const terminalListUrl = `${baseUrl}/getState?kind=machine`;

export default {
  fetchTerminalList (){
    return axios.get(terminalListUrl)
  }
}
