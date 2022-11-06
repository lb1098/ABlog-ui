import request from '@/utils/request'

// 查询用户余额
export function getGuideNav() {
  return request({
    url: '/guide/nav',
    method: 'get',
    headers: {
      isToken: false
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
