import React from 'react'
import Component from '../../../Component'

export default class CongratulationsModal extends Component {
    button() {
        if (this.props.button) {
            return <button className="w-full py-6 bg-turquoise text-white rounded" onClick={this.props.onOk}>{this.props.button}</button>
        }
    }
    render() {
        return [
            <div className="flex flex-wrap mb-12 items-center">
                <i className="far fa-check-circle fa-4x pr-4 text-turquoise"></i>
                <div className="text-raleway font-bold text-20 mb-2">{this.props.title}</div>
                <p className="text-gray mt-2">{this.props.subtitle}</p>
            </div>,
            <div className={this.props.button ? 'mb-12' : ''}>
                {this.props.body}
            </div>,
            this.button()
        ]
    }
}