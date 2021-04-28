// 查询字典版本
export const checkDictionaryVersion = (data) => {
  return wx.$post_user({
    url: '/data-dict/dict/batchGetDictVersionTime',
    data
  })
}
// 按需查询字典
export const getDictionaryData = (data) => {
  return wx.$post_user({
    url: '/data-dict/dict/batchGetDictDetail',
    data
  })
}

// 翻译
export const translateDic = async (dicName) => {
  let localKey = 'dicData' + dicName
  let localV = 'dicVersion' + dicName
  let localDicData = wx.getStorageSync(localKey)
  let localVersion = wx.getStorageSync(localV)
  // 如果本地存在数据, 则查询版本号
  let { result: versionInfo } = await checkDictionaryVersion([dicName])
  if (!versionInfo) return false
  if (localDicData) {
    if (versionInfo[dicName] == localVersion) {
      return localDicData
    }
  }
  wx.setStorageSync(localV, versionInfo[dicName])
  // 重新查询
  let { result: dicDataInfo } = await getDictionaryData([dicName])
  if (!dicDataInfo) return false
  wx.setStorageSync(localKey, dicDataInfo[dicName])
  return dicDataInfo[dicName]
}