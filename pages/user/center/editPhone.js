// pages/user/center/editPhone.js
import WxValidate from '../../../utils/WxValidate'

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
  // 校验手机号
  checkPhone () {
    var reg = /^1[3456789]\d{9}$/
    var isPass = reg.test(this.data.newPhone)
    if (!isPass) {
      wx.showToast({
        title: '请输入正确格式的11位手机号码',
        icon: 'none',
        duration: 1500
      })
      return false
    }
    return true
  },
  // 校验验证码
  checkCode () {
    if (!this.data.code) {
      wx.showToast({
        title: '验证码不能为空',
      })
      return false
    }
    return true
  },
  showDialog () {
    // 校验手机号是否正确
    var isPass = this.checkPhone()
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
    if (!this.checkPhone() || !this.checkCode()) {
      return
    }
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