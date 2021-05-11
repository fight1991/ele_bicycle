// pages/user/livelihoodBusiness_corp/corp/assign.js
var app = getApp()
const { riderList: getList, riderAssign } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    confirmVisible: false,
    currentId: '', // 当前骑手的id
    list: [],
    vehicleId: '', // 车辆id
    hasMore: true,
    pageIndex: 0, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    loading: false, // 正在加载
    searchStr: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { vehicleId } = options
    this.data.vehicleId = vehicleId
    this.initList()
  },
  listItemTap (e) {
    var id = e.target.dataset.id
    this.setData({
      currentId: id
    })
  },
  // 分配骑手
  async assignRider () {
    let { currentId, vehicleId } = this.data
    let { result } = await riderAssign({
      riderId: currentId,
      vehicleId
    })
    if (result) {
      wx.showToast({
        title: '分配成功!',
      })
      this.setData({
        currentId: ''
      })
      // wx.navigateBack({
      //   delta: 1,
      // })
    }
  },
  // 打开确认框
  confirmBtn () {
    let { currentId } = this.data
    if (!currentId) {
      wx.showToast({
        title: '请选择骑手',
        icon: 'none'
      })
      return
    }
    this.setData({
      confirmVisible: true
    })
  },
  // 键盘上的确认按钮
  confirmKeyBoardBtn (e) {
    this.initList()
  },
  // 获取列表
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize, searchStr } = this.data
    pageIndex ++
    let { result, page } = await getList({
      data: searchStr,
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
      wx.stopPullDownRefresh()
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
    this.initList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
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