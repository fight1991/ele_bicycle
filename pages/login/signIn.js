// pages/login/signIn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idcard: '123333333',
    code: '',
    imgSrc: '',
    phone: '18862348287',
    isDisable: true, // 按钮禁用
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { idcard } = options
    if(idcard) {
      var startText = idcard.slice(0, 6)
      var endText = idcard.slice(idcard.length-4)
      this.setData({
        idcard: startText + "****" + endText
      })
    }
    this.myDialog = this.selectComponent('#myDialog')
  },
  // 绑定数据
  bindData (e) {
    let id = e.currentTarget.id
    this.data[id] = e.detail.value
  },
  // 显示dialog
  showDialog () {
    // 校验手机号是否正确
    var reg = /^1[3456789]\d{9}$/
    var isPass = reg.test(this.data.phone)
    if (!isPass) {
      wx.showToast({
        title: '请输入11位的手机号码',
        icon: 'none',
        duration: 1500
      })
      return
    }
    this.myDialog.show()
  },
  // 关闭dialog
  colseDialog () {
    this.myDialog.hide()
  },
  // 获取验证码
  getCode (e) {
    this.setData({
      code: e.detail,
      isDisable: false
    })
  },
  // 获取验证码图片
  getImg () {
    console.log('请求图片')
  },
  // 确定按钮 跳转到首页
  confirmBtn () {
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