import React from 'react'
import Component from '../../../Component'

export default class InfoModal extends Component {
    button() {
        if (this.props.button) {
            return <button className="w-full py-6 bg-turquoise text-white rounded" onClick={this.props.onOk}>{this.props.button}</button>
        }
    }
    render() {
        return [
            <h1 className="text-raleway font-bold text-28 leading-none mb-2">{this.props.title}</h1>,
            <p className="text-gray mb-12">{this.props.subtitle}</p>,
            <div className={this.props.button ? 'mb-12' : ''}>
                {this.props.body}
            </div>,
            this.button()
        ]
    }
}