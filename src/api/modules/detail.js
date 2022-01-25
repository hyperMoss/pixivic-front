import axios from '../base'

function getPixById(id) {
  return axios({
    url: `/illusts/${id}`,
    method: 'get',
  })
}

function reqArtistIllust(params) {
  if (process.env.NODE_ENV === 'com') { return Promise.resolve({ status: 400 }) }
  return axios({
    url: `/artists/${params.artistId}/illusts/${params.type}`,
    method: 'get',
    params: {
      page: params.page || 1,
      pageSize: params.pageSize || 30,
      maxSanityLevel: 3,
    },
  })
}

function reqIllustDetail(pid) {
  if (process.env.NODE_ENV === 'com') { return Promise.resolve({ status: 400 }) }
  return axios({
    url: `/illusts/${pid}`,
    method: 'get',
  })
}

function reqArtist(artistId) {
  return axios({
    url: `/artists/${artistId}`,
    method: 'get',
  })
}

// 获取关联画作
function reqRelatedIllust(param) {
  return axios({
    url: `/illusts/${param.illustId}/related`,
    method: 'get',
    params: {
      page: param.page,
      pageSize: param.pageSize || 30,
    },
  })
}

// 获取画师画作汇总
function reqSummary(artistId) {
  return axios({
    url: `/artists/${artistId}/summary`,
    method: 'get',
  })
}

// 查看画作收藏用户列表
function bookmarkedUsers(params) {
  return axios({
    url: `/illusts/${params.illustId}/bookmarkedUsers`,
    method: 'get',
    params: {
      page: params.page || 1,
      pageSize: params.pageSize || 30,
    },
  })
}

// 新增用户查看画作历史记录
function illustHistory(data) {
  return axios({
    url: `/users/${data.userId}/illustHistory`,
    method: 'post',
    data,
  })
}

export {
  getPixById, reqArtistIllust, reqIllustDetail, reqArtist, reqRelatedIllust, reqSummary, bookmarkedUsers, illustHistory,
}
