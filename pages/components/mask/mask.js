// pages/components/mask/mask.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    onClickModalClose: { // 点击蒙层是否关闭
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideFormModal () {
      if (!this.data.onClickModalClose) return
      this.setData({
        isShow: false
      })
    },
    show () {
      this.setData({
        isShow: true
      })
    },
    hide () {
      this.setData({
        isShow: false
      })
    }
  }
})
