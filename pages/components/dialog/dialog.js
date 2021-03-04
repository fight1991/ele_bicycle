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

    },
    bindData (e) {
      this.data.code = e.detail.value
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
      // 输入的code和图片数据的code比对, 如果一样, 向父组件传递code,并关闭
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
      this.hide()
      this.triggerEvent("confirmEvent", this.data.code) 
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