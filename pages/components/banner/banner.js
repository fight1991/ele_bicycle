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
    isShow: false,
    bannerBg: utils.imgTobase64('/pages/image/record_banner.png')
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
