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
// 校验手机号
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
// 校验验证码
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
// 隐藏字符
const hideText = (str, type) => {
  var startIndex = type == 'phone' ? 3 : 6
  var endIndex = type == 'phone' ? 2 : 4
  var tempStr = str.toString()
  var startText = tempStr.slice(0, startIndex)
  var endText = tempStr.toString().slice(tempStr.length - endIndex)
  return startText + "********" + endText
}
// 不足2位数补0
const addZero = (num) => {
  if (num > 0 && num < 10) {
    return '0' + num
  } else {
    return num
  }
}
const showToast = {
  success: (title, success) => {
    wx.showToast({
      title: title,
      duration: 1500,
      success: () => {
        success && success()
      }
    })
  },
  common: (title) => {
    wx.showToast({
      title: title,
      duration: 1500,
      icon: 'none'
    })
  }
}
module.exports = {
  formatTime,
  checkPhone,
  checkCode,
  hideText,
  addZero,
  showToast
}
