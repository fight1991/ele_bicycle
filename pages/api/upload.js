// 文件上传相关api
// 每次上传之前都要获取上传的凭证
export const upload_token = (data) => {
  return wx.$get({
    url: '/battery-car-management/file'
  })
}