// 骑手公司信息api
// 骑手积分api
export const riderScore = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderOrg/getScoreInfo',
    data
  })
}
// 退出企业
export const exitOrg = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderOrg/exit',
    data
  })
}
// 同意加入企业
export const joinOrg = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderOrg/join',
    data
  })
}
// 获取企业信息
export const orgInfo = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderOrg/orgInfo',
    data
  })
}

// 骑手车辆信息api>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 骑手 车牌列表
export const riderBrandList = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderEbike/privateVehicleList',
    data
  })
}
// 骑手 新车申报
export const riderVehicleCreate = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderEbike/createNew',
    data
  })
}
//骑手 删除车辆备案登记
export const riderVehicleDelete = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderEbike/delete',
    data
  })
}
// 骑手备案申报后 查询详情
export const riderVehicleRead = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderEbike/read',
    data
  })
}
//骑手 车辆备案登记详情
export const riderVehicleDetail = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderEbike/detail',
    data
  })
}
// 骑手 车辆列表
export const riderVehicleList = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderEbike/list',
    data
  })
}
// 骑手车辆升级
export const riderVehicleUpdate = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderEbike/upgrade',
    data
  })
}

// 企业车辆信息api开始>>>>>>>>>>>>>>>>>>
// 获取申请单列表
export const getAuditList = (data, page) => {
  return wx.$post_business({
    url: '/ebike-management/orgEbike/auditList',
    data,
    page
  })
}
// 企业车备案申报
export const orgRecord = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgEbike/create',
    data
  })
}
// 企业车 备案申报删除
export const orgDelete = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgEbike/delete',
    data
  })
}
// 企业车 车辆信息详情
export const orgVehicleDetail = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgEbike/detail',
    data
  })
}
// 企业车 备案申报查询车辆信息
export const orgVehicleRead = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgEbike/read',
    data
  })
}
// 企业车备案申报列表
export const orgVehicleList = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgEbike/vehicleList',
    data
  })
}
