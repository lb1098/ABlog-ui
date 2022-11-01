import axios from 'axios'
import {Notification, MessageBox, Message} from 'element-ui'
import router from '@/router'
import store from '../store'
import {getToken} from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import {logout} from "../api/user";
import {removeToken} from "./auth";

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'


// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: store.state.baseURL,
  // 超时
  timeout: 15000
})
// request拦截器
service.interceptors.request.use(config => {
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === false
  if (getToken() && !isToken) {
    config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 401 && !store.state.isLogin) {
      store.commit('goLogin');
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        localStorage.setItem('logUrl', router.currentRoute.fullPath);
        // 获取判断有无token，如果没有，直接退出即可
        if (getToken()) {
          // 如果得到了Token
          removeToken()
          localStorage.removeItem('userInfo');
        } else {
          // 如果没有，就直接删除userInfo
          localStorage.removeItem('userInfo');
        }
        router.push({
          path: '/Login?login=1',
        });
      }).catch(() => {

      })
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 401) {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      Notification.error({
        title: msg
      })
      return Promise.reject('error')
    } else {
      // 把字符串total 转换成 数字 total
      if (res.data.data && res.data.data.total) {
        res.data.data.total = parseInt(res.data.data.total)
      }
      return res.data.data
    }
  },
  error => {
    console.log('err' + error)
    let {message} = error
    if (message === 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
