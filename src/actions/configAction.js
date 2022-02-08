import { FETCH_CONFIG } from './types'
import { configAPI } from '../resources/config'

export const fetchConfig = () => dispatch => configAPI.get().then(payload => dispatch({ type: FETCH_CONFIG, payload }))
