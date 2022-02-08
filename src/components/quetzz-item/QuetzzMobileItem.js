import React from 'react'
import Component from '../../Component'
import { empty, quetzzStatusColor, quetzzId, quetzzFilters, extractInfo, deletedAccFallback } from '../../helpers'

export default class QuetzzMobileItem extends Component {
    statusBar() {
        const status = this.props.quetzz.status
        const requestStatus = this.props.quetzz.requestStatus
        if(empty(status)) {
            return null
        }
        const id = quetzzId(status, requestStatus)
        const color = quetzzStatusColor(id)
        const txtClr = color === 'black' ? 'text-black' : `text-${color}-500`
        return <span className={`text-12 mr-1 ${txtClr}`}>
            {quetzzFilters.find(f => f.id === id).name}
        </span>
    }

    render() {
        const q = this.props.quetzz
        if(empty(q)) return null
        return(
            <li key={this.props.index} className="bg-white p-8 mb-8 mx-4 rounded">
                <p className="text-12 mb-4 flex justify-between">
                    <span>
                        <i className="fas fa-th-large mr-1"></i>
                        <span className="mr-1">{q.subcategory.name}</span>
                    </span>
                    <span>
                        {this.statusBar()}
                        <i
                            data-tip
                            data-for={"tooltip-" + this.props.index}
                            className="far fa-question-circle text-gray-500"
                        ></i>
                    </span>
                </p>
                <p className="text-gray-500 text-12">Richiesta</p>
                <p className="mb-4">{q.requestTitle}</p>
                <p className="text-gray-500 text-12">Hai raccomandato</p>
                <p>{deletedAccFallback(q.proFullName)}</p>
            </li>
        )
    }

}
