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
// 用户申请捐助走人工积分通道
export function apply(payType,payTime,payProof,payNumber) {
  return request({
    url: '/fund/apply',
    method: 'post',
    headers: {
      isToken: true
    },
    data:{
      "payType":payType,
      "payTime":payTime,
      "payProof":payProof,
      "payNumber":payNumber
    }
  })
}
// 查询积分申请情况
// 用户申请捐助走人工积分通道
export function applyList(query) {
  return request({
    url: '/fund/applyList',
    method: 'get',
    headers: {
      isToken: true
    },
    params:query
  })
}

// 积分变动历史
export function fundHistoryList(query) {
  return request({
    url: '/fund/fundHistoryList',
    method: 'get',
    headers: {
      isToken: true
    },
    params:query
  })
}

// 最新的积分变动历史
export function lastOneFundHistory() {
  return request({
    url: '/fund/lastOneFundHistory',
    method: 'get',
    headers: {
      isToken: true
    },
  })
}
