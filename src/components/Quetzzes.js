import React from "react";
import { connect } from "react-redux";
import { fetchMyQuetzzes } from "../actions/quetzzesAction";
import Pagination from "./util/Pagination";
import QuetzzItem from ".//quetzz-item/QuetzzItem";
import { Link } from "react-router-dom";
import { objectFromParams, objectToParams } from "../resources/util";
import ReactTooltip from "react-tooltip";
import {
  quetzzStatusColor,
  quetzzFilters,
  FETCH_LIMIT,
  quetzzId,
  optional,
} from "../helpers";
import QuetzzMobileItem from "./quetzz-item/QuetzzMobileItem";
import { UrlDependentComponent } from "../UrlDependentComponent";

class Quetzzes extends UrlDependentComponent {
  state = {
    quetzz: null,
    filters: {
      quetzzStatuses: [],
    },
    page: 0,
    loading: false,
  };

  onUrlChange() {
    const filters = objectFromParams(window.location.search);
    if (filters.quetzzStatuses) {
      filters.quetzzStatuses = filters.quetzzStatuses.map((i) => parseInt(i));
    }
    const page = filters.page || 0;
    delete filters.page;
    this.setState({ filters, page });

    this.setState({ loading: true });
    this.props
      .fetchMyQuetzzes(page, filters)
      .then(() => this.setState({ loading: false }));
  }

  pageNavigation() {
    return (
      <div className="my-8 md:m-50 px-4 md:px-0">
        <Link
          to="/quetzzes"
          className="text-16 md:text-20 font-bold text-raleway border-black border-b-2 mr-2 md:mr-5"
        >
          I miei Quetzz
        </Link>
        <Link
          to="/network"
          className="text-16 md:text-20 text-gray-600 text-raleway mr-2 md:mr-5"
        >
          La mia Rete
        </Link>
        <Link
          to="/quetzzal-points"
          className="text-16 md:text-20 text-gray-600 text-raleway"
        >
          Punti
        </Link>
      </div>
    );
  }

  stats() {
    return (
      <div className="mx-3 md:-mx-1 flex mb-8">
        <div className="md:flex mx-1 flex-1">
          <div className="bg-white flex-1 items-center p-4 h-full rounded">
            <span className="text-center block md:inline text-18 md:text-23 md:mr-4">
              {" "}
              {this.props.total}{" "}
            </span>
            <span className="text-center block md:inline text-12 text-gray-500 md:text-black">
              Quetzz Totali
            </span>
          </div>
        </div>
        <div className="md:flex mx-1 flex-1">
          <div className="bg-white flex-1 items-center p-4 h-full rounded">
            <span className="text-center block md:inline text-18 md:text-23 text-turquoise md:mr-4">
              {this.props.total > 0
                ? ((this.props.successful / this.props.total) * 100).toFixed(
                    2
                  ) + "%"
                : "N/A"}
            </span>
            <span className="text-center text-12 block md:inline md:mr-4 text-gray-500 md:text-black">
              Tasso di Successo
            </span>
            <span className="text-center block md:inline text-gray-500 text-9">
              ({this.props.successful} Quetzz)
            </span>
          </div>
        </div>
        <div className="md:flex mx-1 flex-1">
          <div className="bg-white flex-1 items-center p-4 h-full rounded">
            <span className="text-center block md:inline text-18 md:text-23 md:mr-4">
              {" "}
              {this.props.points}{" "}
            </span>
            <span className="text-center block md:inline text-12 text-gray-500 md:text-black">
              Punti ottenuti con i Quetzz
            </span>
          </div>
        </div>
      </div>
    );
  }

