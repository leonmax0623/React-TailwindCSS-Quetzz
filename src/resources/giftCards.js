import { f } from './util'

export const giftCardsAPI = {
    get: (params = {}) => f('/gift-cards'),
}