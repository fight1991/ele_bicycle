// pages/user/record/busInfo/busInfo.js
import { carInfo_search, carInfo_add } from '../../../api/record'
import WxValidate from '../../../../utils/WxValidate'
var app = getApp()
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
    // 双向绑定图片的值
    urlcertification: '',
    urlinvoice: '',
    // 车辆属性
    pickerArrProp: ['非国标车', '新国标车'],
    // 装牌方式
    pickerArrType: ['邮寄到家', '安装点安装'],
    isChecked: true,
    scanCode: '',
    busInfo: {
      brand: '',
      installation_methods: '', // 安装方式
      model: '',
      properties: '', // 车辆属性
      urlcertification: '', // 车辆合格证
      urlinvoice: '', // 车辆发票
      vin: ''
    }
  },
  // 页面初始化后查询车辆信息
  lifetimes: {
    attached: function (e) {
      // 数据初始化
      this.initInfo()
      this.initValid()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 表单规则初始化
    initValid () {
      let rules = {
        vin: {
          required: true
        },
        brand: {
          required: true
        },
        installation_methods: {
          required: true
        },
        model: {
          required: true
        },
        properties: {
          required: true
        },
        urlcertification: {
          required: true
        },
        urlinvoice: {
          required: true
        }
      }
      let messages = {
        vin: {
          required: '请扫车架号'
        },
        brand: {
          required: '请输入品牌'
        },
        model: {
          required: '请输入型号规格'
        },
        properties: {
          required: '请输入车辆属性'
        },
        installation_methods: {
          required: '请选择装牌方式'
        },
        urlcertification: {
          required: '请上传车辆合格证'
        },
        urlinvoice: {
          required: '请上传购车发票'
        }
      }
      this.validate = new WxValidate(rules, messages)
    },
    // 初始化信息
    async initInfo () {
      let { result } = await carInfo_search()
      if (result) {
        this.setData({
          busInfo: result
        })
        let { urlcertification, urlinvoice } = result
        if (urlcertification) {
          this.setData({
            urlcertification
          })
        }
        if (urlinvoice) {
          this.setData({
            urlinvoice
          })
        }
      }
    },
    // 输入框值绑定
    bindData (e) {
      var id = e.currentTarget.id
      this.data.busInfo[id] = e.detail.value
    },
    // 车辆属性
    bindCarPicker (e) {
      this.setData({
        'busInfo.properties': e.detail.value
      })
    },
    // 装牌方式
    bindBrandPicker (e) {
      this.setData({
        'busInfo.installation_methods': e.detail.value
      })
    },
    // 扫码
    scanBtn () {
      wx.scanCode({
        success: (res) => {
          this.setData({
            'busInfo.vin': res.result
          })
        }
      })
    },
    // 获取车辆合格证信息
    getBusFile (res) {
      this.data.busInfo.urlcertification = res.detail
    },
    // 获取购车发票信息
    getTicketFile (res) {
      this.data.busInfo.urlinvoice = res.detail
    },
    // 单选按钮
    radioBtn (e) {
      this.setData({
        isChecked: !this.data.isChecked
      })
    },
    routeTo () {
      wx.navigateTo({
        url: '/pages/user/record/law/law',
      })
    },
    showModal(msg) {
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 1500
      })
    },
    // 提交按钮
    async submitBtn () {
      this.data.busInfo.urlcertification = this.data.urlcertification || ''
      this.data.busInfo.urlinvoice = this.data.urlinvoice || ''
      var temp = {
        detail: {
          value: this.data.busInfo
        }
      }
      // 校验表单
      let isPass = this.validate.checkForm(temp)
      if (!isPass) {
        let error = this.validate.errorList[0]
        this.showModal(error.msg)
        return
      }
      if (!this.data.isChecked) {
        this.showModal('请勾选车辆来源合法声明')
        return
      }
      // 发送请求
      let { result } = await carInfo_add(this.data.busInfo)
      if (result) {
        // 更新车架号
        app.globalData.busInfo.vin = result.vin
        app.globalData.busInfo.vehicleId = result.vehicleId
        this.triggerEvent('nextStep')
        // 审核状态查询
        this.triggerEvent('checkStatus')
      }
    }
  }
})
 