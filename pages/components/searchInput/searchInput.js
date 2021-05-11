// pages/components/searchInput/searchInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: String,
      value: ''
    },
    placeHolder: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hiddenClearIcon: true,
    inputValue: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击键盘上的搜索按钮触发
    confirm (e) {
      this.triggerEvent('confirm', e.detail.value)
    },
    // 清楚输入框的值
    clearInput () {
      this.setData({
        value: '',
        hiddenClearIcon: true
      })
      this.triggerEvent('clear')
    },
    // 输入值改变时
    searchChange (e) {
      let tempValue = e.detail.value
      if (tempValue.trim().length > 0) {
        this.setData({
          hiddenClearIcon: false,
          value: tempValue
        })
        this.triggerEvent('change', tempValue)
      } else {
        this.setData({
          hiddenClearIcon: true,
          value: ''
        })
      }
    }
  }
})
