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
const HandleBranch = (_res, other) => {
  switch (_res.code) {
    case '0000': // 成功
      return { result: _res.data || true }
    case '0001': // 业务报错, 如查询失败等...
      if (other) {
        wx.showToast({
          title: _res.message,
          duration: 1500,
          icon:'none'
        })
      }
      return { other: _res.data || true}
    case '0002': // token失效
      wx.showToast({
        title: _res.message,
        duration: 1500,
        icon:'none',
        complete: () => {
          var token = wx.getStorageSync('token')
          token && wx.removeStorageSync('token')
          wx.reLaunch({
            url: '/pages/login/signIn'
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
// 处理文件上传的业务分支(废弃)
// const HandleBranchFile = _res => {
//   switch (_res.statusCode) {
//     case 200: // 成功
//       var temp = JSON.parse(_res.data) // data:"{"hash":"111","key": "113"}"
//       return { result: temp.hash }
//     default:
//       wx.showToast({
//         title: '上传失败, 请稍后重试',
//         duration: 1500,
//         icon:'none'
//       })
//       return {result: null}
//   }
// }
export { showLoading, closeLoading, HandleBranch }