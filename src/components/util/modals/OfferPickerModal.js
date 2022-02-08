import React from 'react'
import { connect } from "react-redux";
import Component from '../../../Component'
import 'rc-slider/assets/index.css'
import { objectFilter } from '../../../helpers'
import { proProfileAPI } from '../../../resources/proProfile'

class OfferPickerModal extends Component {
    state = {
        possibleOfferIds: [],
        offerIds: [],
    }

    componentDidMount() {
        super.componentDidMount()
        proProfileAPI.find(this.props.me.id)
            .then(profile => this.setState({possibleOfferIds: profile.proUserProfile.offers}))
    }

    getOfferAttachmentTypes = (offer, isActive) => {
        const res = {image: 0, audio: 0, video: 0}
        for (let att of offer.attachments) {
            const type = att.mimeType.split("/")[0]
            if (res[type] !== undefined) {
                res[type]++
            }
        }
        return Object.entries(objectFilter(res, (_, val) => val > 0))
            .map(([key, val]) => <>
                <div className="mr-2 w-8">
                    <img className="w-full h-auto" src={`/img/${key}_icon${isActive ? '_white' : ''}.png`}/>
                </div>
                <span className="text-12">{val}</span>
            </>)
    }

    render() {
        return [
            <div className="mb-12">
                <h1 className="text-raleway font-bold text-28 mb-12">
                    Scegli una o più voci dal tuo "Cosa Offro"
                </h1>
                <p className="text-gray mb-3">Devono essere pertinenti alla richiesta dell'utente!</p>
                <p className="mb-3 text-right">
                    {this.state.offerIds.length}
                    <span className="text-gray ml-2">selezionati</span>
                </p>
                <div style={{maxHeight: '200px'}} className="overflow-auto">
                    {this.state.possibleOfferIds.map((offer, i) => {
                        const isActive = this.state.offerIds.includes(i)
                        return <div
                            className={(isActive ? 'text-white bg-turquoise' : 'text-black') + ' flex items-center p-4 justify-between cursor-pointer'}
                            onClick={() => this.setState({
                                offerIds: isActive ? this.state.offerIds.filter(index => index !== i) : this.state.offerIds.concat(i)
                            })}
                        >
                            <i className="fas fa-circle color-black text-xs p-2"></i>
                            <span>{offer.description}</span>
                            <span className="flex-1"></span>
                            <div className="flex items-baseline">
                                {this.getOfferAttachmentTypes(offer, isActive)}
                            </div>
                        </div>
                    })}
                </div>
            </div>,
            <button
                className={"w-full py-6 text-white rounded " + (this.state.offerIds.length > 0 ? "bg-turquoise" : "bg-gray-500")}
                onClick={() => {
                    if (this.state.offerIds.length === 0) {
                        return
                    }
                    this.props.onOk(this.state.offerIds)
                }}
            >
                    Candidati
                </button>
        ]
    }
}

const mapStateToProps = (state) => ({
    me: state.user,
});

export default connect(mapStateToProps, {})(OfferPickerModal);