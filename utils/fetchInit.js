import config from '../config/index'
const accessType = 'wechat-app'

// 请求构造函数get/put/delete/post等
class Fetch {
  // 文件上传需要额外的token, 需要token作为入参的形式传入
  constructor ({contentType, method, baseURL}) {
    this.instance = (url, data = {}, headerToken = '') => new Promise((resolve,reject) => {
      wx.request({
        url: baseURL + url,
        header: {
          'token': headerToken || wx.getStorageSync('token') || '',
          'content-type': contentType || 'application/json'
        },
        method,
        data: {
          data,
          accessType: accessType
        },
        success:resolve,
        fail:reject
      })
    })
  }
}
class Upload {
  // 文件上传需要额外的token, 需要token作为入参的形式传入
  constructor () {
    this.instance = (url, data = {}, filePath, name = 'file', headerToken = '') => new Promise((resolve,reject) => {
      wx.request({
        url: config.FILE + url,
        name,
        filePath,
        header: {
          'Content-Type': 'multipart/form-data',
          'token': headerToken,
        },
        formData: data,
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
export const {instance: uploadInstance} = new Upload()
