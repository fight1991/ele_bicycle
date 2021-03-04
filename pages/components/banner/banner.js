// pages/components/banner/banner.js
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
          trueIdcard: hideStatus ? this.hideText(num) : num
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideText (str) {
      var startText = str.slice(0, 6)
      var endText = str.slice(str.length-4)
      return startText + "****" + endText
    },
    switchIdCardStatus () {
      let { hideStatus, trueIdcard } = this.data
      var tempStatus = !hideStatus
      this.setData({
        hideStatus: !hideStatus,
        trueIdcard: tempStatus ? this.hideText(trueIdcard) : this.data.idcard
      })
    }
  }
})
