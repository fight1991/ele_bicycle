// pages/user/adminBusiness/details.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand: '',
    car: '',
    file1: null,
    file2: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  scanBtn (e) {
    var flag = e.currentTarget.dataset.flag
    wx.scanCode({
      onlyFromCamera: true,
      success: res => {
        this.setData({
          [flag]: res.result
        })
      }
    })
  },
  // 获取到车架图片信息
  getUpladImgInfo (e) {
    console.log(e)
    this.data.file1 = e
  },
  // 获取整车图片信息
  getTotalImgInfo (e) {
    console.log(e)
    this.data.file2 = e
  },
  showToast (title) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: 1500
    })
  },
  // 提交按钮
  submitBtn () {
    // 1.校验信息是否填写,
    // 2. 请求接口
    let { brand, car, file1, file2 } = this.data
    if (!brand) {
      this.showToast('请扫描车牌号码')
      return
    }
    if (!car) {
      this.showToast('请扫描整车编号')
      return
    }
    if (!file1) {
      this.showToast('请上传车架照片')
      return
    }
    if (!file2) {
      this.showToast('请上传整车照片')
      return
    }
    wx.navigateBack({
      delta: 2,
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