// pages/user/idcardVerify/idcardVerify.js
var app = getApp()
const { verifyPersonApi } = app.api

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 人像占位图片是否显示
    faceShow: true,
    // 人像图片临时路径
    faceSrc: '',
    // 图片上传到服务器之后的地址
    faceImgUrl: '',

    frontImgUrl: null,
    backImgUrl: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.initInfo()
  },
   // 数据初始化查询
   async initInfo () {
    let { result } = await personal_search()
    if (result) {
      let { imageHead, imageIDCard1, imageIDCard2 } = result
      if (imageHead) {
        this.setData({
          faceImgUrl: imageHead,
          frontImgUrl: imageIDCard1,
          backImgUrl: imageIDCard2,
          faceShow: false,
        })
      }
    }
  },
  // 点击拍摄人脸按钮
  faceBtn () {
    // 先查看用户是否开启了摄像头权限
    wx.showLoading({title: '权限检测中'})
    wx.getSetting({
      success: res => {
        console.log(res)
        if (!res.authSetting['scope.camera']) {
          // 如果用户拒绝授权后，短期内调用不会出现弹窗而是直接进入 fail 回调
          // 手机端删除小程序后重新添加 就可以再次唤醒弹窗
          wx.hideLoading()
          wx.authorize({
            scope: 'scope.camera',
            success: () => {
              // 用户已经同意小程序使用camera
              wx.navigateTo({
                url: '/pages/user/camera/front',
              })
            },
            fail: res => {
              wx.navigateTo({
                url: '/pages/setting/setting',
              })
            }
          })
        } else {
          wx.hideLoading()
          wx.navigateTo({
            url: '/pages/user/camera/front',
          })
        }
      }
    })
    // wx.navigateTo({
    //   url: '/pages/user/camera/front',
    // })
    // this.choosePhoto('camera', (res) => {
    //   const tempFilePaths = res.tempFilePaths
    //     // 存储照片信息
    // })
  },
  // 下一步的按钮
  async nextStep () {
    var isPass = this.nextIsPass()
    if (!isPass) return
    // 保存图片
    let { faceImgUrl, frontImgUrl, backImgUrl } = this.data
    let { result } = await verifyPersonApi({
      imageHead: faceImgUrl,
      imageIDCard1: frontImgUrl,
      imageIDCard2: backImgUrl
    })
    // 图片保存成功, 显示表单, 并查询识别后的信息
    if (!result) return
    wx.navigateTo({
      url: './livingVerify',
    })
  },
  // 表单校验
  nextIsPass () {
    var title = ''
    let { faceImgUrl, frontImgUrl, backImgUrl } = this.data
    if (!faceImgUrl) {
      title = '请上传人脸照片'
    } else if (!frontImgUrl) {
      title = '请上传身份证正面照片'
    } else {
      title = '请上传身份证反面照片'
    }
    let valid = faceImgUrl && frontImgUrl && backImgUrl
    if (!valid){
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 1500
      })
    }
    return valid
  },
  // 表单方法区域
  bindData (e) {
    var id = e.currentTarget.id
    this.data.personData[id] = e.detail.value
  },
  // 校验表单
  validForm () {
    let { personData: {contactAddress, cityCode} } = this.data
    var flag1 = Array.isArray(cityCode) && cityCode.length
    if (!flag1) {
      wx.showToast({
        title: '请选择联系地址',
        icon: 'none'
      })
      return false
    }
    if (!contactAddress) {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none'
      })
      return false
    }
    return true
  },
  // 省市区事件
  getAddressInfo (e) {
    console.log(e)
    var { code, value } = e.detail
    this.data.personData.cityCode = code
    this.data.personData.cityCodeIndex = value
    this.setData({
      region: value
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