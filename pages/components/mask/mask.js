// pages/components/mask/mask.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    onClickModalClose: { // 点击蒙层是否关闭
      type: Boolean,
      value: false
    },
    initValue: {
      type: Boolean,
      value: false
    },
    maskColor: {
      type: String,
      value: 'rgba(0, 0, 0, 0.3)'
    },
    showCloseBtn: { // 是否显示关闭按钮
      type: Boolean,
      value: true
    },
    contentPadding: {
      type: String,
      value: '0rpx'
    }
  },
  observers: {
    'initValue': function () {
      if (this.data.initValue) {
        this.setData({
          isShow: false
        })
      } else {
        this.setData({
          isShow: true
        })
      }
    }
  },
  lifetimes: {
    attached: function (e) {
      
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
