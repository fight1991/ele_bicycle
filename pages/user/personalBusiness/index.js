// pages/user/personalBusiness/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  routeTo () {
    wx.navigateTo({
      url: '/pages/user/record/index',
    })
  },
  // 跳转到备案人变更页面
  routeToChange () {
    wx.navigateTo({
      url: '/pages/user/record_change/record_change',
    })
  },
  // 扫码
  scanCode () {
    wx.scanCode({
      onlyFromCamera: true,
      success: _res => {
        // 跳转到扫码详情页
        wx.navigateTo({
          url: '/pages/user/scanCode/scanCode',
        })
      }
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