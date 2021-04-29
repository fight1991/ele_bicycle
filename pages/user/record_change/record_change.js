// pages/user/record_change/record_change.js
var app = getApp()
const { 
  car_owner_change_status,
  car_owner_change_scan,
  car_owner_change_cancel
} = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStep: 0,
    qrcodeText: '',
    timer: null,
    timeGap: 1000,
    failReason: '',
    invoiceAuditingNum: 0, // 存在多少审核单据
    initToken: '', // 生成二维码的初始值
    status: 'auditing', // auditing:审核中 success:变更成功中 failure:变更失败
    isRefresh: false, // 是否刷新二维码
    stepList: ['变更申请', '等待审核'],
    statusText: {
      'auditing': '您的变更申请审核中，请耐心等待',
    },
    statusImg: {
      'auditing': '/pages/image/check-ing.png'
    },
    id: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { opType } = options
    // 点击轮播图状态或轮播图下方备案人变更按钮跳转过来,
    this.data.id = app.globalData.currentVehicleId
    this.getChangeStatus()
  },
  // 打开确认框
  openModal (num) {
    app.utils.openConfirm({
      content: `当前已有${num}个审核单，本次审核通过后会自动结束其他审核单，是否继续？`,
      confirm: () => { // 用户点击确认 显示二维码
        this.setData({
          qrcodeText: this.data.initToken + '&change'
        })
        // 开始轮询
        this.startSearch(this.data.initToken)
      },
      cancel: () => { // 点击取消, 返回上一个页面
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  // 查询变更状态
  async getChangeStatus () {
    if (this.data.isRefresh) {
      this.setData({
        isRefresh: false
      })
    }
    let { result } = await car_owner_change_status({qrcodeValidityToken: '', vehicleId: this.data.id})
    if (result) {
      // 处理状态分支
      this.handleStatus(result)
    }
  },
  // 轮询开始
  async startSearch (qrcodeToken) {
    let { result, other, error } = await car_owner_change_status({
      qrcodeValidityToken: qrcodeToken,
      vehicleId: this.data.id
    }, false)
    this.handleStatus(result)
    if (other || error) {
      this.setData({
        isRefresh: true
      })
      this.clearTimer()
    }
  },
  // 清楚定时器
  clearTimer () {
    if (this.data.timer) {
      clearTimeout(this.data.timer)
      this.data.timer = null
    }
  },
  /**
   * 判断状态并处理逻辑分支:
   *  0 无变更记录生成二维码
   * -1：二维码已生成
   * -2:二维码已失效
   * 41:变更备案人审核中
   * 42:变更备案人审核拒绝
   * 43:变更备案人成功、2:取消
   * valid 二维码是否有效
   * */ 
  handleStatus (result) {
    this.setData({
      status: result.status,
      failReason: result.failReason
    })
    this.data.invoiceAuditingNum = result.invoiceAuditingNum
    // 如果status有值说明二维码已经扫描
    if (result.status) {
      // 审核中
      if (result.status == 'auditing') {
        this.setData({
          currentStep: 1
        })
        this.clearTimer()
      }
      // 审核失败 或 成功
      if (result.status == 'failure' || result.status == 'success') {
        this.clearTimer()
        // 跳转到公共状态的页面
        this.routeOtherPage(result.status, result)
      }
    } else {
      // 说明没有扫码, 判断二维码是否有效
      // 显示并存储二维码初始值
      if (result.valid) {
        this.data.initToken = result.qrcodeValidityToken
        if (result.invoiceAuditingNum > 0) {
          this.openModal(result.invoiceAuditingNum)
        } else {
          this.setData({
            qrcodeText: `${result.qrcodeValidityToken}&change${this.data.id}`
          })
          // 开启轮询
          this.data.timer = setTimeout(() => {
            this.startSearch(result.qrcodeValidityToken)
          }, this.data.timeGap)
        }
      } else {
        // 二维码失效
        this.setData({
          isRefresh: true
        })
        this.clearTimer()
      }
    }
  },
  // 跳转另外几个状态的页面
  routeOtherPage (type, res) {
    let { failReason } = res
    wx.redirectTo({
      url: `/pages/user/result/result?pageFlag=change&pageTitle=备案人变更&status=${type}&reason=${failReason}`,
    })
  },
  // 返回个人中心
  backToCenter () {
    wx.reLaunch({
      url: '/pages/user/index',
    })
  },
  // 取消申请
  async cancelBtn () {
    let { result } = await car_owner_change_cancel(this.data.id)
    if (result) {
      wx.showToast({
        title: '取消成功!'
      })
      wx.reLaunch({
        url: '/pages/user/index',
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
    this.clearTimer()
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