import React from "react";
import RequestItem from "./RequestItem";
import {
  createModal,
  jobStatusDescription,
  createLoaderModal,
  extractInfo,
} from "../../helpers";
import { withRouter } from "react-router-dom";
import StatusBadge from "../util/StatusBadge";
import InfoModal from "../util/modals/InfoModal";
import { jobsAPI } from "../../resources/jobs";
import UnlockModal from "../util/modals/UnlockModal";
import { redirectToCheckout } from "../../stripe";
import ConfirmationModal from "../util/modals/ConfirmationModal";

class JobRequestItem extends RequestItem {
  componentDidMount() {
  }

  link = () => `/jobs/${this.props.request.id}`;

  contactModal = (e, user) => {
    e.preventDefault();
    e.stopPropagation();
    createModal(InfoModal, {
      title: "Informazioni del Cliente",
      subtitle: `Ecco il contatto di ${user.name}`,
      body: [<p>Cellulare: {user.cellphone}</p>, <p>Email: {user.email}</p>],
    });
  };

  accept = (e) => {
    e.preventDefault();
    e.stopPropagation();
    createModal(UnlockModal)
      .then(() => createLoaderModal(jobsAPI.accept(this.props.request.id)))
      .then((session) => redirectToCheckout(session.paymentSessionId));
  };

  reject = (e) => {
    e.preventDefault();
    e.stopPropagation();
    createModal(ConfirmationModal, {
      title: "Sei sicuro di voler rifiutare il lavoro?",
    })
      .then(() => createLoaderModal(jobsAPI.reject(this.props.request.id)))
      .then(() =>
        createModal(InfoModal, {
          button: "Ho capito",
          title: "Il lavoro è stato rifiutato",
          body:
            "Il lavoro è stato rifiutato, perciò è stato rimosso dalla lista dei tuoi lavori!",
        })
      )
      .then(() => this.props.onDelete());
  };

  getLeftInfoItems() {
    switch (jobStatusDescription(this.props.request.type)) {
      case "Scelto":
        return [
          ["Cliente", "Termina in"],
          ["Categoria", "Sottocategoria"],
        ];
      case "In attesa":
        return [
          ["Cliente", "Termina in"],
          ["Categoria", "Sottocategoria"],
        ];
      case "In corso":
        return [
          ["Cliente", "Termina in"],
          ["Categoria", "Sottocategoria"],
        ];
      case "Completata":
        return [
          ["Cliente", "Completata il"],
          ["Categoria", "Sottocategoria"],
        ];
      case "Annullato":
        return [
          ["Cliente", "Annullata il"],
          ["Categoria", "Sottocategoria"],
        ];
      default:
        return [[], []];
    }
  }

  getRightInfoItems() {
    switch (jobStatusDescription(this.props.request.type)) {
      case "Scelto":
        return ["Quetzzer", "Range di Prezzo"];
      case "In attesa":
        return ["Quetzzer", "Range di Prezzo"];
      case "In corso":
        return ["Quetzzer", "Range di Prezzo"];
      case "Completata":
        return ["Quetzzer", "Feedback"];
      case "Annullato":
        return ["Quetzzer", ""];
      default:
        return ["", ""];
    }
  }

