// pages/user/livelihoodBusiness_corp/application/list.js
var app = getApp()
const { getAuditList: getList, translateDic } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasMore: true,
    pageIndex: 0, // 当前页
    pageSize: 10, // 每页请求数量
    total: 0, // 条目数
    loading: false, // 正在加载
    list: [],
    searchStr: '', // 搜索字段
    type: 'toAudit', // 类型  当前tab值 toAudit待审核、history历史
    // 翻译map
    auditType: {
      recordFiling: '企业车申报',
      scrap: '一键报废'
    },
    dicStatus: {},
    pageInfo: {
      'scrap': '/pages/user/scrap/scrap?pageFlag=livelihoodBusiness_corp&', // 报废页面
      'recordFiling': '/pages/user/livelihoodBusiness_corp/record/record?' // 申报页面
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.setData({
      dicStatus: await translateDic('recordFiling')
    })
    this.initList()
  },
  // 路由
  routeTo (e) {
    // url="{{pageInfo[item.auditType]}}opType=look&installType={{item.installType}}&id={{item.vehicleId}}&vin={{item.vin}}"
    let { pageInfo, list, type } = this.data
    if (type == 'history') return
    let { index, audittype } = e.target.dataset
    let { installType = '', vehicleId, vin } = list[index]
    wx.navigateTo({
      url: `${pageInfo[audittype]}opType=look&installType=${installType}&id=${vehicleId}&vin=${vin}`,
    })
  },
  // 点击tab
  tabClick (e) {
    let type = e.target.dataset.type
    if (this.data.type == type) return
    this.setData({
      type
    })
    this.initList()
  },
  // 清空条件
  clearBtn () {
    this.initList()
  },
  // 搜索时确定按钮
  confirmBtn (e) {
    // 输入框中的值 e.detail
    if (!e.detail.trim()) return
    this.initList()
  },
  // 获取列表
  async getList (pageIndex, callback) {
    if (this.loading) return
    this.loading = true
    let { pageSize, type, searchStr } = this.data
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
    // 停止下拉刷新
    // wx.stopPullDownRefresh()
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