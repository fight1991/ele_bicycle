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
    codeText: '获取验证码',
    timerId: 0,
    codeTime: 10
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
    if (!isPass) return
    if (this.data.timerId > 0) return
    this.myDialog.show()
  },
  // 关闭dialog
  colseDialog () {
    this.myDialog.hide()
  },
  // 是否可以输入验证码
  checkImgCodeStatus (status) {
    // status为true时代表验证码发送成功
    // 开始倒计时
    if (status) {
      this.setData({
        isEditCode: true
      })
      this.computedTime()
    }
  },
  // 倒计时
  computedTime () {
    if (this.data.timerId > 0) return
    this.setData({
      codeText: this.data.codeTime + 's'
    })
    var seconds = this.data.codeTime
    var timerId = setInterval(() => {
      seconds--
      this.setData({
        codeText: seconds + 's'
      })
      if (seconds < 0) {
        this.setData({
          codeText: '获取验证码'
        })
        clearInterval(timerId)
        this.data.timerId = 0
      }
    }, 1000)
    this.data.timerId = timerId
    console.log(timerId)
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