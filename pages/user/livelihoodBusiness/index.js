// pages/user/livelihoodBusiness/index.js
var app = getApp()
const { riderScore, exitOrg, riderVehicleList, riderLoss, riderBingCorp } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    permissions: [],
    currentStatus: 'none', // auditing:审核中 failure:审核失败、waitInstall:待安装 registered:已登记、reportedLost:已报失、scrapped:已报废
    bindingDialogVisible: false, // 绑定企业车弹框
    brandNumVisible: false, // 显示车牌的弹框
    isOutCorpVisible: false, // 退出企业确认框
    lossVisible: false,
    brandNum: '',
    scoreInfo: {}, // 积分信息
    opList: [
      {
        label: '备案申报',
        icon: '/pages/image/record.png',
        clickEvent: 'goToRecord',
        pageFlag: 'record',
        permission: '0103020000',
        status: ['auditing', 'failure', 'waitInstall', 'registered', 'reportedLost', 'none']
      }, {
        label: '扫码',
        icon: '/pages/image/scan_big1.png',
        clickEvent: 'scanBrandCode',
        pageFlag: 'scan',
        permission: '',
        status: ['auditing', 'failure', 'waitInstall', 'registered', 'reportedLost', 'none']
      }, {
        label: '绑定企业车',
        icon: '/pages/image/bindcorp.png',
        clickEvent: 'bindingMenu',
        permission: '0103030000',
        pageFlag: 'binding',
        status: ['auditing', 'failure', 'waitInstall', 'registered', 'reportedLost', 'none']
      }, {
        label: '一键报失',
        icon: '/pages/image/baoshi.png',
        clickEvent: 'routeTo',
        pageFlag: 'loss',
        permission: '0103090000',
        status: ['registered']
      }, {
        label: '一键报废',
        icon: '/pages/image/baofei.png',
        clickEvent: 'routeTo',
        pageFlag: 'scrap',
        permission: '0103100000',
        status: ['registered', 'reportedLost']
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mySwiper = this.selectComponent('#mySwiper')
    this.getRiderScore()
    app.mapPermissions(this)
  },
  // 获取积分信息
  async getRiderScore () {
    let { result } = await riderScore()
    if (result) {
      this.setData({
        scoreInfo: result
      })
    }
  },
  // 去备案申报
  goToRecord () {
    wx.navigateTo({
      url: './recordSelect',
    })
  },
  // 跳转到相关页面
  async routeTo (e) {
    let { page } = e.currentTarget.dataset
    let route = `/pages/user/${page}/${page}?pageFlag=livelihoodBusiness`
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
  // 一键报失
  async lossOp () {
    let { result } = await riderLoss(app.globalData.currentVehicleId)
    if (result) {
      this.mySwiper.getList()
    }
  },
  // 切换swiper
  swiperChange (e) {
    this.setData({
      currentStatus: e.detail.vehicleStatus
    })
  },
  // 点击退出企业按钮
  outCorpBtn () {
    this.setData({
      isOutCorpVisible: true
    })
  },
  // 退出企业操作
  async outCorpOp () {
    let { result } = await exitOrg(this.data.scoreInfo.orgId)
    if (result) {
      wx.showToast({
        title: '退出成功!'
      })
      this.setData({
        'scoreInfo.orgName': ''
      })
      this.mySwiper.getList()
    }
  },
  // 绑定企业车按钮
  bindingMenu () {
    this.setData({
      bindingDialogVisible: true
    })
  },
  // 扫描二维码
  scanBrandCode () {
    encodeURIComponent
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: _res => {
        let str = _res.result
        let plateNo = ''
        if (str.indexOf('?') > 0) {
          let strParams = str.split('?')[1]
          plateNo = decodeURIComponent(app.utils.getUrlSearch(strParams, 'plateNo'))
        }
        this.setData({
          bindingDialogVisible: false,
          brandNum: plateNo,
          brandNumVisible: true
        })
      },
      fail: _ => {
        wx.showToast({
          title: '扫码失败',
          icon: 'error'
        })
      }
    })
  },
  // 绑定企业车api
  async bindCorpVechicel () {
    let { result } = await riderBingCorp(this.data.brandNum)
    if (result) {
      wx.showToast({
        title: '绑定成功!',
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