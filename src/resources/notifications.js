import { get, put } from './util'
import { FETCH_LIMIT } from '../helpers'

export const notificationsAPI = {
    getUser: page => get('/notifications/user', {sort: 'created,desc', page, size: FETCH_LIMIT}),
    getPro: page => get('/notifications/pro', {sort: 'created,desc', page, size: FETCH_LIMIT}),
    markRead: id => put(`/notifications/read/${id}`)
}