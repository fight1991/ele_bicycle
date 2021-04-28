// pages/user/livelihoodBusiness/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStatus: 'none', // auditing:审核中 failure:审核失败、waitInstall:待安装 registered:已登记、reportedLost:已报失、scrapped:已报废
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
        clickEvent: 'routeTo',
        pageFlag: 'record_change',
        permission: [ 'none']
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