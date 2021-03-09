// 登录凭证校验
export const checkCode = (data) => {
  return wx.$get({
    url: '/union_id',
    data
  })
}
// 用户登录
export const goLogin = (data) => {
  return wx.$post({
    url: '/token',
    data
  })
}