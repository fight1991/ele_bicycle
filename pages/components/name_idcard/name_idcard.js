// pages/components/name_idcard/name_idcard.js
const app = getApp()
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
    idName: ''
  },
  lifetimes: {
    attached: function () {
      let { idName, mobile } = app.globalData.userInfo
      this.setData({
        idName: idName || mobile
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
