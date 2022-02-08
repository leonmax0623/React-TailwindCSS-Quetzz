import { FETCH_CONFIG } from '../actions/types'

export default function(state = {}, action) {
    switch (action.type) {
        case FETCH_CONFIG:
            return action.payload
        default:
            return state
    }
}