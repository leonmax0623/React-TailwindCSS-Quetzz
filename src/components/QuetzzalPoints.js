import React from 'react'
import { connect } from 'react-redux'
import { fetchQuetzzalPoints } from '../actions/quetzzalPointsAction'
import LeaderboardItem from './leaderboard-item/LeaderboardItem'
import { Link } from 'react-router-dom'
import LeaderboardMobileItem from './leaderboard-item/LeaderboardMobileItem'
import { nth } from '../helpers'
import Component from '../Component'

class QuetzzalPoints extends Component {
    state = {
        position: null,
    }

    componentDidMount() {
        super.componentDidMount()
        this.props.fetchQuetzzalPoints(this.props.user)
    }

    pageNavigation() {
        return (
            <div className="my-8 md:m-50 px-4 md:px-0">
                <Link to="/quetzzes" className="text-16 md:text-20 text-gray-600 mr-2 md:mr-5 text-raleway">
                    I miei Quetzz
                </Link>
                <Link to="/network" className="text-16 md:text-20 text-gray-600 mr-2 md:mr-5 text-raleway">
                    La mia Rete
                </Link>
                <Link to="/quetzzal-points" className="text-16 md:text-20 font-bold text-black text-raleway border-black border-b-2">
                    Punti
                </Link>
            </div>
        )
    }

    stats() {
        return (
            <div className="inline-flex mb-24">
                <div className="bg-white rounded p-8 inline-flex mr-4">
                    <p className="text-3xl align-middle mr-4"> {this.props.quetzzalPoints.quetzz} </p>
                    <p className="text-lg align-middle py-3"> Punti ottenuti con i Quetzz </p>
                </div> 
                <div className="bg-white rounded p-8 inline-flex mr-4">
                    <p className="text-3xl align-middle mr-4"> {this.props.quetzzalPoints.network} </p>
                    <p className="text-lg align-middle py-3"> Punti ottenuti grazie alla Rete </p>
                </div> 
                <div className="bg-gray-800 rounded text-white p-8 inline-flex">
                    <p className="text-3xl align-middle mr-4"> {this.props.quetzzalPoints.quetzz + this.props.quetzzalPoints.network} </p>
                    <p className="text-lg align-middle py-3"> Punti Totali </p>
                </div> 
            </div>
        )
    }

    mobileStats() {
        return <>
            <div className="mx-3 flex mb-8">
                <div className="md:flex mx-1 flex-1 rounded">
                    <div className="bg-white flex-1 items-center p-6 h-full text-center">
                        <span className="block md:inline text-18 md:text-23 md:mr-4">{this.props.quetzzalPoints.quetzz}</span>
                        <span className="text-12">Punti ottenuti con i Quetzz</span>
                    </div>
                </div>
                <div className="md:flex mx-1 flex-1 md:flex-none rounded">
                    <div className="bg-white flex-1 items-center p-6 h-full text-center">
                        <span className="block md:inline text-18 md:text-23 md:mr-4">{this.props.quetzzalPoints.network}</span>
                        <span className="text-12 block md:inline mr-4">Punti ottenuti grazie alla Rete</span>
                    </div>
                </div>
            </div>
            <div className="text-white bg-dark-gray text-center mx-4 p-8 mb-4 rounded">
                <p className="text-23">{this.props.quetzzalPoints.quetzz + this.props.quetzzalPoints.network}</p>
                <p className="text-15">Punti Totali</p>
            </div>
        </>
    }

    leaderboardPosition() {
        const p = this.props.quetzzalPoints
        if (p.position) {
            return (
                <div className="mb-4 text-16 text-gray-500 md:text-black text-center md:text-left">
                    <span className="font-semibold">{p.position}{nth(p.position)} posizione </span>
                    <span>in classifica</span>
                </div>
            )
        }
        return null
    }

    render() {
        const ItemComponent = this.isMobile() ? LeaderboardMobileItem : LeaderboardItem
        const items = this.props.quetzzalPoints.leaderboard
            .map(leaderboardItem => <ItemComponent leaderboardItem={leaderboardItem}/>)
            return (
                <div className="container">
                    {this.pageNavigation()}
                    {this.isMobile() ? this.mobileStats() : this.stats()}
                    {this.leaderboardPosition()}
                    <ul className="table table-fixed w-full border-spacing-1"> {items} </ul>
                </div>
            )
    }
}

const mapStateToProps = state => ({
    quetzzalPoints: state.quetzzalPoints,
    user: state.user
})

export default connect(mapStateToProps, { fetchQuetzzalPoints })(QuetzzalPoints)