// pages/login/signIn.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idcard: '123333333',
    code: '',
    imgSrc: ''
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
  // 显示dialog
  showDialog () {
    this.myDialog.show()
  },
  // 关闭dialog
  colseDialog () {
    this.myDialog.hide()
  },
  // 获取验证码
  getCode (code) {
    this.data.code = code
  },
  // 获取验证码图片
  getImg () {

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