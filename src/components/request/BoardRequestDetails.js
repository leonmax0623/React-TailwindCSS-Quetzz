import React from "react";
import { Link } from "react-router-dom";
import RequestDetails from "./RequestDetails";
import StatusBadge from "../util/StatusBadge";
import QuetzzModal from "../util/modals/QuetzzModal";
import IndirectQuetzzModal from "../util/modals/IndirectQuetzzModal";
import ApplyModal from "../util/modals/ApplyModal";
import CongratulationsModal from "../util/modals/CongratulationsModal";
import { createModal, optional, quotes } from "../../helpers";
import { connect } from "react-redux";
import { fetchBoardRequest, cleanupRequest } from "../../actions/requestAction";
import { jobsAPI } from "../../resources/jobs";
import OfferPickerModal from "../util/modals/OfferPickerModal";
import history from "../../history";
import InfoModal from "../util/modals/InfoModal";

class BoardRequestDetails extends RequestDetails {
  componentDidMount() {
    super.componentDidMount();
    this.props.fetchBoardRequest(this.props.match.params.id);
  }

  statusBadge() {
    return <StatusBadge className="block" status="approved" />;
  }

  getTopInfoItems() {
    return this.isMobile()
      ? [
          ["Pubblicata", "Scade in"],
          ["Visualizzazioni", "Offerte"],
        ]
      : [
          "Pubblicata",
          "Sottocategoria",
          "Scade in",
          "Visualizzazioni",
          "Offerte",
        ];
  }

  applyToRequest = () => {
    if (this.props.user.proStatus === "COMPLETED") {
      createModal(ApplyModal)
        .then((application) =>
          createModal(OfferPickerModal).then((offerIds) => ({
            ...application,
            offerIds,
          }))
        )
        .then((application) =>
          jobsAPI.apply({ ...application, requestId: this.props.request.id })
          .then(() => this.props.fetchBoardRequest(this.props.match.params.id))
        )
        .then(() =>
          createModal(CongratulationsModal, {
            title: "Congratulazioni!",
            subtitle: "Ti sei appena candidato alla richiesta!",
            button: "OK",
            body: (
              <p>
                Puoi monitorare i progressi nella sezione "I miei Lavori" ma ti
                avviseremo non appena sapremo qualcosa!
              </p>
            ),
          })
        )
        .catch(() => null)
        .then((result) => {
          if (result) {
            history.push('/');
          }
        });
    } else if (this.props.user.proStatus === "PENDING") {
      createModal(InfoModal, {
        title: "Ti chiediamo di pazientare",
        body: (
          <span>
            Il tuo profilo da professionista è in revisione.
            <br />
            Ti invieremo una notifica non appena verrà approvato.
          </span>
        ),
        button: "Ok!",
      });
    } else {
      history.push("/register-pro");
    }
  };

  quetzzAcquaintance = () =>
    createModal(QuetzzModal, {
      request: this.props.request,
    })
      .then(() =>
        createModal(CongratulationsModal, {
          title: "Ben fatto!",
          subtitle: "Hai appena inviato un Quetzz!",
          button: "OK",
          body: [
            <p className="italic text-center">
              "{quotes[(quotes.length * Math.random()) | 0]}"
            </p>,
            <p className="text-gray text-center text-12 mb-16">Anonimo</p>,
            <p className="text-center">
              Vai alla pagina{" "}
              <Link to="/quetzzes" className="font-medium text-turquoise">
                I miei Quetzz
              </Link>
            </p>,
          ],
        })
        .finally(() => this.props.fetchBoardRequest(this.props.match.params.id))
      )
      .then(() => history.push("/"))
      .catch(() => null);

  indirectQuetzz = () =>
    createModal(IndirectQuetzzModal, {
      request: this.props.request
    })
      .then(() => history.push("/"))
      .catch(() => this.props.fetchBoardRequest(this.props.match.params.id));

  rightInfo() {
    return (
      <div className="w-full flex flex-col justify-center md:w-4/12 p-10 md:px-16 md:p-0 bg-gray-100v overflow-auto relative">
        {!optional(this.props.request, "applied", false) && (
          <>
            <button
              className="text-white rounded bg-turquoise w-full py-4 mb-4"
              onClick={this.applyToRequest}
            >
              Candidati
            </button>
            <p className="text-center mb-4">o</p>
          </>
        )}
        {this.props.request.quetzzIn < this.props.config.maxQuetzzPerRequest && (
          <>
            <button
              className="text-white rounded bg-turquoise w-full py-4 mb-4"
              onClick={this.quetzzAcquaintance}
            >
              Invia un Quetzz-In
            </button>
          </>
        )}
        <button
          className="text-white rounded bg-dark-gray w-full py-4"
          onClick={this.indirectQuetzz}
        >
          Invia un Quetzz-Out
        </button>
      </div>
    );
  }

  bottomInfo() {
    return null;
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
  user: state.user,
  config: state.config
});

export default connect(mapStateToProps, { fetchBoardRequest, cleanupRequest })(
  BoardRequestDetails
);
