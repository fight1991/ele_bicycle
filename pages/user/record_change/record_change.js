// pages/user/record_change/record_change.js
import { 
  car_owner_change_status,
  car_owner_change_scan,
  car_owner_change_cancel
} from '../../api/record'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStep: 0,
    qrcodeText: '',
    timer: null,
    timeGap: 1000,
    initToken: '', // 生成二维码的初始值
    checkStatus: 41,
    isRefresh: false, // 是否刷新二维码
    stepList: ['变更申请', '等待审核'],
    statusText: {
      '41': '您的变更申请审核中，请耐心等待',
    },
    statusImg: {
      '41': '/pages/image/check-ing.png'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getChangeStatus()
  },
  // 查询变更状态
  async getChangeStatus () {
    if (this.data.isRefresh) {
      this.setData({
        isRefresh: false
      })
    }
    let { result } = await car_owner_change_status({qrcodeValidityToken: ''})
    if (result) {
      // 处理状态分支
      this.handleStatus(result)
    }
  },
  // 轮询开始
  async startSearch (qrcodeToken) {
      let { result, other, error } = await car_owner_change_status({
        qrcodeValidityToken: qrcodeToken
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
   * 42:变更备案人审核拒绝、
   * 43:变更备案人成功、2:取消
   * */ 
  handleStatus (result) {
    this.setData({
      checkStatus: result.status,
      failReason: result.failReason
    })
    // 状态为0, 显示并存储二维码初始值
    if (result.status == 0) {
      this.setData({
        qrcodeText: result.qrcodeValidityToken + '&change'
      })
      this.data.initToken = result.qrcodeValidityToken
    }
    // 状态为 0 或-1 二维码尚未被扫码或还在有效, 继续1s后开启轮询
    if (result.status == -1 || result.status ==0) {
      this.data.timer = setTimeout(() => {
        this.startSearch(result.qrcodeValidityToken)
      }, this.data.timeGap)
    }
    // 状态为-2 二维码失效
    if (result.status == -2) {
      this.setData({
        isRefresh: true
      })
      this.clearTimer()
    }
    // 41 -等待审核页面
    if (result.status == 41) {
      this.setData({
        currentStep: 1
      })
      this.clearTimer()
    }
    // 审核失败, 审核成功
    if (result.status == 42 || result.status == 43) {
      this.clearTimer()
      // 跳转到另外几个状态的页面
      this.routeOtherPage(result.status)
    }
  },
  // 跳转另外几个状态的页面
  routeOtherPage (status) {
    wx.navigateTo({
      url: '/pages/user/record_change/other_status?status=' + status,
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
    let { result } = await car_owner_change_cancel({ status: 2 })
    if (result) {
      wx.showToast({
        title: '取消成功'
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