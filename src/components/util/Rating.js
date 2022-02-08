import React from 'react'
import Component from '../../Component'

const starBase = size => ({
    height: `${size}em`,
    backgroundSize: `${size}em`,
    backgroundImage: 'url("/img/stars.png")',
    backgroundRepeat: 'repeat-x'
})
const starStyles = size => ({
    ...starBase(size),
    width: `${size*5}em`,
    backgroundPosition: '0 100%'
})
const ratingStyles = (rating, size) => ({
    ...starBase(size),
    width: `${rating/5*100}%`,
    backgroundPosition: '0 1px',
    float: 'left'
})

export default class Rating extends Component {
    state = {
        rating: 0
    }

    ratingClick = e => {
        if (this.props.rating === undefined) {
            let rect = e.target.getBoundingClientRect()
            const rating = Math.ceil((e.clientX - rect.left) / rect.width * 5)
            this.setState({rating})
            this.props.onChange(rating)
        }
    }

    rating() {
        return this.state.rating || this.props.rating || 0
    }

    render() {
        const size = this.props.size || 1
        return (
            <div className={this.props.className}>
                <span className={`inline-block mr-2 ${this.state.rating === undefined ? 'cursor-pointer' : ''}`} style={starStyles(size)} onClick={this.ratingClick}>
                    <span style={ratingStyles(this.rating(), size)}></span>
                </span>
                <span
                    className="inline-block text-red leading-none"
                    style={{fontSize: `${size}em`}}
                >
                    {this.rating().toFixed(2)}
                </span>
            </div>
        )
    }
}