// pages/user/livelihoodBusiness/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStatus: 'none', // auditing:审核中 failure:审核失败、waitInstall:待安装 registered:已登记、reportedLost:已报失、scrapped:已报废
    bindingDialogVisible: false, // 绑定企业车弹框
    brandNumVisible: false, // 显示车牌的弹框
    brandNum: '',
    opList: [
      {
        label: '备案申报',
        icon: '/pages/image/record.png',
        clickEvent: 'goToRecord',
        pageFlag: 'record',
        permission: ['auditing', 'failure', 'waitInstall', 'registered', 'reportedLost', 'none']
      }, {
        label: '扫码',
        icon: '/pages/image/scan_big1.png',
        clickEvent: 'scanCode',
        pageFlag: 'scan',
        permission: ['auditing', 'failure', 'waitInstall', 'registered', 'reportedLost', 'none']
      }, {
        label: '绑定企业车',
        icon: '/pages/image/peopleChange.png',
        clickEvent: 'bindingMenu',
        pageFlag: '',
        permission: ['auditing', 'failure', 'waitInstall', 'registered', 'reportedLost', 'none']
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
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 切换swiper
  swiperChange (e) {
    this.setData({
      currentStatus: e.detail.vehicleStatus
    })
  },
  // 退出企业
  outCorpBtn () {

  },
  // 绑定企业车按钮
  bindingMenu () {
    this.setData({
      bindingDialogVisible: true
    })
  },
  // 扫描二维码
  scanBrandCode () {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: _res => {
        this.setData({
          bindingDialogVisible: false,
          brandNum: _res.result || '',
          brandNumVisible: true
        })
      },
      fail: _ => {
        wx.showToast({
          title: '扫码失败, 请重试',
          icon: 'error'
        })
      }
    })
  },
  // 绑定申请
  putBinding () {

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