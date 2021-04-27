// pages/components/swiper/swiper.js
var app = getApp()
const { carInfo_List, carInfo_delete, carInfo_detail, checkDictionaryVersion, getDictionaryData } = app.api
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
      'auditing': '/pages/user/record/record',
      'waitInstall': '/pages/user/record/record',
      'reportedLost': '/pages/user/loss/loss',
      'failure': '/pages/user/record/record'
    }
  },
  lifetimes: {
    attached: async function () {
      
    }
  },
  pageLifetimes: {
    show () {
      this.getList()
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 查询列表
    async getList () {
      let { result } = await carInfo_List()
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
          }
        } else {
          app.saveCurrentVehicleId(result[0]['vehicleId'])
          wx.setStorageSync('currentVehicleId', result[0]['vehicleId'])
          this.triggerEvent('switchSwiper', result[0])
        }
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
      let { list, currentIndex, pageInfo } = this.data
      let { vehicleStatus, vehicleId, vin, installationMethods} = list[currentIndex]
      let page = pageInfo[vehicleStatus]
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
      let { result } = await carInfo_delete(this.data.currentId)
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
      wx.navigateTo({
        url: '/pages/user/record/record?opType=edit&id=' + id,
      })
    }
  }
})
