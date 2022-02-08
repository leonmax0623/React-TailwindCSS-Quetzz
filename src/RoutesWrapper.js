import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Modals } from './App'

class RoutesWrapper extends Component {
    componentDidMount() {
        this.props.history.listen(() => {
            Modals.clear()
        })
    }

    render() {
        return this.props.children
    }
}

export default withRouter(RoutesWrapper)