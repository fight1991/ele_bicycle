// pages/login/index.js
var app = getApp()
import { checkCode } from '../api/index'
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
    // this.routeValid()
  },
  // 入口路由跳转
  // 1. 判断有无token
  // 2. 无token调取api结果, 判断是去注册还是去登录
  // 3. 有token 说明登录过 跳转到首页
  async routeValid () {
    var token = wx.getStorageSync('token')
    if (token) {
      this.routeTo('/pages/user/index')
    } else {
      // 请求后端接口进行登录凭证校验, 有身份证号, 跳转到登录页面, 无身份证号跳转到注册页面
      let { result } = await checkCode({
        jscode: app.globalData.jsCode
      })
      if (result) {
        this.data.idNO = result.idNO
      }
    }
  },
  wechatPermission () {
    if (this.data.isClick) return
    this.data.isClick = true
    wx.getUserProfile({
      desc: '头像展示',
      success: res => {
        if (res.errMsg == 'getUserProfile:ok') {
          app.globalData.userInfo = res.userInfo
          if (this.data.idNO) {
            this.routeTo('/pages/login/signIn')
          } else {
            this.routeTo('/pages/login/faceIdentify')
          }
        }
      },
      fail: res => {
        wx.showToast({
          title: '头像获取失败',
          icon: 'none'
        })
        console.log(res, '头像获取失败')
      },
      complete: res => {
        this.data.isClick = false
      }
    })
  },
  // 跳转到人脸识别注册页面
  routeTo (url) {
    wx.navigateTo({
      url
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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