var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    status: 'success',
    reason: '', // 失败原因
    id: '', // 车辆id
    pageFlag: '', // change备案人变更, record备案申报, scrap一键报废, 记录是从哪个页面跳转过来的
    recordFlag: '', // 哪个页面的备案申报
    from: 'inside', // 记录从哪个地方跳转过来, 默认为内部页面, server为服务通知跳转进来
    // 审核结果 共用页面, 备案申报服务通知,点击进来页面
    statusText: {
      'failure': '审核失败',
      'success': '审核成功'
    },
    statusImg: {
      'failure': '/pages/image/check-fail.png',
      'success': '/pages/image/check-success.png'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { status, reason = '', pageFlag = '', id, recordFlag, pageTitle, from } = options
    from && (this.data.from = from)
    this.setData({
      status,
      reason,
      pageFlag,
      id,
      recordFlag
    })
    if (pageTitle) {
      wx.setNavigationBarTitle({
        title: pageTitle,
      })
    }
  },

  // 备案申报审核失败, 点击改变状态后, 跳转到个人信息录入页面
  async goToEdit () {
    let { recordFlag, id } = this.data
    if (recordFlag) {
      wx.redirectTo({
        url: `/pages/user/${recordFlag}/record/record?opType=edit&id=` + id,
      })
    }
  },
  // 返回上一步
  async hasKnownBtn () {
    let { from } = this.data
    if (from == 'server') {
      // 从服务通知跳转过来
      wx.reLaunch({
        url: '/pages/user/index?from=server',
      })
    } else {
      // 如果审核失败, 则点击已知晓按钮后, 直接返回
      wx.navigateBack({
        delta: 1
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