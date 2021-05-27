import config from '../../config/index'
// 公共平台api开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 用户登录
export const loginApi = (data) => {
  return wx.$post_business({
    url: '/user-center/loginByMobile',
    data
  })
}
// 根据token查询 用户基本信息
export const getBasicUserInfo = (isLoading) => {
  return wx.$post_business({
    url: '/user-center/user/getUserByToken',
    data: wx.getStorageSync('token'),
    isLoading
  })
}
// 查询权限编码
export const getUserPermission = (data = {}, isLoading) => {
  return wx.$post_business({
    url: '/user-center/user/getUserViews',
    data: {
      appId: config.APPID,
      ...data
    },
    isLoading
  })
}
// 公共平台api结束>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// 业务平台接口开始>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// 用户完整信息查询
export const getUserTotalInfo = (isLoading) => {
  return wx.$post_business({
    url: '/user-center/personal/getUserInfo',
    isLoading
  })
}

// 注销登录
export const logOut = (data) => {
  return wx.$post_business({
    url: '/user-center/logout',
    data
  })
}
// 更换手机号
export const changeMobile = (data) => {
  return wx.$post_business({
    url: '/user-center/user/changeMobile',
    data
  })
}
// 获取手机验证码
export const getCodeApi = (data) => {
  return wx.$post_business({
    url: '/user-center/getMobileAuthCode',
    data
  })
}

// 查看带掩码个人信息
export const show_idcard = (data) => {
  return wx.$post_business({
    url: '/user-center/personal/getMaskInfo',
    data
  })
}
// 身份认证-上传头像 身份证正反面
export const verifyPersonApi = (data) => {
  return wx.$post_business({
    url: '/user-center/personal/uploadImages',
    data
  })
}
// 提交身份认证后的信息
export const sumitPersonInfoApi = (data) => {
  return wx.$post_business({
    url: '/user-center/personal/uploadInfos',
    data
  })
}
// 获取上传身份证信息后的个人数据
export const getIdcardInfo = (data) => {
  return wx.$post_business({
    url: '/user-center/personal/getInfo',
    data
  })
}
// 获取新消息数量
export const getMessageNumApi = (data) => {
  return wx.$post_business({
    url: '/user-center/notification/getNoticeCount',
    data,
    isLoading: false
  })
}
// 获取消息列表
export const getMessageListApi = ({data, page}) => {
  return wx.$post_business({
    url: '/user-center/notification/getNoticeList',
    data,
    page
  })
}
// 获取消息详情
export const getMessageDetailApi = (data) => {
  return wx.$post_business({
    url: '/user-center/notification/getNoticeDetail',
    data
  })
}

// ocr识别
export const licenseOcr = (data) => {
  return wx.$post_business({
    url: '/user-center/ocr/license',
    data,
    loadingText: '图片识别中...'
  })
}