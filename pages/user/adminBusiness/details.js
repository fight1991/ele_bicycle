// pages/user/adminBusiness/details.js
import { install_report } from '../../api/record'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    file1: null,
    file2: null,
    formData: {
      plateNo: '', // 车牌号码
      urlVehicle: '', // 整车照片
      urlVin: '', // 车架照片
      vin: '', // 车架号
      vehicleId: '' // 车辆id
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { vin, vehicleId } = options
    this.setData({
      'formData.vin': encodeURIComponent(vin),
      'formData.vehicleId': vehicleId
    })
  },
  scanBtn (e) {
    var flag = e.currentTarget.dataset.flag
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        this.setData({
          ['formData.' + flag]: res.result
        })
      }
    })
  },
  // 获取到车架图片信息
  getUpladImgInfo (e) {
    this.data.formData.urlVin = e.detail
  },
  // 获取整车图片信息
  getTotalImgInfo (e) {
    this.data.formData.urlVehicle = e.detail
  },
  showToast (title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1500
    })
  },
  // 表单校验
  formValid () {
    let { plateNo, urlVehicle, urlVin, vin } = this.data.formData
    if (!plateNo) {
      this.showToast('请扫描车牌号码')
      return false
    }
    if (!vin) {
      this.showToast('请扫描整车编号')
      return false
    }
    if (!urlVin) {
      this.showToast('请上传车架照片')
      return false
    }
    if (!urlVehicle) {
      this.showToast('请上传整车照片')
      return false
    }
    return true
  },
  // 提交按钮
  async submitBtn () {
    // 1.校验信息是否填写,
    // 2.请求接口
    var isPass = this.formValid()
    if (!isPass) return
    let { result } = await install_report(this.data.formData)
    if (result) {
      wx.showToast({
        title: '提交成功',
        duration: 2000,
        success: _ => {
          wx.navigateBack({
            delta: 2,
          })
        }
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