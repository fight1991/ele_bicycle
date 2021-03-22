
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkStatus: 'success',
    reason: '',
    // 审核结果 共用页面
    statusText: {
      'fail': '审核失败',
      'success': '审核成功'
    },
    statusImg: {
      'fail': '/pages/image/check-fail.png',
      'success': '/pages/image/check-success.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { status, reason = '', pageTitle } = options
    this.setData({
      checkStatus: status,
      reason
    })
    if (pageTitle) {
      wx.setNavigationBarTitle({
        title: pageTitle,
      })
    }
  },
  // 返回上一步
  hasKnownBtn () {
    wx.navigateBack({
      delta: 1
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