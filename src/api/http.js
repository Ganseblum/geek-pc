import https from './request.js'
let apiFun = {}


// 登录
apiFun.login = function (params) {
  return https.post('/v1_0/authorizations', params)
}

// 获取所有频道
apiFun.getChannel = function (params) {
  return https.get('/v1_0/channels', params)
}

// 获取所有频道
apiFun.getArticle = function (params) {
  return https.get('/v1_0/mp/articles', params)
}


// 上传图片
// apiFun.getChannel = function (params) {
//   return https.post('/v1_0/upload', params)
// }



export default apiFun
