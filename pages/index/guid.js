// pages/index/guid.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [
      {
        zh: '居民个人业务',
        en: 'Personal Business',
        bg: app.utils.imgTobase64('/pages/image/bus-pers.png'),
        permission: '0101000000',
        page: 'personalBusiness',
        id: 'page-1'
      },{
        zh: '民生行业业务',
        en: 'Specific Industries',
        bg: app.utils.imgTobase64('/pages/image/bus-live.png'),
        permission: '0103000000',
        page: 'livelihoodBusiness',
        id: 'page-2'
      }
    ]
  },
  showTips () {
    wx.showModal({
      title: '温馨提示',
      content: '您还未登录哦',
      confirmText: '去登录',
      success: async (res) => {
        if (res.confirm) {
          this.goLogin()
        }
      }
    })
  },
  goLogin () {
    wx.reLaunch({
      url: '/pages/login/signIn',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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