// pages/user/livelihoodBusiness_corp/corp/detail.js
var app = getApp()
const { corpVehicleLoss, orgVehicleDetail } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    details: {},
    lossVisible: false,
    crapVisible: false,
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { id } = options
    this.data.id = id
    this.getDetail()
  },
  // 获取车辆信息详情
  async getDetail () {
    let { result } = await orgVehicleDetail(this.data.id)
    if (result) {
      this.setData({
        details: result
      })
    }
  },
  // 骑手分配
  riderAssign () {
    wx.navigateTo({
      url: './assign?vehicleId=' + this.data.id,
    })
  },
  // 打开报失确认框
  openLossVisible () {
    this.setData({
      lossVisible: true
    })
  },
  // 打开报废确认框
  openCrapVisible () {
    this.setData({
      scrapVisible: true
    })
  },
  // 报失操作
  async lossOp () {
    let { id } = this.data
    let { result } = await corpVehicleLoss(id)
    if (result) {
      // 刷新上一级的列表,并返回
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  // 报废操作
  scrapOp () {
    wx.navigateTo({
      url: `/pages/user/scrap/scrap?pageFlag=livelihoodBusiness_corp&id=${this.data.id}`,
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