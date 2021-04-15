// pages/login/index.js
var app = getApp()
import { checkCode } from '../api/index'
import { getUserAndBusInfo } from '../api/all'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idNO: '',
    isClick: false, // 是否已经点击获取头像// 节流
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    app.getWechatCode().then(res => {
      app.globalData.jsCode = res.code
      this.routeValid(res.code)
    })
  },
  // 入口路由跳转
  // 1. 判断有无token
  // 2. 无token调取api结果, 判断是去注册还是去登录
  // 3. 有token 说明登录过 跳转到首页
  async routeValid (code) {
    var token = wx.getStorageSync('token')
    if (token) {
      await this.saveInfo()
      this.routeTo('/pages/user/index')
    } else {
      this.routeTo('/pages/login/signIn')
    }
  },
  // 获取并保存用户信息和车辆信息
  async saveInfo () {
    let res = await getUserAndBusInfo()
    if (res && res.length == 2) {
      let userInfo = res[0]
      let busInfo = res[1]
      if (userInfo) {
        app.saveUserInfo(userInfo)
        app.globalData.wxHeadImg = userInfo.avatarUrl
      }
      if (busInfo) {
        app.saveBusInfo(busInfo)
      }
    }
    return true
  },
  // 跳转到相关页面
  routeTo (url) {
    wx.redirectTo({
      url
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})