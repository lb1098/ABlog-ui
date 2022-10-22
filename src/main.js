// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/style.less'
import store from './store'
import 'mavon-editor/dist/css/index.css'
import MavonEditor from 'mavon-editor'
import VueTypedJs from 'vue-typed-js'


const isDebug_mode = process.env.NODE_ENV !== 'production';
Vue.config.debug = isDebug_mode;
Vue.config.devtools = isDebug_mode;
Vue.config.productionTip = isDebug_mode
Vue.use(ElementUI)
Vue.use(MavonEditor)
Vue.use(VueTypedJs)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  store,
  render: h => h(App)
})
