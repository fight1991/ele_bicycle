// 备案申报相关api

// 备案申报个人信息--上传图片
/**
 * params {cityCode, contactAddress, imageHead, imageIDCard1, imageIDCard2}
 */
export const personal_uploadImg = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/personal_info/images',
    data
  })
}

// 备案申报-个人信息-填写联系地址
/** params  {cityCode, contactAddress}*/
export const personal_contact = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/personal_info/contact',
    data
  })
}

// 备案申报个人信息获取
export const personal_search = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/personal_info',
    data
  })
}

// 备案申报个人信息创建
export const personal_add = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/personal_info',
    data
  })
}

// 车辆信息相关api >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 备案申报-车辆信息创建
export const carInfo_add = (data) => {
  return wx.$post_business({
    url: '/ebike-management/ebike/create',
    data
  })
}
// 车辆信息列表
export const carInfo_List = (data) => {
  return wx.$post_business({
    url: '/ebike-management/ebike/list',
    data
  })
}
// 删除车辆备案登记
export const carInfo_delete = (data) => {
  return wx.$post_business({
    url: '/ebike-management/ebike/delete',
    data
  })
}
// 车辆信息详情, 轮播图区域用
export const carInfo_detail = (data) => {
  return wx.$post_business({
    url: '/ebike-management/ebike/detail',
    data
  })
}
// 查询车辆信息
export const carInfo_read = (data) => {
  return wx.$post_business({
    url: '/ebike-management/ebike/read',
    data
  })
}
// 车辆信息相关api结束 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.
// 备案申报查询
// 备案申报状态
export const record_status = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/battery_car_record_filing',
    data
  })
}
// 改变状态
export const record_status_update = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/battery_car_record_filing/update_status',
    data
  })
}
// 车辆备案人变更 - 查询状态
export const car_owner_change_status = (data, isLoading=true) => {
  return wx.$post_business({
    isLoading,
    url: '/battery-car-management/battery_car_ownership_change/get_status',
    data
  })
}

// 车辆备案人变更 - 扫码
export const car_owner_change_scan = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/battery_car_ownership_change',
    data
  })
}

// 车辆备案人变更 - 取消变更
export const car_owner_change_cancel = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/battery_car_ownership_change/cancel',
    data
  })
}

// 车辆报废 -状态查询
export const car_scrap_search = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/battery_car_scrap',
    data
  })
}

// 车辆报废
export const car_scrap_op = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/battery_car_scrap',
    data
  })
}

// 车辆报废 - 取消申请
export const car_scrap_cancel = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/battery_car_scrap',
    data
  })
}

// 车辆挂失-状态查询
export const car_loss_search = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/battery_car_report_loss',
    data
  })
}
// 车辆挂失-
export const car_loss_op = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/battery_car_report_loss',
    data
  })
}
// 车辆挂失-已找回、重新申请
export const car_loss_reput = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/battery_car_report_loss',
    data
  })
}
// 操作员安装车牌上报
export const install_report = (data) => {
  return wx.$post_business({
    url: '/battery-car-management/operator_installation_report',
    data
  })
}