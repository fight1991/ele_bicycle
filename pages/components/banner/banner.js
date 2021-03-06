// pages/components/banner/banner.js
const utils = require('../../../utils/util')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '-'
    },
    idcard: {
      type: String,
      value: ''
    },
    headTile1: {
      type: String,
      value: '-'
    },
    headTile2: {
      type: String,
      value: '-'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    trueIdcard: '',
    hideStatus: true
  },
  observers: {
    'idcard': function (num) {
      if (num) {
        let { hideStatus } = this.data
        this.setData({
          trueIdcard: hideStatus ? utils.hideText(num) : num
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchIdCardStatus () {
      let { hideStatus, trueIdcard } = this.data
      var tempStatus = !hideStatus
      this.setData({
        hideStatus: !hideStatus,
        trueIdcard: tempStatus ? utils.hideText(trueIdcard) : this.data.idcard
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
