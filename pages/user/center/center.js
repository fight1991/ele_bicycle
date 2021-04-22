// pages/user/center/center.js
var app = getApp()
const { logOut, show_idcard } = app.api
Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    currentMode: 'hide',
    userInfo: {
      show: { // 显示的信息
        idNO: '',
        mobile: ''
      },
      hide: { // 隐藏的信息
        idNO: '',
        mobile: ''
      }
    },
    wxUserImg: app.static_user_logo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var { idNO, mobile, idName } = app.globalData.businessUserInfo
    this.setData({
      'userInfo.show': {
        idNO: idNO || '',
        mobile: mobile || ''
      },
      name: idName || ''
    })
    this.getPartInfo()
  },
  async showText (e) {
    var mode = this.data.currentMode
    this.setData({
      currentMode: mode == 'hide' ? 'show' : 'hide'
    })
  },
  // 跳转到更换手机号页面
  goToPage () {
    wx.navigateTo({
      url: '/pages/user/center/editPhone',
    })
  },
  // 得到显示的身份证号信息
  async getPartInfo () {
    let { result } = await show_idcard()
    if (result) {
      this.setData({
        'userInfo.hide': {
          idNO: result.idNO || '',
          mobile: result.mobile || ''
        }
      })
    }
  },
  // 用户退出
  loginOut () {
    wx.showModal({
      title: '温馨提示',
      content: '您确定要退出登录吗?',
      success: async (res) => {
        if (res.confirm) {
          let { result } = await logOut()
          if (result) {
            wx.showToast({
              title: '退出成功!',
              duration: 1500,
              success: () => {
                wx.reLaunch({
                  url: '/pages/login/signIn',
                })
                wx.removeStorageSync('token')
              }
            })
          }
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