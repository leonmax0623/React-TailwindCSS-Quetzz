import React from 'react'
import Info from './Info'
import { Link } from 'react-router-dom'
import {Helmet} from "react-helmet"

export default class InfoSupport extends Info {
    title() {
        return 'Supporto'
    }
    body() {
        return <>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="robots" content="noindex" data-react-helmet="true" />
            </Helmet>
            <p className="md:text-20 mb-8">
                Prenderci cura dei nostri utenti è in cima alla lista delle nostre priorità.
            </p>
            <p className="mb-8">
                Se hai una domanda, visita la pagina delle
                <Link to="/faq" className="text-turquoise mx-1 font-medium">FAQ</Link>
                e controlla se c'è già una risposta.
                <br/>
                <br/>
                Diversamente, inviaci una email o contattaci su Whatsapp!
            </p>
            <div className="md:flex">
                <p className="md:flex-1 py-4 bg-light-gray md:bg-transparent md:p-0 mb-4">
                    <i className="block md:inline text-center text-25 align-text-bottom far fa-envelope mr-2"></i>
                    <a className="block md:inline text-center text-20" href="mailto:support@quetzz.it">support@quetzz.it</a>
                </p>
                <p className="md:flex-1 py-4 bg-green-500 md:bg-transparent md:p-0 mb-4">
                    <i className="block md:inline text-center text-white md:text-green-500 text-25 align-text-bottom fab fa-whatsapp mr-2"></i>
                    <a className="block md:inline text-center text-white md:text-black text-20" href="https://api.whatsapp.com/send?phone=+393484377386">+39 348 437 7386</a>
                </p>
            </div>
        </>
    }
}