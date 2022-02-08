import React from "react";
import Component from "../Component";
import PrizeImage from "./util/PrizeImage";
import { createModal } from "../helpers";
import PrizeModal from "./util/modals/PrizeModal";
import DropdownMenu from "./util/DropdownMenu";
import clsx from "clsx";
import { connect } from "react-redux";
import { prizesAPI } from "../resources/prizes";
import { redirectToCheckout } from "../stripe";
import InfoModal from "./util/modals/InfoModal";
import { configAPI } from "../resources/config";

class StoreItem extends Component {
  state = {
    version: null,
    feePercentage: 0,
  };

  handleVersionChange() {
    this.props.onFormatSelection(this.props.index);
  }

  setVersionToNull() {
    this.setState({ version: null });
  }

  componentDidMount() {
    configAPI
      .get()
      .then((configuration) =>
        this.setState({ feePercentage: configuration.feePercentage })
      );
  }

  openModal = () => 
    createModal(PrizeModal, {
      cost: this.props.item.prizes[this.state.version].cost,
    })
      .then(() => {
        this.props.onPrizeRequest(this.props.item.prizes[this.state.version].id, this.props.item.prizes[this.state.version].points);
      });
      /*
      .then(() =>
        prizesAPI.claim(this.props.item.prizes[this.state.version].id)
      )
      .then((session) => redirectToCheckout(session.paymentSessionId));
      */

  printOption = (o) =>
    `${(o.nominalValue / 100)}€`;

  printText = (o) => (this.state.version !== null && this.props.isSelected ?
          this.printOption(o)
          : "Seleziona il formato")

  openDescriptionModal = (item) =>
    createModal(InfoModal, {
      button: "Chiudi",
      title: "Descrizione",
      body: item.description,
    }).catch(() => null);

  render() {
    const version = this.state.version
    const singleItem = this.props.item.prizes[version];

    return (
      <div className="md:p-4 text-center w-1/2 md:w-80">
        <div className="bg-white p-4 h-full flex flex-col justify-between">
          <PrizeImage
            className="block mx-auto mt-6 mb-6"
            prize={{
              image: this.props.item.brandUrl,
              price: version === null || !this.props.isSelected ? null : singleItem.points,
            }}
            size={10}
          />
          <p className="text-18 text-black mb-4">{this.props.item.brand}</p>
          <button
            className="text-14 font-bold text-turquoise mb-4"
            onClick={() => this.openDescriptionModal(this.props.item)}
          >
            Scopri di più
          </button>
          <DropdownMenu
            value={singleItem}
            items={this.props.item.prizes}
            onSelect={(item) => {
                this.setState({
                  version: this.props.item.prizes.findIndex(
                    (i) => i.id === item.id
                  ),
                });
                this.handleVersionChange();
              }
            }
            className={clsx("p-4", {
              invisible: this.props.item.prizes.length < 2,
            })}
            optionBody={this.printOption}
            textBody={this.printText}
            fullWidth
          />
          <button
            className={
              this.props.userPoints > 0 && version !== null && this.props.isSelected
                ? "bg-turquoise rounded p-2 text-white cursor-pointer"
                : "bg-gray-500 rounded p-2 text-white cursor-pointer"
            }
            onClick={this.openModal}
            disabled={this.props.userPoints <= 0 || version === null || !this.props.isSelected}
          >
            Richiedi
          </button>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(StoreItem);
