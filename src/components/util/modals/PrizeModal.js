import React from "react";
import Component from "../../../Component";

export default class PrizeModal extends Component {
  render() {
    return [
      <div className="mb-12">
        <h1 className="text-raleway font-bold text-28">
          Vuoi ottenere questo buono per {this.props.cost / 100} €?
        </h1>
      </div>,
      <div className="flex">
        <button
          className="flex-1 py-2 bg-turquoise text-white rounded mr-4 w-50"
          onClick={this.props.onOk}
        >
          Sì
        </button>
        <button
          className="flex-1 py-2 bg-red-500 text-white rounded w-50"
          onClick={this.props.onCancel}
        >
          No
        </button>
      </div>,
    ];
  }
}
