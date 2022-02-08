import React from 'react'
import Component from '../../../Component'
import TextField, { Input } from '@material/react-text-field'
import Loader from '../Loader'
import { userAPI } from '../../../resources/users'
import { copy, escapeRegExp } from '../../../helpers'
import PersonCard from '../PersonCard'
import { quetzzesAPI } from '../../../resources/quetzzes'
import Avatar from '../Avatar'
import { connect } from 'react-redux'

const STAGE_SEARCH = 1
const STAGE_QUETZZ = 2
const STAGE_NOT_FOUND = 3
const STAGE_LOADING = 4
const STAGE_LINK = 5

class IndirectQuetzzModal extends Component {
    cardRef = React.createRef()

    state = {
        loading: false,
        link: null
    }

    componentDidMount() {
        super.componentDidMount()
        const apiToCall = (this.props.request.quetzzOut ? userAPI.getQuetzzIndirect : userAPI.quetzzIndirect)
        apiToCall(this.props.request)
            .then(link => {
                this.setState({link: link})
            })
    }

    buttonClick = e => {
        e.preventDefault()
        e.stopPropagation()
        this.props.onOk()
    }

    copyLink = () => copy(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/quetzz/${this.state.link}`)

    link() {
        return <>
            <div className="bg-gray-200 rounded p-6 flex justify-between mb-4">
                <span className="flex-1 text-gray-600 truncate">{this.state.link}</span>
                <button className="text-turquoise" onClick={this.copyLink}>Copy</button>
            </div>
            <p className="text-14 text-gray-500">
                <strong className="mr-1">Whatsapp, Messenger, Email?</strong>
                Decidi tu come condividerlo!
            </p>
        </>
    }

    render() {
        return <>
            <div className="mb-12">
                <h1 className="text-raleway font-bold text-28 mb-12">
                    Quetzza il tuo conoscente
                </h1>
                <p className="mb-8">
                    <strong>NB: </strong>
                    Puoi monitorare i progressi dei tuoi quetzz nell'apposita sezione "I miei Quetzz"!
                </p>
                {this.link()}
            </div>
            <button
                className="w-full py-6 bg-turquoise text-white rounded mb-8"
                onClick={this.buttonClick}
                onMouseDown={() => this.setState({locked: true})}
            >
                Torna alla board
            </button>
        </>
    }
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps)(IndirectQuetzzModal)