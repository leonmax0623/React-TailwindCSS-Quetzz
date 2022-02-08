import { get } from './util'
import { FETCH_LIMIT } from '../helpers'

export const quetzzesAPI = {
    get: (page, query) => get(query ? '/quetzzes/filter' : '/quetzzes', {sort: 'created,desc', page, size: FETCH_LIMIT, query}),
    network: request => get(`/quetzzes/candidate/${request.id}/search/network?size=10000`),
}