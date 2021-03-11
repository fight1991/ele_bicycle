// 登录凭证校验
export const checkCode = (data) => {
  return wx.$post({
    url: '/battery-car-management/union_id',
    data
  })
}
// 用户登录
export const goLogin = (data) => {
  return wx.$post({
    url: '/battery-car-management/token',
    data
  })
}
// 用户基本信息查询
export const getUserBaseInfo = (data) => {
  return wx.$get({
    url: '/battery-car-management/token'
  })
}
// 注销登录
export const logOut = (data) => {
  return wx.$delete({
    url: '/battery-car-management/token'
  })
}
// 更换手机号
export const changeMobile = (data) => {
  return wx.$put({
    url: '/battery-car-management/personal_info/mobile',
    data
  })
}
// 获取手机验证码
export const getCodeApi = (data) => {
  return wx.$get({
    url: '/battery-car-management/auth_code_mobile',
    data
  })
}