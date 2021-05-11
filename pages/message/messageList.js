// pages/message/messageList.js
var app = getApp()
const { getMessageListApi } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 上拉刷新下拉加载数据
    triggered: false, // 设置当前下拉刷新状态
    hasMore: true, // 是否还有更多数据
    pageIndex: 1, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    resultList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.onRefresh()
  },
  // 获取消息列表
  async getMessageList (pageIndex, callback) {
    if (this._freshing) return
    this._freshing = true
    let { pageSize, resultList } = this.data
    let createTime = ''
    let id = ''
    if (resultList.length > 0) {
      var lastData = resultList[resultList.length - 1]
      createTime = lastData.createTime
      id = lastData.id
    }
    let { result, page } = await getMessageListApi({
      data: {
        createTime,
        id
      },
      page: {
        pageIndex,
        pageSize
      }
    })
    if (result) {
      callback && callback(result || [], page)
    }
    this._freshing = false
    this.setData({
      triggered: false
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
    // wx.$post({
    //   url: '/user-center/notification/createNotice',
    //   data: {
    //     "msgContent": "你好aaaa" + Date.now(),
    //     "msgDesc": "这是个好豪情" + Date.now(),
    //     "msgTitle": "title" + Date.now(),
    //     "msgType": "system",
    //     "targetAccountId": '3026861168552657839'
    //   }
    // })
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
    // wx.showNavigationBarLoading() //启用标题栏显示加载状态
    // // 调用相关方法
    // setTimeout(() => {
    //   wx.hideNavigationBarLoading() //隐藏标题栏显示加载状态
    //   wx.stopPullDownRefresh() //结束刷新
    // }, 1000); //设置执行时间
  },
  onRefresh() {
    this.data.resultList = []
    this.getMessageList(1, (list, pagination) => {
      var { total } = pagination
      var len = list.length
      this.setData({
        resultList: list,
        hasMore: len >= total ? false : true
      })
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  scrolltolower () {
    if (!this.data.hasMore) return
    let { resultList } = this.data
    this.getMessageList(1, (list, pagination) => {
      var { pageIndex, total } = pagination
      var tempR = [...resultList, ...list]
      this.setData({
        pageIndex,
        resultList: tempR,
        hasMore: tempR.length >= total ? false : true
      })
    })
  },
  onReachBottom: function (e) {
    console.log(e)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})