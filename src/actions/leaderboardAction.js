import { FETCH_LEADERBOARD } from './types'
import { leaderboardAPI } from '../resources/leaderboard'

export const fetchLeaderboard = page => dispatch =>
    leaderboardAPI.get(page)
        .then(leaderboard => dispatch({
            type: FETCH_LEADERBOARD,
            payload: leaderboard
        }))