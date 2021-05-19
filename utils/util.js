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
const checkPhone = (num, text = '手机号') => {
  if (!num) {
    wx.showToast({
      title: text + '不能为空',
      icon: 'none',
      duration: 1500
    })
    return false
  }
  var reg = /^1[3456789]\d{9}$/
  var isPass = reg.test(num)
  if (!isPass) {
    wx.showToast({
      title: '请输入11位的' + text,
      icon: 'none',
      duration: 1500
    })
    return false
  }
  return true
}
// 校验原收号和新手机号是否相同
const checkPhoneIsSame = (newP, oldP) => {
  if (newP == oldP) {
    wx.showToast({
      title: '原手机号和新手机号不能相同!',
      icon: 'none',
      duration: 1500
    })
    return true
  }
  return false
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
const imgTobase64 = (path) => {
  var base64 = wx.getFileSystemManager().readFileSync(path, 'base64')
  return 'data:image/png;base64,' + base64
}
 // 打开确认框
const openConfirm = ({content, confirm, cancel}) => {
  wx.showModal({
    title: '提示',
    content: content,
    success: res => {
      if (res.confirm) {
        confirm && confirm()
      } else {
        cancel && cancel()
      }
    } 
  })
}
// 是否为空指针或undefined
const isNull = (x) => {
  return (x == undefined || x == null)
}
// 获取地址栏?后面的参数
const getUrlSearch = (after, name) => {
  // 未传参，返回空
  if (!name) return null;
  // 查询参数：先通过search取值，如果取不到就通过hash来取
  // 地址栏URL没有查询参数，返回空
  if (!after) return null;
  // 如果查询参数中没有"name"，返回空
  if (after.indexOf(name) === -1) return null;
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  // 当地址栏参数存在中文时，需要解码，不然会乱码
  var r = decodeURI(after).match(reg);
  // 如果url中"name"没有值，返回空
  if (!r) return null;

  return r[2];
}
// 将对象{}拼接地址栏传参
const setUrlParams = (obj) => {
  if (!obj) return ''
  // 防止重复拼参数
  if (obj.redirect) return ''
  if (JSON.stringify(obj) != '{}') {
    var strArr = []
    for(var key in obj) {
      var tempStr = key + '=' + obj[key]
      strArr.push(tempStr)
    }
    return strArr.join('&')
  } else {
    return ''
  }
}
module.exports = {
  formatTime,
  checkPhone,
  checkCode,
  checkPhoneIsSame,
  hideText,
  addZero,
  showToast,
  imgTobase64,
  openConfirm,
  isNull,
  setUrlParams,
  getUrlSearch
}
