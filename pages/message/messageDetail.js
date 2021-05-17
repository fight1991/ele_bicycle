// pages/message/messageDetail.js
var app = getApp()
const { getMessageDetailApi } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageInfo: {}, // 查看消息详情
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let isRead = options.readStatus
    // 有可能是从服务通知点进来
    let fromTag = options.from
    if (!fromTag) {
      if (!isRead) {
        this.changeReadStatus(id)
      }
    }
    this.getMessageDetail(id)
  },
  async getMessageDetail (id) {
    let { result } = await getMessageDetailApi(id)
    if (result) {
      this.setData({
        messageInfo: result
      })
    }
  },
  // 修改上一页的数据, 使其状态为已读
  changeReadStatus (id) {
    let pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    var tempData = JSON.parse(JSON.stringify(prevPage.data.resultList))
    tempData.some(v => {
      if (v.messageId == id) {
        v.readStatus = true
        return true
      }
    })
    prevPage.setData({
      resultList: tempData
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