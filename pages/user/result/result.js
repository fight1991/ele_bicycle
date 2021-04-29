import { record_status_update, car_owner_change_cancel, car_scrap_cancel } from '../../api/record'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 'success',
    reason: '', // 失败原因
    pageFlag: '', // change备案人变更, record备案申报, scrap一键报废, 记录是从哪个页面跳转过来的
    from: 'inside', // 记录从哪个地方跳转过来, 默认为内部页面, server为服务通知跳转进来
    // 审核结果 共用页面, 备案申报服务通知,点击进来页面
    statusText: {
      'failure': '审核失败',
      'success': '审核成功'
    },
    statusImg: {
      'failure': '/pages/image/check-fail.png',
      'success': '/pages/image/check-success.png'
    },
    updateApi: {
      scrap: car_scrap_cancel, // 一键报废取消
      change: car_owner_change_cancel // 备案人变更取消
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { status, reason = '', pageFlag = '', pageTitle, from } = options
    from && (this.data.from = from)
    this.setData({
      status,
      reason,
      pageFlag
    })
    if (pageTitle) {
      wx.setNavigationBarTitle({
        title: pageTitle,
      })
    }
  },

  // 备案申报审核失败, 点击改变状态后, 跳转到个人信息录入页面
  async goToEdit () {
    if (result) {
      wx.redirectTo({
        url: '/pages/user/record/record?opType=edit',
      })
    }
  },
  // 返回上一步
  async hasKnownBtn () {
    let { status, updateApi, from, pageFlag} = this.data
    if (from == 'server') {
      // 从服务通知跳转过来
      wx.reLaunch({
        url: '/pages/user/index?from=server',
      })
    } else {
      // 如果审核失败, 则点击已知晓按钮后, 改变状态, 成功则直接返回
      if (status == 'failure') {
        await updateApi[pageFlag]({ status: 4 })
      }
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