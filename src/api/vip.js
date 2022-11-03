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
export function vipStatus() {
  return request({
    url: '/vip/vipStatus',
    method: 'get',
    headers: {
      isToken: true
    },
  })
}

export function vipUpdateHistory(query) {
  return request({
    url: '/vip/vipUpdateHistory',
    method: 'get',
    headers: {
      isToken: true
    },
    params:query,
  })
}

