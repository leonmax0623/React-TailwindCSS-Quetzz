import React from 'react'
import Component from '../../Component'
import { empty, requestStatusColor, requestStatusDescription, jobStatusColor, jobStatusDescription, jobStatuses } from '../../helpers'
import clsx from 'clsx'

export default class StatusBadge extends Component {
    render() {
        const status = this.props.status
        const isJob = Array.from(Object.values(jobStatuses))
            .map(status => status.id)
            .includes(status)
        const colorFn = isJob ? jobStatusColor : requestStatusColor
        const statusFn = isJob ? jobStatusDescription : requestStatusDescription
        if (empty(status)) {
            return null
        }
        const color = colorFn(status)
        const className = this.props.className || ''
        let bgClr = color === 'black' ? 'bg-black' : `bg-${color}-light`
        let txtClr = color === 'black' ? 'text-white' : `text-${color}-dark`

        if (this.props.flat) {
            bgClr = ''
            txtClr = txtClr === 'text-white' ? 'text-black' : txtClr
        }
        return <span
            className={
                clsx(
                    `text-center py-2 rounded ${className} ${bgClr} ${txtClr}`,
                    {
                        'px-4': !this.props.flat,
                        'lowercase text-10 whitespace-no-wrap': this.props.flat,
                    }
                )
            }
        >
            {statusFn(status) || status} {this.props.flat ? "⬤" : ""}
        </span>
    }
}