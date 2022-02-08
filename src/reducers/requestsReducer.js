import { FETCH_REQUESTS, DELETE_REQUEST } from '../actions/types'

export default function(state = [], action) {
    switch (action.type) {
        case DELETE_REQUEST:
            return state.filter(r => r.id !== action.payload.id)
        case FETCH_REQUESTS:
            return action.payload
        default:
            return state
    }
}