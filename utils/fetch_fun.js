// 成功状态码, 业务报错状态码, token失效
const successCode = '0000', businessErrorCode = '0001', tokenErrorCode = '0002'
// 显示loading
const showLoading = (text = '加载中 ...') => {
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
    case successCode:
      return { result: _res.data }
    case businessErrorCode:
      return { other: _res.data}
    case tokenErrorCode:
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
      return {result: null}
  }
}
export { showLoading, closeLoading, HandleBranch }