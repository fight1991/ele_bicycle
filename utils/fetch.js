import config from '../config/index'
const { showLoading, closeLoading, HandleBranch } = require('../utils/fetch_fun')
const accessType = 'wechat-app'

// 构造函数
class Fetch {
  // 文件上传需要额外的token, 需要token作为入参的形式传入
  constructor ({contentType, method, baseURL}) {
    this.instance = (url, data = {}, token = '') => new Promise((resolve,reject) => {
      wx.request({
        url: baseURL + url,
        header: {
          'token': token || wx.getStorageSync('token') || '',
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
// 生成实例
const {instance: getInstance} = new Fetch({
  baseURL: config.API,
  method: 'GET'
})
const {instance: postInstance} = new Fetch({
  baseURL: config.API,
  method: 'POST'
})
const {instance: deleteInstance} = new Fetch({
  baseURL: config.API,
  method: 'DELETE'
})
const {instance: putInstance} = new Fetch({
  baseURL: config.API,
  method: 'PUT'
})
const {instance: uploadInstance} = new Fetch({
  baseURL: config.FILE,
  method: 'POST',
  contentType: 'multipart/form-data'
})

// 方法统一包装
const ajaxFunc = async ({url, data, isLoading, token, func}) => {
  try {
    if (isLoading) showLoading()
    let res = await func(url, data, token)
    if (isLoading) closeLoading()
    return HandleBranch(res.data)
  } catch (error) {
    if (isLoading) closeLoading()
    console.log(error)
    return { error: error}
  }
}

// 方法绑定
wx.$get = ({url, data, isLoading = true}) => {
  return ajaxFunc({url, data, isLoading, func: getInstance})
}
wx.$post = ({url, data, isLoading = true}) => {
  return ajaxFunc({url, data, isLoading, func: postInstance})
}
wx.$delete = ({url, data, isLoading = true}) => {
  return ajaxFunc({url, data, isLoading, func: deleteInstance})
}
wx.$put = ({url, data, isLoading = true}) => {
  return ajaxFunc({url, data, isLoading, func: putInstance})
}
wx.$upload = ({url, data, token, isLoading = true}) => {
  if (!token) console.error('需附带上传的token')
  return ajaxFunc({url, data, isLoading, token, func: uploadInstance})
}
// export default null