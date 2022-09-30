import request from '@/utils/request'

// 获取全部的通知
export function getUnreadCount(query) {
  return request({
    url: '/user/notify/unread',
    method: 'get',
    headers: {
      isToken: true
    },
    params: query
  })
}

// 获取全部的通知
export function getList(query) {
  return request({
    url: '/user/notify/list',
    method: 'get',
    headers: {
      isToken: true
    },
    params: query
  })
}

// 获取全部的通知
export function userReadNotify(id) {
  return request({
    url: '/user/notify/'+id,
    method: 'put',
    headers: {
      isToken: true
    },
  })
}
