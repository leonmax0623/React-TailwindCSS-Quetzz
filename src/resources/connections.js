import { get } from './util'
import { FETCH_LIMIT } from '../helpers'

export const connectionsAPI = {
    get: page => get('/networks', page !== undefined ? {page, size: FETCH_LIMIT} : {}),
}