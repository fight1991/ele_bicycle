// pages/login/index.js
var app = getApp()
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
  wechatPermission () {
    wx.getUserProfile({
      desc: '头像展示',
      success: res => {
        if (res.errMsg == 'getUserProfile:ok') {
          app.globalData.userInfo = res.userInfo
          // 假设去注册
          wx.reLaunch({
            url: '/pages/login/faceIdentify',
          })
        }
      },
      fail: res => {
        console.log(res, '头像获取失败')
      }
    })
  },
  routeTo () {
    // 微信授权弹窗
    wx.navigateTo({
      url: '/pages/login/faceIdentify'
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