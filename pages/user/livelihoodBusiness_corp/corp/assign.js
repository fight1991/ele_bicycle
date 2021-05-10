// pages/user/livelihoodBusiness_corp/corp/assign.js
var app = getApp()
const { riderList, riderAssign } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmVisible: false,
    currenteId: '', // 当前骑手的id
    list: [],
    vehicleId: '' // 车辆id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { vehicleId } = options
    this.data.vehicleId = vehicleId
  },
  // 获取骑手列表
  async riderList () {
    let { result } = await riderList()
    if (result) {
      this.setData({
        list: result
      })
    }
  },
  listItemTap (e) {
    var id = e.target.dataset.id
    this.setData({
      currenteId: id
    })
  },
  // 分配骑手
  async assignRider () {
    let { currenteId, vehicleId } = this.data
    let { result } = await riderAssign({
      riderId: currenteId,
      vehicleId
    })
  },
  // 打开确认框
  confirmBtn () {
    this.setData({
      confirmVisible: true
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