import { FETCH_QUETZZAL_POINTS } from '../actions/types'

const initial = {
    leaderboard: [],
    quetzz: 0,
    network: 0,
}

export default function(state = initial, action) {
    switch (action.type) {
        case FETCH_QUETZZAL_POINTS:
            return action.payload
        default:
            return state
    }
}