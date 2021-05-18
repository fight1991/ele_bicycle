
var app = getApp()
const { checkApprove, approveDetail } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    auditId: '',
    details: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { auditId } = options
    this.setData({
      auditId
    })
    this.getDetail()
  },
  // 详情
  async getDetail () {
    let { result } = await approveDetail(this.data.auditId)
    if (result) {
      this.setData({
        details: result
      })
    }
  },
  // 同意/拒绝
  async approveOp (approve) {
    let { auditId } = this.data
    let { result } = await checkApprove({
      approve,
      auditId
    })
    if (result) {
      wx.showToast({
        title: '操作成功!'
      })
      var pages = getCurrentPages()
      var prePage = pages[pages.length - 2]
      prePage.initList()
      // 刷新上一级的列表,并返回
      wx.navigateBack({
        delta: 1,
      })
    }
  },
  // 不同意
  async refuse () {
    this.approveOp(false)
  },
  // 同意加入
  async accept () {
    this.approveOp(true)
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