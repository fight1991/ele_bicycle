// pages/user/record/record.js
var app = getApp()
const { carInfo_detail, record_status } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opType: 'add', // 页面操作类型
    showStep: true, // 是否显示进度条
    currentStep: 1, // 当前操作步骤
    maskIsHidden: true, // 蒙层是否隐藏
    stepList: ['完善车辆信息', '等待审核'],
    checkStatus: 'auditing', // auditing:备案审查 failure:备案审核失败 waitInstall:待安装 success:审核成功
    failReason: '', // 审核失败原因
    qrcodeInfo: '',
    statusText: {
      'auditing': '您的备案申请审核中，请耐心等待',
      'failure': '审核失败',
      'waitInstall': '您的备案申报审核已经通过',
      'success': '审核成功'
    },
    // INSTALLATION MAIL
    statusImg: {
      'auditing': '/pages/image/check-ing.png',
      'failure': '/pages/image/check-fail.png',
      'waitInstall': '/pages/image/check-success.png',
      'success': '/pages/image/check-success.png'
    },
    id: '', // 车辆id
    installType: 'MAIL', // 安装方式
    vin: '' // 编号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { opType, id, installType, vin } = options
    this.busInfoComponent = this.selectComponent('#busInfo')
    if (opType == 'edit' || opType == 'look') {
      this.data.id = id
      this.data.vin = vin
      this.setData({
        installType
      })
    }
    // 备案编辑
    if (opType == 'edit') {
      this.busInfoComponent.initInfo(id)
    }
    // 查看车辆状态
    if (opType == 'look') {
      this.getCheckStatus(id)
    }
  },
  // 控制状态条进度
  progressStatus (e) {
    this.setData({
      currentStep: 1
    })
  },
  // 审核状态查询
  async getCheckStatus (id) {
    let { result } = await record_status(id)
    if (result) {
      this.getCurrentStepByStatus(result)
    }
  },
  // 根据状态判断信息录入到哪个步骤
  getCurrentStepByStatus (result) {
    this.setData({
      checkStatus: result.status,
      failReason: result.failReason || ''
    })
    let status = result.status
    switch (status) {
      case 'auditing': // 完善车辆信息已完成, 等待审核显示
        this.setData({
          currentStep: 1,
          showStep: true,
          maskIsHidden: true
        })
        return
      case 'failure': // 审核失败, 重新备案
        this.setData({
          currentStep: 3,
          showStep: false,
          maskIsHidden: true
        })
        wx.redirectTo({
          url: `/pages/user/result/result?pageFlag=record&pageTitle=备案申报&reason=${result.failReason}&status=${'fail'}`,
        })
        return
      case 'waitInstall': // 审核通过，邮寄车牌, 安装点安装车牌
      let { vin, id } = this.data
      this.setData({
        currentStep: 1,
        qrcodeInfo: `?vin=${vin}&vehicleId=${id}`,
        showStep: false,
        maskIsHidden: true
      })
      return
      case 'success':
        this.setData({
          currentStep: 3,
          showStep: false,
          maskIsHidden: true
        })
        wx.redirectTo({
          url: `/pages/user/result/result?pageFlag=record&pageTitle=备案申报&status=success`,
        })
      return
    }
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
    this.delayTimer && clearTimeout(this.delayTimer)
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