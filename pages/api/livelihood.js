// 骑手公司信息api
// 骑手积分api
export const riderScore = (data) => {
  return wx.$post_business({
    url: '/ebike-management/rider/getScoreInfo',
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
// 绑定企业车
export const riderBingCorp = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderEbike/bind',
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
// 审核单列表
export const checkList = ({data, page}) => {
  return wx.$post_business({
    url: '/ebike-management/orgRiderManage/getAuditList',
    data,
    page
  })
}
// 审核单详情
export const approveDetail = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgRiderManage/auditDetail',
    data
  })
}
// 审核单同意/拒绝
export const checkApprove = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgRiderManage/approval',
    data
  })
}
// 骑手 车辆挂失
export const riderLoss = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderReportLoss/create',
    data
  })
}
// 骑手 车辆挂失找回
export const riderLossFind = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderReportLoss/delete',
    data
  })
}
// 骑手 车辆挂失状态
export const riderLossStatus = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderReportLoss/getStatus',
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
// 骑手 车辆报废申请
export const riderScrap = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderScrap/create',
    data
  })
}
// 骑手 车辆报废取消申请
export const riderScrapCancel = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderScrap/delete',
    data
  })
}
// 骑手 获取车辆报废状态
export const riderScrapStatus = (data) => {
  return wx.$post_business({
    url: '/ebike-management/riderScrap/getStatus',
    data
  })
}

// 企业车辆信息api开始>>>>>>>>>>>>>>>>>>
// 获取申请单列表
export const getAuditList = ({ data, page }) => {
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
// 企业车 列表
export const orgVehicleList = ({ data, page }) => {
  return wx.$post_business({
    url: '/ebike-management/orgEbike/vehicleList',
    data,
    page
  })
}


// 公司信息 企业积分等
export const orgScore = (data) => {
  return wx.$post_business({
    url: '/ebike-management/org/getScoreInfo',
    data
  })
}

// 骑手列表
export const riderList = ({data, page}) => {
  return wx.$post_business({
    url: '/user-center/orgUser/list',
    data,
    page
  })
}
// 分配骑手
export const riderAssign = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgRiderManage/assignRider',
    data
  })
}
// 企业车报废
export const corpVehicleScrap = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgScrap/create',
    data
  })
}
// 企业车报失
export const corpVehicleLoss = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgReportLoss/create',
    data
  })
}
// 企业车报失已找回
export const corpVehicleLossFind = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgReportLoss/delete',
    data
  })
}
// 企业车挂失状态
export const corpVehicleLossStatus = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgReportLoss/getStatus',
    data
  })
}
// 企业车报废状态查询
export const corpScrapStatus = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgScrap/getStatus',
    data
  })
}

// 企业车报废取消
export const corpScrapCancel = (data) => {
  return wx.$post_business({
    url: '/ebike-management/orgScrap/delete',
    data
  })
}
// 邀请骑手加入
export const inviteRider = (data) => {
  return wx.$post_business({
    url: '/user-center/orgUser/invite',
    data
  })
}
// 公司骑手移除
export const riderDelete = (data) => {
  return wx.$post_business({
    url: '/user-center/orgUser/remove',
    data
  })
}
// 查询公司信息
export const corpInfo = (data) => {
  return wx.$post_business({
    url: '/user-center/user/getUserOrgs',
    data
  })
}
// 切换到公司
export const toCorp = (data) => {
  return wx.$post_business({
    url: '/user-center/changeLoginOrg',
    data
  })
}

// 同意加入企业
export const acceptOrg = (data) => {
  return wx.$post_business({
    url: '/user-center/orgUser/join',
    data
  })
}
// 拒绝加入企业
export const refuseOrg = (data) => {
  return wx.$post_business({
    url: '/user-center/orgUser/fail',
    data
  })
}
// 退出企业
export const exitOrg = (data) => {
  return wx.$post_business({
    url: '/user-center/orgUser/leave',
    data
  })
}