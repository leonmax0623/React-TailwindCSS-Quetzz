import React from 'react'
import Component from "../../Component"
import { Link } from 'react-router-dom'

export default class NotificationItem extends Component {
    render() {
        const n = this.props.notificationItem
        if (n.type === "text") {
            return n.text
        }
        else if (n.type === "link") {
            return <Link className="text-turquoise font-bold" to={n.href} hreflang={n.hreflang} name={n.name} title={n.title}>{n.title}</Link>
        }
        else {
            return n
        }
    }
}