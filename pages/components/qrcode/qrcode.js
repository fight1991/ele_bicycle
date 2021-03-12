// pages/components/qrcode/qrcode.js
import drawQrcode from '../../../utils/weapp.qrcode.min.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      value: 300
    },
    height: {
      type: Number,
      value: 300
    },
    text: {
      type: String,
      value: ''
    }
  },
  lifetimes: {
    attached: function (e) {
      this.drawCode()
    }
  },
  observers: {
    // 'text': function (txt) {
    //   if (txt) {
    //     this.drawCode()
    //   }
    // }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    drawCode (params) {
      let { width, height, text } = this.data
      // 比率换算
      let W = wx.getSystemInfoSync().windowWidth
      let rate = 750.0 / W
      drawQrcode({
        width: width / rate,
        height: height / rate,
        canvasId: 'myQrcode',
        ctx: wx.createCanvasContext('myQrcode', this),
        text: params || text,
        // v1.0.0+版本支持在二维码上绘制图片
        // image: {
        //   imageResource: '../../images/icon.png',
        //   dx: 70,
        //   dy: 70,
        //   dWidth: 60,
        //   dHeight: 60
        // }
      })
    }
  }
})
