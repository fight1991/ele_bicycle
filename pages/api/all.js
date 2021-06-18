
// 用户基本信息, 业务信息, 权限信息
export const getAllUserInfo = () => {
  return wx.$all({
    data: [
      {
        url: '/data-user/user/getUserByToken',
        source: 'user'
      }, {
        url: '/user-center/member-user/getUserViews',
        source: 'user',
        data: {
          appId: '',
          uid: '',
          orgId: ''
        }
      }, {
        url: '/user-center/personal/getInfo',
        source: 'business'
      }
    ]
  })
}