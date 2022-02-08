import { FETCH_PRIZES } from './types'
import { prizesAPI } from '.././resources/prizes'

export const fetchPrizes = (filters = {}) => dispatch =>
    prizesAPI.get(filters)
        .then(prizes => {
            prizes.prizes.forEach(p => p.prizes.sort((a, b) => a.points > b.points ? 1 : -1))
            return dispatch({type: FETCH_PRIZES, payload: prizes})
        })