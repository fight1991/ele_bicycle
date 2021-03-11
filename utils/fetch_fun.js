// 显示loading
const showLoading = (text = '') => {
  wx.showLoading({
    title: text,
    mask: true
  })
}
// 隐藏loading
const closeLoading = () => {
  wx.hideLoading()
}
// 处理业务分支
const HandleBranch = _res => {
  switch (_res.code) {
    case '0000': // 成功
      return { result: _res.data || true }
    case '0001': // 业务报错, 如查询失败等...
      wx.showToast({
        title: _res.message,
        duration: 1500,
        icon:'none'
      })
      return { other: _res.data}
    case '0002': // token失效
      wx.showToast({
        title: _res.message,
        duration: 1500,
        icon:'none',
        complete: () => {
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }
      })
      return {result: null}
    default:
      wx.showToast({
        title: _res.message,
        duration: 1500,
        icon:'none'
      })
      return {result: null}
  }
}
export { showLoading, closeLoading, HandleBranch }