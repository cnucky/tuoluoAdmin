import { fetch } from '@/api/index'

//登录
export const login = (reqData) => fetch('POST','/api/admin/login/',{data: reqData})
//退出
export const loginOut = () => fetch('GET','/api/admin/logout/')

//判断用户是否登录
export const checkLogin = () => fetch('GET','/api/admin/auth_info/')

//获取用户
export const getCustomers = (param) => fetch('GET',`/api/admin/customer/?page=${param.page}&page_size=${param.page_size}`)//获取账号列表

export const addGames = (data) => fetch('POST','/api/admin/game/',{data:data})  //添加游戏
export const getGamesList = (param) => fetch('GET',`/api/admin/game/?type=${param.type}&page=${param.page}&page_size=${param.page_size}`)  //获取游戏列表

export const delGame = (param) => fetch('DELETE',`/api/admin/game/${param.id}/`)  //删除游戏
export const updateGame = (param,data) => fetch('PUT',`/api/admin/game/${param.id}/`,{data: data})  //修改游戏


export const addAmount = (data) => fetch('POST',`/api/admin/recharge/`,{data: data})  //添加面额

export const getAmountList = (param) => fetch('GET',`/api/admin/recharge/?origin=${param.type}`)  //面额列表

export const delAmount = (param) => fetch('DELETE',`/api/admin/recharge/${param.id}/`)  //删除面额





 






//赠送天数
export const setExtraDays = (param,reqData) => fetch('POST',`/adminapi/customers/${param.id}/set_customer_extra/`,{data: reqData})
//设置邀请码
export const setInviteCode = (param) => fetch('POST',`/adminapi/customers/${param.id}/set_invite_code/`)
//设置管理员
export const setAdmin = (param) => fetch('POST',`/adminapi/customers/${param.id}/set_customer_admin/`)
//取消管理员
export const setAdminNormal = (param) => fetch('POST',`/adminapi/customers/${param.id}/set_customer_normal/`)
//分页
export const page = (param) => fetch('GET',`/adminapi/customers/?page=${param.num}`)


//dashboard --监控人数
export const getEcharts = () => fetch('GET','/adminapi/stats/')

//监控--公网
export const getPublicEcharts = () => fetch('GET','/adminapi/public/')

//监控--gic
export const getGicEcharts = () => fetch('GET','/adminapi/gic/')



