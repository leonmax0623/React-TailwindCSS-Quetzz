import { get } from './util'
import { FETCH_LIMIT } from '../helpers'

export const userNotificationsAPI = {
    get: page => get('/notifications', {sort: 'created', page, size: FETCH_LIMIT}),
}