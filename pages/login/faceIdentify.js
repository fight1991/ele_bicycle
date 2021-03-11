// pages/login/faceIdentify.js
import WxValidate from '../../utils/WxValidate'
import { personal_add } from '../api/record'
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wxImg: '',
    validate: null,
    idName: '', // 姓名
    idNO: '' // 身份证
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.wxHeadImg) {
      this.setData({
        wxImg: app.globalData.wxHeadImg
      })
    }
    this.initValidate()

  },
  showModal(error) {
    wx.showToast({
      title: error.msg,
      icon: 'none',
      duration: 1500
    })
  },
  // 点击人脸识别按钮
  startFaceIdentify () {
    let {validate, idNO, idName} = this.data
    var temp = {
      detail: {
        value: {
          idNO,
          idName
        }
      }
    }
    // checkform参数 要是form事件对象,故包装一下
    let isPass = validate.checkForm(temp)
    if (!isPass) {
      let error = validate.errorList[0]
      this.showModal(error)
      return
    }
    // 调用人脸识别接口
    wx.startFacialRecognitionVerify({
      name: idName,
      idCardNumber: idNO,
      success: this.faceVerifySuccess,
      fail: this.faceVerifyFail
    })
  },
  // 人脸识别成功, 跳转到首页个人中心/pages/user/index
  async faceVerifySuccess (res) {
    // let {result} = await wx.$post({
    //   url: '',
    //   data: {
    //     this.data.idNO,
    //     this.data.idName,
    //     verifyResult: res.verifyResult
    //   }
    // })
    // if (result) {}
  },
  // 人脸验证成功后
  async savePersonalInfo () {
    let { idNO, idName } = this.data
    let { result } = await personal_add({
      idNO,
      idName,
      jsCode: app.globalData.jsCode
    })
    if (result) {
      app.globalData.userInfo.idcard = idNO
      this.routeToSignIn()
    }
  },
  // 跳转到登录页
  routeToSignIn () {
    wx.reLaunch({
      url: '/pages/login/signIn'
    })
  },
  // 人脸识别失败
  faceVerifyFail (res) {
    wx.showModal({
      title: '提示',
      showCancel: false,
      content: `人脸识别失败,${res.errMsg}`,
      success: (res) => {
        if (res.confirm) {
          // wx.navigateBack()
        }
      }
    })
  },
  // 初始化验证方法
  initValidate () {
    let rules = {
      idName: {
        required: true
      },
      idNO: {
        required: true,
        idcard: true
      }
    }
    let messages = {
      idName: {
        required: '请填写姓名'
      },
      idNO: {
        required: '请填写身份证号码',
        idcard: '请填写正确的身份证号'
      }
    }
    this.data.validate = new WxValidate(rules, messages)
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