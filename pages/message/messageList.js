// pages/message/messageList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 上拉刷新下拉加载数据
    triggered: false, // 设置当前下拉刷新状态
    hasMore: true, // 是否还有更多数据
    currPage: 0, // 当前页
    pageSize: 10, // 每页请求数量
    count: 0, // 条目数
    resultList: [1, 1, 1, 1, 1]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // wx.showNavigationBarLoading() //启用标题栏显示加载状态
    // // 调用相关方法
    // setTimeout(() => {
    //   wx.hideNavigationBarLoading() //隐藏标题栏显示加载状态
    //   wx.stopPullDownRefresh() //结束刷新
    // }, 1000); //设置执行时间
  },
  getList (type) {
    if (this._freshing) return
    this._freshing = true
    var pageIndex = this.data.currPage
    pageIndex++
    // 请求成功之后
    this.setData({
      triggered: false,
      resultList: type == 'down' ? [...result] : [...this.data.resultList, ...result],
      currPage: pageIndex
      // hasMore: pageSize * currPage < total
    })
    this._freshing = false
  },
  onRefresh() {
    this.data.currPage = 1
    this.getList('down')
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  scrolltolower () {
    if (!this.data.hasMore) return
    this.getList('up')
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