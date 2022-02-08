import { FETCH_USER_NOTIFICATIONS, FETCH_PRO_NOTIFICATIONS, ADJUST_USER_NOTIFICATIONS, ADJUST_PRO_NOTIFICATIONS, READ_PRO_NOTIFICATIONS, READ_USER_NOTIFICATIONS } from '../actions/types'

const initial = {
    userNotifications: {
        toRead: 0,
        allNotifications: []
    },
    proNotifications: {
        toRead: 0,
        allNotifications: []
    },
}

export default function (state = initial, action) {
    switch (action.type) {
        case FETCH_USER_NOTIFICATIONS:
            return { ...state, userNotifications: action.payload }
        case FETCH_PRO_NOTIFICATIONS:
            return { ...state, proNotifications: action.payload }
        case ADJUST_USER_NOTIFICATIONS:
            return { ...state, userNotifications: { ...state.userNotifications, toRead: state.userNotifications.toRead + action.payload } }
        case ADJUST_PRO_NOTIFICATIONS:
            return { ...state, proNotifications: { ...state.proNotifications, toRead: state.proNotifications.toRead + action.payload } }
        case READ_PRO_NOTIFICATIONS:
            return { ...state, proNotifications: { ...state.proNotifications, allNotifications: state.proNotifications.allNotifications.map(n => {
                n.read = n.id === action.payload.id ? true : n.read
                return n
            }) } }
        case READ_USER_NOTIFICATIONS:
            return { ...state, userNotifications: { ...state.userNotifications, allNotifications: state.userNotifications.allNotifications.map(n => {
                n.read = (n.id === action.payload.id) ? true : n.read
                return n
            }) } }
        default:
            return state
    }
}