// 用户登录
export const goLogin = (data) => {
  return wx.$post({
    url: '​/user-center/loginMobile',
    data
  })
}
// 用户完整信息查询
export const getUserTotalInfo = (data, isLoading) => {
  return wx.$post({
    url: '/user-center/personal/getInfo',
    isLoading,
    data
  })
}

// 注销登录
export const logOut = (data) => {
  return wx.$post({
    url: '/user-center/logout',
    data
  })
}
// 更换手机号
export const changeMobile = (data) => {
  return wx.$post({
    url: '/user-center/user_center/changeMobile',
    data
  })
}
// 获取手机验证码
export const getCodeApi = (data) => {
  return wx.$post({
    url: '/user-center/getMobileAuthCode',
    data
  })
}

// 查看带掩码个人信息
export const show_idcard = (data) => {
  return wx.$post({
    url: '/user-center/personal/getMaskInfo',
    data
  })
}
// 身份认证-上传头像 身份证正反面
export const verifyPersonApi = (data) => {
  return wx.$post({
    url: '/user-center/personal/uploadImages',
    data
  })
}
// 提交身份认证后的信息
export const sumitPersonInfoApi = (data) => {
  return wx.$post({
    url: '/user-center​/personal​/uploadInfos',
    data
  })
}
// 获取新消息数量
export const getMessageNumApi = (data) => {
  return wx.$post({
    url: '/user-center/notification/getNoticeCount',
    data,
    isLoading: false
  })
}
// 获取消息列表
export const getMessageListApi = (data) => {
  return wx.$post({
    url: '/user-center/notification/getNoticeList',
    data
  })
}
// 获取消息详情
export const getMessageDetailApi = (data) => {
  return wx.$post({
    url: '/user-center/notification/getNoticeDetail',
    data
  })
}