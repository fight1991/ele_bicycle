// pages/components/swiper/swiper.js
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
    currentIndex: 0,
    confirmDialogVisible: false,
    maskHidden: true, // 设置mask初始为 隐藏, 点击二维码按钮显示
    codeValue: '', // 二维码字符串
    qrCodeUrl: '', // 车辆信息查询获得
    list: [
      {
        status: '已登记',
        plateNo: '苏B11313',
        brand: '新日',
        model: '1313143444',
        vin: '1211244124',
        num: '123413141351531'
      },
      {
        status: '未登记',
        plateNo: '苏B11313',
        brand: '宝马',
        model: '1313143444',
        vin: '1211244124',
        num: '123413141351531'
      },
      {
        status: '未登记',
        plateNo: '苏E 9x11313',
        brand: '宝马13',
        model: '1313143444',
        vin: '1211244124',
        num: '123413141351531'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    swiperChange (e) {
      console.log(e.detail)
      this.setData({
        currentIndex: e.detail.current
      })
    },
    // 点击二维码按钮显示二维码
    showErweima () {
      let { qrCodeUrl } = this.data
      this.setData({
        maskHidden: false,
        codeValue: qrCodeUrl
      })
    },
    // 删除按钮
    deleteBtn () {
      this.setData({
        confirmDialogVisible: true
      })
    },
    // 删除车辆信息
    deleteCarInfo () {

    },
    // 编辑按钮, 跳转到申报页面的完善车辆信息
    editBtn () {
      wx.navigateTo({
        url: '/pages/user/record/record',
      })
    }
  }
})
