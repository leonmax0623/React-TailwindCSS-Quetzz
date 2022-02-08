import React from 'react'
import Component from '../../Component'

export default class DropdownArrow extends Component {
    render() {
        const className = `${this.props.active} fas fa-angle-down align-middle user-caret ${this.props.className}`
        return <i onClick={this.props.onClick} className={className} style={{
            transition: 'transform .2s ease',
            transform: this.props.active ? 'rotate(180deg)' : '',
        }}></i>
    }
}