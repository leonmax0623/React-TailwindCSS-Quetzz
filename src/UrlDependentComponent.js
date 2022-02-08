import React from 'react'
import Component from './Component'
import history from './history'

export class UrlDependentComponent extends Component {
    historyCleanup = null
    pathname = null

    componentDidMount() {
        super.componentDidMount()
        this.pathname = window.location.pathname
        this.historyCleanup = history.listen(e => {
            if (e.pathname === this.pathname) {
                this.onUrlChange()
            }
        })
        this.onUrlChange()
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        if (this.historyCleanup !== null) {
            this.historyCleanup()
        }
    }
}