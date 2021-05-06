// 一般请求方法注册
import './utils/fetch'
// 批量请求注册
import './utils/fetch_all'

// 工具类注册
const utils = require('./utils/util')
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
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res)
        this.globalData.jsCode = res.code
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           console.log(res)
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.businessUserInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
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
  getWechatCode () {
    return new Promise((relove, reject) => {
      wx.login({
        success: relove,
        fail: reject
      })
    })
  },
  // 图片上传地址
  hashUrl: 'https://file.htjiguang.cn/',
  // 用户静态画像
  static_user_logo: '/pages/image/user_static_logo.png',
  // 全局共享数据
  globalData: {
    currentVehicleId: '', // 当前车辆信息id
    businessUserInfo: {}, // 存储用户业务信息
    basicUserInfo: {}, // 存储用户基本信息
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
      this.globalData.businessUserInfo = result
    }
    return true
  },
  // 获取并保存用户基本信息, accountid, orgId等
  async saveUserBasicInfo (isLoad) {
    let { result } = await this.api.getBasicUserInfo(isLoad)
    if (result) {
      this.globalData.basicUserInfo = result
    }
    return true
  },
  // 获取并保存用户权限信息
  async saveUserPermissionInfo (data, isLoad) {
    let { result } = await this.api.getUserPermission(data, isLoad)
    if (result) {
      this.globalData.userPermisson = result
    }
    return true
  },
  // 初始化所有用户信息
  async initUserInfo (isLoad) {
    await this.saveUserBasicInfo(isLoad)
    await this.saveUserBusinessInfo(isLoad)
    await this.saveUserPermissionInfo({
      accountId: this.globalData.basicUserInfo.accountId,
      orgId: this.globalData.basicUserInfo.orgId
    }, isLoad)
    return true
  }
})
