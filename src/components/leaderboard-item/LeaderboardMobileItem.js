import React from 'react'
import Component from '../../Component'
import { empty } from '../../helpers'
import Avatar from '../util/Avatar'
import { connect } from 'react-redux'

class LeaderboardMobileItem extends Component {
    standard = 'table-row bg-white text-black'
    users = 'table-row bg-gray-800 text-white'

    posNumber() {
        let p = this.props.leaderboardItem.rank
        const posClasses = 'rounded-full h-8 w-8 flex items-center justify-center text-white absolute'
        const style = {top: '10px', right: '10px'}
        switch(p) {
            case 1:
                return (
                    <span className={`bg-yellow-500 ${posClasses}`} style={style}>{p}</span>
                )
            case 2:
                return (
                    <span className={`bg-gray-500 ${posClasses}`} style={style}>{p}</span>
                )
            case 3:
                return (
                    <span className={`bg-yellow-700 ${posClasses}`} style={style}>{p}</span>
                )
            default:
                return (
                    <span className={`bg-blue-500 ${posClasses}`} style={style}>{p}</span>
                )
        }
    }

    render() {
        const l = this.props.leaderboardItem
        const isMe = l.nickname === this.props.user.nickname
        const background = isMe ? "bg-dark-gray" : "bg-white"
        const textColor = isMe ? "text-white" : "text-black"
        if(empty(l)) return null
        return(
            <li key={l.id} className={`flex items-center relative pl-4 pr-12 py-8 ${background}`}>
                <div className="text-turquoise mr-2">
                    {l.index}
                </div>
                <Avatar className="block mr-2" user={l.user} size={4} />
                <div className="flex-1">
                    <p className={`mb-4 ${textColor}`}>{l.nickname}</p>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className={textColor}>{l.totalQuetzzes}</p>
                            <p className="text-gray-500">Quetzz</p>
                        </div>
                        <div>
                            <p className={textColor}>
                                <span className="mr-2">
                                    {((l.successfulQuetzzes/l.totalQuetzzes)*100).toFixed(2)}%
                                </span>
                                <span>({l.successfulQuetzzes})</span>
                            </p>
                            <p className="text-gray-500">Success rate</p>
                        </div>
                        <div>
                            <p className={textColor}>{l.points}</p>
                            <p className="text-gray-500">Points</p>
                        </div>
                    </div>
                    {this.posNumber()}
                </div>
            </li>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {})(LeaderboardMobileItem)
