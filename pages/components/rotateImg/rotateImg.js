// pages/components/rotateImg/rotateImg.js
Component({
  data: {
    rotateBefore: null,
    rotateAfter: null,
    canvasWidth:null,
    canvasHeight:null
  },
  methods: {
    onUploadAction(e) { // 选择图片
      let _this = this
      wx.showActionSheet({
        itemList: ['从相册中选择', '拍照'], // 选择方式
        success: function(res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {
              _this.chooseWxImage('album')
            } else if (res.tapIndex == 1) {
              _this.chooseWxImage('camera')
            }
          }
        }
      })
    },
    chooseWxImage(type) {
      let _this = this;
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        sourceType: [type],
        success: function(result) {
          let tempFilePaths = result.tempFilePaths // 获得文件地址
          //  旋转前
          _this.setData({
            rotateBefore: tempFilePaths[0] // 设置旋转前的image
          })
          wx.getImageInfo({ // 获取图片的信息
            src: tempFilePaths[0],
            success: (res) => {
              let canvasContext = wx.createCanvasContext('my-canvas', _this)
              // 下面按比例写死宽度高度是为了压缩图片提升上传速度，可按实际需求更改
              let rate = res.height / res.width 
              let width = 500
              let height = 500 * rate
              console.log(res, '图片旋转...................')
              switch (res.orientation) { // 根据orientation值处理图片
                case ("up"):
                  //不需要旋转
                  _this.setData({
                    canvasWidth: width,
                    canvasHeight: height,
                  })
                  canvasContext.drawImage(tempFilePaths[0], 0, 0, width, height);
                  break;
                case ("down"):
                  //需要旋转180度
                  _this.setData({
                    canvasWidth: width,
                    canvasHeight: height,
                  })
                  canvasContext.translate(width / 2, height / 2)
                  canvasContext.rotate(180 * Math.PI / 180)
                  canvasContext.drawImage(tempFilePaths[0], -width / 2, -height / 2, width, height);
                  break;
                case ("left"):
                  //顺时针旋转270度
                  _this.setData({
                    canvasWidth: height,
                    canvasHeight: width,
                  })
                  canvasContext.translate(height / 2, width / 2)
                  canvasContext.rotate(270 * Math.PI / 180)
                  canvasContext.drawImage(tempFilePaths[0], -width / 2, -height / 2, width, height);
                  break;
                case ("right"):
                  //顺时针旋转90度
                  _this.setData({
                    canvasWidth: height,
                    canvasHeight: width,
                  })
                  canvasContext.translate(height / 2, width / 2)
                  canvasContext.rotate(90 * Math.PI / 180)
                  canvasContext.drawImage(tempFilePaths[0], -width / 2, -height / 2, width, height)
                  break;
              }
              console.log('哈哈哈哈哈哈哈哈')
              canvasContext.draw(false, () => { // 将之前在绘图上下文中的描述（路径、变形、样式）画到 canvas 中
                console.log('canvas绘画-------------------')
                wx.canvasToTempFilePath({ // 把当前画布指定区域的内容导出生成指定大小的图片。在 draw() 回调里调用该方法才能保证图片导出成功。
                  canvasId: 'my-canvas',
                  success(res) {
                    let filePath = res.tempFilePath
                    _this.setData({
                      rotateAfter: filePath
                    })
                  }
                }, _this)// 在自定义组件下，当前组件实例的this，以操作组件内 canvas 组件
              })
            }
          })
        }
      })
    }
  }
})
