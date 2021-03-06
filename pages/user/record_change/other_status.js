// pages/user/record_change/other_status.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 42:变更备案人审核拒绝、43:变更备案人成功、44:已知晓、2:取消、0:无变更记录生成二维码
    checkStatus: 42,
    reason: '',
    // 备案人变更 和 一键报废审核成功或失败,共用页面
    statusText: {
      '42': '审核失败',
      '43': '审核成功',
      '32': '审核失败',
      '33': '审核成功',
    },
    statusImg: {
      '42': '/pages/image/check-fail.png',
      '43': '/pages/image/check-success.png',
      '33': '/pages/image/check-success.png',
      '32': '/pages/image/check-fail.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { status, reason, pageTitle } = options
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
  // 审核失败 点击已知晓按钮跳转到
  hasKnownBtn () {
    // 结束备案人变更流程
    // 跳转到个人居民业务
    wx.reLaunch({
      url: '/pages/user/personalBusiness/index',
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