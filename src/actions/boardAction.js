import { FETCH_BOARD } from './types'
import { boardAPI } from '../resources/board'
import { momentifyRequest } from './util'

const boardFiltersToDsl = filters => {
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
                case "query":
                    dsl.push(`(title=="${value}*",description=="*${value}*")`)
                    break;
                default:
                    dsl.push(`${key}==${value}`)
                    break;
            }
        })

    return dsl.filter(i => i).join(";")
}

export const fetchBoardRequests = (page, filters = {}) => dispatch =>
    boardAPI.get(page, boardFiltersToDsl(filters))
        .then(requests => {
            if (requests) {
                return dispatch({
                    type: FETCH_BOARD,
                    payload: requests.map(momentifyRequest)
                })
            }
        })