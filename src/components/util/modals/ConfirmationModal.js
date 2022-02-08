import React from 'react'
import Component from '../../../Component'

export default class ConfirmationModal extends Component {
    render() {
        return <>
            <h1 className="text-raleway font-bold text-28 leading-none mb-8">{this.props.title}</h1>
            <div className="flex -mx-4">
                <button className="mx-4 py-4 flex-1 bg-turquoise text-white rounded" onClick={this.props.onOk}>Sì</button>
                <button className="mx-4 py-4 flex-1 bg-red-500 text-white rounded" onClick={this.props.onCancel}>No</button>
            </div>
        </>
    }
}