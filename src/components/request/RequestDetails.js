import React from 'react'
import Component from '../../Component'
import { empty, requestInfo } from '../../helpers'
import Avatar from '../util/Avatar'

export default class RequestDetails extends Component {
    state = {
        priceRange: [0, 0],
        emailSearch: '',
        phoneSearch: '',
        readyToQuetzz: false,
        fullTextShown: !this.isMobile(),
        applications: [],
    }

    componentWillUnmount() {
        this.props.cleanupRequest()
    }

    text() {
        const r = this.props.request
        return this.state.fullTextShown || r.description.length < 100 ? r.description : r.description.substring(0, 100) + '...'
    }

    textRevealButton() {
        if (!this.state.fullTextShown && this.props.request.description.length > 100) {
            return <button
                className="text-turquoise block mx-auto text-12"
                onClick={() => this.setState({ fullTextShown: true })}
            >
                Scopri di più
            <i className="fas fa-angle-down ml-2"></i>
            </button>
        }
        return null
    }

    renderRequestMetadata() {
        if (!this.isMobile()) {
            return this.getTopInfoItems()
                .map((info, i, arr) =>
                    <div key={info} className="md:w-auto pr-2 md:pr-0">
                        <p className="text-10 text-gray-500 text-center">{info}</p>
                        <p className="text-black text-center">{requestInfo[info](this.props.request)}</p>
                    </div>
                )
        }
        else {
            return this.getTopInfoItems()
                .map((itemRow, index) => <div key={index}>
                    {itemRow.map(i => <div key={i} className="md:w-auto md:flex-grow md:inline-block pr-2 md:pr-8">
                        <p className="text-10 text-gray-500">{i}</p>
                        <p className="text-black">{requestInfo[i](this.props.request)}</p>
                    </div>
                    )}
                </div>
                )
        }
    }

    username() {
        return this.props.request.postingNickname || this.props.request.author.info
    }

    renderTopBar() {
        return <div className="flex justify-between items-center bg-white p-4 md:p-12 md:border-b-2">
            <span className="desktop w-8/12 flex justify-between">{this.renderRequestMetadata()}</span>
            <div className="w-full md:w-100 sm:w-auto">{this.statusBadge()}</div>
        </div>
    }

    render() {
        const r = this.props.request
        if (empty(r)) return null
        return (
            <div className="container md:pt-32 md:pb-40">
                <h1 className="mobile text-black font-bold px-4 py-6 text-20 bg-white text-center">{r.title}</h1>
                {this.renderTopBar()}
                <div className="flex flex-wrap md:flex-no-wrap">
                    <div className="break-words bg-white p-4 md:p-12 w-full md:w-8/12 border-b md:border-none" style={this.isMobile() ? {} : { minHeight: '22em' }}>
                        <h1 className="desktop text-20 text-black text-raleway font-bold mb-6">{r.title}</h1>
                        <div className="mb-6 flex md:justify-start">
                            <div className="flex-1 md:flex-none">
                                <div className="md:inline mb-4">
                                    <Avatar className="inline-block mr-2 align-text-top" user={{photo: r.postingAvatar}} size={1} />
                                    <span
                                        className="text-turquoise mr-4 text-14 align-middle inline-block truncate"
                                        style={{maxWidth: this.isMobile() ? ((window.screen.width - 100) / 2) + "px" : '400px'}}
                                    >{this.username()}</span>
                                </div>
                                <div className="md:inline">
                                    <i className="fas fa-map-marker-alt text-red-500 mr-2" style={{ width: '1em' }}></i>
                                    <span className="text-turquoise text-14 mr-4">{(r.cityDto || r.city).name}</span>
                                </div>
                            </div>
                        </div>
                        <p className="break-words leading-normal text-14">{this.text()}</p>
                        {this.textRevealButton()}
                    </div>
                    <div className="mobile bg-white px-8 py-12 flex flex-wrap justify-between md:justify-between w-full md:w-auto">
                        {this.renderRequestMetadata()}
                    </div>
                    {this.rightInfo()}
                </div>
                {this.bottomInfo()}
            </div>
        )
    }
}