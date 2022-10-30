import request from '@/utils/request'

// 登录
export function userLogin(username, password, verify_code, verify_uuid) {
  return request({
    url: '/login',
    method: 'post',
    headers: {
      isToken: false
    },
    data: {'username': username, 'password': password, 'verifyCode': verify_code, 'verifyUuid': verify_uuid}
  })
}

export function updateUserPassword(uuid, password) {
  return request({
    url: '/user/updatePassword'+'?password='+password+'&uuid='+uuid,
    method: 'put',
    headers: {
      isToken: false
    },
  })
}
export function resetPassword(originPassword, newPassword) {
  return request({
    url: '/user/resetPassword',
    method: 'post',
    headers: {
      isToken: true
    },
    data:{
      "originPassword" : originPassword,
      "newPassword" : newPassword
    }
  })
}
// 登录
export function userLoginByEmail(email, code) {
  return request({
    url: '/email_login',
    method: 'post',
    headers: {
      isToken: false
    },
    data: {'email': email, 'verifyEmailCode': code}
  })
}

export function userRegister(username, nickName, email, password, verify_code, verify_uuid, verify_email_code) {
  return request({
    url: '/user/register',
    method: 'post',
    headers: {
      isToken: false
    },
    data: {
      "username": username, "nickName": nickName, "email": email, "password": password, 'verifyCode': verify_code,
      'verifyUuid': verify_uuid,
      'verifyEmailCode': verify_email_code
    }
  })
}


export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getUserInfo(userId) {
  return request({
    url: '/user/userInfo',
    method: 'get',
    params: {"userId": userId}
  })
}


export function savaUserInfo(userinfo) {
  return request({
    url: '/user/userInfo',
    method: 'put',
    data: userinfo
  })
}
