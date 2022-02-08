import { get } from './util'
import { FETCH_LIMIT } from '../helpers'

export const proNotificationsAPI = {
    get: page => get('/notifications/pro', {sort: 'created', page, size: FETCH_LIMIT}),
}