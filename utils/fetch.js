import config from '../config/index'
const { showLoading, closeLoading, HandleBranch, HandleBranchFile } = require('../utils/fetch_fun')
const accessType = 'wechat-app'

// 请求构造函数get/put/delete/post等
class Fetch {
  // 文件上传需要额外的token, 需要token作为入参的形式传入
  constructor ({contentType, method, baseURL}) {
    this.instance = (url, data = {}) => new Promise((resolve,reject) => {
      wx.request({
        url: baseURL + url,
        header: {
          'token': wx.getStorageSync('token') || '',
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
const ajaxFunc = async ({url, data, isLoading, other, loadingText, func}) => {
  try {
    if (isLoading) showLoading(loadingText)
    let res = await func(url, data)
    if (isLoading) closeLoading()
    return HandleBranch(res.data, other)
  } catch (error) {
    if (isLoading) closeLoading()
    console.log(error)
    return { error: error}
  }
}
// 方法绑定
/**
 * url --> api地址
 * data --> 入参
 * isLoading --> 是否显示loading
 * loadingText --> loading 文字
 * other --> 是否显示业务报错弹框
 */
wx.$get = ({url, data, isLoading = true, other = true, loadingText = 'loading...'}) => {
  return ajaxFunc({url, data, isLoading, other, loadingText, func: getInstance})
}
wx.$post = ({url, data, isLoading = true, other = true, loadingText = 'loading...'}) => {
  return ajaxFunc({url, data, isLoading, other, loadingText, func: postInstance})
}
wx.$delete = ({url, data, isLoading = true, other = true, loadingText = 'loading...'}) => {
  return ajaxFunc({url, data, isLoading, other, loadingText, func: deleteInstance})
}
wx.$put = ({url, data, isLoading = true, other = true, loadingText = 'loading...'}) => {
  return ajaxFunc({url, data, isLoading, other, loadingText, func: putInstance})
}
wx.$all = async ({list, isLoading, other, loadingText}) => {
  try {
    if (isLoading) showLoading(loadingText)
    let res = await Promise.all[list]
    if (isLoading) closeLoading()
    return HandleBranch(res.data, other)
  } catch (error) {
    if (isLoading) closeLoading()
    console.log(error)
    return { error: error}
  }
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
wx.$upload = async ({url, data, text, isLoading = true, loadingText = '上传中...'}) => {
  try {
    if (isLoading) showLoading(loadingText)
    let res = await uploadInstance({url, data})
    if (isLoading) closeLoading()
    return HandleBranchFile(res)
  } catch (error) {
    if (isLoading) closeLoading()
    console.log(error)
    wx.showToast({
      title: '上传失败, 请稍后重试',
      duration: 1500,
      icon:'none'
    })
    return { error: error}
  }
}