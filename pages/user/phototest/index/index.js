/*
* 图像路径的更新在拍照页完成
* 具体查看拍照页saveImg()方法
*/

Page({

  /**
   * 页面的初始数据
   */
  data: {

    // 判断显示文字还是图片(预览图片标识)
		frontShow: true,
		// 身份证正面路径
		frontSrc: '',

		//判断显示文字还是图片(预览图片标识)
    otherShow: true,
    
		//身份证反面路径
    otherSrc: '',

  },

  // 拍摄身份证正面-跳转到拍摄页
  goFront: function() {
    wx.navigateTo({
			url: '/pages/user/phototest/frontOfIDCard/frontOfIDCard',
		})
  },

  // 拍摄身份证反面-跳转到拍摄页
  goOther: function() {
    wx.navigateTo({
			url: '/pages/user/phototest/otherOfIDCard/otherOfIDCard',
		})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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