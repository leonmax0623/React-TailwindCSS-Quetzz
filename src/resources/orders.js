import { get } from './util'

export const ordersAPI = {
    get: () => get('/prizes/claimed')
}