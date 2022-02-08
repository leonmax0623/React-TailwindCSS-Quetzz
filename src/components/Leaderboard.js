import React from 'react'
import { connect } from 'react-redux'
import { fetchLeaderboard } from '../actions/leaderboardAction'
import moment from 'moment'
import Pagination from './util/Pagination'
import LeaderboardItem from './leaderboard-item/LeaderboardItem'
import LeaderboardMobileItem from './leaderboard-item/LeaderboardMobileItem'
import { Link } from 'react-router-dom'
import { createLoaderModal, createModal, nth } from '../helpers'
import { ordersAPI } from '../resources/orders'
import OrdersModal from './util/modals/OrdersModal'
import { PagableComponent } from '../PagableComponent'
import InfoModal from './util/modals/InfoModal'

class Leaderboard extends PagableComponent {

    state = {
        leaderboard: null,
        page: 0,
        loading: false,
    }

    onPageChange(page) {
        this.setState({loading: true})
        this.props.fetchLeaderboard(page)
            .then(() => this.setState({loading: false}))
    }

    openOrdersModal = () => {
        createLoaderModal(ordersAPI.get())
            .then(orders => {
                if (orders.length > 0) {
                    createModal(
                        OrdersModal,
                        {
                            orders: orders.map(order => order.claimed = moment(order.claimed))
                        },
                        'overflow-auto wide-modal'
                    )
                }
                else {
                    createModal(
                        InfoModal,
                        {
                            title: 'Non hai ancora effettuato alcun ordine',
                            subtitle: '',
                            body: null
                        }
                    )
                }
            })
    }

    pageNavigation() {
        return (
            <div className="my-8 md:m-50 px-4 md:px-0">
                    <Link to="/leaderboard" className="text-16 md:text-20 font-bold mr-12 border-black border-b-2 text-raleway">
                        Classifica
                    </Link>
                    <Link to="/store" className="text-16 md:text-20 text-gray-600 text-raleway mr-12">
                        Negozio
                    </Link>
                    <span onClick={this.openOrdersModal} className="cursor-pointer text-16 md:text-20 text-gray-600 text-raleway">
                        I miei Ordini
                    </span>
            </div>
        )
    }

    stats() {
        const smallTop = {
            height: 100,
            width: 210,
        }
        const bigTop = {
            height: 125,
            width: 260,
        }
        return (
            <div className="mb-12 flex justify-between align-middle mx-2 md:mx-0 md:w-full">
                <div className="flex flex-col justify-center mx-2 md:mx-0 flex-1 md:flex-auto">
                    <div className="bg-gray-300 p-2 flex flex-col justify-between h-24 md:h-auto" style={this.isMobile() ? {} : smallTop}>
                        <img className="mx-auto h-10 md:h-auto" src="/img/2nd_place.png"></img>
                        <p className="text-center text-gray-500">2° Posto</p>
                    </div>
                </div>
                <div className="mx-2 md:mx-0 flex-1 md:flex-auto">
                    <div className="bg-gold-light p-2 flex flex-col justify-between h-24 md:h-auto" style={this.isMobile() ? {} : bigTop}>
                        <img className="mx-auto h-10 md:h-auto" src="/img/1st_place.png"></img>
                        <p className="text-center text-gold-dark">1° Posto</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center mx-2 md:mx-0 flex-1 md:flex-auto">
                    <div className="bg-peach-light p-2 flex flex-col justify-between h-24 md:h-auto" style={this.isMobile() ? {} : smallTop}>
                        <img className="mx-auto h-10 md:h-auto" src="/img/3rd_place.png"></img>
                        <p className="text-center text-peach-dark">3° Posto</p>
                    </div>
                </div>
            </div>
        )
    }

    rank() {
        if (this.props.position !== null) {
        return <p className="text-gray-500 mb-12 text-center"><strong>{this.props.rank}{nth(this.props.rank)}</strong> position in the leaderboard</p>
        }
        return null
    }

    render() {
        const ItemComponent = this.isMobile() ? LeaderboardMobileItem : LeaderboardItem
        const items = this.props.leaderboard
            .map(leaderboardItem => <ItemComponent leaderboardItem={leaderboardItem}/>)
            return (
                <div className="container">
                    {this.pageNavigation()}
                    <div className="narrow-container">
                        {this.stats()}
                        {this.rank()}
                        {
                            !this.loading && items.length === 0 &&
                            <p className="text-center p-24">
                                Ancora nessun contendente!
                                Inizia subito a guadagnare punti inviando i quetzz ai professionisti o invitandoli sulla piattaforma!
                                Il primo posto potrebbe essere tuo!
                            </p>
                        }
                        <ul className="table table-fixed w-full border-spacing-1"> {items} </ul>
                        <Pagination
                            hasMore={this.props.hasMore}
                            currentPage={+this.state.page}
                            url="leaderboard"
                        />
                    </div>
                </div>
            )
    }
}

const mapStateToProps = state => ({
    leaderboard: state.leaderboard.leaderBoard.content,
    hasMore: state.leaderboard.leaderBoard.last === false,
    position: state.leaderboard.ladderRank,
})

export default connect(mapStateToProps, { fetchLeaderboard })(Leaderboard)