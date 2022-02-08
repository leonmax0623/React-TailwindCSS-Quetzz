import { FETCH_BOARD } from '../actions/types'

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_BOARD:
            return action.payload
        default:
            return state
    }
}