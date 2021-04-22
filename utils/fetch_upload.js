import config from '../config/index'

// 文件上传封装
export const uploadInstance = ({url, data}) => {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: config.FILE + url,
      name: 'file',
      filePath: data.filePath,
      header: {
        "Content-Type": "multipart/form-data"
      },
      formData: {
        token: data.uploadToken
      },
      success: resolve,
      fail: reject
    })
  })
}
