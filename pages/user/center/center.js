// pages/user/center/center.js
const utils = require('../../../utils/util')
import { logOut } from '../../api/index'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    isShowNum: false,
    idcard: '',
    phone: 13348404848,
    trueIdcard: '',
    truePhone: '',
    wxUserImg: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { wxHeadImg, userInfo, mobile } = app.globalData
    this.setData({
      wxUserImg: wxHeadImg || null,
      name: userInfo.personalIDName,
      trueIdcard: userInfo.personalIDNo
    })

  },

  showText (e) {
    var { idcard, phone } = this.data
    var temp = e.detail
    
  },
  // 跳转到更换手机号页面
  goToPage () {
    wx.navigateTo({
      url: '/pages/user/center/editPhone',
    })
  },
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