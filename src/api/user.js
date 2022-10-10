import request from '@/utils/request'

// 登录
export function userLogin(username,password,verify_code,verify_uuid) {
    return request({
        url: '/login',
        method: 'post',
        headers: {
            isToken: false
          },
        data: {'username':username,'password':password,'verifyCode':verify_code,'verifyUuid':verify_uuid}
    })
}

export function userRegister(username,nickName,email,password,verify_code,verify_uuid) {
    return request({
        url: '/user/register',
        method: 'post',
        headers: {
            isToken :false
        },
        data: {"username":username,"nickName":nickName,"email":email,"password":password,'verifyCode':verify_code,'verifyUuid':verify_uuid}
    })
}


export function logout() {
    return request({
        url: '/logout',
        method: 'post'
    })
}

export function getUserInfo(userId) {
    return request ({
        url: '/user/userInfo',
        method: 'get',
        params: {"userId":userId}
    })
}


export function savaUserInfo(userinfo) {
    return request({
        url: '/user/userInfo',
        method: 'put',
        data: userinfo
    })
}
