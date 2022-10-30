import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/Home.vue'], resolve),
      name: 'Home'
    },
    {
      path: '/Home',
      component: resolve => require(['../pages/Home.vue'], resolve),
      name: 'Home'
    }, //首页
    {
      path: '/DetailArticle',
      component: resolve => require(['../pages/DetailArticle.vue'], resolve),
      name: 'DetailArticle'
    }, //分享详情
    {
      path: '/Reward',
      component: resolve => require(['../pages/Reward.vue'], resolve),
      name: 'Reward'
    }, //赞赏
    {
      path: '/FriendsLink',
      component: resolve => require(['../pages/FriendsLink.vue'], resolve),
      name: 'FriendsLink'
    }, //友链
    {
      path: '/Archive',
      component: resolve => require(['../pages/Archive.vue'], resolve),
      name: 'Archive'
    }, // 这个是我自己的归档
    {
      path: '/Login',
      component: resolve => require(['../pages/Login.vue'], resolve),
      name: 'Login'
    }, //注册登录
    {
      path: '/ForgetPassword',
      component: resolve => require(['../pages/ForgetPassword.vue'], resolve),
    },
    //用户个人中心
    {
      path: '/Info',
      component: resolve => require(['../pages/Info.vue'], resolve),
      name: 'Info'
    },
    {
      path: '/Notify',
      component: resolve => require(['../pages/Notify.vue'], resolve),
      name: 'Notify'
    },
    // 用户中心区域
    {
      path: '/User',
      component: resolve => require(['../pages/User/User.vue'], resolve),
      name: '/User',
      children: [
        {
          path:'info',
          component: resolve => require(['../components/User/UserInfo.vue'], resolve),
        },
        {
          path:'ModifyPassword',
          component: resolve => require(['../components/User/ModifyPassword.vue'], resolve),
        },
      ]
    },

    // 404页面
    {
      path: '/*',
      component: resolve => require(['../pages/Error.vue'], resolve),
      name: 'Error'
    },
  ]
})
