import { FETCH_QUETZZAL_POINTS } from './types'
import { quetzzalPointsAPI } from '../resources/quetzzalPoints'

export const fetchQuetzzalPoints = user => dispatch =>
    quetzzalPointsAPI.get()
        .then(leaderboardObject => {
            const userLeaderboardRow = leaderboardObject.leaderboard.find(l => l.nickname === user.nickname)
            leaderboardObject.position = userLeaderboardRow ? userLeaderboardRow.rank : null
            return dispatch({
                type: FETCH_QUETZZAL_POINTS,
                payload: leaderboardObject
            })
        })