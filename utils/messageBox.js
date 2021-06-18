export default {
  common: (title) => {
    wx.showToast({
      title: title,
      icon: 'none'
    })
  },
  success: (title) => {
    wx.showToast({
      title: title,
      icon: 'success'
    })
  },
  error: (title) => {
    wx.showToast({
      title: title,
      icon: 'error'
    })
  }
}