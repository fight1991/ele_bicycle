const { showLoading, closeLoading, HandleBranch } = require('../utils/fetch_fun')
import { uploadInstance } from './fetchInit'
// 方法统一包装
const ajaxFunc = async ({url, data, filePath, name, isLoading, other, loadingText, func}) => {
  try {
    if (isLoading) showLoading(loadingText)
    let res = await func(url, data, filePath, name)
    if (isLoading) closeLoading()
    return HandleBranch(res.data, other)
  } catch (error) {
    if (isLoading) closeLoading()
    console.log(error)
    return { error: error}
  }
}

wx.$upload = ({url, data, filePath, name, isLoading = true, other = true, loadingText = '上传中...'}) => {
  return ajaxFunc({url, data, filePath, name, headerToken, isLoading, other, loadingText, func: uploadInstance})
}