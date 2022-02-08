import { FETCH_REQUEST, MARK_APPLICANT, UNCOLLAPSE_REQUEST_OFFERS } from '../actions/types'
import { clone } from '../resources/util'

export default function(state = {}, action) {
    let applicantIndex
    switch (action.type) {
        case FETCH_REQUEST:
            return action.payload
        case MARK_APPLICANT:
            applicantIndex = state.candidatesDetail.findIndex(candidate => candidate.proDetails.id === action.payload.id)
            const applicant = clone(state.candidatesDetail[applicantIndex])
            applicant.status = action.payload.status
            return {
                ...state,
                candidatesDetail: [
                    ...state.candidatesDetail.slice(0, applicantIndex),
                    applicant,
                    ...state.candidatesDetail.slice(applicantIndex + 1),
                ]
            }
        case UNCOLLAPSE_REQUEST_OFFERS:
            applicantIndex = state.candidatesDetail.findIndex(candidate => candidate.proDetails.id === action.payload.id)
            return {
                ...state,
                candidatesDetail: [
                    ...state.candidatesDetail.slice(0, applicantIndex),
                    {
                        ...state.candidatesDetail[applicantIndex],
                        collapsed: false
                    },
                    ...state.candidatesDetail.slice(applicantIndex + 1),
                ]
            }
        default:
            return state
    }
}