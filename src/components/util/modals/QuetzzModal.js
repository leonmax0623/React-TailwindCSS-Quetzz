import TextField, { Input } from '@material/react-text-field'
import React from 'react'
import { connect } from 'react-redux'
import Component from '../../../Component'
import { copy, escapeRegExp } from '../../../helpers'
import { quetzzesAPI } from '../../../resources/quetzzes'
import { userAPI } from '../../../resources/users'
import Avatar from '../Avatar'
import Loader from '../Loader'
import PersonCard from '../PersonCard'

const STAGE_SEARCH = 1
const STAGE_QUETZZ = 2
const STAGE_NOT_FOUND = 3
const STAGE_LOADING = 4
const STAGE_LINK = 5

class QuetzzModal extends Component {
    cardRef = React.createRef()

    state = {
        stage: STAGE_SEARCH,
        emailSearch: '',
        phoneSearch: '',
        networkSearch: '',
        user: null,
        userSelected: false,
        locked: false,
        fromNetwork: false,
        network: [],
        networkChoice: null,
    }

    componentDidMount() {
        super.componentDidMount()
        quetzzesAPI.network(this.props.request)
            .then(network => this.setState({network: network.content.filter(n => !n.quetzzed && this.props.user.id !== n.id)}))
    }

    button() {
        return {
            [STAGE_SEARCH]: 'Cerca',
            [STAGE_QUETZZ]: 'Quetzz',
            [STAGE_NOT_FOUND]: 'Cerca',
            [STAGE_LOADING]: <Loader color="white" size={1} />,
            [STAGE_LINK]: 'Cerca',
        }[this.state.stage]
    }

    buttonClick = e => {
        e.preventDefault()
        e.stopPropagation()
        this.setState({stage: STAGE_LOADING, user: null, locked: false})
        switch (this.state.stage) {
            case STAGE_NOT_FOUND:
            case STAGE_SEARCH:
            case STAGE_LINK:
                userAPI
                    .search(
                        this.props.request.id,
                        {email: this.state.emailSearch, cellphone: this.state.phoneSearch}
                    )
                    .then(user => {
                        if (user.quetzzed) {
                            throw "user already quetzzed"
                        }
                        this.setState({stage: (user ? (user.quetzzable ? STAGE_QUETZZ : STAGE_SEARCH) : STAGE_NOT_FOUND), user})
                    })
                    .catch(() => this.setState({stage: STAGE_NOT_FOUND}))
                    break
            case STAGE_QUETZZ:
                userAPI.quetzz(this.state.user, this.props.request)
                    .then(() => this.props.onOk())
                    .catch(() => null)
                    .then(() => this.setState({stage: STAGE_SEARCH}))
                break
        }
    }

    componentDidUpdate(_, prevState) {
        if (prevState.stage !== STAGE_QUETZZ && this.state.stage === STAGE_QUETZZ) {
            const interval = setInterval(() => {
                if (this.cardRef.current) {
                    this.cardRef.current.focus()
                    clearInterval(interval)
                }
            }, 100)
        }
    }

    notFoundText() {
        if (this.state.stage === STAGE_NOT_FOUND) {
            return <p className="bg-light-red py-6 text-red text-center">
                Non è stata trovata alcuna corrispondenza
                <button
                    className="underline ml-2"
                    onClick={
                        () => (this.props.request.quetzzOut ? userAPI.getQuetzzIndirect : userAPI.quetzzIndirect)(this.props.request)
                            .then(link => this.setState({stage: STAGE_LINK, link}))
                            .catch(() => null)
                    }
                >
                    Perché non lo inviti?
                </button>
            </p>
        }
    }

    copyLink = () => copy(`${window.location.protocol}//${window.location.hostname}:${window.location.port}/quetzz/${this.state.link}`)

