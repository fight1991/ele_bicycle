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
  // 调起客户端小程序订阅消息界面 必须是手动点击
  showSubscription () {
    console.log('调起通知')
    wx.requestSubscribeMessage({
      tmplIds: [],
      success: (res) => {
        // 订阅成功
      },
      fail: () => {

      }
    })
    wx.navigateTo({
      url: '/pages/user/record/index',
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