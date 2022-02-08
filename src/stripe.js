import { loadStripe } from '@stripe/stripe-js'
import { applicationMounted } from './global'
import { handleError } from './helpers'
import { get } from './resources/util'

let resolve
const promise = new Promise(r => resolve = r)

export const redirectToCheckout = sessionId => promise
    .then(stripe => stripe.redirectToCheckout({sessionId}))
    .then(result => {
        if (result.error) {
            handleError(result.error)
        }
        return result
    })

applicationMounted.then(() => get("/payment/publicKey"))
    .then(key => loadStripe(key))
    .then(resolve)