// pages/user/livelihoodBusiness_corp/corp/list.js
var app = getApp()
const { orgVehicleList } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getOrgVehicleList()
  },
  itemTap (e) {
    let { id, status } = e.target.dataset
    if (status == 'registered') {
      wx.navigateTo({
        url: './detail?id=' + id,
      })
    }
  },
  // 获取企业车列表
  async getOrgVehicleList () {
    let { result } = await orgVehicleList()
    if (result) {
      this.setData({
        list: result
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