import request from '@/utils/request'

// 登录
export function sendEmail(email) {
    return request ({
        url: '/email/verify_code',
        method: 'get',
        params: {"email":email}
    })
}

export function verifyForget(email,code) {
  return request ({
    url: '/email/verify_forget',
    method: 'get',
    params: {"email":email,"verify_code":code,}
  })
}

