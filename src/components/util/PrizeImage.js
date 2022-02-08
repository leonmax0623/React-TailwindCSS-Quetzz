import React from 'react'
import Component from '../../Component'

export default class PrizeImage extends Component {
    render() {
        return <span
            style={{
                height: `${this.props.size}em`,
                width: `${this.props.size}em`,
                backgroundImage: `url('${this.props.prize.image}')`
            }}
            className={
                `${this.props.className}
                bg-contain bg-center bg-no-repeat relative`
            }
        >
            <span className="absolute top-0 right-0 bg-turquoise rounded-lg p-1 text-white">{this.props.prize.price}</span>
        </span>
    }
}