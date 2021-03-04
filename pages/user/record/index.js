// pages/user/record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStep: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击拍摄人脸按钮
  faceBtn () {
    this.choosePhoto('camera', (res) => {
      const tempFilePaths = res.tempFilePaths
        // 存储照片信息
    })
  },
  // 点击身份证按钮
  idcartBtn () {
    wx.showActionSheet({
      itemList: ['拍照','从相册中选择'],
      success: (res) => {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          this.choosePhoto('camera', (res) => {
            console.log(res)
          })
        }
        if (res.tapIndex == 1) {
          this.choosePhoto('album', (res) => {
            console.log(res)
          })
        }
      }
    })
  },
   // 打开相册或摄像头
   choosePhoto (type, callback) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        callback && callback(res)
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