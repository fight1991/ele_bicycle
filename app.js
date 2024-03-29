// 一般请求方法注册
import './publicBag/request/fetch'
// 批量请求注册
import './publicBag/request/fetch_all'
// 弹框注册
import messageBox from './publicBag/plugin/messageBox'

// 工具类注册
const utils = require('./publicBag/utils/util')
// 用户相关api注册
import * as usersApi from './pages/api/user'
// 车辆申报相关api注册
import * as recordsApi from './pages/api/record'
// 字典相关api
import * as dictApi from './pages/api/dictionary'
// 民生行业业务 相关api
import * as orgApi from './pages/api/livelihood'
App({
  onLaunch() {

  },
  // 绑定公共方法
  utils: utils,
  // 绑定api
  api: {
    ...usersApi, // 用户相关
    ...recordsApi, // 车辆申报相关
    ...dictApi, // 字典相关
    ...orgApi // 民生行业相关
  },
  messageBox: messageBox, // 弹框
  redirect: '', // 记录token失效时当前的页面地址
  getWechatCode () {
    return new Promise((relove, reject) => {
      wx.login({
        success: relove,
        fail: reject
      })
    })
  },
  // 用户静态画像
  static_user_logo: '/pages/image/user_static_logo.png',
  // 全局共享数据
  globalData: {
    currentVehicleId: '', // 当前车辆信息id
    userInfo: {}, // 存储用户业务信息
    userPermisson: [], // 用户权限
    wxHeadImg: null,
    jsCode: '',
  },
  // 保存车辆信息
  saveCurrentVehicleId (id) {
    this.globalData.currentVehicleId = id
  },
  // 获取并保存用户业务信息和
  async saveUserBusinessInfo (isLoad) {
    let { result } = await this.api.getUserTotalInfo(isLoad)
    if (result) {
      this.globalData.userInfo = result
      return true
    }
    return false
  },
  // 获取并保存用户权限信息
  async saveUserPermissionInfo (data, isLoad) {
    let { result } = await this.api.getUserPermission(data, isLoad)
    if (result) {
      this.globalData.userPermisson = result
      return true
    }
    return false
  },
  /**  初始化所有用户信息
   * params: isLoad 是否开启loading
  */
  async initUserInfo (isLoad = true) {
    try {
      isLoad && wx.showLoading('加载中...')
      let res1 = await this.saveUserBusinessInfo(false)
      let res2 = await this.saveUserPermissionInfo({
        uid: this.globalData.userInfo.uid,
        orgId: this.globalData.userInfo.orgId
      }, false)
      isLoad && wx.hideLoading()
      return res1 && res2
    } catch (error) {
      isLoad && wx.hideLoading()
      return false
    }
  },
  // 将权限信息映射到相应的实例中
  mapPermissions (instance) {
    let pers = this.globalData.userPermisson
    instance.setData({
      permissions: pers
    })
  }
})
