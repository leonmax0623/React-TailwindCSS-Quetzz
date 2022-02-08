let resolveCsrfTokenAvailable = null
const csrfTokenAvailable = new Promise(r => resolveCsrfTokenAvailable = r)
let resolveApplicationMounted
const applicationMounted = new Promise(r => resolveApplicationMounted = r)
let resolveInitialLogin
const initialLogin = new Promise(r => resolveInitialLogin = r)
let resolveFailedLogin
const failedLogin = new Promise(r => resolveFailedLogin = r)
export {
    resolveCsrfTokenAvailable,
    csrfTokenAvailable,
    resolveApplicationMounted,
    applicationMounted,
    resolveInitialLogin,
    initialLogin,
    resolveFailedLogin,
    failedLogin,
}