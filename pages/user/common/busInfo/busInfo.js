// pages/user/record/busInfo/busInfo.js
var app = getApp()
const { carInfo_read, riderVehicleCreate, riderVehicleRead, carInfo_add, licenseOcr, orgVehicleRead, orgRecord } = app.api
const apiObj = {
  personalBusiness: {
    read: carInfo_read,
    create: carInfo_add
  },
  livelihoodBusiness: {
    read: riderVehicleRead,
    create: riderVehicleCreate
  },
  livelihoodBusiness_corp: {
    read: orgVehicleRead,
    create: orgRecord
  }
}
import WxValidate from '../../../../utils/WxValidate'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pageFlag: {
      type: String,
      value: 'personalBusiness'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 双向绑定图片的值
    urlCertification: '',
    urlInvoice: '',
    urlMotor: '',
    urlVin: '',
    // 车辆属性
    pickerArrProp: ['非国标车', '新国标车'],
    pickerArrPropValue: ['NON_STANDARD', 'STANDARD'],
    pickerArrPropObj: {
      NON_STANDARD: '非国标车',
      STANDARD: '新国标车'
    },
    // 装牌方式
    pickerArrType: ['邮寄到家', '安装点安装'],
    pickerArrTypeValue: ['MAIL', 'INSTALLATION'],
    pickerArrTypeObj: {
      MAIL: '邮寄到家',
      INSTALLATION: '安装点安装'
    },

    isChecked: true,
    scanCode: '',
    busInfo: {
      brand: '',
      installationMethods: '', // 安装方式
      model: '',
      properties: '', // 车辆属性
      urlCertification: '', // 车辆合格证
      urlInvoice: '', // 车辆发票
      urlMotor: '', // 电动机编号
      urlVin: '', // 车架号图片地址
      vin: '',
      motorNo: ''
    },
    hiddenCase: true,
    currentCase: 'cert',
    caseImgObj: {
      cert: {
        img: '/pages/image/case/cert.jpg',
        subTitle: '车辆合格证照片'
      },
      invoice: {
        img: '/pages/image/case/invoice.jpg',
        subTitle: '购车发票照片'
      },
      vin: {
        img: '/pages/image/case/vin.jpg',
        subTitle: '车架号照片'
      },
      elec: {
        img: '/pages/image/case/elec.jpg',
        subTitle: '电动机编码照片'
      }
    }
  },
  // 页面初始化后查询车辆信息
  lifetimes: {
    attached: function (e) {
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
        urlCertification: {
          required: true
        },
        vin: {
          required: true
        },
        motorNo: {
          required: true
        },
        brand: {
          required: true
        },
        model: {
          required: true
        },
        properties: {
          required: true
        },
        installationMethods: {
          required: true
        },
        urlInvoice: {
          required: true
        },
        urlMotor: {
          required: true
        },
        urlVin: {
          required: true
        }
      }
      let messages = {
        urlCertification: {
          required: '请先上传车辆合格证'
        },
        vin: {
          required: '请输入整车编号'
        },
        motorNo: {
          required: '请输入电动机编码'
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
        installationMethods: {
          required: '请选择装牌方式'
        },
        urlInvoice: {
          required: '请上传购车发票'
        },
        urlMotor: {
          required: '请上发动机编号'
        },
        urlVin: {
          required: '请上传车架号'
        }
      }
      this.validate = new WxValidate(rules, messages)
    },
    // 初始化信息
    async initInfo (id) {
      let { pageFlag } = this.data
      let { result } = await apiObj[pageFlag]['read'](id)
      if (result) {
        this.setData({
          busInfo: result
        })
        let { urlCertification, urlInvoice, urlVin, urlMotor } = result
        if (urlCertification) {
          this.setData({
            urlCertification
          })
        }
        if (urlVin) {
          this.setData({
            urlVin
          })
        }
        if (urlMotor) {
          this.setData({
            urlMotor
          })
        }
        if (urlInvoice) {
          this.setData({
            urlInvoice
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
        'busInfo.properties': this.data.pickerArrPropValue[e.detail.value]
      })
    },
    // 装牌方式
    bindBrandPicker (e) {
      this.setData({
        'busInfo.installationMethods': this.data.pickerArrTypeValue[e.detail.value]
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
    // 单选按钮
    radioBtn (e) {
      this.setData({
        isChecked: !this.data.isChecked
      })
    },
    routeTo () {
      wx.navigateTo({
        url: '/pages/user/personalBusiness/record/law/law',
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
      let { busInfo, urlCertification, urlInvoice, urlMotor, urlVin, isChecked, pageFlag } = this.data
      busInfo.urlCertification = urlCertification || ''
      busInfo.urlInvoice = urlInvoice || ''
      busInfo.urlMotor = urlMotor || ''
      busInfo.urlVin = urlVin || ''
      var temp = {
        detail: {
          value: busInfo
        }
      }
      // 校验表单
      let isPass = this.validate.checkForm(temp)
      if (!isPass) {
        let error = this.validate.errorList[0]
        this.showModal(error.msg)
        return
      }
      // 整车编号, 电动机编码 不能为中文字
      let { vin, motorNo } = busInfo
      let reg = /^[0-9A-Za-z]+$/
      if (!reg.test(vin)) {
        this.showModal('整车编号由字母和数字组成')
        return
      }
      if (!reg.test(motorNo)) {
        this.showModal('电动机编码由字母和数字组成')
        return
      }
      if (!isChecked) {
        this.showModal('请勾选车辆来源合法声明')
        return
      }
      // 发送请求
      let { result } = await apiObj[pageFlag]['create'](busInfo)
      if (result) {
        this.triggerEvent('nextStep', result)
        // 审核状态查询
        this.triggerEvent('checkStatus')
      }
    },
    // 车辆合格证ocr识别
    async certOcr (e) {
      let url = e.detail
      if (!url) return
      let { result } = await licenseOcr({
        imageUrl: url
      })
      if (result) {
        let { brand = '', motorNo = '', vin = '' } = result
        this.setData({
          'busInfo.brand': brand,
          'busInfo.motorNo': motorNo,
          'busInfo.vin': vin
        })
      }
    },
    // 打开案例
    openCase (e) {
      var temp = e.currentTarget.dataset.case
      this.setData({
        currentCase: temp,
        hiddenCase: false
      })
    }
  }
})
 