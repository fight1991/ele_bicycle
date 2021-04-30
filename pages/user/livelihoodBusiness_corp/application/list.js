// pages/user/livelihoodBusiness_corp/application/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenClearIcon: true,
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
  // 清楚输入框的值
  clearInput () {
    this.setData({
      inputValue: '',
      hiddenClearIcon: true
    })
  },
  // 输入值改变时
  searchChange (e) {
    let value = e.detail.value
    if (value.trim().length > 0) {
      this.setData({
        hiddenClearIcon: false
      })
    } else {
      this.setData({
        hiddenClearIcon: true
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