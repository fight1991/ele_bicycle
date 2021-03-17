// pages/components/banner/banner.js
const utils = require('../../../utils/util')
var app = getApp()
import { carInfo_public } from '../../api/record'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '-'
    },
    idcard: {
      type: String,
      value: ''
    },
    headTile1: {
      type: String,
      value: '-'
    },
    headTile2: {
      type: String,
      value: '-'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    trueIdcard: '',
    initValue: true, // 设置mask初始为 隐藏, 点击banner显示
    bannerBg: utils.imgTobase64('/pages/image/record_banner.png'),
    qrcodeText: ''
  },
  lifetimes: {
    attached: function () {
      
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击banner显示二维码图片
    // 二维码是一个url地址
    async showQrcodeImg () {
      let { result } = await carInfo_public()
      if (result && result.qrCodeUrl) {
        this.setData({
          initValue: false,
          qrcodeText: result.qrCodeUrl
        })
      }
    }
  }
})
