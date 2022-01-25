import axios from '../base'

// 获取资讯列表
function getSpotLights(params) {
  return axios({
    url: '/spotlights',
    method: 'get',
    params: {
      page: params.page,
      pageSize: params.pageSize || 30,
    },
  })
}

// 获取spotlights下画作列表
function getSpotLightsIllust(id) {
  return axios({
    url: `/spotlights/${id}/illustrations`,
    method: 'get',
  })
}

export {
  getSpotLights,
  getSpotLightsIllust,
}
