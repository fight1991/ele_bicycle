import config from '../config/index'
const { showLoading, closeLoading, HandleBranch, HandleBranchFile } = require('../utils/fetch_fun')
const accessType = 'wechat-app'

// 请求构造函数get/put/delete/post等
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
// 方法统一包装
const ajaxFunc = async ({url, data, isLoading, func}) => {
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


// 文件上传
const uploadInstance = ({url, data}) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: config.FILE + url,
      name: 'file',
      filePath: data.filePath,
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        token: data.upToken
      },
      success: resolve,
      fail: reject
    })
  })
}
wx.$upload = async ({url, data, text, isLoading = true}) => {
  try {
    if (isLoading) showLoading(text)
    let res = await uploadInstance({url, data})
    if (isLoading) closeLoading()
    return HandleBranchFile(res)
  } catch (error) {
    if (isLoading) closeLoading()
    console.log(error)
    return { error: error}
  }
}