import config from '../config/index'
const { showLoading, closeLoading, HandleBranch } = require('../utils/fetch_fun')
const accessType = 'wechat-app'

// 构造函数
class Fetch {
  constructor ({contentType, method, baseURL}) {
    this.header = {
      'token': wx.getStorageSync('token') || '',
      'content-type': contentType || 'application/json',
    }
    this.instance = (url, data = {}) => new Promise((resolve,reject) => {
      wx.request({
        url: baseURL + url,
        header: this.header,
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
const ajaxFunc = async (url, data, isLoading, func) => {
  try {
    if (isLoading) showLoading()
    let res = await func(url, data)
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
  return ajaxFunc(url, data, isLoading, getInstance)
}
wx.$post = ({url, data, isLoading = true}) => {
  return ajaxFunc(url, data, isLoading, postInstance)
}
wx.$put = ({url, data, isLoading = true}) => {
  return ajaxFunc(url, data, isLoading, putInstance)
}
wx.$upload = ({url, data, isLoading = true}) => {
  return ajaxFunc(url, data, isLoading, uploadInstance)
}
// export default null