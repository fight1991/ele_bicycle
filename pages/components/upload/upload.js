// pages/components/upload/upload.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: Number,
      value: 80
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    uploadBg: true,
    imgSrc: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 上传图片
    uploadBImg (e) {
      this.chooseImg((res) => {
        this.triggerEvent('getImgInfo', res)
        this.setData({
          imgSrc: res.tempFilePaths[0],
          uploadBg: false
        })
      })
    },
    // 删除已选的图片
    removeBg (e) {
      this.setData({
        uploadBg: true,
        imgSrc: ''
      })
      this.triggerEvent('getImgInfo', null)
    },
    chooseImg (callback) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: (res) => {
          // tempFilePath可以作为img标签的src属性显示图片
          callback && callback(res)
        }
      })
    },
  }
})
