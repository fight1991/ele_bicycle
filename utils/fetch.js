const { showLoading, closeLoading, HandleBranch, HandleBranchFile } = require('../utils/fetch_fun')
import { getInstance, postInstance, deleteInstance, putInstance } from './fetchInit'

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
wx.$get = ({url, data, isLoading = true, other = true, loadingText = 'loading...'}) => {
  return ajaxFunc({url, data, isLoading, other, loadingText, func: getInstance})
}
wx.$post = ({url, data, isLoading = true, other = true, loadingText = 'loading...'}) => {
  return ajaxFunc({url, data, isLoading, other, loadingText, func: postInstance})
}
wx.$delete = ({url, data, isLoading = true, other = true, loadingText = 'loading...'}) => {
  return ajaxFunc({url, data, isLoading, other, loadingText, func: deleteInstance})
}
wx.$put = ({url, data, isLoading = true, other = true, loadingText = 'loading...'}) => {
  return ajaxFunc({url, data, isLoading, other, loadingText, func: putInstance})
}
