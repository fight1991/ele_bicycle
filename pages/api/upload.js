// 文件上传相关api
// 每次上传之前都要获取上传的凭证
export const upload_token = () => {
  return wx.$post({
    url: '/user-center/file/getUpToken',
    loadingText: '请求上传...'
  })
}
export const upload_common = (upToken, filePath, text) => {
  return wx.$upload({
    url: '/user-center/file/upload',
    text,
    data: {
      upToken,
      filePath
    }
  })
}

// 获取文件token 并上传图片得到文件服务器中的地址
export const upload_func = async (filePath, text) => {
  let { result: res1 } = await upload_token()
  if (!res1) return null
  let { result: res2 } = await upload_common(res1.uptoken, filePath, text)
  if (!res2) return null
  return res2
}