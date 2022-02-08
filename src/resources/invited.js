import { get } from './util'

export const invitedAPI = {
    find: token => get(`/requests/invite/${token}`),
}