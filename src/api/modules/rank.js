import axios from '../base'

function getRank(params) {
  return axios({
    url: '/ranks',
    method: 'get',
    params: { ...params, pageSize: 30 },
  })
}

export { getRank }
