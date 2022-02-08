import React from 'react'
import Component from '../../Component'

export default class Loader extends Component {
    render() {
        return <p className="text-center">
            <i
                className={`text-${this.props.color || 'turquoise'} fas fa-spinner fa-pulse`}
                style={{fontSize: '' + (this.props.size || 3) + 'em'}}
            ></i>
        </p>
    }
}