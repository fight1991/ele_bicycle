// pages/user/loss/loss.js
var app = getApp()
const { car_loss_search, car_loss_reput } = app.api

Page({

  /**
   * 页面的初始数据
   */
  data: {
    failReason: '', // 审核失败原因
    status: 'reporting', // 状态 unreported:未报失 reporting:报失中 reportSuccess:报失成功
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { opType } = options
    this.data.id = app.globalData.vehicleId
    if (opType == 'look') {
      this.getLossStatus()
    }
  },
  // 报失状态查询 23:已报失、24:已找回、33:已报废，重新申请、0:表示没有报失数据
  async getLossStatus () {
    let { result } = await car_loss_search(this.data.id)
    if (result) {
      this.setData(result)
    }
  },
  // 已找回按钮
  async hasFound () {
    let { result } = await car_loss_reput(this.data.id)
    if (result) {
      wx.reLaunch({
        url: '/pages/user/personalBusiness/index',
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