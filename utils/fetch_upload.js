const { showLoading, closeLoading, HandleBranchFile } = require('../utils/fetch_fun')
import config from '../config/index'

// 文件上传封装
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