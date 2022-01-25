import axios from '../base'

// 拉取评论
function getComments(params) {
  return axios({
    url: `${params.commentAppType}/${params.commentAppId}/comments`,
    method: 'get',
    params: {
      page: params.page || 1,
      pageSize: params.pageSize || 10,
    },
  })
}

// 发表评论
function makeComments(params) {
  const {
    parentId = 0, replyTo = 0, replyFromName,
    replyToName, content, commentAppType, commentAppId, platform, replyToCommentId = null,
  } = params
  return axios({
    url: `${commentAppType}/${commentAppId}/comments`,
    method: 'post',
    data: {
      parentId,
      replyTo,
      replyToCommentId,
      replyFromName,
      replyToName,
      content,
      platform,
    },
  })
}

// 点赞评论
function likeComments(params) {
  const { commentAppType, commentAppId, commentId } = params
  return axios({
    url: '/user/likedComments',
    method: 'post',
    data: {
      commentAppType,
      commentAppId,
      commentId,
    },
  })
}

// 取消评论
function unLikeComments(params) {
  const { commentAppType, commentAppId, commentId } = params
  return axios({
    url: `/user/likedComments/${params.commentAppType}/${params.commentAppId}/${params.commentId}`,
    method: 'delete',
  })
}
export {
  getComments,
  makeComments,
  likeComments,
  unLikeComments,
}
