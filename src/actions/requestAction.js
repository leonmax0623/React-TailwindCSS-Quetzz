import { FETCH_REQUEST, MARK_APPLICANT, UNCOLLAPSE_REQUEST_OFFERS } from './types'
import { requestAPI } from '../resources/requests'
import { momentifyRequest } from './util'
import { boardAPI } from '../resources/board'
import { jobsAPI } from '../resources/jobs'
import { invitedAPI } from '../resources/invited'

export const fetchBoardRequest = id => dispatch =>
    boardAPI.find(id)
        .then(request => dispatch({
            type: FETCH_REQUEST,
            payload: momentifyRequest(request)
        }))

export const fetchMyRequest = id => dispatch =>
    requestAPI.find(id)
        .then(request => {
            if(request.candidatesDetail){
                request.candidatesDetail.forEach(application => application.collapsed = true)
            }
            return dispatch({
                type: FETCH_REQUEST,
                payload: momentifyRequest(request)
            })
        })

export const uncollapseRequestOffers = id => dispatch => dispatch({type: UNCOLLAPSE_REQUEST_OFFERS, payload: {id}})

export const fetchJob = id => dispatch =>
    jobsAPI.find(id)
        .then(request => dispatch({
            type: FETCH_REQUEST,
            payload: momentifyRequest(request)
        }))

export const fetchInvitedRequest = token => dispatch =>
    invitedAPI.find(token)
        .then(request => dispatch({
            type: FETCH_REQUEST,
            payload: momentifyRequest(request)
        }))

export const cleanupRequest = () => dispatch => dispatch({
        type: FETCH_REQUEST,
        payload: {}
    })

export const markApplicant = (applicant, status) => dispatch => dispatch({
    type: MARK_APPLICANT,
    payload: {
        id: applicant.proDetails.id,
        status
    }
})