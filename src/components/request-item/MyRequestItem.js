import React from 'react'
import RequestItem from './RequestItem'
import { createModal, requestStatusDescription, createLoaderModal, extractInfo } from '../../helpers'
import { withRouter } from 'react-router-dom'
import StatusBadge from '../util/StatusBadge'
import InfoModal from '../util/modals/InfoModal'
import FeedbackModal from '../util/modals/FeedbackModal'
import { requestAPI } from '../../resources/requests'
import ConfirmationModal from '../util/modals/ConfirmationModal'
import { feedbackAPI } from '../../resources/feedback'

class MyRequestItem extends RequestItem {
    link = () => `/my-requests/${this.props.request.id}`

    contactModal = (e, user) => {
        e.preventDefault()
        e.stopPropagation()
        createModal(
            InfoModal,
            {
                title: 'Informazioni di contatto',
                subtitle: `Ecco i recapiti di ${user.name}`,
                body: [
                    <p>Cellulare: {user.cellphone}</p>,
                    <p>Email: {user.email}</p>
                ]
            }
        ).catch(() => null)
    }

    deleteRequest = (e) => {
        e.preventDefault()
        e.stopPropagation()
        createModal(ConfirmationModal, {title: "Sei sicuro di voler annullare la richiesta?"})
            .then(() => createLoaderModal(requestAPI.delete(this.props.request.id)))
            .then(() => createModal(InfoModal, { button: "Ho capito", title: "La richiesta è stata annullata"}))
            .then(this.props.onDelete)
            .catch(() => null)
    }

    feedbackModal = e => {
        const r = this.props.request
        e.preventDefault()
        e.stopPropagation()
        createModal(FeedbackModal)
            .then(
                feedback => createModal(ConfirmationModal, {title: "Sei sicuro di voler completare la richiesta?"})
                    .then(() => feedback)
            )
            .then(feedback => feedbackAPI.store(r, feedback))
            .then(() => createModal(InfoModal, { button: "Ho capito", title: "La richiesta è completata"}))
            .then(this.props.onDelete)
            .catch(() => null)
    }

    getLeftInfoItems() {
        switch (requestStatusDescription(this.props.request.type)) {
            case 'In approvazione':
                return [["Pubblicata"], ["Categoria", "Sottocategoria"]]
            case 'In attesa':
                return [["Pubblicata", "Scade in"], ["Categoria", "Sottocategoria"]]
            case 'In corso':
                return [["Pubblicata", "Termina in"], ["Categoria", "Sottocategoria"]]
            case 'Completata':
                return [["Pubblicata", "Completata il"], ["Categoria", "Sottocategoria"]]
            case 'Annullata':
                return [["Pubblicata", "Annullata il"], ["Categoria", "Sottocategoria"]]
            case 'Scaduta':
                return [["Pubblicata", "Scaduta il"], ["Categoria", "Sottocategoria"]]
            default:
                return [[], []]
        }
    }

    getRightInfoItems() {
        return ["Visualizzazioni", "Offerte"]
    }

    renderActionButtons() {
        const r = this.props.request
        const buttons = []
        const buttonClasses = "w-full inline-block text-center text-12"
        const buttonOnlyClasses = "text-white mb-4 px-1 py-2 rounded"
        const userDeleted = !extractInfo(r.proContactInfo)
        if (requestStatusDescription(r.type) === 'In corso') {
            buttons.push(
                <button
                    className={`bg-dark-green ${buttonOnlyClasses} ${buttonClasses}`}
                    onClick={this.feedbackModal}
                >
                   Completa richiesta
                </button>,
                userDeleted ?
                <span
                    className={`bg-black cursor-default ${buttonOnlyClasses} ${buttonClasses}`}
                    onClick={e => e.preventDefault()}
                >
                    Utente cancellato
                </span> :
                <button
                    className={`bg-black ${buttonOnlyClasses} ${buttonClasses}`}
                    onClick={e => this.contactModal(e, extractInfo(r.proContactInfo))}
                >Contatta il Professionista</button>
            )
        }
        if (requestStatusDescription(r.type) === 'Completata') {
            const buttonType = r.type === 'deadline' &&  <button
            className={`bg-turquoise ${buttonOnlyClasses} ${buttonClasses}`}
            onClick={this.feedbackModal}
        >
                Lascia un feedback
        </button>
            buttons.push(
                buttonType
            )
        }
        return (
            <div className="table-cell pb-11 pt-11 px-4 align-middle border-b-2 border-gray-100" style={{width: '10em'}}>
                {buttons}
                <StatusBadge status={r.type} className={buttonClasses}/>
            </div>
        )
    }

    shouldDisplayBadge() {
        return true
    }

    mobileTopItems() {
        return ["Categoria", "Sottocategoria"]
    }

    mobileBottomItems() {
        switch (requestStatusDescription(this.props.request.type)) {
            case 'In attesa':
                return ["Scade in", "Visualizzazioni", "Offerte"]
            case 'In corso':
                return ["Termina in", "Visualizzazioni", "Offerte"]
            case 'Completata':
                return ["Completata il", "Visualizzazioni", "Offerte"]
            case 'Annullata':
                return ["Annullata il", "Visualizzazioni", "Offerte"]
            case 'Scaduta':
                return ["Scaduta il", "Visualizzazioni", "Offerte"]
            default:
                return []
        }
    }

    renderMobileActionButtons() {
        const r = this.props.request
        const buttons = []
        const buttonClasses = "inline-block text-center text-12 text-white mb-4 px-1 py-3 rounded"
        const userDeleted = !extractInfo(r.proContactInfo)
        switch (requestStatusDescription(r.type)) {
            case 'In corso':
                return [
                    <button className={`bg-dark-green flex-4 ${buttonClasses}`} onClick={this.feedbackModal}>
                        {r.type === 'deadline' ? 'Lascia un feedback' : 'Completa richiesta'}
                    </button>,
                    <span className="pr-4"></span>,
                    userDeleted ?
                    <span
                        className={`bg-black flex-3 cursor-default ${buttonClasses}`}
                        onClick={e => e.preventDefault()}
                    >
                        Utente cancellato
                    </span> :
                    <button
                        className={`bg-black flex-3 ${buttonClasses}`}
                        onClick={e => this.contactModal(e, extractInfo(r.proContactInfo))}
                    >Contatta il Professionista</button>
                ]
            case 'Completata':
                if(r.type === 'deadline')return (
                <button
                    className={`bg-turquoise flex-1 ${buttonClasses}`}
                    onClick={this.feedbackModal}
                >
                        Lascia un feedback
                </button>)
            default:
                return buttons
        }
    }

    renderDeleteButton() {
        let button
        if (['In attesa', 'In corso'].includes(requestStatusDescription(this.props.request.type))) {
            button = <i
                className="far fa-times-circle text-light-gray pl-2"
                onClick={e => this.deleteRequest(e)}
            ></i>
        }
        else {
            button = null
        }

        return <div className="table-cell pb-11 pt-11 px-4 align-middle border-b-2 border-gray-100 pr-12 w-24">
            {button}
        </div>
    }
}

export default withRouter(MyRequestItem)