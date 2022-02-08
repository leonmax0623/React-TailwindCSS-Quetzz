import { get } from './util'

export const quetzzalPointsAPI = {
    get: () => get('/points/mine/summary'),
}