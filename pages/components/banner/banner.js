// pages/components/banner/banner.js
const utils = require('../../../utils/util')
var app = getApp()
import { carInfo_public } from '../../api/record'
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
    bannerBg: utils.imgTobase64('/pages/image/record_banner.png'),
    plateNo: '', // 车牌号
    vin: '', // 车架号
  },
  lifetimes: {
    attached: function () {

    }
  },
  pageLifetimes: {
    show: function() {
      this.getCarStatus()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 车辆信息查询
    async getCarStatus () {
      let { result, other } = await carInfo_public(false)
      if (result) {
        let { vehicleStatus, plateNo, vin, qrCodeUrl } = result
        this.setData({
          plateNo,
          vin,
          qrCodeUrl
        })
        // 车辆状态为1正常 或3报失, 显示车架号等信息
        if (vehicleStatus == 1 || vehicleStatus == 23) {
          this.setData({
            isShowCarInfo: true
          })
        } else {
          this.setData({
            isShowCarInfo: false
          })
        }
      }
      if (other) {
        this.setData({
          isShowCarInfo: false
        })
      }
    },
    // 点击banner显示二维码图片
    // 二维码是一个url地址
    async showQrcodeImg () {
      let { qrCodeUrl } = this.data
      if (isShowCarInfo) {
        this.setData({
          initValue: false,
          qrcodeText: qrCodeUrl
        })
      }
    }
  }
})
