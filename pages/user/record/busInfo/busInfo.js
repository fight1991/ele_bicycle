// pages/user/record/busInfo/busInfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    // 车辆上传的静态图片是否显示
    busBg: true,
    tickBg: true,
    busSrc: '',
    tickSrc: '',
    // 车辆属性
    pickerArrProp: ['非国标车', '新国标车'],
    propIndex: 0,
    // 装牌方式
    pickerArrType: ['邮寄到家', '安装点安装'],
    typeIndex: 0,
    isChecked: false,
    scanCode: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 扫码
    scanBtn () {
      wx.scanCode({
        success: (res) => {
          console.log(res, '扫码--------')
          this.setData({
            scanCode: res.result
          })
        }
      })
    },
    // 上传图片
    uploadBImg (e) {
      var flag = e.currentTarget.dataset.flag
      this.chooseImg((res) => {
        this.setData({
          [flag + 'Src']: res.tempFilePaths[0],
          [flag + 'Bg']: false
        })
      })
    },
    chooseImg (callback) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album'],
        success: (res) => {
          // tempFilePath可以作为img标签的src属性显示图片
          callback && callback(res)
        }
      })
    },
    // 删除已选的图片
    removeBg (e) {
      var flag = e.currentTarget.dataset.flag
      this.setData({
        [flag + 'Bg']: true,
        [flag + 'Src']: ''
      })
    },
    // 单选按钮
    radioBtn (e) {
      console.log(e)
      this.setData({
        isChecked: !this.data.isChecked
      })
    },
    routeTo () {
      wx.navigateTo({
        url: '/pages/user/record/law/law',
      })
    },
    // 提交按钮
    submitBtn () {
      // 校验表单
      if (!this.data.isChecked) {
        wx.showToast({
          title: '请勾选车辆来源合法声明',
          icon: 'none'
        })
        return
      }
      this.triggerEvent('nextStep')
    }
  }
})
 