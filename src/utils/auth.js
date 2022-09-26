import Cookies from 'js-cookie'

const TokenKey = 'user-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token) // 默认在绘画关闭时结束
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
