import request from '@/utils/request'

// 查询全部标签
export function tagList() {
  return request({
    url: '/tag/list',
    method: 'get',
    headers: {
      isToken: false
    },
  })
}
