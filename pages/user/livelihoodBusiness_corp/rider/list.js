// pages/user/livelihoodBusiness_corp/rider/list.js
var app = getApp()
const { riderList: getList, inviteRider, riderDelete } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deleteVisible: false, // 删除弹框
    addVisible: false, // 添加弹框
    mobile: '', // 手机号
    hasMore: true,
    pageIndex: 0, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    loading: false, // 正在加载
    searchStr: '',
    deleteId: '', // 当前删除的id
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initList()
  },
  // 显示删除对话框
  showDeleteDialog (e) {
    this.data.deleteId = e.detail
    this.setData({
      deleteVisible: true
    })
  },
  // 显示添加对话框
  showAddDialog () {
    this.setData({
      addVisible: true
    })
  },
  // 删除骑手
  async deleteRider (e) {
    let { result } = await riderDelete(this.data.deleteId)
    if (result) {
      let { list, deleteId } = this.data
      let tempList = list.filter(v => v.accountId != deleteId)
      this.setData({
        list: tempList
      })
    }
  },
  // 添加骑手
  async addRider () {
    let mobile = this.data.mobile
    let reg = /^[1][3,4,5,7,8,9][0-9]{9}$/
    if (!reg.test(mobile)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'error'
      })
      return
    }
    let { result } = await inviteRider(mobile)
    if (result) {
      wx.showToast({
        title: '邀请发送成功!',
      })
    }
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