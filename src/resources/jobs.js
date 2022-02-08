import { get, post, put } from './util'
import { FETCH_LIMIT } from '../helpers'

export const jobsAPI = {
    get: (page, query) => get(`/applications/mine${query ? '/filter' : ''}`, {sort: 'id,desc', page, size: FETCH_LIMIT, query}),
    find: id => get(`/applications/mine/${id}`),
    apply: ({requestId, deadline, start, end, type, offerIds}) => post('/applications/apply', {}, {requestId, deadline, priceRange: {start, end, type}, offerIds}),
    accept: id => put(`/applications/confirm/${id}`),
    reject: id => put(`/applications/reject/application/${id}`),
    choose: (candidateId, requestId) => put(`/applications/select/candidate/${candidateId}/request/${requestId}/`),
    change: (candidateId, requestId, reasonTypeDto) => put("/applications/change", {}, {candidateId, requestId, reasonTypeDto}),
}