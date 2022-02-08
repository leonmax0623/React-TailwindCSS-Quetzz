import clsx from "clsx";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  cleanupRequest, fetchMyRequest, markApplicant
} from "../../actions/requestAction";
import {
  createModal, deletedAccFallback, extractInfo, objectFilter, optional,
  requestStatusDescription
} from "../../helpers";
import history from "../../history";
import { feedbackAPI } from "../../resources/feedback";
import { jobsAPI } from "../../resources/jobs";
import { requestAPI } from "../../resources/requests";
import Avatar from "../util/Avatar";
import AttachmentsModal from "../util/modals/AttachmentsModal";
import ChangeReasonModal from "../util/modals/ChangeReasonModal";
import ConfirmationModal from "../util/modals/ConfirmationModal";
import FeedbackModal from "../util/modals/FeedbackModal";
import InfoModal from "../util/modals/InfoModal";
import ReasonModal from "../util/modals/ReasonModal";
import Rating from "../util/Rating";
import StatusBadge from "../util/StatusBadge";
import RequestDetails from "./RequestDetails";

class MyRequestDetails extends RequestDetails {
  state = {
    showHistory: false,
  };

  componentDidMount() {
    super.componentDidMount();
    this.props.fetchMyRequest(this.props.match.params.id);
  }

  changeApplicant = (applicant, requestId) => {
    const reasonType = {};
    createModal(ConfirmationModal, {
      title: "Sei sicuro di voler cambiare Professionista?",
    })
      .then(() => createModal(ChangeReasonModal))
      .then((type) => {
        reasonType.type = type;
        return type === "custom" ? createModal(ReasonModal) : null;
      })
      .then((reason) => {
        if (reason !== null) {
          reasonType.reason = reason;
        }
        return ["tryAnother", "notSatisfied", "custom"].includes(
          reasonType.type
        )
          ? createModal(FeedbackModal)
          : null;
      })
      .then((feedback) => {
        if (feedback !== null) {
          if (reasonType.type === "custom") {
            reasonType.type = "customWithVote";
          }
          reasonType.vote = feedback.vote;
          reasonType.text = feedback.text;
        }
        const prevStatus = applicant.status;
        this.props.markApplicant(applicant, "LOADING");
        jobsAPI
          .change(applicant.proDetails.id, requestId, reasonType)
          .then(() => this.props.markApplicant(applicant, "CHANGED"))
          .catch(() => this.props.markApplicant(applicant, prevStatus));
      })
      .catch(() => null);
  };

  cancelRequest = () =>
    createModal(ConfirmationModal, {
      title: "Sei sicuro di voler annullare la richiesta?",
    })
      .then(() => requestAPI.delete(this.props.request.id))
      .then(() =>
        createModal(InfoModal, {
          button: "Ho capito",
          title: "La richiesta è stata annullata",
        })
      )
      .then(() => history.push("/requests"))
      .catch(() => null);

  completeRequest = () =>
    createModal(FeedbackModal)
      .then((feedback) =>
        createModal(ConfirmationModal, {
          title: "Sei sicuro di voler completare la richiesta?",
        }).then(() => feedback)
      )
      .then((feedback) =>
        feedbackAPI.store(this.getPro(), this.props.request, feedback)
      )
      .then(() =>
        createModal(InfoModal, {
          button: "Ho capito",
          title: "La richiesta è completata",
        })
      )
      .then(() => history.push("/requests"))
      .catch(() => null);

  getPro = () =>
    optional(
      this.props.request.candidatesDetail.filter((c) => c.status === "CHOSEN"),
      "0.proDetails"
    );

