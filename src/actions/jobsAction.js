import { FETCH_JOBS } from './types'
import { jobsAPI } from '../resources/jobs'
import { momentifyRequest } from './util'

const statusConditions = {
    cancelledDueChangeCustomReason: "applicationStatus==CANCELLED,applicationStatus==CHANGED;reasonType==cannotGetInTouch,applicationStatus==CHANGED;reasonType==agreementNotReached,applicationStatus==CHANGED;reasonType==custom",
    pending: "applicationStatus==CHOICE_PENDING",
    pendingToConfirm: "applicationStatus==SELECTED",
    ongoing: "applicationStatus==CHOSEN",
    completed: "applicationStatus==DEADLINE_REACHED,applicationStatus==COMPLETED,applicationStatus==CHANGED;reasonType==tryAnother,applicationStatus==CHANGED;reasonType==notSatisfied,applicationStatus==CHANGED;reasonType==customWithVote",
}

const jobFiltersToDsl = filters => {
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

export const fetchJobRequests = (page, filters = {}) => dispatch =>
    jobsAPI.get(page, jobFiltersToDsl(filters))
        .then(requests => dispatch({
            type: FETCH_JOBS,
            payload: requests.map(momentifyRequest)
        }))