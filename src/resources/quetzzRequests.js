import { get } from './util'

export const quetzzRequestAPI = {
    get: () => get('/quetzzes/received'),
}