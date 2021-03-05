// pages/user/record/personInfo/personInfo.js
import WxValidate from '../../../../utils/WxValidate'

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
    showForm: false, // 是否显示个人表单信息
    // 占位图片是否显示
    faceShow: true,
		frontShow: true,
    backShow: true,

    // 图片临时路径
    faceSrc: '',
		frontSrc: '',
    backSrc: '',

    // 图片源数据
    faceImageData: null,
    frontImageData: null,
    backImageData: null,

    // 表单数据
    personData: {
      name: '',
      idcard: '',
      sex: '',
      phone: '',
      link: '',
      detail: ''
    },
    // 性别
    sexArr: [
      {
        value: 1,
        label: '男'
      },
      {
        value: 2,
        label: '女'
      }
    ],
    // 性别下标
    sexIndex: 0,
    // 省/市/区
    regionIndex: [],
    regionCode: [],
    regionLabel: '请选择联系地址'
  },
  lifetimes: {
    attached: function (e) {
      this.initValid()
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 点击拍摄人脸按钮
    faceBtn () {
      wx.navigateTo({
        url: '/pages/user/camera/front',
      })
      // this.choosePhoto('camera', (res) => {
      //   const tempFilePaths = res.tempFilePaths
      //     // 存储照片信息
      // })
    },
    // 点击身份证按钮
    idcartBtn (e) {
      // mode=front 为身份证正面, mode=back为身份证反面
      var mode = e.currentTarget.dataset.mode
      console.log(mode)
      wx.showActionSheet({
        itemList: ['拍照','从相册中选择'],
        success: (res) => {
          console.log(res.tapIndex)
          if (res.tapIndex == 0) {
            wx.navigateTo({
              url: '/pages/user/camera/back?mode=' + mode,
            })
          }
          if (res.tapIndex == 1) {
            this.choosePhoto('album', (res) => {
              console.log('从相册中选择图片----------')
              console.log(res)
              this.setData({
                [mode + 'Src']: res.tempFilePaths[0],
                [mode + 'Show']: false
              })
            })
          }
        }
      })
    },
    // 打开相册或摄像头
    choosePhoto (type, callback) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: [type],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          callback && callback(res)
        }
      })
    },
    // 下一步的按钮
    nextStep () {
      var isPass = this.nextIsPass()
      // if (!isPass) return
      this.setData({
        showForm: true
      })
    },
    // 出发父组件下一步
    commitNext () {
      var temp = {
        detail: {
          value: this.data.personData
        }
      }
      // 表单数据校验,checkform参数 要是form事件对象,故包装一下
      let isPass = this.validate.checkForm(temp)
      if (!isPass) {

      }
      wx.showModal({
        title: '温馨提示',
        content: '请确认联系地址是否正确?',
        success: (res) => {
          if (res.confirm) {
            this.triggerEvent('nextStep')
          }
        }
      })
    },
    nextIsPass () {
      var title = ''
      let { faceSrc, frontSrc, backSrc } = this.data
      if (!faceSrc) {
        title = '请上传人脸照片'
      } else if (!frontSrc) {
        title = '请上传身份证正面照片'
      } else {
        title = '请上传身份证反面照片'
      }
      wx.showToast({
        title: title,
        icon: 'none',
        duration: 1500
      })
      return faceSrc && frontSrc && backSrc
    },
    // 表单方法区域
    bindData (e) {
      var id = e.currentTarget.id
      this.data.personData[id] = e.detail.value
    },
    // 初始化校验方法
    initValid () {
      const rules = {

      }
      const messages = {

      }
      this.validate = new WxValidate(rules, messages)
    },
    // 省市区事件
    getAddressInfo (e) {
      var { code, value} = e.detail
      this.data.regionCode = code
      this.setData({
        regionLabel: value.join(' ,')
      })
    }
  }
})
