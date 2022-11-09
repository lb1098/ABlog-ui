import request from '@/utils/request'

// 查询文章列表
export function articleList(query) {
    return request({
        url: '/article/articleList',
        method: 'get',
        headers: {
          isToken: false
        },
        params: query
    })
}
// 查询文章列表
export function articleListByTagId(query) {
  return request({
    url: '/article/articleListByTagId',
    method: 'get',
    headers: {
      isToken: false
    },
    params: query
  })
}

// 查询文章列表 升级版，可以附加 tagId
export function articleListAndTag(query) {
  return request({
    url: '/article/articleListAndTag',
    method: 'get',
    headers: {
      isToken: false
    },
    params: query
  })
}

//查询最热文章
export function hotArticleList() {
    return request({
        url: '/article/hotArticleList',
        headers: {
          isToken: false
        },
        method: 'get'
    })
}

//获取文章详情
export function getArticle(articleId) {
    return request({
        url: '/article/' + articleId,
        headers: {
          isToken: false
        },
        method: 'get'
    })
}

export function updateViewCount(articleId) {
    return request({
        url: '/article/updateViewCount/' + articleId,
        headers: {
          isToken: false
        },
        method: 'put'
    })

}

export function getTagByCategoryId(CategoryId) {
  return request({
    url: '/tag/findByCategoryId/' + CategoryId,
    headers: {
      isToken: false
    },
    method: 'get'
  })
}

// 查询文章列表
export function articleListByUserId(query) {
  return request({
    url: '/article/articleListByUserId',
    method: 'get',
    headers: {
      isToken: false
    },
    params: query
  })
}


