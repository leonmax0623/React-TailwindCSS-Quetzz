import { get } from './util'
import { FETCH_LIMIT } from '../helpers'

export const boardAPI = {
    get: (page, query) => get.fresh(`/requests${query ? '/filter' : ''}`, {sort: 'created,desc', page, size: FETCH_LIMIT, query}),
    find: id => get(`/requests/${id}`),
}