    link() {
        if (this.state.stage === STAGE_LINK) {
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
    }

    result() {
        if (this.state.user) {
            return [
                <p key={`user-found`} className="mb-3">Corrispondenza trovata:</p>,
                <div
                    key={`user-found-card`}
                    ref={this.cardRef}
                    tabIndex="0"
                    onBlur={() => {
                        if (!this.state.locked && this.state.stage !== STAGE_LOADING) {
                            this.setState({ stage: STAGE_SEARCH })
                        }
                    }}
                    onFocus={() => this.state.user.quetzzable && this.setState({ stage: STAGE_QUETZZ })}
                    className={(this.state.user.quetzzable ? 'focus:border-turquoise' : 'border-gray-500') + " focus:outline-none border-transparent border-2 rounded-lg"}
                >
                    <PersonCard person={this.state.user} />
                    {!this.state.user.quetzzable && this.state.user.type == "user" && <p className="my-4 text-gray-500 text-center">Non è possibile raccomandare questo utente</p>}
                    {!this.state.user.quetzzable && this.state.user.type == "pro" && <p className="my-4 text-gray-500 text-center">Non è possibile raccomandare il professionista per questa richiesta</p>}
                </div>
            ]
        }
    }

    networkResults() {
        if (this.state.networkSearch.length === 0) {
            return []
        }
        const reg = new RegExp(escapeRegExp(this.state.networkSearch), 'i')
        const results = this.state.network.filter(i => reg.test(i.fullname))
            .map((result, idx) => <li
                key={`network-result-${idx}`}
                className="flex items-center hover:bg-gray-200 cursor-pointer p-4 border-b border-l border-r border-black"
                onClick={() => this.setState({networkChoice: result})}
            >
                <Avatar className="inline-block mr-4" user={result} size={2}/>
                {result.fullname}
            </li>
            )
        return <ul>{results}</ul>
    }

    networkPicker() {
        if (this.state.networkChoice) {
            return <>
                <p className="p-4 border border-turquoise relative mb-4 flex items-center">
                    <Avatar className="inline-block mr-4" user={this.state.networkChoice} size={2}/>
                    {this.state.networkChoice.fullname}
                    <span
                        className="cursor-pointer absolute bg-turquoise text-white rounded-full text-center"
                        style={{
                            right: "-5px",
                            top: "-5px",
                            height: "15px",
                            fontSize: "15px",
                            lineHeight: "15px",
                            width: "15px",
                        }}
                        onClick={() => this.setState({networkChoice: null})}
                    >
                        ×
                    </span>
                </p>
                <button
                    className="text-white bg-dark-gray w-full py-4"
                    onClick={() => {
                        userAPI.quetzz(this.state.networkChoice, this.props.request)
                            .then(() => this.props.onOk())
                            .catch(() => null)
                            .then(() => this.setState({networkChoice: null}))
                    }}
                >
                    Quetzz
                </button>
            </>
        }
        return <>
            <p className="mb-4 mt-8">
                <strong className="mr-2 mt-2">Seleziona</strong>
                il contatto dalla tua rubrica!
            </p>
            <TextField label="Inizia digitando la prima lettera del Nome">
                <Input
                    type="text"
                    value={this.state.networkSearch}
                    onChange={e => this.setState({ networkSearch: e.currentTarget.value })}
                />
            </TextField>
            {this.networkResults()}
        </>
    }

    render() {
        return <>
            <div className="mb-12">
                <h1 className="text-raleway font-bold text-28 mb-12">
                    Quetzza il tuo conoscente
                </h1>
                <p className="mb-8">Verifica se il professionista è già iscritto a Quetzz inserendo il suo numero di cellulare o la sua mail:</p>
                <div className="mb-6">
                    <TextField
                        label="Email"
                        leadingIcon={<i className="far fa-envelope"></i>}
                    >
                        <Input
                            type="text"
                            value={this.state.emailSearch}
                            onChange={e => this.setState({ emailSearch: e.currentTarget.value })}
                        />
                    </TextField>
                </div>
                <div className="mb-10">
                    <TextField
                        label="Numero di Cellulare"
                        leadingIcon={<i className="fas fa-phone-alt"></i>}
                    >
                        <Input
                            type="text"
                            value={this.state.phoneSearch}
                            onChange={e => this.setState({ phoneSearch: e.currentTarget.value })}
                        />
                    </TextField>
                </div>
                {this.result()}
                {this.notFoundText()}
                {this.link()}
            </div>
            <button
                className="w-full py-6 bg-turquoise text-white rounded mb-8"
                onClick={this.buttonClick}
                onMouseDown={() => this.setState({locked: true})}
            >
                {this.button()}
            </button>
            <label className="checkbox-container checkbox-container--right mb-4">
                <i className="fas fa-question-circle mr-4"></i>
                <span>L'utente fa già parte della tua rete?</span>
                <input
                    type="checkbox"
                    checked={this.state.fromNetwork}
                    onChange={(e) => this.setState({fromNetwork: e.currentTarget.checked})}
                    />
                <span className="checkmark checkmark--right"></span>
            </label>
            {
                this.state.fromNetwork ?
                this.networkPicker() :
                null
            }
        </>
    }
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps)(QuetzzModal)