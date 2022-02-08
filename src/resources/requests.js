import { get, del, post } from './util'
import { FETCH_LIMIT } from '../helpers'

export const requestAPI = {
    get: (page, query) => get(`/requests/mine${query ? '/filter' : ''}`, {sort: 'created,desc', page, size: FETCH_LIMIT, query}),
    check: () => get('/requests/check/new'),
    find: id => get(`/requests/mine/${id}`),
    delete: id => del(`/requests/${id}`),
    store: request => post('/requests', {}, {subcategoryId: request.subcategory.id, cityId: request.city.id, title: request.title, description: request.description}),
}