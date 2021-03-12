// pages/components/name_idcard/name_idcard.js
const utils = require("../../../utils/util")
const app = getApp()
import { show_idcard } from '../../api/index'
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
    isShow: false,
    userInfo: {
      name: '',
      idcard: '' // 得到隐藏的省份证号
    },
    trueIdcard: '',
    tempIdcard: '', // 存放显示的省份证号
  },
  lifetimes: {
    attached: function () {
      let { idcard, name } = app.globalData.userInfo
      this.setData({
        userInfo: {
          idcard,
          name
        },
        trueIdcard: idcard
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    async switchIdCardStatus (e) {
      var isShow = e.detail
      if (isShow) {
        if (this.data.tempIdcard) {
          this.setData({
            trueIdcard: this.data.tempIdcard
          })
          return
        }
        let temp = await this.getPartInfo()
        if (temp) {
          this.data.tempIdcard = temp
          this.setData({
            trueIdcard: temp
          })
        }
      } else {
        this.setData({
          trueIdcard: this.data.userInfo.idcard
        })
      }
      // 请求接口
    },
    // 跳转到个人中心
    routeToMePage () {
      wx.navigateTo({
        url: '/pages/user/center/center',
      })
    },
    // 得到显示的身份证号信息
    async getPartInfo () {
      let { result } = await show_idcard()
      if (result) {
        return result.idNO
      } else {
        return ''
      }
    }
  }
})
