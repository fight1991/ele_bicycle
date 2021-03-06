// pages/components/mobile_code_login/mobile_code_login.js
const utils = require("../../../utils/util")
var app = getApp()
import { goLogin, changeMobile, getCodeApi } from '../../api/index'
import {  carInfo_public } from '../../api/record'

// 手机号验证码登录组件
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    btnText: {
      type: String,
      value: '确定'
    },
    flag: {
      type: Number,
      value: 1 // 1为 登录, 2为修改手机号
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    mobile: '',
    authCode: '159951', // 验证码
    isEditCode: false, // 按钮禁用
    codeText: '获取验证码',
    timerId: 0,
    codeTime: 60
  },
  lifetimes: {
    attached: function (e) {
      this.myDialog = this.selectComponent('#myDialog')
      let { userInfo } = app.globalData
      let tempMobile = userInfo.mobile
      if (!tempMobile) { // 读取本地的手机号
        tempMobile = wx.getStorageSync('mobile')
      }
      if (tempMobile) {
        this.setData({
          mobile: tempMobile
        })
      }
    },
    detached: function (e) {
      this.data.timerId && clearInterval(this.data.timerId)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 获取验证码
    async getCode () {
      if (this.data.timerId) return
      let { result } = await getCodeApi({
        mobile: this.data.mobile
      })
      if (result) {
        // ...
      }
      // 调用获取验证码api成功后, 开启倒计时
      utils.showToast.success('发送成功', () => {
        this.setData({
          isEditCode: true
        })
        this.computedTime()
      })
    },
    // 显示dialog
    showDialog () {
      // 校验手机号是否正确
      var isPass = utils.checkPhone(this.data.mobile)
      if (!isPass) return
      if (this.data.timerId > 0) return
      this.myDialog.show()
    },
    // 关闭dialog
    colseDialog () {
      this.myDialog.hide()
    },
    // 是否可以输入验证码
    checkImgCodeStatus (status) {
      // status为true时代表验证码发送成功
      // 开始倒计时
      if (status) {
        this.setData({
          isEditCode: true
        })
        this.computedTime()
      }
    },
    // 倒计时
    computedTime () {
      let { codeTime, timerId } = this.data
      if (timerId > 0) return
      this.setData({
        codeText: codeTime + ' 秒'
      })
      var seconds = codeTime
      var timerIdTemp = setInterval(() => {
        seconds--
        this.setData({
          codeText: utils.addZero(seconds, codeTime) + ' 秒'
        })
        if (seconds < 0) {
          this.setData({
            codeText: '获取验证码'
          })
          clearInterval(timerIdTemp)
          this.data.timerId = 0
        }
      }, 1000)
      this.data.timerId = timerIdTemp
    },
    // 去登录
    async goLogin () {
      app.getWechatCode().then(res => {
        this.loginApi(res.code)
      })
    },
    // 登录api
    async loginApi (code) {
      let { mobile, authCode } = this.data
      let { result } = await goLogin({
        authCode,
        jsCode: code,
        avatarUrl: app.globalData.wxHeadImg,
        mobile
      })
      if (result) {
        result.token && wx.setStorageSync('token', result.token)
        app.saveUserInfo(result)
        await this.saveBusInfo()
        // 本地缓存手机号
        wx.setStorage({
          data: mobile,
          key: 'mobile',
        })
        wx.reLaunch({
          url: '/pages/user/index',
        })
      }
    },
    // 获取车辆信息
    async saveBusInfo () {
      let { result } = await carInfo_public()
      if (result) {
        app.saveBusInfo(result)
      }
      return true
    },
    // 修改手机号api
    async changeMobile () {
      // 更改成功后, 重新跳转到登录页面
      let { authCode, mobile } = this.data
      let { mobile: oldMobile } = app.globalData.userInfo
      let { result } = await changeMobile({
        authCode,
        mobileNew: mobile,
        mobileOld: oldMobile
      })
      if (result) {
        app.globalData.userInfo.mobile = mobile
        // 删除token
        wx.removeStorageSync('token')
        wx.reLaunch({
          url: '/pages/user/center/relogin',
        })
      }
    },
    // 确定按钮 跳转到首页
    confirmBtn () {
      let { mobile, authCode } = this.data
      if (!utils.checkPhone(mobile) || !utils.checkCode(authCode)) {
        return
      }
      if (this.data.flag == 1) {
        this.goLogin()
      } else {
        this.changeMobile()
      }
    },
  }
})
