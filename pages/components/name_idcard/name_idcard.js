// pages/components/name_idcard/name_idcard.js
const utils = require("../../../utils/util")
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  
  },

  /**
   * 组件的初始数据
   */
  data: {
    trueIdcard: app.globalData.idcard,
    idcard: app.globalData.idcard,
    name: app.globalData.name,
    isShow: false
  },
  lifetimes: {
    attached: function () {
      if (!this.data.isShow) {
        this.setData({
          trueIdcard: utils.hideText(this.data.idcard)
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchIdCardStatus (e) {
      var isShow = e.detail
      let { idcard } = this.data
      this.setData({
        trueIdcard: isShow ? idcard : utils.hideText(idcard)
      })
    },
    // 跳转到个人中心
    routeToMePage () {
      wx.navigateTo({
        url: '/pages/user/center/center',
      })
    }
  }
})
