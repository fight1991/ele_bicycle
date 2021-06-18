var app = getApp()
const { loginApi, changeMobile, getCodeApi, getImgCodeApi } = app.api
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
  properties: {
    imgSrc: {
      type: String,
      value:''
    },
    mobile: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: ''
    }
  },
  data: {
    isShow: false,
    imageCheckCode: '',
    isFocus: false,
    currentImgCodeInfo: {
      base64image: '',
      seriaNum: ''
    }
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
        isShow: false,
        isFocus: false
      })
    },
    show () {
      this.setData({
        isShow: true,
        isFocus: true
      })
      this.getImgCode()
    },
    // 获取图片验证码
    async getImgCode () {
      let { result } =  await getImgCodeApi()
      if (result) {
        this.setData({
          currentImgCodeInfo: result
        })
      }
    },
    // 发送手机验证码
    async sendMobileCode () {
      let { imageCheckCode, mobile, currentImgCodeInfo, type } = this.data
      let { result } = await getCodeApi({
        imageCheckCode,
        mobile,
        seriaNum: currentImgCodeInfo.seriaNum,
        type
      })
      if (result) {
        app.messageBox.common('验证码发送成功')
        this.hide()
        this.clear()
        this.triggerEvent('confirmEvent', true) 
      }
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
      this.getImgCode()
    },
    clear () {
      this.setData({
        imageCheckCode: ''
      })
    },
    cancel () {
      this.hide()
      this.setData({
        imageCheckCode: ''
      })
    },
    ok () {
      // 1. 将用户输入的验证码发送到后端进行比对,
      // 2. 成功之后关闭dialog框, 并提示验证码已发送
      // 3. 用户收到验证码,并输入
      // 4. 再进行后面操作
      if (!this.data.imageCheckCode) {
        this.showToast('请输入验证码')
        return
      }
      // 发送验证码的api
      this.sendMobileCode()
    }
  }
})