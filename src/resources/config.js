import { fWithoutErrorHandling } from './util'

export const configAPI = {
    get: () => fWithoutErrorHandling('/configurations').then(res => res.json()),
}