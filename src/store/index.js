import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters.js'

Vue.use(Vuex)

/** 状态定义 */
export const state = {
  loading: false,
  themeObj: 0,//主题
  keywords:'',//关键词
  errorImg: require('../../static/img/tou.jpg') ,
  baseURL:'http://abinblog.cn:7777/',
  isLogin:false,
}

export default new Vuex.Store({
    state,
    mutations: {
      goLogin (state) {
        // 变更状态
        state.isLogin = true;
      },
      readyLogin (state) {
        // 变更状态
        state.isLogin = false;
      },
    }
})
