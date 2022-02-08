import { FETCH_LEADERBOARD } from '../actions/types'

const initial = {
    leaderBoard: {
        content: [],
        last: true
    },
    ladderRank: null,
}

export default function(state = initial, action) {
    switch (action.type) {
        case FETCH_LEADERBOARD:
            return action.payload
        default:
            return state
    }
}