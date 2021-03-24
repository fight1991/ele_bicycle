// pages/user/personalBusiness/index.js
import {
  car_owner_change_scan, // 扫码
  record_status, // 备案申报状态查询
  car_loss_op, // 车辆挂失
  car_owner_change_status, // 备案人变更状态查询
  car_loss_search, // 一键报失状态查询
  car_scrap_search // 一键报废状态查询
} from '../../api/record'
var pageApi = {
  record: record_status,
  record_change: car_owner_change_status,
  loss: car_loss_search,
  scrap: car_scrap_search
}
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 跳转到相关页面
  async routeTo (e) {
    let { page } = e.currentTarget.dataset
    // 查询相应的状态
    let tempApi = pageApi[page]
    let route = `/pages/user/${page}/${page}`
    if (!tempApi) {
      wx.navigateTo({
        url: route
      })
      return
    }
    let { result } = await tempApi()
    if (result) {
      let { failReason, status, invoiceAuditingNum = 0, qrcodeValidityToken = '', vehicleImage = '' } = result
      let paramsStr = `?failReason=${failReason}&status=${status}&invoiceAuditingNum=${invoiceAuditingNum}&qrcodeValidityToken=${qrcodeValidityToken}&vehicleImage=${vehicleImage}`
      if (page == 'loss') {
        // 一键报失操作逻辑, 如果状态为0, 说明没有报失,弹框, 则调用报失的接口, 否则直接进入页面
        if (status == 0) {
          this.openLossConfirmMmodal()
        } else {
          this.routeToLoss(paramsStr)
        }
      } else {
        wx.navigateTo({
          url: route + paramsStr
        })
      }
    }
  },
  // 扫码
  scanCode () {
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: _res => {
        console.log(_res, '扫码结果')
        let res = _res.result
        if (res.includes('http')) { // 说明是个链接
          // 跳转到web-view页面
          wx.navigateTo({
            url: '/pages/user/scanCode/scanCode?url=' + res,
          })
        } else if (res.includes('&change')){ // 说明扫的是备案人变更的二维码
          let tempArr = res.split('&')
          let tempStr = tempArr[1]
          if (tempStr && tempStr == 'change') {
            this.recordChange(tempArr[0])
          }
        } else {
          wx.showToast({
            title: '无效的二维码',
            icon: 'error',
            duration: 2000
          })
        }
      }
    })
  },
  // 车辆备案人变更扫码
  async recordChange (token) {
    let { result, other } = await car_owner_change_scan({
      qrcodeValidityToken: token
    })
    console.log(other, '业务报错.....')
    console.log(result, '扫码完成..............')
    if (result) {
      console.log('弹框进来了, 888888888888888888888')
      wx.showToast({
        title: '操作成功!',
      })
    }
  },
  // 车辆挂失api
  async carLossApi (paramsStr) {
    let { result } = await car_loss_op()
    if (result) {
      this.routeToLoss(paramsStr)
    }
  },
  // 跳转到一键报失页面
  routeToLoss (paramsStr = '') {
    wx.navigateTo({
      url: '/pages/user/loss/loss' + paramsStr,
    })
  },
  // 打开一键报失弹框
  async openLossConfirmMmodal () {
    wx.showModal({
      title: '提示',
      content: '您确定要报失吗?',
      success: async res => {
        if (res.confirm) {
          this.carLossApi()
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