  statusBadge() {
    const r = this.props.request;
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
    );
  }

  getTopInfoItems() {
    if (this.isMobile()) {
      switch (requestStatusDescription(this.props.request.type)) {
        case "In attesa di approvazione":
          return [["Pubblicata"], []];
        case "In attesa":
          return [
            ["Pubblicata", "Scade in"],
            ["Visualizzazioni", "Offerte"],
          ];
        case "In corso":
          return [
            ["Pubblicata", "Termina in"],
            ["Visualizzazioni", "Offerte"],
          ];
        case "Completata":
          return [
            ["Pubblicata", "Completata il"],
            ["Visualizzazioni", "Offerte"],
          ];
        case "Annullata":
          return [
            ["Pubblicata", "Annullata il"],
            ["Visualizzazioni", "Offerte"],
          ];
        case "Scaduta":
          return [
            ["Pubblicata", "Scaduta il"],
            ["Visualizzazioni", "Offerte"],
          ];
        default:
          return [[], []];
      }
    } else {
      switch (requestStatusDescription(this.props.request.type)) {
        case "In approvazione":
          return ["Pubblicata"];
        case "In attesa":
          return [
            "Pubblicata",
            "Sottocategoria",
            "Scade in",
            "Visualizzazioni",
            "Offerte",
          ];
        case "In corso":
          return [
            "Pubblicata",
            "Sottocategoria",
            "Termina in",
            "Visualizzazioni",
            "Offerte",
          ];
        case "Completata":
          return [
            "Pubblicata",
            "Sottocategoria",
            "Completata il",
            "Visualizzazioni",
            "Offerte",
          ];
        case "Annullata":
          return [
            "Pubblicata",
            "Sottocategoria",
            "Annullata il",
            "Visualizzazioni",
            "Offerte",
          ];
        case "Scaduta":
          return [
            "Pubblicata",
            "Sottocategoria",
            "Scaduta il",
            "Visualizzazioni",
            "Offerte",
          ];
        default:
          return [];
      }
    }
  }

  history() {
    return (this.props.request.candidatesDetail || [])
      .map((detail) => ({
        lastStateChanged: new Date(detail.lastStateChanged),
        ...detail,
      }))
      .sort((a, b) => b.lastStateChanged - a.lastStateChanged)
      .map((detail) => {
        switch (detail.status) {
          case "SELECTION_REJECTED":
            return { detail, actions: ["selezionato", "ritirato"] };
          case "CHOSEN":
            return { detail, actions: ["selezionato", "scelto"] };
          case "CHANGED":
            return { detail, actions: ["selezionato", "scelto", "cambiato"] };
          default:
            return false;
        }
      })
      .filter(Boolean)
      .map(({ detail, actions }) =>
        actions.map((action) => (
          <>
            <span>{deletedAccFallback(detail.proDetails.initials)}</span>{" "}
            <span>{action}</span>
          </>
        ))
      )
      .flat()
      .map((historyLine, index) => (
        <p key={index} className={index === 0 ? "pt-2 text-gray-500" : "py-2 text-gray-500"}>
          {historyLine}
        </p>
      ));
  }

  rightInfo() {
    const r = this.props.request;
    const wrapperClasses = "w-full md:w-4/12 pt-10 bg-white md:bg-transparent";
    const cancellable = ["In attesa", "In corso"].includes(
      requestStatusDescription(r.type)
    );
    const history = this.history()

    switch (requestStatusDescription(r.type)) {
      case "Annullata":
        return (
          <div
            className={`${wrapperClasses} md:p-16 flex flex-col justify-center`}
          >
            <p className="text-16 mb-4 text-center">
              Hai annullato la richiesta {r.cancelled.calendar()}
            </p>
          </div>
        );
      default:
        return this.isMobile() ? (
          <>
            <div className={`${wrapperClasses} flex justify-between px-8`}>
              <button
                className={clsx(
                  "flex-1 text-left",
                  {
                    "text-center": !cancellable,
                  },
                  this.history().length !== 0
                    ? "text-turquoise"
                    : "text-gray-500 cursor-default"
                )}
                disabled={this.history().length !== 0 ? false : true}
                onClick={() => this.setState(prevState => ({
                  showHistory: !prevState.showHistory
                }))}
              >
                <i className="fas fa-history"></i>{this.state.showHistory ? "Nascondi Cronologia": "Vedi Cronologia"} 
              </button>
              <button
                className={clsx("text-gray-500 text-right flex-1", {
                  hidden: !cancellable,
                })}
                onClick={this.cancelRequest}
              >
                Annulla richiesta
              </button>
            </div>
            <div className="bg-white flex-1 px-10">
              {this.state.showHistory && this.history()}
            </div>
          </>
        ) : (
          <div
            className={`${wrapperClasses} px-0 text-center flex flex-col justify-center`}
          >
            <p className="mb-4">Cronologia:</p>
            {this.history()}
          </div>
        );
    }
  }

  bottomInfo() {
    if (
      ["Annullata", "Scaduta"].includes(
        requestStatusDescription(this.props.request.type)
      )
    ) {
      return null;
    }
    return this.isMobile() ? this.mobileBottomInfo() : this.desktopBottomInfo();
  }

  getOfferAttachmentTypes = (offer) => {
    const res = { image: 0, audio: 0, video: 0 };
    for (let att of offer.attachments) {
      const type = att.mimeType.split("/")[0];
      if (res[type] !== undefined) {
        res[type]++;
      }
    }
    return Object.entries(objectFilter(res, (_, val) => val > 0)).map(
      ([key, val]) => (
        <>
          <div className="mr-2 w-8">
            <img className="w-full h-auto" src={`/img/${key}_icon.png`} />
          </div>
          <span className="text-12">{val}</span>
        </>
      )
    );
  };

  openAttachmentsModal = (offer) =>
    createModal(AttachmentsModal, { offer, editable: false }, "wide-modal");

  desktopBottomInfo() {
    if (!this.props.request.candidatesDetail) return null;

    const cellClasses = "table-cell p-4 align-middle";
    const infoTextClasses = "text-10 text-gray-500";
    const applications = this.props.request.candidatesDetail.map((a, i) => (
      <div
        key={a.proDetails.id}
        className={`table-row ${i % 2 === 0 ? "bg-gray-100" : ""}`}
      >
        <div className={cellClasses} style={{ width: "5em" }}>
          <Link to={`/professional-profile/${a.proDetails.id}`}>
            <Avatar className="inline-block" user={a.proDetails} size={3} />
          </Link>
        </div>
        <div className={cellClasses} style={{ width: "8em" }}>
          <p className={infoTextClasses}>
            {deletedAccFallback(a.proDetails.initials)}
          </p>
          <Rating rating={a.proDetails.feedback} size={0.75} />
        </div>
        <div className={cellClasses}>
          <p className={infoTextClasses}>Range di Prezzo:</p>
          <p>
            {a.priceRange.type === "HOURLY" ? (
              <i className="far fa-clock"></i>
            ) : (
              <i className="far fa-calendar-check"></i>
            )}{" "}
            {a.priceRange.start.toFixed(2)}€ - {a.priceRange.end.toFixed(2)}€
          </p>
        </div>
        <div className={cellClasses}>
          <p className={infoTextClasses}>Cosa Offro</p>
          <p className="text-turquoise"
          onClick={() => {
            createModal(InfoModal, {
              button: "Ok!",
              title: "Cosa Offro",
              body: a.offers.map((o) => (
                <div className="flex items-center">
                  <i className="float-right leading-none fas fa-circle mr-4"></i>
                  <p className="mr-4 truncate">{o.description}</p>
                  <div className="flex items-baseline mr-4">
                    {this.getOfferAttachmentTypes(o)}
                  </div>
                  <button
                    className={clsx("text-turquoise", {
                      hidden: o.attachments.length === 0,
                    })}
                    onClick={() => this.openAttachmentsModal(o)}
                  >
                    Vedi
                  </button>
                </div>
              )),
            }).catch(() => null);
          }}>
            Vedi
          </p>
          {/*a.offers.map((o) => (
            <div className="flex items-center">
              <i className="float-right leading-none fas fa-circle mr-4"></i>
              <p className="mr-4 truncate">{o.description}</p>
              <div className="flex items-baseline mr-4">
                {this.getOfferAttachmentTypes(o)}
              </div>
              <button
                className={clsx("text-turquoise", {
                  hidden: o.attachments.length === 0,
                })}
                onClick={() => this.openAttachmentsModal(o)}
              >
                Vedi
              </button>
            </div>
          ))*/}
        </div>
        <div className={`${cellClasses} text-center`}>
          {a.quetzzerDetails ? (
            <>
              <p className={infoTextClasses}>Quetzzer</p>
              <Link to={`/user-profile/${a.quetzzerDetails.id}`}>
                <Avatar
                  className="inline-block"
                  user={a.quetzzerDetails}
                  size={3}
                />
              </Link>
              <p className={infoTextClasses}>
                {deletedAccFallback(optional(a.quetzzerDetails, "nickname"))}
              </p>
              <Rating
                rating={optional(a.quetzzerDetails, "feedback")}
                size={0.75}
              />
            </>
          ) : (
            "Candidatura spontanea"
          )}
        </div>
        <div className={`${cellClasses} whitespace-no-wrap`}>
          {this.applicationSelect(a)}
        </div>
      </div>
    ));
    return (
      <div className="bg-white border-t">
        <p className="px-8 pb-6 pt-12" style={{ marginLeft: "190px" }}>
          Candidature: <br />
          <span className="inline-block">
            <span>
              <i className="far fa-clock" style={{ color: "green" }}></i> -
              Tariffa oraria
            </span>
            <br />
            <span>
              <i
                className="far fa-calendar-check"
                style={{ color: "green" }}
              ></i>{" "}
              - Tariffa a lavoro completo
            </span>
          </span>
          <span className="float-right text-turquoise">
            Puoi scegliere fino ad un massimo di 3 professionisti alla volta
          </span>
        </p>
        {applications.length > 0 ? (
          <div className="table table-fixed w-full">{applications}</div>
        ) : (
          <p className="pb-8 text-center">
            Non ci sono ancora candidature per la tua richiesta.
          </p>
        )}
      </div>
    );
  }

  mobileBottomInfo() {
    if (!this.props.request.candidatesDetail) return null;

    const infoTextClasses = "text-10 text-gray-500";
    const applications = this.props.request.candidatesDetail.map((a, i) => (
      <div className="border-b border-gray-500 p-12">
        <div className="flex mb-8">
          <Avatar className="inline-block mr-4" user={a.proDetails} size={3} />
          <div>
            <p className={infoTextClasses}>
              {deletedAccFallback(a.proDetails.initials)}.
            </p>
            <Rating rating={a.proDetails.feedback} size={0.75} />
          </div>
          <span className="flex-1"></span>
          <div>
            <p className={infoTextClasses}>Range di Prezzo: </p>
            <p>
              {a.priceRange.type === "HOURLY" ? (
                <i className="far fa-clock"></i>
              ) : (
                <i className="far fa-calendar-check"></i>
              )}{" "}
              {a.priceRange.start}€ - {a.priceRange.end}€
            </p>
          </div>
        </div>
        <p className={`${infoTextClasses} mb-2`}>Cosa Offro</p>
        {a.offers.map((o) => (
          <div className="flex items-center my-5">
            <i className="float-right leading-none fas fa-circle mr-4"></i>
            <p className="mr-4" style={{ wordBreak: "break-word" }}>
              {o.description}
            </p>
            <div className="flex items-baseline mr-4">
              {this.getOfferAttachmentTypes(o)}
            </div>
            <button
              className={clsx("text-turquoise", {
                hidden: o.attachments.length === 0,
              })}
              onClick={() => this.openAttachmentsModal(o)}
            >
              Vedi
            </button>
          </div>
        ))}
        {this.applicationSelect(a, "block md:ml-auto")}
      </div>
    ));
    return (
      <div className="bg-white">
        <p className="px-8 flex">
          <span className="text-turquoise flex justify-start flex-grow pt-8">
            <span>Puoi scegliere fino ad un massimo di 3 professionisti alla volta</span>
          </span>
        </p>
        <p className="px-8 pb-6 pt-6 flex border-b justify-end">
          <span className="my-2 flex-1 justify-start">
            Candidature
          </span>
          <span className="inline-block my-2 justify-end flex flex-col">
            <span>
              <i className="far fa-clock" style={{ color: "green" }}></i> -
                Tariffa oraria
              </span>
            <br />
            <span>
              <i
                className="far fa-calendar-check"
                style={{ color: "green" }}
              ></i>{" "}
                - Tariffa a lavoro completo
              </span>
          </span>
        </p>
        <div className="table table-fixed w-full">{applications}</div>
      </div>
    );
  }

  applicationSelect(applicant, classes = "") {
    const lessThan3Selected =
      this.props.request.candidatesDetail.reduce(
        (prev, curr) =>
          prev + (["CHOSEN", "SELECTED"].includes(curr.status) ? 1 : 0),
        0
      ) < 3;
    const nobodyChosen =
      this.props.request.candidatesDetail.findIndex(
        (candidate) => candidate.status === "CHOSEN",
        0
      ) === -1;

    const deleted = applicant.proDetails.initials.type === "DeletedInfo"

    const selectable = lessThan3Selected && nobodyChosen && !deleted;

    let timeUntilChangable = null;
    let changable = true;

    if (applicant.status === "CHOSEN") {
      let gracePeriod = this.props.config.proGracePeriod;
      // let gracePeriod = 17860;

      const duration = moment.duration(
        moment(applicant.statusChangedAt)
          .add(gracePeriod, "seconds")
          .diff(moment())
      );
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();

      timeUntilChangable = `${(hours <= 9 ? "0" : "") + hours}:${(minutes <= 9 ? "0" : "") + minutes
        }:${(seconds <= 9 ? "0" : "") + seconds}`;

      const diff =
        moment(applicant.statusChangedAt).add(gracePeriod, "seconds") -
        moment();
      changable = diff <= 0;
      if (!changable) {
        setTimeout(() => this.forceUpdate(), 1000);
      }
    }

    if (applicant.status === "LOADING") {
      return (
        <button
          className={`text-black cursor-not-allowed text-12 border-black border-2 rounded w-32 py-1 ${classes}`}
          disabled
        >
          <i className="fas fa-spinner fa-pulse"></i>
        </button>
      );
    } else if (applicant.status === "SELECTED") {
      return (
        <button
          disabled
          className={`text-white cursor-not-allowed text-12 border-2 border-black bg-black rounded w-32 py-1 ${classes}`}
        >
          Selezionato
        </button>
      );
    } else if (applicant.status === "COMPLETED") {
      return (
        <button
          disabled
          className={`text-white cursor-not-allowed text-12 border-2 border-green-500 bg-green-500 rounded w-32 py-1 ${classes}`}
        >
          Completata
        </button>
      );
    } else if (applicant.status === "CHOSEN") {
      return (
        <div className="flex items-center">
          <button
            disabled
            className={`text-white cursor-not-allowed text-12 border-2 border-green-500 bg-green-500 rounded w-32 py-1 ${classes}`}
          >
            Scelto
          </button>
          <div className="ml-4 inline-block align-middle">
            <button
              className={
                changable ? "text-green-500" : "text-gray-500 cursor-default"
              }
              onClick={() =>
                changable &&
                this.changeApplicant(applicant, this.props.request.id)
              }
            >
              <i className="fas fa-retweet"></i>
              Cambia
            </button>
            {!changable && <p>{timeUntilChangable}</p>}
          </div>
        </div>
      );
    } else if (applicant.status === "CHANGED") {
      return (
        <button
          disabled
          className={`text-white cursor-not-allowed text-12 border-2 border-red-500 bg-red-500 rounded w-32 py-1 ${classes}`}
        >
          Cambiato
        </button>
      );
    } else if (applicant.status === "SELECTION_REJECTED") {
      return (
        <button
          disabled
          className={`text-white cursor-not-allowed text-12 border-2 border-red-500 bg-red-500 rounded w-32 py-1 ${classes}`}
        >
          Ritirato
        </button>
      );
    } else if (applicant.status === "CHOICE_PENDING" && selectable) {
      return (
        <button
          className={`text-black text-12 border-black border-2 rounded w-32 py-1 ${classes}`}
          onClick={() =>
            createModal(ConfirmationModal, { title: "Confermi la selezione?" })
              .then(() => {
                const prevStatus = applicant.status;
                this.props.markApplicant(applicant, "LOADING");
                return jobsAPI
                  .choose(applicant.proDetails.id, this.props.request.id)
                  .then(() => this.props.markApplicant(applicant, "SELECTED"))
                  .catch(() => this.props.markApplicant(applicant, prevStatus));
              })
              .catch(() => null)
          }
        >
          Seleziona
        </button>
      );
    } else {
      return (
        <button
          disabled
          className={`text-gray-700 cursor-not-allowed text-12 border-2 border-red-500 bg-red-500 rounded w-32 py-1 ${classes}`}
        >
          Cancellato
        </button>
      );
    }
  }

  username() {
    return "Tu";
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
  config: state.config,
});

export default connect(mapStateToProps, {
  fetchMyRequest,
  cleanupRequest,
  markApplicant,
})(MyRequestDetails);
