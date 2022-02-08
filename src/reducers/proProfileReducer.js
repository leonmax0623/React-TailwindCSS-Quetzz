import { SET_PRO_PROFILE } from '../actions/types'

export default function(state = {}, action) {
    switch (action.type) {
        case SET_PRO_PROFILE:
            return action.payload
        default:
            return state
    }
}