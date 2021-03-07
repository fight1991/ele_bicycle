Component({
  options: {
    multipleSlots: true
  },
  observers: {
    // 监听imgSrc是否改变
    // imgSrc: function(src) {
    //   this.setData({
    //     imgSrc: src
    //   })
    // }
  },
  data: {
    isShow: false,
    code: '1111',
    imgSrc: '',
    imgCode: '1111'
  },
  lifetimes: {
    attached: function(e) {
      // 页面初始化之后请求一次图片
      this.getImage()
    }
  },
  methods: {
    hide() {
      this.setData({
        isShow: false
      })
    },
    show() {
      this.setData({
        isShow: true
      })
    },
    loadImageErr (e) {
      // console.log(e)
    },
    // 请求图片
    getImage () {
      // 点击获取图片
      console.log('请求验证码图片')
    },
    changeImage () {
      this.triggerEvent('changeImage')
    },
    clear () {
      this.setData({
        code: ""
      })
    },
    cancel () {
      this.triggerEvent("cancelEvent")
      
    },
    ok () {
      // 1. 将用户输入的验证码发送到后端进行比对,
      // 2. 成功之后关闭dialog框, 并提示验证码已发送
      // 3. 用户收到验证码,并输入
      // 4. 再进行后面操作
      if (!this.data.code) {
        this.showToast('请输入验证码')
        return
      }
      if (this.data.code !== this.data.imgCode) {
        this.showToast('验证码不正确', () => {
          this.setData({
            code: ''
          })
        })
        return
      }
      // 调用获取验证码的api
      wx.showToast({
        title: '验证码发送成功',
        duration: 1500,
        success: () => {
          // 如果比对成功, 通知父组件, 验证码输入框变成可编辑状态
          this.hide()
          this.triggerEvent("confirmEvent", true) 
        }
      })
      
    },
    showToast (title, callback) {
      wx.showToast({
        title: title,
        icon:'none',
        duration: 1500,
        success: callback
      })
    }
  }
})