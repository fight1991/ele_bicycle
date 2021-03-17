// pages/components/qrcode/qrcode.js
// import drawQrcode from '../../../utils/weapp.qrcode.js'
const QR = require('../../../utils/weapp-qrcode.js')
const rpx2px = wx.getSystemInfoSync().windowWidth / 750
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
    background: {
      type: String,
      value: '#ffffff'
    },
    frontground: {
      type: String,
      value: '#000000'
    },
    value: { // 二维码内容
      type: String,
      value: ''
    }
  },
  lifetimes: {
    attached: function (e) {
      // this.drawCode()
      
    }
  },
  observers: {
    'value': function (txt) {
      if (txt) {
        this.drawCode()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    qrcodeURL: ''
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
     /**
     * 长按保存图片
     */
    save: function() {
      var self = this
      var aa = wx.getFileSystemManager(),
        filePath = wx.env.USER_DATA_PATH + '/qrcode_' + self.data.value + '.png';
      //写入临时文件
      aa.writeFile({
        filePath: filePath,
        data: self.data.qrcodeURL.slice(22),
        encoding: 'base64',
        success: res => {
          //保存临时文件到手机相册中去
          wx.saveImageToPhotosAlbum({
            filePath: filePath,
            success: function(res) {
              wx.showToast({
                title: '保存成功',
              })
            },
            fail: function(err) {
              console.log(err)
            }
          })
          console.log(res)
        },
        fail: err => {
          console.log(err)
        }
      })
    },
    drawCode () {
      var imgData = QR.drawImg(this.data.value, {
        typeNumber: 3,//码点大小 1-40，数字越大，码点越小，二维码会显得越密集
        errorCorrectLevel: 'H',//纠错等级 H等级最高(30%) 简单来说，就是二维码被覆盖了多少仍然能被识别出来 详见qrcode.js
        size: parseInt(rpx2px * this.data.width)
      })
      this.setData({
        qrcodeURL: imgData
      })
    }
  }
})
