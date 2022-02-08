import React from "react";
import { connect } from "react-redux";
import { fetchMyRequests } from "../actions/requestsAction";
import { Link } from "react-router-dom";
import { createModal, FETCH_LIMIT } from "../helpers";
import MyRequestItem from "./request-item/MyRequestItem";
import Pagination from "./util/Pagination";
import { objectToParams, objectFromParams } from "../resources/util";
import moment from "moment";
import RequestFilters from "./util/filters/RequestFilters";
import { UrlDependentComponent } from "../UrlDependentComponent";
import { setUser } from "../actions/userAction";
import store from "../store";

class Requests extends UrlDependentComponent {
  state = {
    displayContactModal: false,
    displayAcceptModal: false,
    request: null,
    filters: {},
    page: 0,
    loading: false,
  };

  onUrlChange = () => {
    const filters = objectFromParams(window.location.search);
    const dates = ["minDate", "maxDate"];
    Object.entries(filters).forEach(([key, value]) => {
      if (dates.includes(key)) {
        filters[key] = moment(value);
      }
    });
    this.setState({ filters, loading: true });

    this.props
      .fetchMyRequests(this.state.page, filters)
      .then(() => this.setState({ loading: false }));
  };

  contactModal() {
    const r = this.state.request;
    if (this.state.displayContactModal) {
      return createModal(
        <div>
          <p>{r.customer_info.phone}</p>
          <p>{r.customer_info.email}</p>
        </div>,
        () => this.setState({ displayContactModal: false })
      );
    }
  }

  render() {
    const items = this.props.requests.map((request, index) => (
      <MyRequestItem
        key={index}
        request={request}
        onDelete={this.onUrlChange}
      />
    ));
    return (
      <div className="container">
        <div className="px-4 md:m-50 my-8">
          <Link
            to="/requests"
            className="text-16 md:text-20 text-raleway font-bold pb-1"
          >
            Le mie Richieste
          </Link>
        </div>
        <RequestFilters
          filters={this.state.filters}
          className="px-4 md:px-0"
          onUpdate={(filters) =>
            this.props.history.push(
              `${window.location.pathname}${objectToParams(filters)}`
            )
          }
        />
        {this.mainSection(items)}
        <Pagination
          hasMore={this.props.requests.length === FETCH_LIMIT}
          currentPage={+this.state.page}
          url="requests"
          params={this.state.filters}
        />
        {this.contactModal()}
      </div>
    );
  }

  mainSection(items) {
    if (this.state.loading) {
      return (
        <p className="text-center">
          <i className="fas text-gray-500 fa-spinner fa-pulse fa-2x"></i>
        </p>
      );
    } else if (items.length > 0) {
      return <ul className="table table-fixed px-4 md:px-0 w-full">{items}</ul>;
    } else {
      return (
        <p className="text-center text-gray-500 mt-24">
          Non hai ancora pubblicato alcuna richiesta, inizia a farlo
          <Link className="text-turquoise ml-2" to="/new">
            SUBITO!
          </Link>
        </p>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  requests: state.requests,
});

export default connect(mapStateToProps, { fetchMyRequests })(Requests);
