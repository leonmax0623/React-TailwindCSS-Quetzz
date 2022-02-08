import React from 'react'
import { connect } from 'react-redux'
import { fetchMyNetwork } from '../actions/connectionsAction'
import Avatar from './util/Avatar'
import Pagination from './util/Pagination'
import { Link }from 'react-router-dom'
import { PagableComponent } from '../PagableComponent'
import { copy, FETCH_LIMIT, inviteUrl } from '../helpers'
import { profileAPI } from '../resources/profile'

class Network extends PagableComponent {
    state = {
        connection: null,
        page: 0,
        loading: false,
        token: null,
    }

    componentDidMount() {
        super.componentDidMount()
        profileAPI.find()
            .then(profile => this.setState({token: profile.inviteToken}))
    }

    onPageChange(page) {
        this.setState({loading: true})
        this.props.fetchMyNetwork(page)
            .then(() => this.setState({loading: false}))
    }

    pageNavigation() {
        return (
            <div className="my-8 md:m-50 px-4 md:px-0">
                <Link to="/quetzzes" className="text-16 md:text-20 text-raleway text-gray-600 mr-2 md:mr-5">
                    I miei Quetzz
                </Link>
                <Link to="/network" className="text-16 md:text-20 text-raleway font-bold text-black mr-2 md:mr-5 border-black border-b-2">
                    La mia Rete
                </Link>
                <Link to="/quetzzal-points" className="text-16 md:text-20 text-raleway text-gray-600">
                    Punti
                </Link>
            </div>
        )
    }

    stats() {
        return <div className="mx-3 md:-mx-1 flex mb-8">
            <div className="md:flex mx-1">
                <div className="bg-white flex-1 items-center p-6 h-full text-center rounded">
                    <span className="block md:inline text-18 md:text-23 md:mr-4">{this.props.network.totalConnections}</span>
                    <span className="text-gray-500 md:text-black text-12">Numero di Contatti</span>
                </div>
            </div>
            <div className="md:flex mx-1 flex-1 md:flex-none">
                <div className="bg-white flex-1 items-center p-6 h-full text-center rounded">
                    <span className="block md:inline text-18 md:text-23 md:mr-4">{this.props.network.totalPoints}</span>
                    <span className="text-gray-500 md:text-black text-12 block md:inline md:mr-4">Punti ottenuti grazie alla Rete</span>
                </div>
            </div>
        </div>
    }

    items() {
        if (this.state.loading) {
            return <i className="fa-fw block mx-auto fa-2x fas text-gray-500 fa-spinner fa-pulse mt-16"></i>
        }
        else if (this.props.network.networkInfos.content.length > 0) {
            return this.props.network.networkInfos.content
                .map((c, i) =>
                    <div key={i} className="p-4 bg-white m-2 md:m-4 md:w-1/6 text-center flex-1 md:flex-none"> 
                        <Avatar className="block mx-auto mb-6 mt-6" user={c} size={5} />
                        {c.enabled ? <p className="break-all">{c.fullName}</p> : <p className="break-all"><strong>Utente cancellato</strong></p>}
                        {this.isMobile() ? 
                        <div className='flex'>
                            <div className="md:flex mx-1">
                                <div className="bg-white flex-1 items-center p-6 h-full text-center rounded">
                                    <span className="block md:inline text-18 md:text-23 md:mr-4">{c.jobObtained}</span>
                                    <span className="text-gray-500 md:text-black text-12">Lavori completati</span>
                                </div>
                            </div>
                            <div className="md:flex mx-1 flex-1 md:flex-none">
                                <div className="bg-white flex-1 items-center p-6 h-full text-center rounded">
                                    <span className="block md:inline text-18 md:text-23 md:mr-4">{c.pointsMade}</span>
                                    <span className="text-gray-500 md:text-black text-12 block md:inline md:mr-4">Punti</span>
                                </div>
                            </div>
                        </div>
                        :
                        <div className=''>
                        <div className="md:flex mx-1">
                            <div className="bg-white flex-1 items-center p-6 h-full text-center rounded">
                                <span className="block md:inline text-18 md:text-23 md:mr-4">{c.jobObtained}</span>
                                <span className="text-gray-500 md:text-black text-12">Lavori completati</span>
                            </div>
                        </div>
                        <div className="md:flex mx-1 flex-1 md:flex-none">
                            <div className="bg-white flex-1 items-center p-6 h-full text-center rounded">
                                <span className="block md:inline text-18 md:text-23 md:mr-4">{c.pointsMade}</span>
                                <span className="text-gray-500 md:text-black text-12 block md:inline md:mr-4">Punti</span>
                            </div>
                        </div>
                    </div>
        }
                    </div>
                )
        }
        else {
            return <div className="mx-auto">
                <p className="text-center p-12">
                    La tua Rete è ancora vuota! Che cosa aspetti ad invitare qualcuno?
                </p>
                {
                    this.state.token &&
                    <button
                        className="block mx-auto bg-turquoise text-white rounded p-2"
                        onClick={() => copy(inviteUrl(this.state.token))}
                    >
                        Copia link di Invito
                    </button>
                }
            </div>
        }
    }

    render() {
        return(
            <div className="container ">
                {this.pageNavigation()}
                {this.stats()}
                <div className="flex justify-between flex-wrap mx-2 md:-mx-4">
                    {this.items()}
                </div>
                <Pagination
                    hasMore={!this.props.network.networkInfos.last}
                    currentPage={+this.state.page}
                    url="network"
                />
            </div>
        )
    }

}

const mapStateToProps = state => ({
    network: state.network,
})

export default connect(mapStateToProps, { fetchMyNetwork })(Network)