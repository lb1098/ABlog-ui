import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: resolve => require(['../pages/Home.vue'], resolve),
    meta: {
      auth: true
    },
    name: 'Home'
  }, //首页
    {
      path: '/Home',
      component: resolve => require(['../pages/Home.vue'], resolve),
      meta: {
        auth: true
      },
      name: 'Home'
    }, //首页
    {
      path: '/Share',
      component: resolve => require(['../pages/Share.vue'], resolve),
      meta: {
        auth: true
      },
      name: 'Share'
    }, //分类
    {
      path: '/DetailArticle',
      component: resolve => require(['../pages/DetailArticle.vue'], resolve),
      meta: {
        auth: true
      },
      name: 'DetailArticle'
    }, //分享详情
    {
      path: '/Reward',
      component: resolve => require(['../pages/Reward.vue'], resolve),
      meta: {
        auth: true
      },
      name: 'Reward'
    }, //赞赏
    {
      path: '/FriendsLink',
      component: resolve => require(['../pages/FriendsLink.vue'], resolve),
      meta: {
        auth: true
      },
      name: 'FriendsLink'
    }, //友链
    {
      path: '/Archive',
      component: resolve => require(['../pages/Archive.vue'], resolve),
      meta: {
        auth: true
      },
      name: 'Archive'
    }, // 这个是我自己的归档
    {
      path: '/Login',
      component: resolve => require(['../pages/Login.vue'], resolve),
      meta: {
        auth: false
      },
      name: 'Login'
    }, //注册登录
    {
      path: '/UserInfo',
      component: resolve => require(['../pages/UserInfo.vue'], resolve),
      meta: {
        auth: true
      },
      name: 'UserInfo'
    }, //用户个人中心
    {
      path: '/Info',
      component: resolve => require(['../pages/Info.vue'], resolve),
      meta: {
        auth: false
      },
      name: 'Info'
    },

    // 404页面
    {
      path: '/*',
      component: resolve => require(['../pages/Error.vue'], resolve),
      meta: {
        auth: false
      },
      name: 'Error'
    },
  ]
})
