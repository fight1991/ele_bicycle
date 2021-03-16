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
    checkStatus: 41,
    timer: null, // 轮询计时器
    delayTimer: null, // 延时定时器, 控制二维码失效时间暂时为 2分钟
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
      // 0 无变更记录生成二维码 -1：二维码已生成、-2:二维码已失效 41:变更备案人审核中、42:变更备案人审核拒绝、43:变更备案人成功、2:取消
      this.setData({
        checkStatus: result.status,
        failReason: result.failReason
      })
      if (result.status == 41) {
        // 等待审核页面
        this.setData({
          currentStep: 1
        })
      }
      if (result.status == 0) {
        this.setData({
          qrcodeText: result.qrcodeValidityToken + '&change'
        })
        // 开始轮巡, 查看扫码的结果
        this.startSearch(result.qrcodeValidityToken)
        // 开启延时器, 2分钟后结束轮询
        // var tempTimer = setTimeout(() => {
        //   this.setData({
        //     isRefresh: true
        //   })
        //   clearTimeout(tempTimer)
        //   this.data.timer && clearInterval(this.data.timer)
        // }, 12000)
      }
    }
  },
  // 轮询开始 5s中轮询一次
  startSearch (qrcodeToken) {
    var timer = setInterval( async () => {
      let { result, other, error } = await car_owner_change_status({
        qrcodeValidityToken: qrcodeToken
      }, false)
      if (result) {
        this.setData({
          checkStatus: result.status
        })
        // 状态为-2 二维码失效
        if (result.status == -2) {
          this.clearTimer()
          this.setData({
            isRefresh: true
          })
        }
        // 审核失败, 审核成功
        if (result.status == 42 || result.status == 43) {
          // 清除定时器
          this.clearTimer()
          // 跳转到另外几个状态的页面
          this.routeOtherPage(result.status)
        }
      }
      // 清除定时器
      if (other || error) {
        this.clearTimer()
      }
    }, 5000)
    // 存储timeId
    this.data.timer = timer
  },
  // 清楚定时器
  clearTimer () {
    clearInterval(this.data.timer)
    this.data.timer = null
  },
  // 跳转另外几个状态的页面
  routeOtherPage (status) {
    wx.navigateTo({
      url: '/pages/user/record_change/record_change?status=' + status,
    })
  },
  // 返回个人中心
  backToCenter () {
    wx.reLaunch({
      url: '/pages/user/index',
    })
  },
  // 取消申请
  cancelBtn () {

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