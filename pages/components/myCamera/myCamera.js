// pages/components/myCamera/myCamera.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    position: {
      type: String,
      value: 'back' // 前置/后置摄像头
    },
    imgType: {
      type: String,
      value: '' // 照片类型 face人像 /front 正面 /back反面
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    src: '', // 拍照后图像路径(临时路径)
    show: false, // 相机视图显示隐藏标识
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 取消/重新拍照按钮
    cancelBtn() {
      this.setData({//更新数据
        show: false
      })
    },
    // 点击拍照按钮
    takePhoto() {
      // 创建camera上下文CameraContext对象
      const ctx = wx.createCameraContext()

      // 获取camera实时帧数据
      const listener = ctx.onCameraFrame((frame) => {
        //如果不需要则注释掉
      })

      // 实拍照片配置
      ctx.takePhoto({
        quality: 'high', // 成像质量
        success: (res) => { // 成功回调
          this.setData({
            src: res.tempImagePath, // tempImagePath为api返回的照片路径
            show: true
          })
        },
        fail: (error) => { // 失败回调
          //友好提示...
        }
      })
    },

    // 保存图片/更改主页数据(用户最终点击确定按钮√)
    saveImg () {
      // 获取所有页面栈
      let pages = getCurrentPages()
      console.log(pages)
      // 上一页-flag
      var prevPage = '';
      // 如果长度大于等于2
      if(pages.length >= 2){//则对上面定义的flag赋值
        // 上一页
        prevPage = pages[pages.length - 2];
      }
      // 刷新上一页(也就是主页面)数据-包含图片路径及标识
      if(prevPage) {
        // 获取当前图片路径(用户拍下的照片)
        var tempMode = this.data.imgType
        // 更新record页面中组件personInfo的数据
        prevPage.personInfoComponent.setData({
          [tempMode + 'Show']: false, // 显示图片
          [tempMode + 'Src']: this.data.src // 照片路径
        })
    }

      // 最后返回上一页(也就是主页)
      wx.navigateBack({
          delta: 1,
      })
    },
  }
})
