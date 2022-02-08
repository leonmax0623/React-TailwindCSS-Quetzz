import React from 'react'
import Component from '../../Component'
import { empty, quetzzStatusColor, quetzzId, quetzzFilters, extractInfo, deletedAccFallback } from '../../helpers'

export default class QuetzzItem extends Component {
    statusBar() {
        const status = this.props.quetzz.status
        const requestStatus = this.props.quetzz.requestStatus
        if(empty(status)) {
            return null
        }
        const id = quetzzId(status, requestStatus)
        const color = quetzzStatusColor(id)
        const bgClr = color === 'black' ? 'bg-black' : `bg-${color}-200`
        const txtClr = color === 'black' ? 'text-white' : `text-${color}-700`
        return <p className={`text-12 py-2 rounded w-full text-center ${bgClr} ${txtClr}`}>
            {quetzzFilters.find(f => f.id === id).name}
        </p>
    }

    render() {
        const q = this.props.quetzz
        const cellClasses = 'table-cell py-8 align-middle border-b-2 border-gray-100'
        const fieldClasses = 'text-black truncate'
        if(empty(q)) return null
        return(
            <li key={this.props.index} className="table-row bg-white">
                <div className={`${cellClasses} px-4`}>
                    <p className="text-10 text-gray-500">Quetzz</p>
                    <p title={q.created.fromNow()} className={fieldClasses}>{q.created.fromNow()}</p>
                </div>
                <div className={`${cellClasses} px-4`}>
                    <p className="text-10 text-gray-500">Professionista</p>
                    <p title={extractInfo(q.proFullName)} className={fieldClasses}>{deletedAccFallback(q.proFullName)}</p>
                </div>
                <div className={`${cellClasses} px-4`}>
                    <p className="text-10 text-gray-500">Sottocategoria</p>
                    <p title={q.subcategory.name} className={fieldClasses}>{q.subcategory.name}</p>
                </div>
                <div className={`${cellClasses} px-4`}>
                    <p className="text-10 text-gray-500">Richiesta</p>
                    <p title={q.requestTitle} className={fieldClasses}>{q.requestTitle}</p>
                </div>
                <div className={`${cellClasses} w-32`}>
                    {this.statusBar()}
                </div>
                <div className={`${cellClasses} px-4`}>
                    <i
                        data-tip
                        data-for={"tooltip-" + this.props.index}
                        className="far fa-question-circle ml-16 text-gray-500"
                    ></i>
                </div>
            </li>
        )
    }

}
