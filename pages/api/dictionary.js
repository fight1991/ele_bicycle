// 查询字典版本
export const checkDictionaryVersion = (data) => {
  return wx.$post_user({
    url: '/data-dict/dict/getDictVersionTime',
    data
  })
}
// 按需查询字典
export const getDictionaryData = (data) => {
  return wx.$post_user({
    url: '/data-dict/dict/getDictAndItems',
    data
  })
}