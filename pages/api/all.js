
// 用户基本信息, 业务信息, 权限信息
export const getAllUserInfo = () => {
  return wx.$all({
    data: [
      {
        url: '/data-user/user/getUserByToken',
        source: 'user'
      }, {
        url: '/data-user/user/getUserViews',
        source: 'user',
        data: {
          appId: '',
          accountId: '',
          orgId: ''
        }
      }, {
        url: '/user-center/personal/getInfo',
        source: 'business'
      }
    ]
  })
}