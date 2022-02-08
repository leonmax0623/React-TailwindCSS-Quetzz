import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import store from '../../store'

export default ({ component: Component, render, publicRoute = false, privateRoute = false, nonProRoute = false, ...rest }) => (
    <Route {...rest} render={
        props => {
            const user = store.getState().user
            const auth = !!store.getState().user.id
            if (
                (!privateRoute || privateRoute && auth) &&
                (!publicRoute  || publicRoute && !auth) &&
                (!nonProRoute  || nonProRoute && user.proStatus === 'NONE')
            ) {
                if (Component) {
                    return <Component {...props} />
                }
                else {
                    return render(props)
                }
            }
            else {
                return <Redirect to="/" />
            }
        }
    } />
)