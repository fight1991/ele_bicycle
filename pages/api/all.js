let baseUserInfoParams = {
  method: 'get',
  url: '/battery-car-management/token'
}
let baseBusInfoParams = {
  method: 'post',
  url: '/battery-car-management/battery_car/detail'
}
// 用户基本信息和车辆信息请求
export const getUserAndBusInfo = () => {
  return wx.$all({
    data: [baseUserInfoParams, baseBusInfoParams]
  })
}