import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:"/Home",
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
        {
          path: 'Notify',
          component: resolve => require(['../components/User/Notify.vue'], resolve),
        },
        {
          path: 'Money',
          component: resolve => require(['../components/User/Money.vue'], resolve),
        },
        {
          path: 'FundApplyList',
          component: resolve => require(['../components/User/FundApplyList.vue'], resolve),
        },
        {
          path: 'FundVaryHistory',
          component: resolve => require(['../components/User/FundVaryHistory.vue'], resolve),
        },
        {
          path: 'VipBuyHistory',
          component: resolve => require(['../components/User/VipBuyHistory.vue'], resolve),
        },
      ]
    },
    {
      path: '/VIP',
      component: resolve => require(['../pages/VIP/VIP.vue'], resolve),
      name: 'VIP'
    },
    {
      path: '/Guide',
      component: resolve => require(['../pages/Guide.vue'], resolve),
      name: 'Guide',
      children: [
        {
          path:'Article/:id',
          component: resolve => require(['../components/Guide/Article.vue'], resolve),
        },
      ]
    },
    {
      path: '/Space/:id',
      component: resolve => require(['../pages/UserSpace/Space.vue'], resolve),
      name: 'Space',
      children: [

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
