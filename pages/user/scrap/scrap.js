// pages/user/scrap/scrap.js
import { car_scrap_search, car_scrap_op, car_scrap_cancel } from '../../api/record'
var utils = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stepList: ['报废申请', '等待审核'],
    currentStep: 0,
    invoiceAuditingNum: 0,
    textNum: 140,
    initNum: 140,
    formData: {
      reason: '',
      vehicleImage: '',
    },
    imgInfo: {
      '31': '/pages/image/check-ing.png',
      '32': '/pages/image/check-fail.png'
    },
    failReason: '',
    status: 0, // 2:取消、31:报废(审核中)、32:报废审核拒绝、33:报废成功
    imgSrc: '' // 绑定组件upload中的imgSrc的值, 注意只能单层绑定
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 点击一键报废按钮带过来的
    let { status } = options
    if (!utils.isNull(status)) {
      this.handleStatus(options)
    } else {
      this.getStatus()
    }
  },
  // 初始化图片信息
  initImgInfo (url) {
    this.setData({
      imgSrc: url
    })
  },
  // 车辆状态查询
  async getStatus () {
    let { result } = await car_scrap_search()
    this.handleStatus(result)
  },
  // 处理状态分支
  handleStatus (result) {
    if (result) {
      let status = result.status
      this.setData(result)
      if (status == 0) {
        this.setData({
          currentStep: 0,
        })
        this.initImgInfo(result.vehicleImage)
      } else if (status == 31) {
        this.setData({
          currentStep: 1
        })
      } else {
        // 32 或 33 失败/成功
        wx.navigateTo({
          url: `/pages/user/record_change/other_status?pageTitle=一键报废&status=${status}&reason=${result.reason}`,
        })
      }
    }
  },
  // 取消申请
  async cancelBtn () {
    let { result } = await car_scrap_cancel({
      status: 2
    })
    if (result) {
      wx.showToast({
        title: '取消成功',
        duration: 1500,
        success: _ => {
          this.backCenter()
        }
      })
    }
  },
  backCenter () {
    wx.reLaunch({
      url: '/pages/user/index',
    })
  },
  // 表单按钮
  async submitBtn () {
    // 表单内容校验
    let isPass = this.formValid()
    if (!isPass) return
    // 判断审核单数量是否>0, 则提示
    var tempNum = this.data.invoiceAuditingNum
    if (tempNum > 0) {
      utils.openConfirm({
        content: `当前已有${tempNum}个审核单，本次审核通过后会自动结束其他审核单，是否继续？`,
        confirm: () => {
          this.submitForm()
        }
      })
    } else {
      this.submitForm()
    }
  },
  // 表单提交
  submitForm () {
    this.data.formData.vehicleImage = this.data.imgSrc
    let { result } = await car_scrap_op(this.data.formData)
    if (result) {
      this.setData({
        currentStep: 1
      })
    }
  },
  // 表单校验
  formValid () {
    let { reason } = this.data.formData
    if (!reason.trim()) {
      wx.showToast({
        title: '请填写原因',
        icon: 'none'
      })
      return false
    }
    if (!this.data.imgSrc) {
      wx.showToast({
        title: '请上传车辆图片',
        icon: 'none'
      })
      return false
    }
    return true
  },
  // 表单数据绑定
  bindData (e) {
    var id = e.currentTarget.id
    this.data.formData[id] = e.detail.value
    var tempNum = this.data.initNum - e.detail.value.length
    this.setData({
      textNum: tempNum < 0 ? 0 : tempNum
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