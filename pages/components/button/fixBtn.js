// pages/components/button/fixBtn.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'primary', // primary 蓝底白字, light 白底蓝字带边框
    },
    width: {
      type: String,
      value: '100vw'
    },
    align: {
      type: String,
      value: 'left'
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    classString: 'btn-box'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
