
Page({

  /**
   * 页面的初始数据
  */

  data: {
    mode: 'face', // face人像, front身份证正面, back身份证反面
    src: '', // 拍照后图像路径(临时路径)
    show: false, // 相机视图显示隐藏标识
    devicePosition: 'back', // 前置摄像头front 后置为back
  },



  // 取消/重新拍照按钮
  cancelBtn() {
    this.setData({//更新数据
      show: false
    })
  },
  // 点击拍照按钮
  takePhoto() {
    // 创建camera上下文CameraContext对象
    const ctx = wx.createCameraContext()

    // 获取camera实时帧数据
    const listener = ctx.onCameraFrame((frame) => {
      //如果不需要则注释掉
    })

    // 实拍照片配置
    ctx.takePhoto({
      quality: 'high', // 成像质量
      success: (res) => { // 成功回调
        this.setData({
          src: res.tempImagePath, // tempImagePath为api返回的照片路径
          show: true
        })
      },
      fail: (error) => { // 失败回调
        //友好提示...
      }
    })
  },

  // 保存图片/更改主页数据(用户最终点击确定按钮√)
  saveImg () {
    // 获取所有页面栈
    let pages = getCurrentPages()
    // 当前页面-flag
    var currentPage = '';
    // 上一页-flag
    var prevPage = '';
    // 如果长度大于等于2
    if(pages.length >= 2){//则对上面定义的flag赋值
      // 当前页
      currentPage = pages[pages.length - 1];
      // 上一页
      prevPage = pages[pages.length - 2];
    }
    // 刷新上一页(也就是主页面)数据-包含图片路径及标识
    if(prevPage) {
      // 获取当前图片路径(用户拍下的照片)
      var src = currentPage.data.src;
      var tempMode = this.data.mode
      prevPage.setData({
        [tempMode + 'Show']: false, // 显示图片
        [tempMode + 'Src']: src // 照片路径
      })
   }

    // 最后返回上一页(也就是主页)
    wx.navigateBack({
        delta: 1,
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取拍照模式 // 人像默认打开前置镜头
    let mode = options.mode
    console.log(mode)
    this.setData({
      mode: mode,
      devicePosition: mode == 'face' ? 'front' : 'back'
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