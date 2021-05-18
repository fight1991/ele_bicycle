import config from '../config/index'
const accessType = 'wechat-app'
// 请求构造函数get/put/delete/post等
class Fetch {
  // 文件上传需要额外的token, 需要token作为入参的形式传入
  constructor ({method, baseURL}) {
    this.instance = (url, data = {}, page = {}) => new Promise((resolve,reject) => {
      wx.request({
        url: baseURL + url,
        header: {
          'token':  wx.getStorageSync('token') || '',
          'content-type': 'application/json'
        },
        method,
        data: {
          data,
          page,
          accessType: accessType
        },
        success:resolve,
        fail:reject
      })
    })
  }
}
// 生成实例
// export const {instance: getInstance} = new Fetch({
//   baseURL: config.API,
//   method: 'GET'
// })
// export const {instance: deleteInstance} = new Fetch({
//   baseURL: config.API,
//   method: 'DELETE'
// })
// export const {instance: putInstance} = new Fetch({
//   baseURL: config.API,
//   method: 'PUT'
// })
export const {instance: userInstance} = new Fetch({
  baseURL: config.USRE_API,
  method: 'POST'
})
export const {instance: businessInstance} = new Fetch({
  baseURL: config.BUSINESS_API,
  method: 'POST'
})
