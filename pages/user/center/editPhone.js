// pages/user/center/editPhone.js
const utils = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDisable: true,
    oldPhone: '1231134',
    newPhone: '',
    code: '',
    isEditCode: false, // 是否可以输入验证码
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.myDialog = this.selectComponent('#myDialog')
  },
  showDialog () {
    // 校验手机号是否正确
    var isPass = utils.checkPhone(this.data.newPhone)
    if (isPass) {
      this.myDialog.show()
    }
  },
  // 关闭dialog
  colseDialog () {
    this.myDialog.hide()
  },
  getImg () {
    console.log('重新获取图片')
  },
  // 提交按钮
  confirmBtn () {
    // 再校验手机号和验证码是否输入
    let { newPhone, code } = this.data
    if (!utils.checkPhone(newPhone) || !utils.checkCode(code)) {
      return
    }
    // 如果修改成功, 跳转到relog页面
    wx.reLaunch({
      url: '/pages/user/center/relogin',
    })
  },
  // 是否可以输入验证码
  checkImgCodeStatus (status) {
    if (status) {
      this.setData({
        isEditCode: true
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