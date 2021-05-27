var app = getApp()
const { record_status, riderVehicleUpdate, riderBrandList, orgInfo } = app.api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    opType: 'add', // 页面操作类型
    mode: 'new',
    pageFlag: 'rider', // 骑手版、企业版
    showStep: true, // 是否显示进度条
    currentStep: 0, // 当前操作步骤
    maskIsHidden: true, // 蒙层是否隐藏
    stepList: ['完善车辆信息', '绑定企业', '等待审核'],
    checkStatus: 'auditing', // auditing:备案审查 failure:备案审核失败 waitInstall:待安装 success:审核成功
    qrcodeInfo: '',
    brandList: [],
    brandIndex: '',
    id: '', // 车辆id
    installType: 'MAIL', // 安装方式
    vin: '', // 编号
    isBinding: false, // 是否绑定了企业
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { opType, id, installType, vin, mode } = options
    if (mode) {
      this.setData({
        mode
      })
      this.getOldBrandList()
    }
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
  async progressStatus (e) {
    this.setData({
      currentStep: 1
    })
    // 查询状态, 检查用户是否加入企业
    let id = e.detail.vehicleId
    this.getCheckStatus(id)
  },
  // 查询旧车牌列表
  async getOldBrandList () {
    let { result } = await riderBrandList()
    this.setData({
      brandList: result || []
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
      checkStatus: result.status
    })
    let status = result.status
    switch (status) {
      case 'unsubmit':
        this.setData({
          currentStep: 1,
          showStep: true,
          maskIsHidden: true
        })
        return
      case 'auditing': // 完善车辆信息已完成, 等待审核显示
        this.setData({
          currentStep: 2,
          showStep: true,
          maskIsHidden: true
        })
        return
      case 'waitInstall': // 审核通过，邮寄车牌, 安装点安装车牌
        let { vin, id } = this.data
        // 防止参数有中文字
        let encodeVin = encodeURIComponent(vin)
        this.setData({
          currentStep: 3,
          qrcodeInfo: `?vin=${encodeVin}&vehicleId=${id}`,
          showStep: false,
          maskIsHidden: true
        })
        return
      case 'failure': // 审核失败, 重新备案
      case 'success': // 审核成功
        wx.redirectTo({
          url: `/pages/user/result/result?recordFlag=livelihoodBusiness&pageFlag=record&id=${id}&pageTitle=备案申报&reason=${result.failReason}&status=${status}`,
        })
        return
    }
  },
  // 弹出底部选项
  showSheet () {
    wx.showActionSheet({
      itemList: ['1', '2', '3', '4'], // 选择方式
      success: function(res) {
        if (!res.cancel) {
          console.log(res.tabIndex)
        }
      }
    })
  },
  // 选择车牌
  bindBrandPicker (e) {
    this.setData({
      brandIndex: e.detail.value
    })
  },
  // 提交旧车审核
  async submitOldInfo () {
    let { brandList, brandIndex } = this.data
    if (brandList && brandList.length == 0) {
      wx.showToast({
        title: '请选择个人车辆',
        icon: 'none'
      })
      return
    }
    let id = brandList[brandIndex]['vehicleId']
    let { result } = await riderVehicleUpdate(id)
    if (result) {
      this.getCheckStatus(id)
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