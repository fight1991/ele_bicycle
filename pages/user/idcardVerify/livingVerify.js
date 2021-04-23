// pages/user/idcardVerify/idcardVerify.js
var app = getApp()
const { getIdcardInfo, sumitPersonInfoApi} = app.api

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 表单数据 
    personData: { 
      cityCode: [], 
      cityCodeIndex: [], 
      contactAddress: '', 
      gender: 0, // 0:男 1:女 
      idName: '', 
      idNO: '', 
      idType: 1, 
      imageHead: '', 
      imageIDCard1: '', 
      imageIDCard2: '', 
      mobile: '' 
    }, 
    // 性别 
    sexArr: ['男', '女'], 
    // 省/市/区 
    region: [], 
    regionCode: [], 
    regionLabel: '请选择联系地址' ,
    backImgUrl: null 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSomeImgInfo()
  },

  // 查询识别后的信息
  async getSomeImgInfo () {
    let { result } = await getIdcardInfo()
    if (result) {
      this.setData({
        personData: result,
        region: result.cityCodeIndex
      })
    }
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
    var { code, value } = e.detail
    this.data.personData.cityCode = code
    this.data.personData.cityCodeIndex = value
    this.setData({
      region: value
    })
  },
  // 提交表单信息
  async submitForm () {
    var isPass = this.validForm()
    if(!isPass) return
    let { personData: {contactAddress, cityCode, cityCodeIndex} } = this.data
    let { result } = await sumitPersonInfoApi({
      cityCode,
      contactAddress,
      cityCodeIndex
    })
    return result
  },
  // 活体认证按钮
  async livingBtn () {
    let res = await this.submitForm()
    if (res) {
      // 假设认证成功
      wx.reLaunch({
        url: './livingResult',
      })
    }
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