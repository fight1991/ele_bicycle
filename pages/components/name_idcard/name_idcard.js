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
    isShow: false,
    userInfo: {
      personalIDNo: '',
      personalIDName: ''
    },
    trueIdcard: '',
    tempIdcard: '', // 存放显示的省份证号
  },
  lifetimes: {
    attached: function () {
      let { personalIDNo, personalIDName } = app.globalData.userInfo
      this.setData({
        userInfo: {
          personalIDNo,
          personalIDName
        },
        trueIdcard: personalIDNo
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchIdCardStatus (e) {
      var isShow = e.detail
      if (this.tempIdcard) return
      // 请求接口
    },
    // 跳转到个人中心
    routeToMePage () {
      wx.navigateTo({
        url: '/pages/user/center/center',
      })
    }
  }
})
