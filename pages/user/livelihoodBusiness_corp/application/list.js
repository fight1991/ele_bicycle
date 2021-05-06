// pages/user/livelihoodBusiness_corp/application/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    list: [
      { 
        title: '企业车申报',
        status: 'auditing',
        id: '1',
        vin: '235235325',
        brand: '江阴E9ii',
        time: '2020.03.03 12:00:00'
      }, { 
        title: '企业车申报',
        status: 'failure',
        id: '1',
        vin: '235235325',
        brand: '江阴E9ii',
        time: '2020.03.03 12:00:00'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 搜索时确定按钮
  confirmBtn (e) {
    // 输入框中的值 e.detail
    console.log(e.detail, '打印的值')
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