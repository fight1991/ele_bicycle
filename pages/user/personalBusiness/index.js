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
    permissions: [],
    verifyDialogVisible: false,
    lossVisible: false,
    currentStatus: 'none', // auditing:审核中 failure:审核失败、waitInstall:待安装 registered:已登记、reportedLost:已报失、scrapped:已报废
    opList: [
      {
        label: '备案申报',
        icon: '/pages/image/record.png',
        clickEvent: 'goToRecord',
        pageFlag: 'record',
        permission: '0101010000',
        status: ['auditing', 'failure', 'waitInstall', 'registered', 'reportedLost', 'none']
      }, {
        label: '扫码',
        icon: '/pages/image/scan_big1.png',
        clickEvent: 'scanCode',
        pageFlag: 'scan',
        permission: '0101020000',
        status: ['auditing', 'failure', 'waitInstall', 'registered', 'reportedLost', 'none']
      }, {
        label: '备案人变更',
        icon: '/pages/image/peopleChange.png',
        clickEvent: 'routeTo',
        pageFlag: 'record_change',
        permission: '0101030000',
        status: [ 'registered']
      }, {
        label: '一键报失',
        icon: '/pages/image/baoshi.png',
        clickEvent: 'routeTo',
        pageFlag: 'loss',
        permission: '0101040000',
        status: ['registered']
      }, {
        label: '一键报废',
        icon: '/pages/image/baofei.png',
        clickEvent: 'routeTo',
        pageFlag: 'scrap',
        permission: '0101050000',
        status: ['registered', 'reportedLost']
      }, {
        label: '购买保险查询',
        icon: '/pages/image/purchase.png',
        clickEvent: 'routeTo',
        pageFlag: 'insure',
        permission: '0101060000',
        status: ['auditing', 'failure', 'waitInstall', 'registered', 'reportedLost', 'none']
      }, {
        label: '安全学习',
        icon: '/pages/image/scan_big1.png',
        clickEvent: 'routeTo',
        pageFlag: 'study',
        permission: '0101070000',
        status: ['other']
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mySwiper = this.selectComponent('#mySwiper')
    app.mapPermissions(this)
  },
  // 切换swiper
  swiperChange (e) {
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
    var idNO = app.globalData.userInfo.idNO
    if (!idNO) {
      this.setData({
        verifyDialogVisible: true
      })
      return
    }
    wx.navigateTo({
      url: '/pages/user/personalBusiness/record/record?op=add',
    })
  },
  // 跳转到相关页面
  async routeTo (e) {
    let { page } = e.currentTarget.dataset
    let route = `/pages/user/${page}/${page}`
    if (page == 'loss') {
      // 弹框提醒
      this.setData({
        lossVisible: true
      })
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
          console.log(res)
          let encodeUrl = encodeURIComponent(res)
          wx.navigateTo({
            url: '/pages/user/scanCode/scanCode?url=' + encodeUrl,
          })
        } else if (res.includes('&change')){ // 说明扫的是备案人变更的二维码
          let tempArr = res.split('&change')
          let tokenStr = tempArr[0]
          let idStr = tempArr[1]
          if (tokenStr && idStr) {
            this.recordChange(tokenStr, idStr)
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
  async recordChange (token, id) {
    let { result, other } = await car_owner_change_scan({
      qrcodeValidityToken: token,
      vehicleId: id
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