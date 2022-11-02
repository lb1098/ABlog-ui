import request from '@/utils/request'

// 查询全部标签
export function storeVip() {
  return request({
    url: '/vip/list',
    method: 'get',
    headers: {
      isToken: false
    },
  })
}
export function updateVip(id) {
  return request({
    url: '/vip/update',
    method: 'post',
    headers: {
      isToken: true
    },
    data:{"id":id}
  })
}

