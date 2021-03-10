// pages/user/center/center.js
const utils = require('../../../utils/util')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '张三丰',
    isShowNum: false,
    idcard: 12312121212121212,
    phone: 13348404848,
    trueIdcard: '',
    truePhone: '',
    wxUserImg: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initStatus()
    if (app.globalData.userInfo) {
      this.setData({
        wxUserImg: app.globalData.userInfo.avatarUrl
      })
    }
  },
  initStatus () {
    var { idcard, phone } = this.data
    this.setData({
      trueIdcard: utils.hideText(idcard),
      truePhone: utils.hideText(phone, 'phone')
    })
  },
  showText (e) {
    var { idcard, phone } = this.data
    var temp = e.detail
    this.setData({
      trueIdcard: !temp ? utils.hideText(idcard) : idcard,
      truePhone: !temp ? utils.hideText(phone, 'phone') : phone
    })
  },
  // 跳转到更换手机号页面
  goToPage () {
    wx.navigateTo({
      url: '/pages/user/center/editPhone',
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