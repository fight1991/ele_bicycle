// pages/components/show_hide_icon/showHideIcon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showIcon: {
      type: String,
      value: '/pages/image/show.png'
    },
    hideIcon: {
      type: String,
      value: '/pages/image/hide.png'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false // 默认是隐藏图标
  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchBtn () {
      this.setData({
        isShow: !this.data.isShow
      })
      this.triggerEvent('switchOp', this.data.isShow)
    }
  }
})
