// pages/components/step/step.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    step: {
      type: Number,
      value: 0
    },
    stepList: {
      type: Array,
      value: ['第1步', '第2步']
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // currentStep: 1, // 当前操作步骤
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
