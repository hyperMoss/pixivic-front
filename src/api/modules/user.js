import axios from '../base'

// 获取图形验证码
export function verificationCode() {
  return axios({
    url: '/verificationCode',
    method: 'get',
  })
}

// 获取手机验证码
export function getPhoneCode(data) {
  return axios({
    url: `/messageVerificationCode?vid=${data.vid}&value=${data.value}&phone=${data.phone}`,
    method: 'get',
  })
}

// 校验手机号可用性
export function checkPhone(phone) {
  return axios({
    url: `/users/phones/${phone}`,
    method: 'get',
  })
}

// 三要素认证
export function verifiedInfo(data) {
  return axios({
    url: `/users/${data.userId}/verifiedInfo`,
    method: 'put',
    data: {
      name: data.name,
      exchangeCode: data.exchangeCode,
      idCard: data.idCard,
    },
  })
}

export function register(data) {
  return axios({
    url: `/users?vid=${data.vid}&value=${data.value}`,
    method: 'post',
    data: data.userInfo,
  })
}

export function login(data) {
  return axios({
    url: `/users/token?vid=${data.vid}&value=${data.value}`,
    method: 'post',
    data: data.userInfo,
  })
}

// 发送密码重置邮件
export function resetPasswordEmail(email) {
  return axios({
    url: `/users/emails/${email}/resetPasswordEmail`,
    method: 'get',
  })
}

// 用户重置密码
export function resetPassword(data) {
  return axios({
    url: `/users/password?vid=${data.vid}&value=${data.value}`,
    method: 'put',
    data: { password: data.password },
  })
}

// 效验邮箱可用性
export function checkEmail(email) {
  return axios({
    url: `/users/emails/${email}`,
    method: 'get',
  })
}

// 校验用户名可用性
export function checkUser(user) {
  return axios({
    url: `/users/usernames/${user}`,
    method: 'get',
  })
}

// 收藏画作
export function collectIllust(data) {
  return axios({
    url: '/users/bookmarked',
    method: 'post',
    data,
  })
}

// 收藏画作列表
export function getCollectList(params) {
  return axios({
    url: `/users/${params.userId}/bookmarked/${params.type}`,
    method: 'get',
    params: { page: params.page, pageSize: params.pageSize || 30 },
  })
}

// 取消收藏
export function deleteCollect(data) {
  return axios({
    url: '/users/bookmarked',
    method: 'delete',
    data,
  })
}

// 关注和取消关注画师
export function followArtist(data) {
  return axios({
    url: '/users/followed',
    method: data.follow ? 'post' : 'delete',
    data: {
      artistId: data.artistId,
      userId: data.userId,
      username: data.username,
    },
  })
}

// 用户关注画师列表
export function getFollowArtist(data) {
  return axios({
    url: `/users/${data.userId}/followed`,
    method: 'get',
    params: { page: data.page, pageSize: data.pageSize || 30 },
  })
}

// 关注画师新作
export function getNewIllust(data) {
  return axios({
    url: `/users/${data.userId}/followed/latest/${data.type}`,
    method: 'get',
    params: {
      page: data.page,
      pageSize: data.pageSize || 30,
    },
  })
}

// 获取用户是否验证邮箱
export function getEmailIsCheck(userId) {
  return axios({
    url: `/users/${userId}/email/isCheck`,
    method: 'get',
  })
}

// 用户发送邮箱验证邮件
export function vertifyEmail(email) {
  return axios({
    url: `/users/emails/${email}/checkEmail`,
    method: 'get',
  })
}

// 用户设置邮箱(会返回新的token)
export function setEmail(params) {
  return axios({
    url: `/users/${params.userId}/email`,
    method: 'put',
    params,
  })
}

// qq登录
export function qqLogin(params) {
  return axios({
    url: '/users/tokenWithQQ',
    method: 'get',
    params,
  })
}

// 用户绑定qq
export function qqAccess(params) {
  return axios({
    url: `/users/${params.userId}/qqAccessToken`,
    method: 'put',
    params: { qqAccessToken: params.qqAccessToken },
  })
}

// 检查是否绑定qq
export function checkQQ(userId) {
  return axios({
    url: `/users/${userId}/isBindQQ`,
    method: 'get',
  })
}
// 检查是否绑定qq
export function unLinkQQ(userId) {
  return axios({
    url: `/users/${userId}/qqAccessToken`,
    method: 'delete',
  })
}

// 查看用户信息
export function getUsers(userId) {
  return axios({
    url: `/users/${userId}`,
    method: 'get',
  })
}

// 查看画师关注用户列表
export function getFollowers(params) {
  return axios({
    url: `/artists/${params.artistId}/followedUsers`,
    method: 'get',
    params: {
      page: params.page || 1,
      pageSize: params.pageSize || 30,
    },
  })
}

// 绑定手机
export function verifyPhoneCode(data) {
  return axios({
    url: `/users/${data.userId}/phone`,
    method: 'put',
    params: {
      vid: data.vid,
      value: data.value,
    },
  })
}
// 获取带有3幅近期画作的follow画师列表
export function getArtists(data) {
  return axios({
    url: `/users/${data.userId}/followedWithRecentlyIllusts`,
    method: 'get',
    params: {
      page: data.page,
      pageSize: data.pageSize || 30,
    },
  })
}

// 用户查看近期画作历史记录
export function getRecentHistory(data) {
  return axios({
    url: `/users/${data.userId}/illustHistory`,
    method: 'get',
    params: {
      page: data.page,
      pageSize: data.pageSize || 30,
    },
  })
}

// 用户查看早期画作历史记录
export function getOldHistory(data) {
  return axios({
    url: `/users/${data.userId}/oldIllustHistory`,
    method: 'get',
    params: {
      page: data.page,
      pageSize: data.pageSize || 30,
    },
  })
}

// 获取高速服务器列表
export function getVipProxyServer() {
  return axios({
    url: '/vipProxyServer',
    method: 'get',
  })
}

// 用户激活

export function putPlusCode(userId, code) {
  return axios({
    url: `/users/${userId}/permissionLevel`,
    method: 'put',
    params: {
      exchangeCode: code,
    },
  })
}

// 获取活动可参与状态
export function canParticipateStatus(activityName) {
  return axios({
    url: `/vipActivity/${activityName}/canParticipateStatus`,
    method: 'get',
  })
}

// 参与活动r
export function participateStatus(activityName) {
  return axios({
    url: `/vipActivity/${activityName}/participateStatus`,
    method: 'put',
  })
}

// 用户oauth
export function oauth(query) {
  return axios({
    url: `/oauth/authorize${query}`,
    method: 'get',
  })
}
