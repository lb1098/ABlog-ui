import request from '@/utils/request'

// 查询用户余额
export function getGuideNav() {
  return request({
    url: '/guide/nav',
    method: 'get',
    headers: {
      isToken: true
    },
  })
}

export function getGuideArticle(id) {
  return request({
    url: '/guide/'+id,
    method: 'get',
    headers: {
      isToken: true
    },
  })
}

export function buyGuideArticle(id) {
  return request({
    url: '/guide/buyArticle',
    method: 'post',
    headers: {
      isToken: true
    },
    params:{'id':id},
  })
}

