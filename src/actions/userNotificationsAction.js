import { FETCH_USER_NOTIFICATIONS, ADJUST_USER_NOTIFICATIONS, READ_USER_NOTIFICATIONS } from './types'
import { notificationsAPI } from '.././resources/notifications'
import moment from 'moment'

export const fetchNotifications = page => dispatch =>
notificationsAPI.getUser(page)
        .then(notifications => {
            dispatch({
                type: FETCH_USER_NOTIFICATIONS,
                payload: {
                    ...notifications,
                    allNotifications: notifications.allNotifications.content.map(notification => ({
                      ...notification,
                      created: moment(notification.created)
                    })),
                }
            })
        })

export const adjustNotificationCount = delta => dispatch =>
    dispatch({
        type: ADJUST_USER_NOTIFICATIONS,
        payload: delta
    })

export const markNotificationRead = notification => dispatch =>
    dispatch({
        type: READ_USER_NOTIFICATIONS,
        payload: notification
    })