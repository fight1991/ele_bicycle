// pages/user/livelihoodBusiness_corp/index.js
var app = getApp()
const { orgScore } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orgCoreInfo: {},
    permissions: [],
    opList: [
      {
        label: '企业车申报',
        icon: '/pages/image/record.png',
        clickEvent: 'goToRecord',
        permission: '0103020000',
        pageFlag: 'corpRecord'
      }, {
        label: '企业车管理',
        icon: '/pages/image/corpcar.png',
        clickEvent: 'routeTo',
        permission: '0103050000',
        pageFlag: 'corp'
      }, {
        label: '骑手管理',
        icon: '/pages/image/rider.png',
        clickEvent: 'routeTo',
        permission: '0103060000',
        pageFlag: 'rider'
      }, {
        label: '申请单',
        icon: '/pages/image/application.png',
        clickEvent: 'routeTo',
        permission: '0103070000',
        pageFlag: 'application'
      }, {
        label: '审核单',
        icon: '/pages/image/check.png',
        clickEvent: 'routeTo',
        permission: '0103080000',
        pageFlag: 'check'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getOrgScoreInfo()
    app.mapPermissions(this)
  },
  // 获取公司积分等信息
  async getOrgScoreInfo () {
    let { result } = await orgScore()
    if (result) {
      this.setData({
        orgCoreInfo: result
      })
    }
  },
  goToRecord () {
    wx.navigateTo({
      url: './record/record',
    })
  },
  routeTo (e) {
    let page = e.currentTarget.dataset.page
    wx.navigateTo({
      url: `/pages/user/livelihoodBusiness_corp/${page}/list`,
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