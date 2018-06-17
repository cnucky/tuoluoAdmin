import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import store from '@/store'

Vue.use(Router)

/* Layout */
const login = () => import('@/views/login/index')
const Tpl = () => import('@/views/tpl')

const Layout = () => import('@/views/layout/index')
const dashboard = () => import('@/views/dashboard/index')  //首页
const accountRight = () => import('@/views/account/index')   //账户管理

const usersManage = () => import('@/views/userCenter/usersManage')   //付费用户

const serverManage = () => import('@/views/itCenter/server')  //服务器管理
const versionManage = () => import('@/views/itCenter/version/index')  //版本管理
const versionEdit = () => import('@/views/itCenter/version/edit')  //版本管理

const vpnManage = () => import('@/views/itCenter/vpn')  //线路管理
const websiteData = () => import('@/views/itCenter/website')  //官网管理

const gamesManage = () => import('@/views/cms/index')  //游戏管理
const navBarsManage = () => import('@/views/cms/navbars')  //底部导航管理
const rechargeAmount = () => import('@/views/cms/rechargeAmount')  //充值面额管理

const income = () => import('@/views/settlements/income')  //收入
const expend = () => import('@/views/settlements/expend')  //支出

const feedbackManage = () => import('@/views/customService/feedbackManage')  //反馈管理
const pushMessage = () => import('@/views/customService/pushMessage')  //站内信
const refundment = () => import('@/views/customService/refundment')  //退款管理

const channelManage = () => import('@/views/promotionCenter/channel')  //渠道管理
const promotionInfo = () => import('@/views/promotionCenter/promotionInfo')  //推广详情


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
      meta: { title: '首页-工作台', icon: '' }
    }]
  },
  
  {
    path:'/it',
    component: Layout,
    meta: { title: 'IT中心', icon: '' },
    children:[
      {
        path: 'server',
        name: 'ServerManage',
        component: serverManage,
        meta: { title: '服务器管理', icon: '' }
      },
      {
        path: 'version',
        component: Tpl,
        name:'VersionManage',
        meta: { title: '版本管理', icon: '' },
        children:[
          {
            path: '',
            name: 'VersionManage',
            component: versionManage,
            meta: { title: '版本管理', icon: '' },
          },
          {
            path: 'version_edit',
            name: 'VersionEdit',
            component: versionEdit,
            meta: { title: '添加新版本', icon: '' }
          }
        ]
      },
      {
        path: 'vpn',
        name: 'VpnManage',
        component: vpnManage,
        meta: { title: '线路管理', icon: '' }
      },
      {
        path:'website',
        name:'WebsiteData',
        component: websiteData,
        meta: { title: '官网管理', icon: '' },
      }
    ]

  },
  
  {
    path:'/users',
    component: Layout,
    meta: { title: '用户中心', icon: '' },
    children:[
      {
        path:'recharge',
        name:'UsersManage',
        component: usersManage,
        meta: { title: '用户管理', icon: '' },
      }
    ]
  },
  {
    path: '/cms',
    component: Layout,
    meta: { title: '游戏中心', icon: '' },
    children: [
      {
        path: 'games',
        name: 'GamesManage',
        component: gamesManage,
        meta: { title: '游戏管理', icon: '' }
      },
      {
        path: 'nav_bars',
        name: 'NavBarsManage',
        component: navBarsManage,
        meta: { title: '底部导航管理', icon: '' }
      },
      {
        path: 'recharge_amount',
        name: 'RechargeAmount',
        component: rechargeAmount,
        meta: { title: '充值面额管理', icon: '' }
      }
      
    ]
  },
  {
    path: '/recharge',
    component: Layout,
    meta: { title: '结算中心', icon: '' },
    children: [
      {
        path: 'income',
        name: 'Income',
        component: income,
        meta: { title: '收入', icon: '' }
      },
      {
        path: 'expend',
        name: 'eExpend',
        component: expend,
        meta: { title: '支出', icon: '' }
      },
     
    ]
  },
  {
    path: '/serviecs',
    component: Layout,
    meta: { title: '客服中心', icon: '' },
    children: [
      {
        path: 'feedback',
        name: 'FeedbackManage',
        component: feedbackManage,
        meta: { title: '反馈管理', icon: '' }
      },
      {
        path: 'push_message',
        name: 'PushMessage',
        component: pushMessage,
        meta: { title: '站内信', icon: '' }
      },
      {
        path: 'refundment',
        name: 'Refundment',
        component: refundment,
        meta: { title: '退款管理', icon: '' }
      },
     
    ]
  },
  {
    path: '/promotion',
    component: Layout,
    meta: { title: '推广中心', icon: '' },
    children: [
      {
        path:'channel_manage',
        name:'ChannelManage',
        component: channelManage,
        meta: { title: '渠道管理', icon: '' },
      },
      {
        path: 'promotion_info',
        name: 'PromotionInfo',
        component: promotionInfo,
        meta: { title: '推广情况', icon: '' }
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
        meta: { title: '账号管理', icon: '' }
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

  if(to.path != '/login'){
    store.dispatch('GetInfo').then(
      (resData) => {
        localStorage.removeItem('username');
        if(resData && resData.status == 'ok'){
          localStorage.setItem('username', resData.data.username);
          if(to.path == '/login'){
            next('/dashboard');
          }
          next();
          NProgress.done()
        }else{
          localStorage.removeItem('username');
          next({ path: '/login' })
          NProgress.done()
        }
      }
    ).catch( (err) => {
        localStorage.removeItem('username');
        next({ path: '/login' })
    })
  }else{
    next();
  }

  
  

})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router

