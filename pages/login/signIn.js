// pages/login/signIn.js
const utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idNO: '123333333',
    imgSrc: '',
    mobile: '18862348287',
    authCode: '', // 验证码
    isEditCode: false, // 按钮禁用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { idNO } = options
    if(idNO) {
      this.setData({
        idNO: utils.hideText(idNO)
      })
    }
    this.myDialog = this.selectComponent('#myDialog')
  },
  // 显示dialog
  showDialog () {
    // 校验手机号是否正确
    var isPass = utils.checkPhone(this.data.mobile)
    if (isPass) {
      this.myDialog.show()
    }
  },
  // 关闭dialog
  colseDialog () {
    this.myDialog.hide()
  },
  // 是否可以输入验证码
  checkImgCodeStatus (status) {
    if (status) {
      this.setData({
        isEditCode: true
      })
    }
  },
  // 确定按钮 跳转到首页
  confirmBtn () {
    let { mobile, authCode } = this.data
    if (!utils.checkPhone(mobile) || !utils.checkCode(authCode)) {
      return
    }
    wx.reLaunch({
      url: '/pages/user/index',
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