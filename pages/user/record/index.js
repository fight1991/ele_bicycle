// pages/user/record/index.js
import {record_status} from '../../api/record'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showStep: true, // 是否显示进度条
    currentStep: 0, // 当前操作步骤
    maskIsHidden: true, // 蒙层是否隐藏
    stepList: ['完善个人信息', '完善车辆信息', '等待审核'],
    checkStatus: 13,
    failReason: '', // 审核失败原因
    qrcodeInfo: '',
    statusText: {
      '13': '您的备案申请审核中，请耐心等待',
      '14': '审核失败',
      '15': '您的备案申报审核已经通过,请等待快递员送上车牌并完成安装,安装时展示如下安装码',
      '16': '您的备案申报审核已经通过,可去以下安装点完成车牌安装,安装时向安装人员展示如下安装码'
    },
    statusImg: {
      '13': '/pages/image/check-ing.png',
      '14': '/pages/image/check-fail.png',
      '15': '/pages/image/check-success.png',
      '16': '/pages/image/check-success.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.busInfoComponent = this.selectComponent('#busInfo')
    this.personInfoComponent = this.selectComponent('#personInfo')
    // 1. 进入页面 先查看当前备案状态
    this.getCheckStatus()
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
            console.log('从相册中选择图片----------')
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
  // 控制状态条进度
  progressStatus () {
    var stepNum = this.data.currentStep
    stepNum++
    if (stepNum > 2) return
    this.setData({
      currentStep: stepNum
    })
  },
  // 审核状态查询
  async getCheckStatus () {
    let { result } = await record_status()
    if (result) {
      let { status } = result
      this.setData({
        checkStatus: result.status,
        failReason: result.failReason
      })
      this.getCurrentStepByStatus(status)
    }
  },
  // 根据状态判断信息录入到哪个步骤
  // 11:完善个人信息 第1步、12:完善个人信息 第2步 13: 完善车辆信息 等待审核、14:审核失败，重新备案、15:审核通过，邮寄车牌、16:审核通过，安装点安装车牌
  getCurrentStepByStatus (status) {
    switch (status) {
      case 0: // 填写个人信息
        this.setData({
          currentStep: 0,
          showStep: true,
          maskIsHidden: false
        })
        return
      case 11: // 完善个人信息 第1步已完成 第2步显示
        this.setData({
          currentStep: 0,
          showStep: true,
          maskIsHidden: true
        })
        // 查询数据回显
        this.personInfoComponent.getSomeImgInfo()
        return
      case 12: // 完善个人信息 第2步已完成, 车辆信息显示
        this.setData({
          currentStep: 1,
          showStep: true,
          maskIsHidden: true
        })
        return
      case 13: // 完善车辆信息已完成, 等待审核显示
        this.setData({
          currentStep: 2,
          showStep: true,
          maskIsHidden: true
        })
        return
      case 15: // 审核通过，邮寄车牌
      case 16: // 审核通过，安装点安装车牌
      var vin = this.busInfoComponent.data.busInfo.vin
      this.setData({
        qrcodeInfo: vin,
        currentStep: 2,
        showStep: false,
        maskIsHidden: true
      })
      return
    }
  },
  // 去个人信息录入页面
  goToEdit () {
    this.setData({
      currentStep: 0,
      showStep: true
    })
  },
  routeToPage () {
    wx.reLaunch({
      url: '/pages/user/index',
    })
  },
  // 关闭已阅读蒙层
  closeAgreeModal () {
    this.setData({
      maskIsHidden: true
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