import Cookie from 'js-cookie'
import { resolveCsrfTokenAvailable, resolveInitialLogin, resolveFailedLogin } from '../global'
import { empty, handleError } from '../helpers'
import React from 'react'

const baseURL = '/api'

let jsonEncode = true

const handleErrorIfVerified = e => {
    if (!window.location.pathname.startsWith("/confirm-registration")) {
        return handleError(e)
    }
}

const stringifyIfNeeded = o => jsonEncode ? JSON.stringify(o, (_, val) => typeof val === 'string' ? val.trim() : val) : o

export const withoutJsonEncode = fn => {
    jsonEncode = false
    const ret = fn()
    jsonEncode = true
    return ret
}

let globalSignal = null

export const clone = o => JSON.parse(JSON.stringify(o))

const singleton = func => {
    func._promises = new Map()
    return function (...args) {
        const context = JSON.stringify(args)
        let promise = func._promises.get(context)
        if (!promise) {
            promise = func.apply(this, args)
            func._promises.set(context, promise)
        }
        return promise.then(ret => clone(ret))
    }
}

const fresh = func => {
    // first param is always url
    func._previousRequests = new Map()
    return function (...args) {
        const context = args[0]
        let previousRequest = func._previousRequests.get(context)
        if (previousRequest) {
            previousRequest.abort()
        }
        const controller = new AbortController()
        const signal = controller.signal
        func._previousRequests.set(context, controller)
        globalSignal = signal
        const ret = func.apply(this, args)
            .catch(e => {
                if (e.name !== "AbortError") {
                    throw e
                }
            })
        globalSignal = null
        return ret
    }
}

export const objectToParams = obj => {
    let paramsString = Object.entries(obj)
        .map(([key, value]) => {
            if (key && value !== null && value !== undefined && value !== "") {
                key = encodeURIComponent(key)
                let valueArray
                if (Array.isArray(value)) {
                    key += '[]'
                    valueArray = value
                }
                else {
                    valueArray = [value]
                }
                return valueArray.map(v => `${key}=${encodeURIComponent(v)}`).join('&')
            }
        })
        .filter(i => i)
        .join('&')
    if (paramsString !== '') {
        paramsString = `?${paramsString}`
    }

    return paramsString
}

export const objectFromParams = params => {
    var result = {}

    if(!params){
        return result;
    }
    var query = params.substr(1)
    query.split("&")
        .forEach(part => {
            let [key, value] = part.split("=")
            value = decodeURIComponent(value)
            if (key.endsWith('[]')) {
                key = key.slice(0, key.lastIndexOf('[]'))
                if (!result[key]) {
                    result[key] = []
                }
                result[key].push(value)
            }
            else {
                result[key] = value
            }
        })
    return result
}

let csrfToken

export const fWithoutErrorHandling = (url, params = {}, data = {}, contentType = 'application/json') =>
    fetch(
        `${baseURL}${url}${objectToParams(params)}`,
        {
            credentials: 'include',
            headers: {
                'X-XSRF-TOKEN': csrfToken,
                ...(contentType !== null ? {'Content-Type': contentType} : {})
            },
            signal: globalSignal,
            ...data
        }
    )
    .then(res => {
        csrfToken = Cookie.get('XSRF-TOKEN')
        resolveCsrfTokenAvailable(csrfToken)
        return res
    })

export const f = (...params) => fWithoutErrorHandling(...params)
    .then(res => {
        if (!res.ok) {
            res.json()
                .then(errorJson => {
                    let printableError = errorJson.message

                    if (errorJson.type === "VALIDATION_ERROR") {
                        printableError = <>
                            <h2 className="text-20 mb-4">{printableError}</h2>
                            {
                                errorJson.metadata.violations.map(validationError => <p>{validationError.fieldName}: {validationError.message}</p>)
                            }
                        </>
                    }

                    handleErrorIfVerified(printableError)
                })
                .catch(() => {
                    handleErrorIfVerified(res.statusText)
                })
            throw res.statusText
        }
        return res
    })

const handleJSONResponse = res => res.text().then(res => {
    try {
        return JSON.parse(res)
    }
    catch (e) {
        return res
    }
}).catch(() => null)

export const post = (url, params = {}, body = {}, data = {}, contentType = 'application/json') =>
    f(url, params, {method: 'POST', ...(empty(body) ? {} : {body: stringifyIfNeeded(body)}), ...data}, contentType)
        .then(handleJSONResponse)

export const put = (url, params = {}, body = {}, data = {}) =>
    f(
        encodeURI(url),
        params,
        {
            method: 'PUT',
            ...(empty(body) ? {} : {body: stringifyIfNeeded(body)}),
            ...data
        }
    )
        .then(handleJSONResponse)

export const get = (...params) =>
    f(...params)
        .then(handleJSONResponse)
get.cached = singleton(get)
get.fresh = fresh(get)

export const del = (url, params = {}, data = {}) =>
    f(
        url,
        params,
        {
            method: 'DELETE',
            ...data
        }
    )
        .then(handleJSONResponse)

export const initNetworking = () => fWithoutErrorHandling('/users/me')
    .then(res => {
        if (res.ok) {
            try {
                return res.json()
            }
            catch (e) {}
        }
        return Promise.resolve({
            id: 0,
            nickname: "",
            fullname: "",
            avatar: {url: null},
            proStatus: 'NONE',
            verificationStatusDto: {
              policy: false,
              email: false,
              cellphone: false
            },
          }
        )
    })
    .then(userOrNull => {
        if (userOrNull.id) {
            resolveInitialLogin({user: userOrNull, explicit: false})
        }
        else {
            resolveFailedLogin(userOrNull)
        }
    })