  tooltip(statusId) {
    switch (statusId) {
      case 6:
        return (
          <span>
            Il professionista non
            <br />è stato scelto
            <br />e la richiesta ormai è completa.
          </span>
        );
      case 3:
        return (
          <span>
            Non perdere la
            <br />
            speranza! La richiesta
            <br />
            non è ancora completa
            <br />e il professionista potrebbe
            <br />
            ancora essere scelto
            <br />
            in un momento successivo!
          </span>
        );
      case 4:
        return (
          <span>
            GRANDE! Il professionista
            <br />è stato scelto
            <br />e hai guadagnato 100 punti!
          </span>
        );
      case 2:
        return (
          <span>
            L'autore della richiesta
            <br />
            non ha ancora scelto
            <br />
            alcun professionista!
          </span>
        );
      case 1:
        return (
          <span>
            Il professionista non
            <br />
            ha ancora preso una decisione.
          </span>
        );
      case 7:
        return (
          <span>
            La richiesta è<br />
            scaduta prima che
            <br />
            il professionista
            <br />
            prendesse una decisione.
          </span>
        );
      case 5:
        return (
          <span>
            Il professionista ha
            <br />
            rifiutato il tuo Quetzz
            <br />e ha scelto di non
            <br />
            candidarsi alla richiesta.
          </span>
        );
    }
  }

  quetzzStatuses() {
    return this.state.filters.quetzzStatuses || [];
  }

  statusBar(status) {
    const color = quetzzStatusColor(status.id);
    const bgClr = this.quetzzStatuses().includes(status.id)
      ? color === "black"
        ? "bg-black"
        : `bg-${color}-200`
      : "white";
    const txtClr =
      this.quetzzStatuses().includes(status.id) && color === "black"
        ? "text-white"
        : `text-${color}-700`;
    return (
      <p
        key={status.id}
        className={`
                text-12
                py-2
                rounded
                w-32
                inline-block
                text-center
                mr-4
                mb-4
                cursor-pointer
                ${bgClr}
                ${txtClr}
            `}
        onClick={() => {
          const newQuetzzStatuses = this.quetzzStatuses().includes(status.id)
            ? this.quetzzStatuses().filter((id) => id !== status.id)
            : [status.id, ...this.quetzzStatuses()];
          const filters = {
            ...this.state.filters,
            quetzzStatuses: newQuetzzStatuses,
          };
          this.setState({ ...filters });
          this.props.history.push(
            `${window.location.pathname}${objectToParams(filters)}`
          );
        }}
      >
        {status.name}
      </p>
    );
  }

  items() {
    if (this.state.loading) {
      return (
        <i className="fa-fw block mx-auto fa-2x fas text-gray-500 fa-spinner fa-pulse mt-16"></i>
      );
    } else if (optional(this.props.ownQuetzz, "length") > 0) {
      const ItemComponent = this.isMobile() ? QuetzzMobileItem : QuetzzItem;
      const items = this.props.ownQuetzz.map((q, i) => (
        <ItemComponent key={i} quetzz={q} index={i} />
      ));
      const tooltips = this.props.ownQuetzz.map((q, i) => (
        <ReactTooltip
          multiline
          key={i}
          id={"tooltip-" + i}
          place="left"
          type="dark"
          effect="solid"
        >
          {this.tooltip(quetzzId(q.status, q.requestStatus))}
        </ReactTooltip>
      ));
      return (
        <>
          <ul className="table table-fixed w-full border-spacing-4">{items}</ul>
          {tooltips}
        </>
      );
    } else if (optional(this.state.filters.quetzzStatuses, "length") > 0) {
      return (
        <p className="text-center p-24">
          Non sono stati trovati risultati corrispondenti ai filtri da te
          selezionati
        </p>
      );
    } else {
      return (
        <p className="text-center p-24">
          Non hai ancora raccomandato alcun professionista, inizia a farlo
          <Link className="text-turquoise ml-2" to="/">
            SUBITO!
          </Link>
        </p>
      );
    }
  }

  render() {
    return (
      <div className="container">
        {this.pageNavigation()}
        {this.stats()}
        <div className="flex flex-wrap justify-around">
          {quetzzFilters.map((s) => this.statusBar(s))}
        </div>
        {this.items()}
        <Pagination
          hasMore={this.props.ownQuetzz.length === FETCH_LIMIT}
          currentPage={+this.state.page}
          url="quetzzes"
          params={this.state.filters}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.quetzzes.total,
  ownQuetzz: state.quetzzes.ownQuetzz,
  successful: state.quetzzes.successful,
  points: state.quetzzes.points,
});

export default connect(mapStateToProps, { fetchMyQuetzzes })(Quetzzes);
