import { get } from './util'
import { FETCH_LIMIT } from '../helpers'

export const leaderboardAPI = {
    get: page => get('/leaderboard', {page, sort: 'rank', size: FETCH_LIMIT}),
}