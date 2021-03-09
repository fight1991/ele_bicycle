// pages/user/index.js
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
  // 路由跳转
  routeTo (e) {
    let { bustype } = e.target.dataset
    if (bustype == 1) {
      // 订阅消息弹窗, 再路由跳转
      wx.navigateTo({
        url: '/pages/user/personalBusiness/index',
      })
    } else if (bustype == 2) {
      wx.navigateTo({
        url: '/pages/user/adminBusiness/index',
      })
    } else {
      wx.showToast({
        title: '开发中, 敬请期待',
        icon: 'none',
        duration: 1500
      })
    }
  },
  // 防止冒泡
  stopTapEvent () {},
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