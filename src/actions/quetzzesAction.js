import { FETCH_QUETZZES } from './types'
import { quetzzesAPI } from '../resources/quetzzes'
import { momentifyQuetzz } from './util'

const statusConditions = {
    1: "(quetzzStatus==APPLICATION_IGNORED)",
    2: "(quetzzStatus==CHOICE_PENDING;requestStatus==RUNNING)",
    3: "(quetzzStatus==CHOICE_PENDING;requestStatus!=RUNNING)",
    4: "(quetzzStatus==CHOSEN)",
    5: "(quetzzStatus==APPLICATION_REJECTED,quetzzStatus==SELECTION_REJECTED)",
    6: "(quetzzStatus==NOT_CHOSEN)",
    7: "(quetzzStatus==APPLICATION_EXPIRED,quetzzStatus==CANCELLED,quetzzStatus==CHOICE_EXPIRED)",
}

const quetzzFiltersToDsl = filters => {
    let dsl = []
    Object.values(filters.quetzzStatuses || [])
        .forEach(id => dsl.push(statusConditions[id]))

    return dsl.filter(i => i).join(",")
}

export const fetchMyQuetzzes = (page, filters = {}) => dispatch =>
    quetzzesAPI.get(page, quetzzFiltersToDsl(filters))
        .then(quetzzes => dispatch({
            type: FETCH_QUETZZES,
            payload: {
                ...quetzzes,
                ownQuetzz: quetzzes.ownQuetzz.map(momentifyQuetzz)
            } 
        }))