// 备案申报相关api

// 备案申报个人信息--上传图片
/**
 * params {cityCode, contactAddress, imageHead, imageIDCard1, imageIDCard2}
 */
export const personal_uploadImg = (data) => {
  return wx.$put({
    url: '/battery-car-management/personal_info/images',
    data
  })
}

// 备案申报-个人信息-填写联系地址
/** params  {cityCode, contactAddress}*/
export const personal_contact = (data) => {
  return wx.$put({
    url: '/battery-car-management/personal_info/contact',
    data
  })
}

// 备案申报个人信息获取
export const personal_search = (data) => {
  return wx.$get({
    url: '/battery-car-management/personal_info',
    data
  })
}

// 备案申报个人信息创建
export const personal_add = (data) => {
  return wx.$post({
    url: '/battery-car-management/personal_info',
    data
  })
}

// 备案申报-车辆信息获取
export const carInfo_search = (data) => {
  return wx.$get({
    url: '/battery-car-management/battery_car',
    data
  })
}

// 备案申报-车辆信息创建
export const carInfo_add = (data) => {
  return wx.$post({
    url: '/battery-car-management/battery_car',
    data
  })
}
// 车辆信息-公共数据查询
export const carInfo_public = (id, data) => {
  return wx.$get({
    url: '/battery_car/public/' + id,
    data
  })
}

// 备案申报获取状态
export const record_status = (data) => {
  return wx.$get({
    url: '/battery-car-management/battery_car_record_filing',
    data
  })
}

// 车辆备案人变更 - 查询状态
export const car_owner_change_status = (data, isLoading=true) => {
  return wx.$post({
    isLoading,
    url: '/battery-car-management/battery_car_ownership_change/get_status',
    data
  })
}

// 车辆备案人变更 - 扫码
export const car_owner_change_scan = (data) => {
  return wx.$post({
    url: '/battery-car-management/battery_car_ownership_change',
    data
  })
}

// 车辆备案人变更 - 取消变更
export const car_owner_change_cancel = (data) => {
  return wx.$put({
    url: '/battery-car-management/battery_car_ownership_change',
    data
  })
}

// 车辆报废 -状态查询
export const car_scrap_search = (data) => {
  return wx.$get({
    url: '/battery-car-management/battery_car_scrap',
    data
  })
}

// 车辆报废
export const car_scrap_op = (data) => {
  return wx.$post({
    url: '/battery-car-management/battery_car_scrap',
    data
  })
}

// 车辆报废 - 取消申请
export const car_scrap_cancel = (data) => {
  return wx.$put({
    url: '/battery-car-management/battery_car_scrap',
    data
  })
}

// 车辆挂失-状态查询
export const car_loss_search = (data) => {
  return wx.$get({
    url: '/battery-car-management/battery_car_report_loss',
    data
  })
}
// 车辆挂失-
export const car_loss_op = (data) => {
  return wx.$post({
    url: '/battery-car-management/battery_car_report_loss',
    data
  })
}
// 车辆挂失-已找回、重新申请
export const car_loss_reput = (data) => {
  return wx.$put({
    url: '/battery-car-management/battery_car_report_loss',
    data
  })
}
// 操作员安装车牌上报
export const install_report = (data) => {
  return wx.$post({
    url: '/battery-car-management/operator_installation_report',
    data
  })
}