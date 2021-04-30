// pages/user/livelihoodBusiness_corp/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opList: [
      {
        label: '企业车申报',
        icon: '/pages/image/record.png',
        clickEvent: 'goToRecord',
        pageFlag: 'corpRecord'
      }, {
        label: '企业车管理',
        icon: '/pages/image/peopleChange.png',
        clickEvent: 'bindingMenu',
        pageFlag: 'corpManage'
      }, {
        label: '骑手管理',
        icon: '/pages/image/baoshi.png',
        clickEvent: 'riderManage',
        pageFlag: 'riderManage'
      }, {
        label: '申请单',
        icon: '/pages/image/baofei.png',
        clickEvent: 'routeTo',
        pageFlag: 'putMenu'
      }, {
        label: '审核单',
        icon: '/pages/image/baofei.png',
        clickEvent: 'routeTo',
        pageFlag: 'checkMenu'
      }, {
        label: '扫码',
        icon: '/pages/image/scan_big1.png',
        clickEvent: 'scanCode',
        pageFlag: 'scan'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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