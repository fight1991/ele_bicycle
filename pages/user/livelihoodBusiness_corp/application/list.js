// pages/user/livelihoodBusiness_corp/application/list.js
var app = getApp()
const { getAuditList: getList } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasMore: true,
    pageIndex: 0, // 当前页
    pageSize: 5, // 每页请求数量
    total: 0, // 条目数
    loading: false, // 正在加载
    list: [],
    searchStr: '', // 搜索字段
    type: 'toAudit', // 类型  当前tab值 toAudit待审核、history历史
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initList()
  },
  // 点击tab
  tabClick (e) {
    console.log(e)
    let type = e.target.dataset.type
    if (this.data.type == type) return
    this.setData({
      activeIndex: type
    })
    this.initList()
  },
  // 搜索时确定按钮
  confirmBtn (e) {
    // 输入框中的值 e.detail
    console.log(e.detail, '打印的值')
  },
  // 获取列表
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize, searchStr, type } = this.data
    pageIndex ++
    let { result, page } = await getList({
      data: {
        searchStr,
        type
      },
      page: {
        pageIndex,
        pageSize
      }
    })
    if (result) {
      callback && callback(result || [], page)
    }
    this.loading = false
  },
  // 列表初始化查询
  initList () {
    this.getList(0, (resList, pagination) => {
      var { pageIndex, total, pageSize } = pagination
      this.setData({
        pageIndex,
        list: resList,
        hasMore: pageIndex * pageSize >= total ? false : true
      })
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
    console.log('下拉了')
    this.initList()
    // 停止下拉刷新
    // wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('到底了')
    if (!this.data.hasMore) return
    let { pageIndex, list } = this.data
    this.getList(pageIndex, (resList, pagination) => {
      var { pageIndex, total, pageSize } = pagination
      this.setData({
        pageIndex,
        list: [...list, ...resList],
        hasMore: pageIndex * pageSize >= total ? false : true
      })
    })
  },  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})