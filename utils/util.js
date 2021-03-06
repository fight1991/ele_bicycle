const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const checkPhone = (num) => {
  var reg = /^1[3456789]\d{9}$/
  var isPass = reg.test(num)
  if (!isPass) {
    wx.showToast({
      title: '请输入正确格式的11位手机号码',
      icon: 'none',
      duration: 1500
    })
    return false
  }
  return true
}
const checkCode = (num) => {
  if (!num) {
    wx.showToast({
      title: '验证码不能为空',
      icon: 'none',
      duration: 1500
    })
    return false
  }
  return true
}
module.exports = {
  formatTime,
  checkPhone,
  checkCode
}
