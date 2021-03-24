import { getInstance, postInstance, putInstance, deleteInstance } from './fetchInit'
const { showLoading, closeLoading } = require('../utils/fetch_fun')

let instanceObj = {
  get: getInstance,
  post: postInstance,
  put: putInstance,
  delete: deleteInstance
}
// list泛型为 List<Map> Map --> {method: 'post', url: '', data: {}}
const allInstance = (list) => {
  let promiseList = list.map(v => instanceObj[v.method || 'post'](v.url, v.data))
  return Promise.all(promiseList)
}
// 过滤结果
function handleResult(resultList) {
  let tempRes = resultList.map(v => v.data)
  return tempRes.map(v => {
    if (v.code === '0000') {
      return v.data
    } else {
      return null
    }
  })
}
// 方法包装
wx.$all = async ({ isLoading = true, loadingText = 'loading...', data }) => {
  try {
    if (isLoading) showLoading(loadingText)
    let res = await allInstance(data)
    if (isLoading) closeLoading()
    return handleResult(res)
  } catch (error) {
    console.log(error)
    if (isLoading) closeLoading()
    return null
  }
}
