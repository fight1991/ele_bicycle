// pages/user/scrap/scrap.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stepList: ['报废申请', '等待审核'],
    currentStep: 0,
    textNum: 140,
    initNum: 140,
    formData: {
      reason: '',
      vehicleImage: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.busImg = this.selectComponent('#busImg')
  },
  // 获取图片地址
  getBusImg (res) {
    this.data.formData.vehicleImage = res.detail
  },
  // 初始化图片信息
  initImgInfo (url) {
    this.busImg.setData({
      imgSrc: url,
      uploadBg: false
    })
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