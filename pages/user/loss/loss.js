// pages/user/loss/loss.js
var app = getApp()
const { car_loss_search, car_loss_reput, riderLossFind, riderLossStatus, corpVehicleLossFind, corpVehicleLossStatus } = app.api
const apiObj = {
  personalBusiness: {
    status: car_loss_search,
    find: car_loss_reput
  },
  livelihoodBusiness: {
    status: riderLossStatus,
    find: riderLossFind
  },
  livelihoodBusiness_corp: {
    status: corpVehicleLossStatus,
    find: corpVehicleLossFind
  }
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    failReason: '', // 审核失败原因
    status: 'reporting', // 状态 unreported:未报失 auditing:报失中 success:报失成功
    id: '',
    pageFlag: 'personalBusiness'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { opType, id, pageFlag } = options
    this.data.pageFlag = pageFlag
    // 进入页面先查询状态
    this.data.id = id || app.globalData.currentVehicleId
    this.getLossStatus()
  },
  async getLossStatus () {
    let { pageFlag } = this.data
    let { result } = await apiObj[pageFlag]['status'](this.data.id)
    if (result) {
      this.setData(result)
    }
  },
  // 已找回按钮
  async hasFound () {
    let { pageFlag } = this.data
    let { result } = await apiObj[pageFlag]['find'](this.data.id)
    // let url = '/pages/user/index'
    // if (this.data.pageFlag) {
    //   url = `/pages/user/${pageFlag}/index`
    // }
    var pages = getCurrentPages()
    var prePage = pages[pages.length - 2]
    prePage.initList()
    if (result) {
      wx.navigateBack({
        delta: 1
      })
    }
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