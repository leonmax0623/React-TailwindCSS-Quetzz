import { Component as BaseComponent } from 'react'
import { debounce } from './baseHelpers'

export default class Component extends BaseComponent {
    isMobile() {
        return window.innerWidth < 1024;
    }

    pageResizeListener = () => this.forceUpdate()
    debouncedPageResizeListener = null

    componentDidMount() {
        this.debouncedPageResizeListener = debounce(this.pageResizeListener, 200)
        window.addEventListener('resize', this.debouncedPageResizeListener)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.debouncedPageResizeListener)
    }

    setNestedState(path, value, cb = null) {
        if (cb === null) {
            cb = () => null
        }
        path = path.split('.')
        // take out the special first and last part of the path
        const first = path.shift()
        const last = path.pop()
        // make a moving pointer to visit every
        // level of the defined path
        let current
        if (Array.isArray(this.state[first])) {
            current = [...this.state[first]]
        }
        else {
            current = {...this.state[first]}
        }
        // and a static pointer to point at the root
        // so we don't loose the reference
        const root = current
        
        for (let p of path) {
            // copy the current level
            if (Array.isArray(current[p])) {
                current[p] = [...current[p]]
            }
            else {
                current[p] = {...current[p]}
            }
            // and move the current pointer forward
            current = current[p]
        }

        current[last] = value
        this.setState({ [first]: root }, cb)
    }

    render() {
        return this.isMobile() ? this.mobileRender() : this.desktopRender()
    }
}