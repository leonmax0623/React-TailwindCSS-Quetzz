import React from "react";
import { connect } from "react-redux";
import { fetchJobRequests } from "../actions/jobsAction";
import { Link } from "react-router-dom";
import { createModal, createLoaderModal, FETCH_LIMIT } from "../helpers";
import JobRequestItem from "./request-item/JobRequestItem";
import { objectToParams, objectFromParams } from "../resources/util";
import moment from "moment";
import Pagination from "./util/Pagination";
import QuetzzRequestsModal from "./util/modals/QuetzzRequestsModal";
import InfoModal from "./util/modals/InfoModal";
import JobFilters from "./util/filters/JobFilters";
import { UrlDependentComponent } from "../UrlDependentComponent";
import { quetzzRequestAPI } from "../resources/quetzzRequests";
import { setUser } from "../actions/userAction";
import store from "../store";

class Requests extends UrlDependentComponent {
  state = {
    displayContactModal: false,
    displayAcceptModal: false,
    request: null,
    filters: {},
    page: 0,
  };

  componentDidMount() {
    super.componentDidMount();
    if (objectFromParams(this.props.location.state && this.props.location.state.search).paymentSuccess === "true") {
      createModal(InfoModal, {
        button: "Ho capito",
        title: "Congratulazioni!",
        body:
          "Hai appena sbloccato le informazioni di contatto del tuo nuovo cliente! Chiamalo subito!",
      })
      .catch(() => null)
      .then(() => this.props.fetchJobRequests(0, []))
    }
    if (objectFromParams(this.props.location.state && this.props.location.state.search).paymentSuccess === "false") {
      createModal(InfoModal, {
        button: "Ok!",
        title: "Pagamento non completato",
        body:
          "La procedura di pagamento non è stata completata",
      })
      .catch(() => null)
      .then(() => this.props.fetchJobRequests(0, []))
    }
  }

  onUrlChange = () => {
    const filters = objectFromParams(window.location.search);
    const dates = ["minDate", "maxDate"];
    Object.entries(filters).forEach(([key, value]) => {
      if (dates.includes(key)) {
        filters[key] = moment(value);
      }
    });
    const page = filters.page || 0;
    delete filters.page;
    this.setState({ filters, page });

    this.props.fetchJobRequests(page, filters);
  };

  contactModal() {
    const r = this.state.request;
    if (this.state.displayContactModal) {
      return createModal(
        <div>
          <p>{r.customer_info.phone}</p>
          <p>{r.customer_info.email}</p>
        </div>
      );
    }
  }

  openQuetzzModal = () => {
    createLoaderModal(quetzzRequestAPI.get()).then((quetzzes) => {
      createModal(
        QuetzzRequestsModal,
        {
          quetzzRequests: quetzzes.map((q) => ({
            ...q,
            created: moment(q.created),
          })),
        },
        "overflow-auto wide-modal"
      ).catch(() => null);
    });
  };

  render() {
    const isFiltered = Object.values(this.state.filters).filter(v => v !== "undefined" && v !== null).length !== 0
    const noItemMessage = isFiltered ? "Nessun lavoro trovato"
                                     : "Non ti sei ancora candidato ad alcuna richiesta, INIZIA SUBITO!"
    const items = this.props.requests ? (
      this.props.requests.map(
        (request) => (
          <JobRequestItem
            key={request.id}
            request={request}
            onDelete={this.onUrlChange}
          />
        )
      )
    ) : (
      <div className="text-center my-5">
        <p className="">
          {noItemMessage}
        </p>
      </div>
    );
    return (
      <div className="container">
        <div className="px-4 md:m-50 my-8">
          <Link
            to="/jobs"
            className="text-16 md:text-20 text-raleway font-bold mr-5 pb-1"
          >
            I miei Lavori
          </Link>
          <span
            className="text-16 md:text-20 text-raleway cursor-pointer"
            onClick={this.openQuetzzModal}
          >
            Quetzz ricevuti
          </span>
        </div>
        <JobFilters
          filters={this.state.filters}
          className="px-4 md:px-0"
          onUpdate={(filters) =>
            this.props.history.push(
              `${window.location.pathname}${objectToParams(filters)}`
            )
          }
        />
        <ul className="table table-fixed px-4 md:px-0 w-full">
          {items.length ? (
            items
          ) : (
            <p className="text-center text-gray-500 mt-24">
              {noItemMessage}
            </p>
          )}
        </ul>
        <Pagination
          hasMore={this.props.requests.length === FETCH_LIMIT}
          currentPage={+this.state.page}
          url="jobs"
          params={this.state.filters}
        />
        {this.contactModal()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requests: state.jobs,
});

export default connect(mapStateToProps, { fetchJobRequests })(Requests);
