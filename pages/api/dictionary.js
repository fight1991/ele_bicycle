// 查询字典版本
export const checkDictionaryVersion = (data) => {
  return wx.$post_user({
    url: '/bmp-dict/dict/batchGetDictVersionTime',
    data
  })
}
// 按需查询字典
export const getDictionaryData = (data, resultType = 'map') => {
  return wx.$post_user({
    url: '/bmp-dict/dict/batchGetDictDetail',
    data: {
      dictNames: data,
      resultType
    }
  })
}

// 翻译
export const translateDic = async (dicName, type) => {
  let localKey = 'dicData' + dicName
  let localV = 'dicVersion' + dicName
  let localDicData = wx.getStorageSync(localKey)
  let localVersion = wx.getStorageSync(localV)
  // 如果本地存在数据, 则查询版本号
  let { result: versionInfo } = await checkDictionaryVersion([dicName])
  if (!versionInfo) return {}
  if (localDicData) {
    if (versionInfo[dicName] == localVersion) {
      return localDicData
    }
  }
  wx.setStorageSync(localV, versionInfo[dicName])
  // 重新查询
  let { result: dicDataInfo } = await getDictionaryData([dicName], type)
  if (!dicDataInfo) return {}
  wx.setStorageSync(localKey, dicDataInfo[dicName])
  return dicDataInfo[dicName]
}