// 备案申报相关api

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
    url: '/ebike-management/recordFiling/getStatus',
    data
  })
}

// 车辆备案人变更 - 查询状态
export const car_owner_change_status = (data, isLoading=true) => {
  return wx.$post_business({
    isLoading,
    url: '/ebike-management/ownershipChange/getStatus',
    data
  })
}

// 车辆备案人变更 - 扫码
export const car_owner_change_scan = (data) => {
  return wx.$post_business({
    url: '/ebike-management/ownershipChange/scanQrcode',
    data
  })
}

// 车辆备案人变更 - 取消变更
export const car_owner_change_cancel = (data) => {
  return wx.$post_business({
    url: '/ebike-management/ownershipChange/cancel',
    data
  })
}

// 车辆报废 -状态查询
export const car_scrap_search = (data) => {
  return wx.$post_business({
    url: '/ebike-management/scrap/getStatus',
    data
  })
}

// 车辆报废
export const car_scrap_op = (data) => {
  return wx.$post_business({
    url: '/ebike-management/scrap/create',
    data
  })
}

// 车辆报废 - 取消申请
export const car_scrap_cancel = (data) => {
  return wx.$post_business({
    url: '/ebike-management/scrap/delete',
    data
  })
}

// 车辆挂失-状态查询
export const car_loss_search = (data) => {
  return wx.$post_business({
    url: '/ebike-management/reportLoss/getStatus',
    data
  })
}
// 车辆挂失-
export const car_loss_op = (data) => {
  return wx.$post_business({
    url: '/ebike-management/reportLoss/create',
    data
  })
}
// 车辆挂失-已找回、重新申请
export const car_loss_reput = (data) => {
  return wx.$post_business({
    url: '/ebike-management/reportLoss/delete',
    data
  })
}
// 操作员安装车牌上报
export const install_report = (data) => {
  return wx.$post_business({
    url: '/ebike-management/operatorInstallationReport',
    data
  })
}