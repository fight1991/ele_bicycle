const { showLoading, closeLoading, HandleBranch } = require('../utils/fetch_fun')
import { userInstance, businessInstance } from './fetchInit'
import { uploadInstance } from './fetch_upload'

// 方法统一包装
const ajaxFunc = async ({url, data, isLoading, other, loadingText, func}) => {
  try {
    if (isLoading) showLoading(loadingText)
    let res = await func(url, data)
    if (isLoading) closeLoading()
    return HandleBranch(res.data, other)
  } catch (error) {
    if (isLoading) closeLoading()
    console.log(error)
    return { error: error}
  }
}
// 方法绑定
/**
 * url --> api地址
 * data --> 入参
 * isLoading --> 是否显示loading
 * loadingText --> loading 文字
 * other --> 是否显示业务报错弹框
 */
// wx.$get = ({url, data, isLoading = true, other = true, loadingText = '加载中...'}) => {
//   return ajaxFunc({url, data, isLoading, other, loadingText, func: getInstance})
// }
// wx.$delete = ({url, data, isLoading = true, other = true, loadingText = '加载中...'}) => {
//   return ajaxFunc({url, data, isLoading, other, loadingText, func: deleteInstance})
// }
// wx.$put = ({url, data, isLoading = true, other = true, loadingText = '加载中...'}) => {
//   return ajaxFunc({url, data, isLoading, other, loadingText, func: putInstance})
// }
wx.$post_user = ({url, data, isLoading = true, other = true, loadingText = '加载中...'}) => {
  return ajaxFunc({url, data, isLoading, other, loadingText, func: userInstance})
}
wx.$post_business = ({url, data, isLoading = true, other = true, loadingText = '加载中...'}) => {
  return ajaxFunc({url, data, isLoading, other, loadingText, func: businessInstance})
}
wx.$upload = async ({url, data, isLoading = true, loadingText = '上传中...'}) => {
  return ajaxFunc({url, data, isLoading, other, loadingText, func: uploadInstance})
}

 
