import { get, put } from './util'

export const prizesAPI = {
    get: query => get('/prizes'),
    claim: prizeId => put(`/prizes/claim/${prizeId}`),
    buy: prizeId => put(`/prizes/buy/${prizeId}`),
}