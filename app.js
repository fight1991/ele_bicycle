// 一般请求方法注册
import './utils/fetch'
// 上传请求注册
import './utils/fetch_upload'
// 批量请求注册
import './utils/fetch_all'
// 工具类注册
const utils = require('./utils/util')
// 用户相关api注册
import * as usersApi from './pages/api/index'
// 申报相关api注册
import * as recordsApi from './pages/api/record'
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
    //           this.globalData.userInfo = res.userInfo

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
    ...recordsApi // 申报相关
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
    userInfo: {},
    busInfo: { // 车辆信息
      brand: '',
      installationMethods: 0,
      model: '',
      plateNo: '',
      properties: 0,
      qrCodeUrl: '',
      vehicleId: 0,
      vehicleStatus: 0,
      vin: ''
    },
    wxHeadImg: null,
    jsCode: '',
  },
  saveBusInfo (busInfo) {
    this.globalData.busInfo.brand = busInfo.brand
    this.globalData.busInfo.installationMethods = busInfo.installationMethods
    this.globalData.busInfo.model = busInfo.model
    this.globalData.busInfo.plateNo = busInfo.plateNo
    this.globalData.busInfo.properties = busInfo.properties
    this.globalData.busInfo.qrCodeUrl = busInfo.qrCodeUrl
    this.globalData.busInfo.vehicleId = busInfo.vehicleId
    this.globalData.busInfo.vehicleStatus = busInfo.vehicleStatus
    this.globalData.busInfo.vin = busInfo.vin
  },
  // 获取并保存用户信息和
  async saveUserInfo (isLoad) {
    let { result } = await this.api.getUserTotalInfo({}, isLoad)
    this.globalData.userInfo = result
    return true
  },
})
