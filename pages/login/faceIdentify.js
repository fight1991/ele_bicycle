// pages/login/faceIdentify.js
import WxValidate from '../../utils/WxValidate'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    validate: null,
    formData: {
      name: '',
      idcard: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initValidate()
  },
  // 表单绑定
  bindData (e) {
    let id = e.currentTarget.id
    this.data.formData[id] = e.detail.value
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
 
    var temp = {
      detail: {
        value: this.data.formData
      }
    }
    let {validate, formData} = this.data
    var temp = {
      detail: {
        value: formData
      }
    }
    // checkform参数 要是form事件对象
    let isPass = validate.checkForm(temp)
    if (!isPass) {
      let error = validate.errorList[0]
      this.showModal(error)
      return
    }
    // 调用人脸识别接口
  },
  // 初始化验证方法
  initValidate () {
    let rules = {
      name: {
        required: true
      },
      idcard: {
        required: true,
        idcard: true
      }
    }
    let messages = {
      name: {
        required: '请填写姓名'
      },
      idcard: {
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