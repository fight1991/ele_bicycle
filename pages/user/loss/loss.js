// pages/user/loss/loss.js
import { car_loss_search, car_loss_reput } from '../../api/record'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    failReason: '', // 审核失败原因
    status: '', // 状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 报失状态查询 23:已报失、24:已找回、33:已报废，重新申请、0:表示没有报失数据
  async getLossStatus () {
    let { result } = await car_loss_search()
    if (result) {
      this.setData(result)
    }
  },
  // 已找回按钮
  async hasFound () {
    let { result } = await car_loss_reput({
      status: 24
    })
    if (result) {
      wx.reLaunch({
        url: '/pages/user/personalBusiness/index',
      })
    }
  },
  // 重新申请
  reApply () {
    wx.showModal({
      title: '温馨提示',
      content: '您确定要重新申请吗?',
      success: async (res) => {
        if (res.confirm) {
          this.applyLoss()
        }
      }
    })
  },
  // 自动报废api,并返回备案申报第一步
  async applyLoss () {
    let { result } = await car_loss_reput({
      status: 33
    })
    if (result) {
      wx.redirectTo({
        url: '/pages/user/record/index',
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