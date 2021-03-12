// pages/user/record_change/record_change.js
import { 
  car_owner_change_status,
  car_owner_change_scan,
  car_owner_change_cancel
} from '../../api/record'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStep: 0,
    qrcodeText: '',
    checkStatus: 41,
    stepList: ['变更申请', '等待审核'],
    statusText: {
      '41': '您的变更申请审核中，请耐心等待',
    },
    statusImg: {
      '41': '/pages/image/check-ing.png'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.createQrcodeData()
  },
  // 生成二维码
  createQrcodeData () {
    let token = wx.getStorageSync('token')
    this.setData({
      qrcodeText: token
    })
  },
  // 返回个人中心
  backToCenter () {
    wx.reLaunch({
      url: '/pages/user/index',
    })
  },
  // 取消申请
  cancelBtn () {

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