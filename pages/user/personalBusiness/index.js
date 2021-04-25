// pages/user/personalBusiness/index.js
var app = getApp()
const {
  car_owner_change_scan, // 扫码
  record_status, // 备案申报状态查询
  car_loss_op, // 车辆挂失
  car_owner_change_status, // 备案人变更状态查询
  car_loss_search, // 一键报失状态查询
  car_scrap_search // 一键报废状态查询
} = app.api

Page({

  /**
   * 页面的初始数据
   */
  data: {
    verifyDialogVisible: false,
    currentStatus: '', // filingReview:审核中、auditFailure:审核失败、waitInstall:待安装 registered:已登记、reportedLost:已报失、scrapped:已报废
    opList: [
      {
        label: '备案申报',
        icon: '/pages/image/record.png',
        clickEvent: 'goToRecord',
        pageFlag: 'record',
        permission: ['filingReview', 'auditFailure', 'waitInstall', 'registered', 'reportedLost']
      }, {
        label: '扫码',
        icon: '/pages/image/scan_big1.png',
        clickEvent: 'scanCode',
        pageFlag: 'scan',
        permission: ['filingReview', 'auditFailure', 'waitInstall', 'registered', 'reportedLost']
      }, {
        label: '备案人变更',
        icon: '/pages/image/peopleChange.png',
        clickEvent: 'routeTo',
        pageFlag: 'record_change',
        permission: [ 'registered']
      }, {
        label: '一键报失',
        icon: '/pages/image/baoshi.png',
        clickEvent: 'routeTo',
        pageFlag: 'loss',
        permission: ['registered']
      }, {
        label: '一键报废',
        icon: '/pages/image/baofei.png',
        clickEvent: 'routeTo',
        pageFlag: 'scrap',
        permission: ['registered']
      }, {
        label: '购买保险查询',
        icon: '/pages/image/purchase.png',
        clickEvent: 'routeTo',
        pageFlag: 'insure',
        permission: ['filingReview', 'auditFailure', 'waitInstall', 'registered', 'reportedLost']
      }, {
        label: '安全学习',
        icon: '/pages/image/scan_big1.png',
        clickEvent: 'routeTo',
        pageFlag: 'study',
        permission: ['other']
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mySwiper = this.selectComponent('#mySwiper')
  },
  // 切换swiper
  swiperChange (e) {
    console.log(e.detail)
    this.setData({
      currentStatus: e.detail.vehicleStatus
    })
  },
  // 跳转到身份认证
  goToIdcardVerify () {
    wx.navigateTo({
      url: '/pages/user/idcardVerify/idcardVerify',
    })
  },
  // 跳转到备案申报新增页面
  goToRecord () {
    // 查询是否身份已经认证
    var idNO = app.globalData.businessUserInfo.idNO
    if (!idNO) {
      this.setData({
        verifyDialogVisible: true
      })
      return
    }
    wx.navigateTo({
      url: '/pages/user/record/record?op=add',
    })
  },
  // 跳转到相关页面
  async routeTo (e) {
    let { page } = e.currentTarget.dataset
    let route = `/pages/user/${page}/${page}`
    if (page == 'loss') {
      // 弹框提醒
      this.openLossConfirmMmodal()
    } else {
      wx.navigateTo({
        url: route
      })
    }
  },
  // 扫码
  scanCode () {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: _res => {
        let res = _res.result
        if (res.includes('http')) { // 说明是个链接
          // 跳转到web-view页面
          wx.navigateTo({
            url: '/pages/user/scanCode/scanCode?url=' + res,
          })
        } else if (res.includes('&change')){ // 说明扫的是备案人变更的二维码
          let tempArr = res.split('&')
          let tempStr = tempArr[1]
          if (tempStr && tempStr == 'change') {
            this.recordChange(tempArr[0])
          }
        } else {
          wx.showToast({
            title: '无效的二维码',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },
  // 车辆备案人变更扫码
  async recordChange (token) {
    let { result, other } = await car_owner_change_scan({
      qrcodeValidityToken: token
    })
    if (result) {
      // 解决在ios中弹框不显示问题
      wx.hideLoading()
      wx.showToast({
        title: '操作成功!'
      })
    }
  },
  // 车辆挂失api
  async carLossApi (paramsStr) {
    let { result } = await car_loss_op(app.globalData.currentVehicleId)
    if (result) {
      this.mySwiper.getList()
    }
  },
  // 打开一键报失弹框
  async openLossConfirmMmodal () {
    wx.showModal({
      title: '提示',
      content: '您确定要报失吗?',
      success: async res => {
        if (res.confirm) {
          this.carLossApi()
        }
      } 
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