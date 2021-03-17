// pages/user/personalBusiness/index.js
import { car_owner_change_scan, car_loss_op } from '../../api/record'
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
  routeTo () {
    wx.navigateTo({
      url: '/pages/user/record/index',
    })
  },
  // 跳转到备案人变更页面
  routeToChange () {
    wx.navigateTo({
      url: '/pages/user/record_change/record_change',
    })
  },
  // 
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
            this.recordChange(tempStr[0])
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
    let { result } = await car_owner_change_scan({
      qrcodeValidityToken: token
    })
    console.log(result, '扫描备案人变更得二维码')
  },
  // 跳转到一键报失页面
  async routeToLoss () {
    let { result } = await car_loss_op()
    if (result) {
      let status = result.status
      if (status == 23) {
        wx.navigateTo({
          url: '/pages/user/loss/loss',
        })
      } else {
        wx.showToast({
          title: '没有报失数据',
          icon: 'none'
        })
      }
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