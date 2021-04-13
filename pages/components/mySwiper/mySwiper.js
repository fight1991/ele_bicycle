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
    }
  }
})
