// pages/user/index.js
var app = getApp()
const utils = app.utils
const { getMessageNumApi, corpInfo, toCorp, riderScore: bannerRider, orgScore: bannerCorp } = app.api
const apiObj = {
  personal: bannerRider,
  corp: bannerCorp
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageNum: 0, // 消息数量
    isShowSwitch: false, // 是否显示 个人-公司 切换按钮
    corpList: [],
    appVersion: 'personal', // personal个人版, corp企业版
    permissions: [],
    itemList: [
      {
        zh: '居民个人业务',
        en: 'Personal Business',
        bg: utils.imgTobase64('/pages/image/bus-pers.png'),
        app: ['personal'],
        permission: '0101000000',
        page: 'personalBusiness',
        id: 'page-1'
      },{
        zh: '民生行业业务',
        en: 'Specific Industries',
        bg: utils.imgTobase64('/pages/image/bus-live.png'),
        app: ['personal'],
        permission: '0103000000',
        page: 'livelihoodBusiness',
        id: 'page-2'
      }, {
        zh: '单位业务',
        en: 'Enterprises and institutions',
        bg: utils.imgTobase64('/pages/image/bus-company.png'),
        permission: '0104000000',
        page: '',
        hidden: true,
        id: 'page-4'
      },{
        zh: '销售门店业务',
        en: 'Sales Store Business',
        bg: utils.imgTobase64('/pages/image/bus-owner.png'),
        permission: '0105000000',
        page: '',
        id: 'page-5',
        hidden: true
      },{
        zh: '管理员业务',
        en: 'Administrator Business',
        bg: utils.imgTobase64('/pages/image/bus-admin.png'),
        app: ['personal'],
        permission: '0102000000',
        page: 'adminBusiness',
        id: 'page-6'
      },
    ],
    bannerInfo: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 判断是个人版还是企业版
    this.initVersion()
    // 初始化banner中的数据
    this.initBannerInfo()
    // 从globalData中获取权限信息
    app.mapPermissions(this)
    this.getCorpInfo()
  },
  // 查询公司信息
  async getCorpInfo () {
    let { result } = await corpInfo()
    if (result) {
      // result.length > 1 说明有公司信息
      this.setData({
        isShowSwitch: result.length > 1,
        corpList: result
      })
    }
  },
  // 初始化banner数据
  async initBannerInfo () {
    let { appVersion } = this.data
    let { result } = await apiObj[appVersion]()
    if (result) {
      this.setData({
        bannerInfo: result
      })
    }
  },
  // 初始化版本 orgId 为 -1 个人版, 否则为企业版
  initVersion () {
    var orgId = app.globalData.basicUserInfo.orgId
    var version = 'corp'
    if (orgId == -1) {
      version = 'personal'
    }
    this.setData({
      appVersion: version
    })
  },  
  // 切换到企业版
  async switchToCorp (index, callback) {
    let { corpList } = this.data
    // index 0为个人版, 1为企业版
    let corpInfo = corpList[index]
    if (corpInfo) {
      let { orgId } = corpInfo
      let { result } = await toCorp({
        defaultOrg: 1,
        orgId,
        userToken: wx.getStorageSync('token')
      })
      if (result) {
        // 重新初始化信息
        callback && callback()
      }
    }
  },

  // 版本切换
  switchVersion () {
    let { appVersion } = this.data
    let versionIndex =  appVersion == 'personal' ? 1 : 0
      this.switchToCorp(versionIndex, () => {
        app.initUserInfo()
        this.setData({
          appVersion: appVersion == 'personal' ? 'corp' : 'personal'
        })
        app.mapPermissions(this)
        this.initBannerInfo()
      })
  },
  // 判断有没有成功订阅一条消息
  isOrderMessage (res, ids) {
    return ids.some(v => res[v] === 'accept')
  },
  // 订阅消息弹窗
  showSubscription (callback) {
    // 针对其中一条订阅成功, --> accept
    var ids = [
      'fEZWMSl8x61va4VrYFaJGkT18NOeCYENRevGHXCpyHg',
      'STSs3LYg7cFOMDyqmFpikaPCwHgPZSVFVTRjkkz0fCE'
    ]
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
    let pageArr = ['personalBusiness', 'livelihoodBusiness']
    if (pageArr.indexOf(page) > -1) {
      // 订阅消息弹窗, 再路由跳转
      this.showSubscription(() => {
        // 如果是民生行业业务,判断是跳转到企业版页面还是个人版
        let { appVersion } = this.data
        if (page == 'livelihoodBusiness' && appVersion == 'corp') {
          page = 'livelihoodBusiness_corp'
        }
        wx.navigateTo({
          url: `/pages/user/${page}/index`,
        })
      })
    } else {
      if (!page) return
      wx.navigateTo({
        url: `/pages/user/${page}/index`,
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
    this.setData({
      messageNum: typeof result == 'number' ? result : 0
    })
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
  // onShareAppMessage: function () {

  // }
})