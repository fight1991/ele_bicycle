// pages/components/swiper/swiper.js
var app = getApp()
const { carInfo_List, carInfo_delete, riderVehicleList, riderVehicleDelete, translateDic, checkDictionaryVersion, getDictionaryData } = app.api
const apiObj = {
  personalBusiness: {
    list: carInfo_List,
    delete: carInfo_delete
  },
  livelihoodBusiness: {
    list: riderVehicleList,
    delete: riderVehicleDelete
  }
}
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
    bannerBg: app.utils.imgTobase64('/pages/image/record_banner.jpg'),
    currentIndex: 0,
    confirmDialogVisible: false,
    maskHidden: true, // 设置mask初始为 隐藏, 点击二维码按钮显示
    detailMaskHidden: true, // 详情弹窗
    codeValue: '', // 二维码字符串
    qrCodeUrl: '', // 车辆信息查询获得
    currentId: '', // 当前车辆id
    list: [],
    pageInfo: {
      personalBusiness: {
        'auditing': '/pages/user/personalBusiness/record/record',
        'waitInstall': '/pages/user/personalBusiness/record/record',
        'reportedLost': '/pages/user/loss/loss?pageFlag=personalBusiness',
        'failure': '/pages/user/personalBusiness/record/record',
      },
      livelihoodBusiness: {
        'auditing': '/pages/user/livelihoodBusiness/record/record',
        'waitInstall': '/pages/user/livelihoodBusiness/record/record',
        'reportedLost': '/pages/user/loss/loss?pageFlag=livelihoodBusiness',
        'failure': '/pages/user/livelihoodBusiness/record/record'
      }
    },
    dicVehicleStatus: {}, // 状态字典
  },
  lifetimes: {
    attached: function () {

    }
  },
  pageLifetimes: {
    async show () {
      this.setData({
        dicVehicleStatus: await translateDic('vehicleStatus')
      })
      this.getList()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 查询列表
    async getList () {
      let { pageFlag } = this.data
      let { result } = await apiObj[pageFlag]['list']()
      if (result && result.length > 0) {
        var vehicleId = wx.getStorageSync('currentVehicleId')
        this.setData({
          list: result
        })
        if (vehicleId) {
          let index = result.findIndex(v => v.vehicleId == vehicleId)
          if (index >= 0) {
            app.saveCurrentVehicleId(vehicleId)
            this.setData({
              currentIndex: index
            })
            this.triggerEvent('switchSwiper', result[index])
            return
          }
        }
        app.saveCurrentVehicleId(result[0]['vehicleId'])
        wx.setStorageSync('currentVehicleId', result[0]['vehicleId'])
        this.triggerEvent('switchSwiper', result[0])
      }
    },
    // 切换轮播图事件
    swiperChange (e) {
      let currIndex = e.detail.current
      let { list } = this.data
      this.setData({
        currentIndex: currIndex
      })
      wx.setStorageSync('currentVehicleId', list[currIndex]['vehicleId'])
      app.saveCurrentVehicleId(list[currIndex]['vehicleId'])
      this.triggerEvent('switchSwiper', list[currIndex])
    },
    // 跳转到相关页面
    routeToPage () {
      let { list, currentIndex, pageInfo, pageFlag } = this.data
      let { vehicleStatus, vehicleId, vin, installationMethods} = list[currentIndex]
      let page = pageInfo[pageFlag][vehicleStatus]
      if (!page) return
      wx.navigateTo({
        url: `${page}?opType=look&id=${vehicleId}&installType=${installationMethods}&vin=${vin}`
      })
    },
    // 点击文字区域, 显示详情
    openDetailDialog () {
      this.setData({
        detailMaskHidden: false
      })
    },
    // 点击二维码按钮显示二维码
    showErweima () {
      let { list, currentIndex } = this.data
      this.setData({
        maskHidden: false,
        codeValue: list[currentIndex]['qrCodeUrl']
      })
    },
    // 删除按钮
    deleteBtn (e) {
      this.data.currentId = e.currentTarget.dataset.id
      this.setData({
        confirmDialogVisible: true
      })
    },
    // 删除车辆信息
    async deleteCarInfo () {
      let { pageFlag } = this.data
      let { result } = await apiObj[pageFlag]['delete'](this.data.currentId)
      if (result) {
        wx.showToast({
          title: '删除成功!'
        })
        this.getList()
      }
    },
    // 编辑按钮, 跳转到申报页面的完善车辆信息
    editBtn (e) {
      let id = e.currentTarget.dataset.id
      let { pageFlag } = this.data
      wx.navigateTo({
        url: `/pages/user/${pageFlag}/record/record?opType=edit&id=${id}`,
      })
    }
  }
})
