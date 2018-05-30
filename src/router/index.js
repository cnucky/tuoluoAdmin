import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import store from '@/store'

Vue.use(Router)

/* Layout */
const login = () => import('@/views/login/index')


const Layout = () => import('@/views/layout/index')
const dashboard = () => import('@/views/dashboard/index')
const accountRight = () => import('@/views/account/index')
const gameData = () => import('@/views/dataManage/game')
const userData = () => import('@/views/dataManage/user')
const rechargeData = () => import('@/views/dataManage/recharge')
const distributeData = () => import('@/views/dataManage/distribute')
const pcData = () => import('@/views/dataManage/pc')
const websiteData = () => import('@/views/dataManage/website')
const inStation = () => import('@/views/inStation/index')
const serverManage = () => import('@/views/serverManage/index')  //服务器管理
const versionManage = () => import('@/views/versionManage/index')  //版本管理
const cms = () => import('@/views/cms/index')  //服务器管理
const feedbackManage = () => import('@/views/feedbackManage/index')  //反馈管理


/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: login, hidden: true,meta: { title: '登录' } },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name:'Dashboard',
      component: dashboard,
      meta: { title: '控制台', icon: 'el-icon-menu' }
    }]
  },
  
  {
    path:'/data',
    component: Layout,
    name:'Data',
    meta: { title: '数据管理', icon: 'el-icon-message' },
    children:[
      {
        path:'game',
        name:'GameData',
        component: gameData,
        meta: { title: '游戏数据', icon: '' },
      },
      {
        path:'user',
        name:'UserData',
        component: userData,
        meta: { title: '用户数据', icon: '' },
      },
      {
        path:'distribute',
        name:'DistributeData',
        component: distributeData,
        meta: { title: '分发渠道数据', icon: '' },
      },
      {
        path:'recharge',
        name:'RechargeData',
        component: rechargeData,
        meta: { title: '充值数据', icon: '' },
      },
      {
        path:'website',
        name:'WebsiteData',
        component: websiteData,
        meta: { title: '网站数据', icon: '' },
      },
      {
        path:'pc',
        name:'PcData',
        component: pcData,
        meta: { title: 'PC客户端数据', icon: '' },
      }
    ]

  },
  {
    path: '/instation',
    component: Layout,
    children: [
      {
        path: '',
        name: 'InStation',
        component: inStation,
        meta: { title: '站内信', icon: 'el-icon-star-on' }
      }
    ]
  },
  {
    path: '/server',
    component: Layout,
    children: [
      {
        path: '',
        name: 'ServerManage',
        component: serverManage,
        meta: { title: '服务器管理', icon: 'el-icon-goods' }
      }
    ]
  },
  {
    path: '/cms',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Cms',
        component: cms,
        meta: { title: 'CMS', icon: 'el-icon-tickets' }
      }
    ]
  },
  {
    path: '/version',
    component: Layout,
    children: [
      {
        path: '',
        name: 'VersionManage',
        component: versionManage,
        meta: { title: '版本管理', icon: 'el-icon-mobile-phone' }
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    children: [
      {
        path: '',
        name: 'FeedbackManage',
        component: feedbackManage,
        meta: { title: '反馈管理', icon: 'el-icon-remove-outline' }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/account_right',
    name: 'Account',
    // meta: { title: '用户权限', icon: 'el-icon-menu' },
    children: [
      {
        path: '',
        name: 'Account',
        component: accountRight,
        meta: { title: '角色管理', icon: 'el-icon-setting' }
      }
    ]
  },

  

  
  { path: '*', redirect: '/404', hidden: true }
]

const router = new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = to.meta.title;

  store.dispatch('GetInfo').then(
    (resData) => {
      localStorage.removeItem('username');
      if(resData && resData.status == 'ok'){
        localStorage.setItem('username', resData.data.username);
         if(to.path == '/login'){
          next('/dashboard');
         }
         NProgress.done()
      }else{
        localStorage.removeItem('username');
        next({ path: '/login' })
        NProgress.done()
      }
    }
  ).catch( (err) => {
    localStorage.removeItem('username');
    store.dispatch('FedLogOut').then(() => {
      Message.error('验证失败,请重新登录')
      next({ path: '/login' })
    })
  })
  next();
  // if (getToken()) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //   } else {
  //     next();
  //     // if (store.getters.roles.length === 0) {
  //     //   store.dispatch('GetInfo').then(res => { // 拉取用户信息
  //     //     next()
  //     //   }).catch(() => {
  //     //     store.dispatch('FedLogOut').then(() => {
  //     //       Message.error('验证失败,请重新登录')
  //     //       next({ path: '/login' })
  //     //     })
  //     //   })
  //     // } else {
  //     //   next()
  //     // }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next('/login')
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router

