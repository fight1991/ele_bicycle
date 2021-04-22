// 文件上传相关api
// 每次上传之前都要获取上传的凭证
var app = getApp()
export const upload_token = () => {
  return wx.$post_user({
    url: '/service-oss/idempotent/getToken',
    loadingText: '请求上传...'
  })
}
// 私有上传
export const upload_common_private = (upToken, file, filePath) => {
  return wx.$upload({
    url: '/service-oss/upload/uploadPrivate',
    headerToken: upToken,
    filePath,
    data: {
      accountId: app.globalData.basicUserInfo.accountId,
      file
    }
  })
}
// 共享文件上传
export const upload_common_public = (upToken, file, filePath) => {
  return wx.$upload({
    url: '/service-oss/upload/uploadPublic',
    headerToken: upToken,
    filePath,
    data: {
      file
    }
  })
}

// 私有上传
export const upload_func_private = async ({file, filePath}) => {
  let { result: res1 } = await upload_token()
  if (!res1) return null
  let { result: res2 } = await upload_common_private(res1.uptoken, file, filePath, accountId)
  if (!res2) return null
  return res2
}
// 共享上传
export const upload_func_public = async ({file, filePath}) => {
  let { result: res1 } = await upload_token()
  if (!res1) return null
  let { result: res2 } = await upload_common_public(res1.uptoken, file, filePath)
  if (!res2) return null
  return res2
}