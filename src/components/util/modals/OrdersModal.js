import React from 'react'
import Component from '../../../Component'
import clsx from 'clsx'
import moment from "moment";

export default class OrdersModal extends Component {
    state = {
        index: 0,
        orders: this.props.orders
    };

    render() {
        return <>
            <div className="grid grid-cols-3">
                <div>
                    <span>{moment(this.state.orders[this.state.index].claimed).format('DD-MM-YYYY')}</span>
                </div>
                <div className="text-center">
                    <span className="font-bold">{this.state.index + 1}</span> di <span className="font-bold">{this.state.orders.length}</span>
                </div>
            </div>
            <div className="flex-1 text-center font-bold text-20 mt-4">
                <span>Ordine di acquisto</span>
            </div>
            <div className="flex-1 text-center font-bold text-18 mt-6">
                <span>Buono Regalo</span>
            </div>
            <div className="flex justify-between">
                <button className="float-left"
                onClick={() => {
                    if (this.state.index == 0) {
                        return
                    } else {
                        this.setState({ index: this.state.index - 1 });
                    } 
                }}>
                    <i class="fas fa-angle-left text-60 text-turquoise"></i>
                </button>
                <img className="my-2 h-24 sm:h-32" src={'https://quetzz-test.s3.eu-central-1.amazonaws.com/'+ this.state.orders[this.state.index].brand +'.png'} alt="order" />
                <button className="float-right"
                onClick={() => {
                    if (this.state.index == this.state.orders.length - 1) {
                        return
                    } else {
                        this.setState({ index: this.state.index + 1 });
                    }
                }}>
                    <i class="fas fa-angle-right text-60 text-turquoise"></i>
                </button>
            </div>
            <div className="flex-1 text-center font-bold text-18">
                <span>{this.state.orders[this.state.index].brand} {(this.state.orders[this.state.index].cost/100).toFixed()}€</span>
            </div>

            <div className="flex-1 mt-8">
                <span>Punti utilizzati: </span><span className="text-turquoise font-bold">{this.state.orders[this.state.index].pointsSpent}</span>
            </div>
            <div className="flex-1 mt-2">
                <span>Importo pagato: </span><span className="text-turquoise font-bold">{(this.state.orders[this.state.index].paid/100).toFixed()}€</span>
            </div>
        </>
    }
}