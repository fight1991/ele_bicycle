// pages/components/upload/upload.js
import {upload_func} from '../../api/upload'
var app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: { // 宽度
      type: String,
      value: '160rpx'
    },
    height: { // 高度 默认为auto
      type: String,
      value: 'auto'
    },
    mode: {
      type: String,
      value: 'widthFix'
    },
    staticSrc: { // 默认图片
      type: String,
      value: '/pages/image/upload.png'
    },
    closeIcon: { // 是否显示删除图标
      type: Boolean,
      value: true
    },
    imgSrc: { // 真实的图片地址
      type: String,
      value: ''
    }
  },
  observers: {},
  /**
   * 组件的初始数据
   */
  data: {
    trueSrc: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击图片按钮
    chooseBtn (e) {
      wx.showActionSheet({
        itemList: ['拍照','从相册中选择'],
        success: (res) => {
          var type = 'album'
          if (res.tapIndex == 0) {
            type = 'camera'
          }
          this.chooseImg(type)
        }
      })
    },
    // 选取图片方式
    chooseImg (type) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: [type],
        success: (res) => {
          this.uploadImg(res)
        }
      })
    },
    // 上传图片到服务器
    async uploadImg (res) {
      let tempPath = res.tempFilePaths[0]
      let hash = await upload_func(tempPath)
      let totalUrl = app.hashUrl + hash
      // 更新父组件传递过来的imgSrc值
      this.setData({
        imgSrc: totalUrl,
      })
      // 更新imgSrc
      this.setData({
        imgSrc: totalUrl
      })
      this.triggerEvent('getImgInfo', totalUrl)
    },
    // 删除已选的图片
    removeBg (e) {
      this.setData({
        imgSrc: ''
      })
      this.triggerEvent('getImgInfo', '')
    }
  }
})
