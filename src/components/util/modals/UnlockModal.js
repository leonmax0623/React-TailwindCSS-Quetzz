import React from 'react'
import Component from '../../../Component'

export default class UnlockModal extends Component {
    render() {
        return [
            <div className="mb-12">
                <h1 className="text-raleway font-bold text-28">
                    Grande! Sei a un passo dall'ottenere il lavoro!
                </h1>
                <p className="text-gray mb-9">
                    Sblocca ora le informazioni di contatto dell'utente.
                </p>
                <div className="flex items-center justify-start">
                    <span className="text-32 mr-2">4,90€</span>
                    <span>+ iva</span>
                </div>
            </div>,
            <button className="w-full py-6 bg-turquoise text-white rounded" onClick={this.props.onOk}>Sblocca</button>
        ]
    }
}