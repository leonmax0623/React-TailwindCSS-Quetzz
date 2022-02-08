import { ADJUST_PRO_NOTIFICATIONS, FETCH_PRO_NOTIFICATIONS, READ_PRO_NOTIFICATIONS } from './types'
import { notificationsAPI } from '.././resources/notifications'
import moment from 'moment'

export const fetchNotifications = page => dispatch =>
    notificationsAPI.getPro(page)
        .then(notifications => {
            dispatch({
                type: FETCH_PRO_NOTIFICATIONS,
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
        type: ADJUST_PRO_NOTIFICATIONS,
        payload: delta
    })

export const markNotificationRead = notification => dispatch =>
    dispatch({
        type: READ_PRO_NOTIFICATIONS,
        payload: notification
    })