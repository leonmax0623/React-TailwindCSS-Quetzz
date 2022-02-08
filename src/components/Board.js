import React from "react";
import { connect } from "react-redux";
import { fetchBoardRequests } from "../actions/boardAction";
import BoardRequestItem from "./request-item/BoardRequestItem";
import BoardFilters from "./util/filters/BoardFilters";
import { objectToParams, objectFromParams } from "../resources/util";
import moment from "moment";
import Pagination from "./util/Pagination";
import { filtersAPI } from "../resources/filters";
import { UrlDependentComponent } from "../UrlDependentComponent";
import { FETCH_LIMIT } from "../helpers";

class Requests extends UrlDependentComponent {
  state = {
    code: "",
    filters: {},
    page: 0,
    loading: false,
  };

  onUrlChange() {
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
    filtersAPI.region().then((region) => {
      filters.region = region.id;
      this.setState({ loading: true });
      this.props
        .fetchBoardRequests(page, filters)
        .then(() => this.setState({ loading: false }));
    });
  }

  render() {
    const items = this.props.requests.map((request, index) => (
      <BoardRequestItem key={index} request={request} />
    ));
    return (
      <>
        <div
          className={this.isMobile() ? "bg-white" : "gradient"}
          style={{ height: "22em" }}
        ></div>
        <div className="container" style={{ marginTop: "-22em" }}>
          <div className="text-16 md:text-20 text-raleway font-bold px-4 md:m-50 my-8">
            Bacheca
            <span className="text-turquoise float-right text-12 mobile">
              Filtri
              <i className="fas fa-bars ml-2"></i>
            </span>
          </div>
          <BoardFilters
            filters={this.state.filters}
            onUpdate={(filters) =>
              this.props.history.push(
                `${window.location.pathname}${objectToParams(filters)}`
              )
            }
          />
          {items.length === 0 && (
            <p className="text-center text-gray-500 mt-24">
            Non sono state trovate richieste
            </p>
          )}
          <ul className="table table-fixed px-4 md:px-0 w-full">{items}</ul>
          <Pagination
            hasMore={this.props.requests.length === FETCH_LIMIT}
            currentPage={+this.state.page}
            url=""
            params={this.state.filters}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  requests: state.board,
  user: state.user,
});

export default connect(mapStateToProps, { fetchBoardRequests })(Requests);
