import { FETCH_NETWORK } from '../actions/types'

const initial = {
    networkInfos: {
        content: [],
        last: true,
    },
    totalConnections: 0,
    totalPoints: 0,
}

export default function(state = initial, action) {
    switch (action.type) {
        case FETCH_NETWORK:
            return action.payload
        default:
            return state
    }
}