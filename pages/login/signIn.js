// pages/login/signIn.js
const utils = require('../../utils/util')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idNO: '',
    imgSrc: '',
    mobile: '18862348287',
    authCode: '', // 验证码
    isEditCode: false, // 按钮禁用
    codeText: '获取验证码',
    timerId: 0,
    codeTime: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { wxHeadImg, userInfo } = app.globalData
    if (wxHeadImg) {
      this.setData({
        imgSrc: wxHeadImg
      })
    }
    if (userInfo.idcard) {
      this.setData({
        idNO: utils.hideText(userInfo.idcard)
      })
    }
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
    clearInterval(this.data.timerId)
    this.data.timerId = 0
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