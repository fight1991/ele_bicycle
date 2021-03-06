// pages/user/center/center.js
const utils = require('../../../utils/util')
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
    truePhone: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showText()
  },
  showText () {
    var { isShowNum, idcard, phone } = this.data
    var temp = !isShowNum
    this.setData({
      isShowNum: temp,
      trueIdcard: temp ? utils.hideText(idcard) : idcard,
      truePhone: temp ? utils.hideText(phone, 'phone') : phone
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