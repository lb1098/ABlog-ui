import request from '@/utils/request'

// 查询用户余额
export function getUserFund() {
  return request({
    url: '/fund/',
    method: 'get',
    headers: {
      isToken: true
    },
  })
}
// 用户签到
export function signal() {
  return request({
    url: '/user/signal',
    method: 'get',
    headers: {
      isToken: true
    },
  })
}
