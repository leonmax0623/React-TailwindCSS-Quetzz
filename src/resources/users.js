import { del, get, post, put, withoutJsonEncode } from './util'

export const userAPI = {
    me: () => get('/users/me'),
    get: () => get('/users'),
    search: (requestId, data) => {
        if (data.email) {
            return get(`/quetzzes/candidate/${requestId}/search/email/${data.email.toLowerCase().trim()}`)
        }
        else if (data.cellphone) {
            return get(`/quetzzes/candidate/${requestId}/search/cellphone/${data.cellphone}`)
        }
        return Promise.resolve(null)
    },
    quetzz: (user, request) => post("/quetzzes", {}, {userId: user.id, requestId: request.id}),
    quetzzIndirect: request => withoutJsonEncode(() => post("/quetzzes/out", {}, request.id)),
    getQuetzzIndirect: request => get(`/quetzzes/out/${request.id}`),
    signup: user => post("/signUp", {}, user),
    checkNickname: nickname => get(`/users/check/nickname/${encodeURIComponent(nickname.toLowerCase().trim())}`),
    checkUsername: username => get(`/users/check/username/${encodeURIComponent(username.toLowerCase().trim())}`),
    checkCellphone: cellphone => get(`/users/check/cellphone/${encodeURIComponent(cellphone)}`),
    checkEmail: email => get(`/users/check/email/${encodeURIComponent(email.toLowerCase().trim())}`),
    deleteUser: nickname => del(`/users/`),
    getBillingInfo: () => get('/profiles/billingInfo'),
    putBillingInfo: data => put('/profiles/billingInfo', {}, data),
}