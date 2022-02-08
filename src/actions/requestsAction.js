import { FETCH_REQUESTS } from './types'
import { requestAPI } from '../resources/requests'
import { momentifyRequest } from './util'

const statusConditions = {
    pending_approval: "requestStatus==PENDING_APPROVAL",
    cancelled: "requestStatus==CANCELLED",
    approved: "requestStatus==APPROVED",
    running: "requestStatus==RUNNING",
    completed: "requestStatus==COMPLETED,requestStatus==DEADLINE_REACHED",
    expired: "requestStatus==EXPIRED",
}

const requestsFiltersToDsl = filters => {
    let dsl = []
    Object.entries(filters)
        .forEach(([key, value]) => {
            if (!key || value === null) return;
            switch (key) {
                case "minDate":
                    dsl.push(`created>=${value.valueOf()}`)
                    break;
                case "maxDate":
                    dsl.push(`created<=${value.valueOf()}`)
                    break;
                case "status":
                    dsl.push(`(${statusConditions[value]})`)
                    break;
                default:
                    dsl.push(`${key}==${value}`)
                    break;
            }
        })

    return dsl.filter(i => i).join(";")
}

export const fetchMyRequests = (page, filters = {}) => dispatch =>
    requestAPI.get(page, requestsFiltersToDsl(filters))
        .then(requests => dispatch({
            type: FETCH_REQUESTS,
            payload: requests.map(momentifyRequest)
        }))