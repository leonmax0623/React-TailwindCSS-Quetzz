import { post, f } from './util'
import { userAPI } from './users'
import { PREREGISTRATION_MODE } from '../helpers'
import { resolveInitialLogin } from '../global'

export const authAPI = {
    logout: () => post('/logout')
        .then(() => {
            window.location.assign(PREREGISTRATION_MODE ? '/' : '/login')
        }),
    login: (email, password) => f('/login', {}, {method: 'POST', body: `username=${encodeURIComponent(email.toLowerCase().trim())}&password=${encodeURIComponent(password)}`}, 'application/x-www-form-urlencoded')
        .then(() => userAPI.me())
        .then(user => resolveInitialLogin({user, explicit: true})),
}