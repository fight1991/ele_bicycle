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
