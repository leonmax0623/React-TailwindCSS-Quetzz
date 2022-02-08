import { FETCH_PRIZES } from '../actions/types'

const initial = {
    userPoints: 0,
    prizes: [],
}

export default function(state = initial, action) {
    switch (action.type) {
        case FETCH_PRIZES:
            return action.payload
        default:
            return state
    }
}