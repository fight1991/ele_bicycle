// pages/components/banner/banner.js
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    head: {
      type: String,
      value: ''
    },
    middle: {
      type: String,
      value: ''
    },
    foot: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    bannerBg: app.utils.imgTobase64('/pages/image/record_banner.jpg')
  },
  lifetimes: {
    attached: function () {

    }
  },
  pageLifetimes: {
    show: function() {
      this.getCarStatus()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 车辆信息查询
    async getCarStatus () {

    }
  }
})
