import { put, withoutJsonEncode, get } from "./util"

export const verificationAPI = {
    sms: code => withoutJsonEncode(() => put('/sms/code', {}, code)),
    email: code => withoutJsonEncode(() => put('/email/code', {}, code)),
    resendEmail: () => get('/email/send'),
    resendSms: () => get('/sms/send'),
}