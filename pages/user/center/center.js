// pages/user/center/center.js
import { logOut, show_idcard } from '../../api/index'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    isShowNum: false,
    idcard: '', // 存放隐藏的省份证信息
    mobile: '', // 存放隐藏的手机号
    trueIdcard: '',
    truePhone: '',
    tempIdcard: '', // 存放显示身份证信息
    tempPhone: '', // 存放显示的手机号
    wxUserImg: app.static_user_logo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { wxHeadImg, userInfo } = app.globalData
    this.data.idcard = userInfo.idcard
    this.data.mobile = userInfo.mobile
    if (wxHeadImg) {
      this.setData({
        wxUserImg: wxHeadImg
      })
    }
    this.setData({
      name: userInfo.name,
      trueIdcard: userInfo.idcard,
      truePhone: userInfo.mobile
    })
  },
  async showText (e) {
    var { tempIdcard, tempPhone, idcard, mobile } = this.data
    var isShow = e.detail
    console.log(isShow)
    if (isShow) {
      if (tempIdcard) {
        this.setData({
          trueIdcard: tempIdcard,
          truePhone: tempPhone
        })
        return
      }
      let temp = await this.getPartInfo()
      if (temp) {
        this.data.tempIdcard = temp.idNO
        this.data.tempPhone = temp.mobile
        this.setData({
          trueIdcard: temp.idNO,
          truePhone: temp.mobile
        })
      }
    } else {
      this.setData({
        trueIdcard: idcard,
        truePhone: mobile
      })
    }
    
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
      return { idNO: result.idNO, mobile: result.mobile }
    } else {
      return ''
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