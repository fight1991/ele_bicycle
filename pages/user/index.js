// pages/user/index.js
const utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [
      {
        zh: '居民个人业务',
        en: 'Personal Business',
        bg: utils.imgTobase64('/pages/image/bus-pers.png'),
        permission: 1
      },{
        zh: '民生行业业务',
        en: 'Specific Industries',
        bg: utils.imgTobase64('/pages/image/bus-live.png'),
        permission: 0
      },{
        zh: '单位业务',
        en: 'Enterprises and institutions',
        bg: utils.imgTobase64('/pages/image/bus-company.png'),
        permission: 0
      },{
        zh: '销售门店业务',
        en: 'Sales Store Business',
        bg: utils.imgTobase64('/pages/image/bus-owner.png'),
        permission: 0
      },{
        zh: '管理员业务',
        en: 'Administrator Business',
        bg: utils.imgTobase64('/pages/image/bus-admin.png'),
        permission: 1
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 判断有没有成功订阅一条消息
  isOrderMessage (res, ids) {
    return ids.some(v => res[v] === 'accept')
  },
  // 订阅消息弹窗
  showSubscription (callback) {
    // 针对其中一条订阅成功, --> accept
    var ids = ['fEZWMSl8x61va4VrYFaJGkT18NOeCYENRevGHXCpyHg']
    wx.requestSubscribeMessage({
      tmplIds: ids,
      success: (res) => {
        if (this.isOrderMessage(res, ids)) {
          callback && callback()
        }
      },
      fail: () => {}
    })
  },
  // 路由跳转
  routeTo (e) {
    let { bustype } = e.target.dataset
    if (bustype == 1) {
      // 订阅消息弹窗, 再路由跳转
      this.showSubscription(() => {
        wx.navigateTo({
          url: '/pages/user/personalBusiness/index',
        })
      })
    } else if (bustype == 5) {
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