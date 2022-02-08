import React from 'react'
import Component from '../../../Component'

export default class ChangeReasonModal extends Component {
    reasons = {
        cannotGetInTouch: "Non sono riuscito a mettermi in contatto con il professionista",
        agreementNotReached: "Non abbiamo trovato un accordo",
        tryAnother: "Sono abbastanza soddisfatto del lavoro ricevuto, ma vorrei avere un metro di paragone",
        notSatisfied: "Non sono soddisfatto",
        custom: "Altro",
    }
    render() {
        return <>
            <h1 className="text-raleway font-bold text-28 leading-none mb-2">Comprendiamo<br></br>che a volte sorga il<br></br>bisogno di fare dei<br></br>cambiamenti.</h1>
            <p className="text-gray mb-12">Per favore, indicaci il motivo:</p>
            {
                Array.from(Object.entries(this.reasons)).map(
                    ([key, value]) => <button
                            className="border-turquoise border-2 text-turquoise w-full p-4 mb-4"
                            onClick={() => this.props.onOk(key)}
                        >
                            {value}
                        </button>
                )
            }
        </>
    }
}