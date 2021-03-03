Component({
  options: {
    multipleSlots: true
  },
  properties: {
    imgSrc: {            
      type: String,   
      value: ''
    }
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
    code: '',
    imgSrc: ''
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
      this.triggerEvent("confirmEvent", this.data.code) 
    }
  }
})