  renderActionButtons() {
    const r = this.props.request;
    const buttons = [];
    const buttonClasses = "w-full inline-block text-center text-12";
    const buttonOnlyClasses = "text-white mb-4 px-1 py-2 rounded";
    const userDeleted = !extractInfo(r.contactInfo);
    
    switch (r.type) {
      case "pendingToConfirm":
        buttons.push(
          <span className="text-xs text-gray-500">
            <p className="pb-3 text-center">Vuoi accettare questo lavoro?</p>
          </span>,
          <div className="flex">
            <button
              className={`flex-1 bg-turquoise mr-2 ${buttonOnlyClasses} ${buttonClasses} inline-block`}
              onClick={(e) => this.accept(e)}
            >
              Sì
            </button>
            <button
              className={`flex-1 bg-red-500 ${buttonOnlyClasses} ${buttonClasses} inline-block`}
              onClick={(e) => this.reject(e)}
            >
              No
            </button>
          </div>
        );
        break;
      case "ongoing":
        buttons.push(
          userDeleted ? (
            <span
              className={`bg-gray-900 cursor-default w-full ${buttonOnlyClasses} ${buttonClasses} block`}
              onClick={(e) => e.preventDefault()}
            >
              Utente cancellato
            </span>
          ) : (
            <button
              className={`bg-gray-900 w-full ${buttonOnlyClasses} ${buttonClasses} block`}
              onClick={(e) => this.contactModal(e, extractInfo(r.contactInfo))}
              key={r.id}
            >
              Contatta il Cliente
            </button>
          )
        );
        /*
        case 'deadline':
          buttons.push (
              <button className={`bg-dark-green flex-1 ${buttonClasses} ${buttonOnlyClasses}`} onClick={this.feedbackModal}>
                  Lascia un feedback
              </button>,
              userDeleted ?
              <span
                  className={`bg-black flex-1 cursor-default ${buttonClasses} ${buttonOnlyClasses}`}
                  onClick={e => e.preventDefault()}
              >
                  Utente cancellato
              </span> :
              <button
                  className={`bg-black flex-1 ${buttonClasses} ${buttonOnlyClasses}`}
                  onClick={e => this.contactModal(e, extractInfo(r.proContactInfo))}
              >Contatta il Professionista</button>
          )
        
        case 'Completata':
        
          if(r.type === 'deadline') return (
          <button
              className={`bg-turquoise flex-1 ${buttonClasses}`}
              onClick={this.feedbackModal}
          >
                  Lascia un feedback
          </button>)
        */
      
    }
    return (
      <div
        className="table-cell pb-11 pt-11 px-4 align-middle border-b-2 border-gray-100"
        style={{ width: "10em" }}
      >
        {buttons}
        <StatusBadge
          status={r.type}
          className={`${buttonClasses} w-full block`}
        />
      </div>
    );
  }

  shouldDisplayBadge() {
    return true;
  }

  mobileTopItems() {
    return ["Cliente", "Categoria", "Sottocategoria"];
  }

  mobileBottomItems() {
    switch (jobStatusDescription(this.props.request.type)) {
      case "Scelto":
        return ["Termina in", "Quetzzer", "Range di Prezzo"];
      case "In attesa":
        return ["Termina in", "Quetzzer", "Range di Prezzo"];
      case "In corso":
        return ["Termina in", "Quetzzer", "Range di Prezzo"];
      case "Completata":
        return ["Completata il", "Quetzzer", "Feedback"];
      case "Annullata":
        return ["Annullata il", "Quetzzer"];
      default:
        return [];
    }
  }

  renderMobileActionButtons() {
    const r = this.props.request;
    const buttonClasses = "inline-block text-center text-12";
    const buttonOnlyClasses = "text-white mb-4 px-1 py-3 rounded";
    const userDeleted = !extractInfo(r.contactInfo);
    switch (r.type) {
      case "ongoing":
        return userDeleted ? (
          <span
            className={`bg-gray-900 cursor-default w-full ${buttonOnlyClasses} ${buttonClasses} block`}
            onClick={(e) => e.preventDefault()}
          >
            Utente cancellato
          </span>
        ) : (
          <button
            className={`bg-black flex-1 ${buttonOnlyClasses} ${buttonClasses}`}
            onClick={(e) => this.contactModal(e, extractInfo(r.contactInfo))}
          >
            Contatta il Cliente
          </button>
        );
      case "pendingToConfirm":
        return [
          <p className="text-12 text-gray-500 w-full mb-4" key={1}>
            Vuoi accettare questo lavoro?
          </p>,
          <button
            key={2}
            className={`bg-turquoise mr-4 flex-1 ${buttonOnlyClasses} ${buttonClasses}`}
            onClick={(e) => this.accept(e)}
          >
            Sì
          </button>,
          <button
            key={3}
            className={`bg-red-500 flex-1 ${buttonOnlyClasses} ${buttonClasses}`}
            onClick={(e) => this.reject(e)}
          >
            No
          </button>,
        ];
    }
    return [];
  }

  renderDeleteButton() {
    return null;
  }
}

export default withRouter(JobRequestItem);
