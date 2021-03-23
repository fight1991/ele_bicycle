
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkStatus: 'success',
    reason: '',
    from: 'inside', // 记录从哪个地方跳转过来, 默认为内部页面, server为服务通知跳转进来
    // 审核结果 共用页面, 备案申报服务通知,点击进来页面
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
    let { status, reason = '', pageTitle, from = 'inside' } = options
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
    if (this.data.from = 'server') {
      // 从服务通知跳转过来
      wx.reLaunch({
        url: '/pages/user/index?from=server',
      })
    } else {
      wx.navigateBack({
        delta: 1
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