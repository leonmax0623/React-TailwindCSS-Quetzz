import { FETCH_NETWORK } from './types'
import { connectionsAPI } from '../resources/connections'

export const fetchMyNetwork = page => dispatch =>
    connectionsAPI.get(page)
        .then(network => dispatch({
            type: FETCH_NETWORK,
            payload: network
        }))