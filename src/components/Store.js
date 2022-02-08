import React, { useState } from "react";
import { connect } from "react-redux";
import { fetchPrizes } from "../actions/storeAction";
import { objectFromParams } from "../resources/util";
import moment from "moment";
import { Link } from "react-router-dom";
import { createModal, createLoaderModal, handleError } from "../helpers";
import OrdersModal from "./util/modals/OrdersModal";
import { ordersAPI } from "../resources/orders";
import StoreItem from "./StoreItem";
import { UrlDependentComponent } from "../UrlDependentComponent";
import InfoModal from "./util/modals/InfoModal";
import BillingInfoStore from "./BillingInfoStore";
import { userAPI } from "../resources/users";
import { prizesAPI } from "../resources/prizes";
import { redirectToCheckout } from "../stripe";
import history from '../history'

class Store extends UrlDependentComponent {
  state = {
    prizes: [],
    filters: {},
    userPoints: [],
    selectedStoreItem: undefined,
    requestedStoreItem: {
      prizeId: undefined,
      points: undefined
    },
  };

  componentDidMount() {
    super.componentDidMount();
    if (objectFromParams(this.props.location.state && this.props.location.state.search).paymentSuccess === "true") {
      createModal(InfoModal, {
        button: "Ho capito",
        title: "Congratulazioni!",
        body:
          "Hai appena riscattato il tuo premio! A breve lo riceverai via e-mail.",
      })
      .catch(() => null)
      .then(() => this.props.fetchPrizes({}))
    }
    if (objectFromParams(this.props.location.state && this.props.location.state.search).paymentSuccess === "false") {
      createModal(InfoModal, {
        button: "Ok!",
        title: "Pagamento non completato",
        body:
          "La procedura di pagamento non è stata completata",
      })
      .catch(() => null)
      .then(() => this.props.fetchPrizes({}))
    }
  }

  onUrlChange() {
    const filters = objectFromParams(window.location.search);
    this.setState({ filters });

    this.props.fetchPrizes(filters);
  }

  openOrdersModal = () => {
    createLoaderModal(ordersAPI.get()).then((orders) => {
      if (orders.length > 0) {
        createModal(
          OrdersModal,
          {
            orders: orders
          },
          "overflow-auto modal"
        );
      } else {
        createModal(InfoModal, {
          title: "Ci dispiace!",
          subtitle: "",
          body: "Non hai ancora effettuato alcun ordine",
        });
      }
    });
  };

  pageNavigation() {
    return (
      <div className="my-8 md:m-50 px-4 md:px-0">
        <Link
          to="/leaderboard"
          className="text-16 md:text-20 text-raleway text-gray-600 mr-12"
        >
          Classifica
        </Link>
        <Link
          to="/store"
          className="text-16 md:text-20 text-raleway font-bold border-black border-b-2 mr-12"
        >
          Negozio
        </Link>
        <span
          onClick={this.openOrdersModal}
          className="cursor-pointer text-16 md:text-20 text-gray-600 text-raleway"
        >
          I miei Ordini
        </span>
      </div>
    );
  }

  points() {
    return (
      <div className="px-4 md:px-0 w-full md:w-auto">
        <div className="bg-turquoise md:bg-white rounded p-8 md:inline-flex mb-8 w-full md:w-auto">
          <p className="text-center text-white md:text-black text-23 align-middle mr-4">
            {this.props.store.userPoints}
          </p>
          <p className="text-center text-white md:text-black align-middle md:py-2">
            Punti disponibili
          </p>
        </div>
      </div>
    );
  }

  handleStoreItemFormatSelection = (item_key) => {
    this.setState({selectedStoreItem: item_key});
  }

  handleStoreItemRequest = (item_prize_id, points) => {
    if (item_prize_id != undefined && points != undefined) {
      createLoaderModal(
        userAPI.getBillingInfo()
      ).then(() =>
        this.setState({requestedStoreItem: {prizeId: item_prize_id, points: points}})
      ).catch((err) => {
        handleError(`Oops! Si è verificato un errore. Se il problema persiste, contattaci.`)
        console.error(err);
        this.setState({requestedStoreItem: {prizeId: undefined, points: undefined}});
      });
    } else {
      this.setState({requestedStoreItem: {prizeId: undefined, points: undefined}})
    }
  }

  handlePrizeBuyRequest = () => {
    if (this.state.requestedStoreItem.prizeId != undefined && this.state.requestedStoreItem.points) {
      if (this.props.store.userPoints >= this.state.requestedStoreItem.points) {
        createLoaderModal(
          prizesAPI.claim(this.state.requestedStoreItem.prizeId)
        ).then(() => 
          createModal(
            InfoModal,
            {
                button: "Ok!",
                title: "Ordine ricevuto!",
                body: "Puoi controllare lo stato dei tuoi ordini andando nella sezione 'I miei ordini' dallo store \no dal tuo profilo!"
            }
          ).then(() => {
            this.setState({requestedStoreItem: {prizeId: undefined, points: undefined}})
            history.push('/store')
          })
        ).catch((err) => {
          handleError(`Oops! Si è verificato un errore. Se il problema persiste, contattaci.`)
          console.error(err);
          this.setState({requestedStoreItem: {prizeId: undefined, points: undefined}})
        });
      } else {
        createLoaderModal(
          prizesAPI.buy(this.state.requestedStoreItem.prizeId)
        ).then((session) => 
          redirectToCheckout(session.paymentSessionId)
        ).catch((err) => {
          handleError(`Oops! Si è verificato un errore. Se il problema persiste, contattaci.`)
          console.error(err);
          this.setState({requestedStoreItem: {prizeId: undefined, points: undefined}})
        });
      }
    } else {
      this.setState({requestedStoreItem: {prizeId: undefined, points: undefined}})
    }
  }

  render() {
    const items = this.props.store.prizes.map((p, index) => (
      <StoreItem
        key={index}
        item={p}
        userPoints={this.props.store.userPoints}
        onFormatSelection={this.handleStoreItemFormatSelection}
        onPrizeRequest={this.handleStoreItemRequest}
        index={index}
        isSelected={this.state.selectedStoreItem == index ? true : false}
      />
    ));
    return (
      <div className="container">
        {this.pageNavigation()}
        {this.state.requestedStoreItem.prizeId == undefined ? (
          <>
            {this.points()}
            <div className="flex content-start justify-around flex-wrap md:-mx-4 mb-32">
              {items}
            </div>
          </>
        ) : (
          <>
            <BillingInfoStore
              onContinueEvent={this.handlePrizeBuyRequest}
              onCancelEvent={this.handleStoreItemRequest}
            ></BillingInfoStore>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state.store,
});

export default connect(mapStateToProps, { fetchPrizes })(Store);
