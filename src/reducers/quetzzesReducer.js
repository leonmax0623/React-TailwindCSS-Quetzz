import { FETCH_QUETZZES } from '../actions/types'

const initial = {
    total: 0,
    ownQuetzz: [],
    successful: 0,
    points: 0,
}

export default function(state = initial, action) {
    switch (action.type) {
        case FETCH_QUETZZES:
            return action.payload
        default:
            return state
    }
}