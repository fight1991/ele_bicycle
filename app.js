// app.js
import './utils/fetch'
const utils = require('./utils/util')
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
  getWechatCode () {
    return new Promise((relove, reject) => {
      wx.showLoading('微信授权...')
      wx.login({
        success: relove,
        fail: reject,
        complete: () => {
          wx.hideLoading()
        }
      })
    })
  },
  // 图片上传地址
  hashUrl: 'https://file.htjiguang.cn/',
  // 用户静态画像
  static_user_logo: '/pages/image/user_static_logo.png',
  // 全局共享数据
  globalData: {
    userInfo: { // 用户信息
      name: '',
      idcard: '',
      batteryCarStatus: 0,
      vehicleId: null,
      mobile: ''
    },
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
  saveUserInfo (userInfo) {
    this.globalData.userInfo.name = userInfo.personalIDName || ''
    this.globalData.userInfo.idcard = userInfo.personalIDNo || ''
    this.globalData.userInfo.batteryCarStatus = userInfo.batteryCarStatus
    this.globalData.userInfo.vehicleId = userInfo.vehicleId
    this.globalData.userInfo.mobile = userInfo.mobile
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
  }
})
