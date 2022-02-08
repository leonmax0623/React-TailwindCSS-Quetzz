import { SET_PROFILE } from '../actions/types'

export default function(state = {}, action) {
    switch (action.type) {
        case SET_PROFILE:
            return action.payload
        default:
            return state
    }
}