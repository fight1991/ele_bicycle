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
    this.instance = (url, data) => new Promise((resolve,reject) => {
      wx.request({
        url: baseURL + url,
        header: this.header,
        method,
        data: {
          ...data,
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
  baseURL: config.API
})
const {instance: postInstance} = new Fetch({
  baseURL: config.API,
  method: 'post'
})
const {instance: uploadInstance} = new Fetch({
  baseURL: config.FILE,
  method: 'post',
  contentType: 'multipart/form-data'
})


// 方法绑定
wx.$get = async ({url, data, isLoading = true}) => {
  try {
    if (isLoading) showLoading()
    let res = await getInstance(url, data)
    if (isLoading) closeLoading()
    HandleBranch(res.data)
  } catch (error) {
    if (isLoading) closeLoading()
    console.log(error)
    return { error: error}
  }
}
wx.$post = async ({url, data, isLoading = true}) => {
  try {
    if (isLoading) showLoading()
    let res = await postInstance(url, data)
    if (isLoading) closeLoading()
    HandleBranch(res.data)
  } catch (error) {
    if (isLoading) closeLoading()
    console.log(error)
    return { error: error}
  }
}
wx.$upload = async ({url, data, isLoading = true}) => {
  try {
    if (isLoading) showLoading()
    let res = await uploadInstance(url, data)
    if (isLoading) closeLoading()
    HandleBranch(res.data)
  } catch (error) {
    if (isLoading) closeLoading()
    console.log(error)
    return { error: error}
  }
}
// export default null