// pages/user/livelihoodBusiness_corp/rider/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deleteVisible: false, // 删除弹框
    addVisible: false, // 添加弹框
    mobile: '', // 手机号
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 显示删除对话框
  showDeleteDialog () {
    this.setData({
      deleteVisible: true
    })
  },
  // 显示添加对话框
  showAddDialog () {
    this.setData({
      addVisible: true
    })
  },
  // 删除骑手
  deleteRider () {

  },
  // 添加骑手
  addRider () {
    console.log(this.data.mobile)
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