// pages/user/record/personInfo/personInfo.js
var app = getApp()
import { upload_func } from '../../../api/upload'
import {personal_uploadImg, personal_contact, personal_search} from '../../../api/record'
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

    // 图片上传到服务器之后的地址
    faceImgUrl: null,
    frontImgUrl: null,
    backImgUrl: null,

    // 表单数据
    personData: {
      cityCode: [],
      cityCodeIndex: [],
      contactAddress: '',
      gender: 0, // 0:男 1:女
      idName: '',
      idNO: '',
      idType: 1,
      imageHead: '',
      imageIDCard1: '',
      imageIDCard2: '',
      mobile: ''
    },
    // 性别
    sexArr: ['男', '女'],
    // 省/市/区
    region: [],
    regionCode: [],
    regionLabel: '请选择联系地址'
  },
  lifetimes: {
    attached: function (e) {
      this.initInfo()
    }
  },
  pageLifetimes: {
    show: function (options) {
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 数据初始化查询
    async initInfo () {
      let { result } = await personal_search()
      if (result) {
        let { imageHead, imageIDCard1, imageIDCard2 } = result
        if (imageHead) {
          this.setData({
            faceImgUrl: imageHead,
            frontImgUrl: imageIDCard1,
            backImgUrl: imageIDCard2,
            faceShow: false,
            frontShow: false,
            backShow: false,
          })
          // 触发附件关闭已阅读弹窗
          this.triggerEvent('closeAgreeDialog')
        }
      }
    },
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
          console.log(res, '备案申报拍照/选择图片')
          var type = 'album'
          if (res.tapIndex == 0) {
            type = 'camera'
            // wx.navigateTo({
            //   url: '/pages/user/camera/back?mode=' + mode,
            // })
          }
          this.choosePhoto(type,  async (res) => {
            console.log('从相册中选择图片----------')
            var tempPath = res.tempFilePaths[0]
            // 得到文件的hash值
            let hash = await upload_func(tempPath)
            if (hash) {
              this.setData({
                // [mode + 'Src']: res.tempFilePaths[0],
                [mode + 'Show']: false,
                [mode + 'ImgUrl']: app.hashUrl + hash
              })
            }
          })
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
    async nextStep () {
      var isPass = this.nextIsPass()
      if (!isPass) return
      // 保存图片
      let { faceImgUrl, frontImgUrl, backImgUrl } = this.data
      let { result: res1 } = await personal_uploadImg({
        imageHead: faceImgUrl,
        imageIDCard1: frontImgUrl,
        imageIDCard2: backImgUrl
      })
      // 图片保存成功, 显示表单, 并查询识别后的信息
      if (!res1) return
      let { result: res2 } = await personal_search()
      if (res2) {
        this.setData({
          showForm: true,
          personData: res2,
          region: res2.cityCodeIndex
        })
      }
    },
    // 出发父组件下一步
    commitNext () {
      // 表单数据校验
      let isPass = this.validForm()
      if (!isPass) return
      // 保存表单数据
      wx.showModal({
        title: '温馨提示',
        content: '请确认联系地址是否正确?',
        success: async (res) => {
          if (res.confirm) {
            let { personData: {contactAddress, cityCode, cityCodeIndex} } = this.data
            let { result } = await personal_contact({
              cityCode,
              contactAddress,
              cityCodeIndex
            })
            if (result) {
              this.triggerEvent('nextStep')
            }
          }
        }
      })
    },
    nextIsPass () {
      var title = ''
      let { faceImgUrl, frontImgUrl, backImgUrl } = this.data
      if (!faceImgUrl) {
        title = '请上传人脸照片'
      } else if (!frontImgUrl) {
        title = '请上传身份证正面照片'
      } else {
        title = '请上传身份证反面照片'
      }
      let valid = faceImgUrl && frontImgUrl && backImgUrl
      if (!valid){
        wx.showToast({
          title: title,
          icon: 'none',
          duration: 1500
        })
      }
      return valid
    },
    // 表单方法区域
    bindData (e) {
      var id = e.currentTarget.id
      this.data.personData[id] = e.detail.value
    },
    // 校验表单
    validForm () {
      let { personData: {contactAddress, cityCode} } = this.data
      var flag1 = Array.isArray(cityCode) && cityCode.length
      if (!flag1) {
        wx.showToast({
          title: '请选择联系地址',
          icon: 'none'
        })
        return false
      }
      if (!contactAddress) {
        wx.showToast({
          title: '请填写详细地址',
          icon: 'none'
        })
        return false
      }
      return true
    },
    // 省市区事件
    getAddressInfo (e) {
      console.log(e)
      var { code, value } = e.detail
      this.data.personData.cityCode = code
      this.data.personData.cityCodeIndex = value
      this.setData({
        region: value
      })
    }
  }
})
