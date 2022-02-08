import React from "react";
import RequestDetails from "./RequestDetails";
import {
  createModal,
  jobStatusDescription,
  createLoaderModal,
  optional,
  extractInfo,
} from "../../helpers";
import Rating from "../util/Rating";
import Avatar from "../util/Avatar";
import StatusBadge from "../util/StatusBadge";
import UnlockModal from "../util/modals/UnlockModal";
import { fetchJob, cleanupRequest } from "../../actions/requestAction";
import { connect } from "react-redux";
import { redirectToCheckout } from "../../stripe";
import { jobsAPI } from "../../resources/jobs";
import history from "../../history";
import ConfirmationModal from "../util/modals/ConfirmationModal";
import InfoModal from "../util/modals/InfoModal";
import { Link } from "react-router-dom";
import clsx from "clsx";

class JobRequestDetails extends RequestDetails {
  componentDidMount() {
    super.componentDidMount();
    this.props.fetchJob(this.props.match.params.id);
  }

  unlockModal = () =>
    createModal(UnlockModal)
      .then(() => jobsAPI.accept(this.props.request.id))
      .then((session) => redirectToCheckout(session.paymentSessionId));

  statusBadge() {
    return <StatusBadge className="block" status={this.props.request.type} />;
  }

  getTopInfoItems() {
    const statusId = jobStatusDescription(this.props.request.type);
    if (this.isMobile()) {
      switch (statusId) {
        case "Scelto":
          return [
            ["Cliente", "Termina in"],
            ["Categoria", "Sottocategoria"],
          ];
        case "In attesa":
          return [
            ["Pubblicata", "Data di Termine"],
            ["Range di Prezzo", "Quetzzer"],
          ];
        case "In corso":
          return [
            ["Pubblicata", "Termina in"],
            ["Range di Prezzo", "Quetzzer"],
          ];
        case "Completata":
          return [["Pubblicata", "Completata il"], ["Quetzzer"]];
        case "Annullata":
          return [["Pubblicata", "Annullata il"], ["Quetzzer"]];
        default:
          return [[], []];
      }
    } else {
      switch (statusId) {
        case "Scelto":
          return ["Cliente", "Termina in"];
        case "In attesa":
          return [
            "Pubblicata",
            "Sottocategoria",
            "Data di Termine",
            "Range di Prezzo",
            "Quetzzer",
          ];
        case "In corso":
          return [
            "Pubblicata",
            "Sottocategoria",
            "Termina in",
            "Range di Prezzo",
            "Quetzzer",
          ];
        case "Completata":
          return ["Pubblicata", "Sottocategoria", "Completata il", "Quetzzer"];
        case "Annullata":
          return ["Pubblicata", "Sottocategoria", "Annullata il", "Quetzzer"];
        default:
          return [];
      }
    }
  }

  rightInfo() {
    const r = this.props.request;
    const wrapperClasses =
      "w-full flex flex-col justify-center md:w-4/12 p-10 md:px-12 md:py-0 bg-gray-100v overflow-auto relative";
    switch (jobStatusDescription(r.type)) {
      case "In attesa":
        if (r.type === "pendingToConfirm") {
          return (
            <div className={wrapperClasses}>
              <p className="mb-4 text-16">
                Sblocca ora le informazioni di contatto del tuo potenziale
                cliente per soli:
              </p>
              <p className="mb-4">
                <span className="line-through">6,90€</span>
                <span className="bg-red-500 rounded text-white p-1 ml-4">
                  -30%
                </span>
              </p>
              <p className="mb-4">
                <span className="text-32 mr-4">4,90€</span>
                <span className="align-text-bottom">+ iva</span>
              </p>
              <button
                className="text-white bg-turquoise w-full py-4 mb-4 text-16"
                onClick={this.unlockModal}
              >
                Sblocca
              </button>
              <p className="mb-4 font-bold text-center text-20">o</p>
              <button
                className="text-white bg-red-500 py-2 px-8 mx-auto block"
                onClick={this.reject}
              >
                Rifiuta
              </button>
            </div>
          );
        } else {
          return null;
        }
      case "In corso":
        return (
          <div className={`${wrapperClasses} md:text-center`}>
            <p className="text-16 mb-6">Informazioni del Cliente:</p>
            <p className="md:text-indigo-700 text-12 mb-4">
              {optional(extractInfo(r.contactInfo), "name") || (
                <strong>Utente cancellato</strong>
              )}
            </p>
            <p className="md:text-indigo-700 text-12 mb-4">
              {optional(extractInfo(r.contactInfo), "cellphone")}
            </p>
            <p className="md:text-indigo-700 text-12 mb-4">
              {optional(extractInfo(r.contactInfo), "email")}
            </p>
          </div>
        );
      case "Completata":
        return this.isMobile() ? (
          <div className={`${wrapperClasses} text-center`}>
            <div className="flex items-center mb-8">
              <Avatar
                className="inline-block mb-4"
                user={r.feedback}
                size={3}
              />
              <span className="text-16">
                <strong>{extractInfo(r.feedback.userNickname)}</strong>
              </span>
              <span className="flex-1"></span>
              <Rating rating={r.feedback.vote} size={1.2} />
            </div>
            <p className="mb-8 text-12">"{r.feedback.text}"</p>
          </div>
        ) : (
          <div className={`${wrapperClasses} text-center`}>
            <Avatar className="block mx-auto mb-4" user={r.feedback} size={5} />
            <p className="mb-8 text-16">
              <strong>{extractInfo(r.feedback?.userNickname)}</strong>
            </p>
            <p className="mb-8 text-12">{r.feedback?.text ? `"${r.feedback.text}"` : 'Non è stato lasciato alcun feedback'}</p>
            <p className="mb-4 text-10">Feedback</p>
            <Rating rating={r.feedback?.vote} size={0.75} />
          </div>
        );
      default:
        return null;
    }
  }

  accept = (e) => {
    e.preventDefault();
    e.stopPropagation();
    createModal(UnlockModal)
      .then(() => createLoaderModal(jobsAPI.accept(this.props.request.id)))
      .then((session) => redirectToCheckout(session.paymentSessionId));
  };

  reject = () =>
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
      .then(() => history.push("/jobs"));

  bottomInfo() {
    const r = this.props.request;
    const buttons = [];
    const buttonClasses = "text-center text-12";
    const buttonOnlyClasses = "text-dark mb-4 px-1 py-2";
    const userDeleted = !extractInfo(r.contactInfo);
    switch (r.type) {
      case "pendingToConfirm":
        buttons.push(
          <span className="text-gray-500 mb-5">
            Vuoi accettare questo lavoro?
          </span>,
          <div className="flex mt-5">
            <button
              className={`text-16 md:text-20 rounded bg-turquoise text-white py-2 pe-2 me-2 md:w-12 w-32 lg:w-48 text-center`}
              onClick={(e) => this.accept(e)}
            >
              Sì
            </button>
            <button
              className={`text-16 md:text-20 rounded bg-red-500 text-white py-2 px-4 mx-4 md:w-12 w-32 lg:w-48 text-center`}
              onClick={(e) => this.reject(e)}
            >
              No
            </button>
          </div>
        );
        break;
    }
    return (
      <div className="pb-11 pt-11 px-4 align-middle">
        {buttons}
        {/* <StatusBadge
          status={r.type}
          className={`${buttonClasses} w-full block`}
        /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
});

export default connect(mapStateToProps, { fetchJob, cleanupRequest })(
  JobRequestDetails
);
