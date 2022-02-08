import React from 'react'
import Component from '../../Component'
import { empty } from '../../helpers'
import Avatar from '../util/Avatar'
import { connect } from 'react-redux'

class LeaderboardItem extends Component {
    standard = 'table-row bg-white text-black'
    users = 'table-row bg-gray-800 text-white'

    posNumber() {
        let p = this.props.leaderboardItem.rank
        const posClasses = 'rounded-full h-8 w-8 flex items-center justify-center text-white'
        switch(p) {
            case 1:
                return (
                    <span className={`bg-yellow-500 ${posClasses}`}>{p}</span>
                )
            case 2:
                return (
                    <span className={`bg-gray-500 ${posClasses}`}>{p}</span>
                )
            case 3:
                return (
                    <span className={`bg-yellow-700 ${posClasses}`}>{p}</span>
                )
            default:
                return (
                    <span className={`bg-blue-500 ${posClasses}`}>{p}</span>
                )
        }
    }

    render() {
        const l = this.props.leaderboardItem
        const style = this.props.userStyle
        const cellClasses = 'table-cell px-4 py-4 align-middle border-b-2 border-gray-100'
        if(empty(l)) return null
        return(
            <li key={l.rank} className={(l.nickname === this.props.user.nickname && style)? this.users : this.standard}>
                <div className={`w-20 ${cellClasses}`}>
                    {this.posNumber()}
                </div>
                <div className={cellClasses}>
                    <Avatar className="block" user={{avatar: {url: null}}} size={4} />
                </div>
                <p className={`w-1/3 text-lg ${cellClasses}`}>{l.nickname}</p>
                <div className={cellClasses}>
                    <p>{l.totalQuetzzes}</p>
                    <p className="text-xs text-gray-500">Quetzz Totali</p>
                </div>
                <div className={`${cellClasses} text-center`}>
                    <p>
                        <span>
                            {((l.successfulQuetzzes/l.totalQuetzzes)*100).toFixed(2)}%
                        </span>
                        <span>({l.successfulQuetzzes})</span>
                    </p>
                    <p className="text-xs text-gray-500">Tasso di successo</p>
                </div>
                <div className={cellClasses}>
                    <p>{l.points}</p>
                    <p className="text-xs text-gray-500">Punti</p>
                </div>
            </li>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, {})(LeaderboardItem)
