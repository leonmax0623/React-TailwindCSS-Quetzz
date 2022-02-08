import { get, put } from './util'

export const profileAPI = {
    find: id => get(`/profiles/${id ? id : 'mine'}`),
    save: payload => put("/profiles/edit", {}, payload),
    saveAvatar: avatar => put(`/profiles/avatar/${avatar.id}`),
    getPersonalInfo: () => get('/profiles/personalInfo'),
    putPersonalInfo: userData => put(`/profiles/personalInfo`, {}, userData),
    putCellphone: cellphone => put(`/profiles/cellphone/${cellphone}`),
    putEmail: email => put(`/profiles/email/${email.toLowerCase().trim()}`),
    getReferralToken: () => get("/users/referral"),
    checkReferralToken: token => put(`/token/check/invite/${encodeURIComponent(token)}`),
}