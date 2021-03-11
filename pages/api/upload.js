// 文件上传相关api
// 获取上传的凭证
export const upload_token = (data) => {
  return wx.$get({
    url: '/battery-car-management/file'
  })
}