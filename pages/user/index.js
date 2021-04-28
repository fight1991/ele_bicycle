// pages/user/index.js
var app = getApp()
const utils = app.utils
const { getMessageNumApi } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageNum: 0, // 消息数量
    appVersion: 'personal', // personal个人版, corp企业版
    itemList: [
      {
        zh: '居民个人业务',
        en: 'Personal Business',
        bg: utils.imgTobase64('/pages/image/bus-pers.png'),
        app: ['personal'],
        page: 'personalBusiness'
      },{
        zh: '民生行业业务',
        en: 'Specific Industries',
        bg: utils.imgTobase64('/pages/image/bus-live.png'),
        app: ['personal', 'corp'],
        page: 'livelihoodBusiness'
      },{
        zh: '单位业务',
        en: 'Enterprises and institutions',
        bg: utils.imgTobase64('/pages/image/bus-company.png'),
        page: ''
      },{
        zh: '销售门店业务',
        en: 'Sales Store Business',
        bg: utils.imgTobase64('/pages/image/bus-owner.png'),
        page: ''
      },{
        zh: '管理员业务',
        en: 'Administrator Business',
        bg: utils.imgTobase64('/pages/image/bus-admin.png'),
        app: ['personal'],
        page: 'adminBusiness'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    let { from } = options
    if (from == 'server') { // 从服务通知中跳转, 需要初始化用户信息
      app.getWechatCode().then(res => {
        app.globalData.jsCode = res.code
        this.routeValid(res.code)
      })
    }
  },
  // 版本切换
  switchVersion () {
    let { appVersion } = this.data
    this.setData({
      appVersion: appVersion == 'personal' ? 'corp' : 'personal'
    })
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
    let { page } = e.target.dataset
    if (page == 'personalBusiness') {
      // 订阅消息弹窗, 再路由跳转
      this.showSubscription(() => {
        wx.navigateTo({
          url: '/pages/user/personalBusiness/index',
        })
      })
    } else {
      if (!page) return
      wx.navigateTo({
        url: `/pages/user/${page}/index`,
      })
    }
  },
  async routeValid (code) {
    var token = wx.getStorageSync('token')
    if (token) {
      app.initUserInfo()
    } else {
      wx.reLaunch({
        url: '/pages/login/signIn',
      })
    }
  },
  // 跳转到消息页面
  goToMessagePage () {
    wx.navigateTo({
      url: '/pages/message/messageList',
    })
  },
  // 获取新消息条数
  async getNewMessageNum () {
    let { result } = await getMessageNumApi()
    if (typeof result == 'number') {
      this.setData({
        messageNum: result
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
    wx.hideHomeButton()
    this.getNewMessageNum()
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