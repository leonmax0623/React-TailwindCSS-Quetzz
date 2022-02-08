import { get, put } from './util'

export const proProfileAPI = {
    find: id => get(`/profiles/pro${id ? `/${id}` : ''}`),
    save: payload => put(`/profiles/pro/edit`, {}, payload),
    getProBillingInfo: () => get('/profiles/pro/billingInfo'),
    putProBillingInfo: data => put('/profiles/pro/billingInfo', {}, data),
    register: data => put('/profiles/pro/register', {}, data)
}