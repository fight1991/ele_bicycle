// pages/user/record/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentStep: 1, // 当前操作步骤

    // 占位图片是否显示
    faceShow: true,
		frontShow: true,
    backShow: true,

    // 图片临时路径
    faceSrc: '',
		frontSrc: '',
    backSrc: '',

    // 图片源数据
    faceImageData: null,
    frontImageData: null,
    backImageData: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  // 点击拍摄人脸按钮
  faceBtn () {
    wx.navigateTo({
			url: '/pages/user/camera/index?mode=face',
		})
    // this.choosePhoto('camera', (res) => {
    //   const tempFilePaths = res.tempFilePaths
    //     // 存储照片信息
    // })
  },
  // 点击身份证按钮
  idcartBtn (e) {
    // mode=front 为身份证正面, mode=back为身份证反面
    var mode = e.currentTarget.dataset.mode
    console.log(mode, '2222222222222')
    wx.showActionSheet({
      itemList: ['拍照','从相册中选择'],
      success: (res) => {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) {
          wx.navigateTo({
            url: '/pages/user/camera/index?mode=' + mode,
          })
        }
        if (res.tapIndex == 1) {
          this.choosePhoto('album', (res) => {
            console.log('----------')
            console.log(res)
            this.setData({
              [mode + 'Src']: res.tempFilePaths[0],
              [mode + 'Show']: false
            })
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
  // 下一步
  nextStep () {
    var stepNum = this.data.currentStep
    stepNum++
    if (stepNum > 3) return
    this.setData({
      currentStep: stepNum
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