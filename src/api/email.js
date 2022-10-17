import request from '@/utils/request'

// 登录
export function sendEmail(email) {
    return request ({
        url: '/email/verify_code',
        method: 'get',
        params: {"email":email}
    })
}
