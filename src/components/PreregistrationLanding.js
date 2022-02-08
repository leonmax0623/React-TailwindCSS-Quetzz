import React from 'react'
import Component from '../Component'
import PromoHeader from './util/PromoHeader'
import { Link } from 'react-router-dom'
import FlipClock from 'flipclock'
import '../../node_modules/flipclock/dist/flipclock.css'
import moment from 'moment'
import {getQParam, renderRegistrationUrl} from '../helpers'

export default class PreregistrationLanding extends Component {
    state = {
        token: getQParam(this.props.location, "code") || '',
        stats: {
            'Richieste giornaliere': 752,
            'Professionisti selezionati': 187,
            'Buoni regalo reclamati': 128,
            'Punti ottenuti': 7521,
            'Utenti attivi': 1585,
        },
        features: [
            [
                'work.png',
                'Lavorare',
                'Puoi creare il tuo profilo da Professionista e candidarti gratuitamente alle richieste degli utenti per lavorare mettendo a disposizione le tue competenze.'
            ],
            [
                'sell.png',
                'Vendere',
                'Puoi creare il tuo profilo da Professionista e candidarti gratuitamente alle richieste degli utenti che stanno cercando i tuoi prodotti.'
            ],
            [
                'seek.png',
                'Trovare',
                'Puoi pubblicare gratuitamente la tua richiesta per trovare in maniera semplice e rapida, il servizio o il prodotto di cui hai bisogno, risparmiando tempo e denaro.'
            ],
            [
                'quetzz.png',
                'Quetzzare',
                'Puoi aiutare gli altri utenti raccomandando il professionista giusto per le loro richieste, e in cambio ottenere dei punti, da usare nel nostro negozio, per portarti a casa i prodotti che ti interessano.'
            ]
        ]
    }

    clock = null

    componentDidMount() {
        super.componentDidMount()
        this.clock = new FlipClock(
            document.querySelector((this.isMobile() ? '.mobile' : '.desktop') + ' .clock'),
            '00 00:00:00',
            {
                clockFace: 'DayCounter',
                language: 'en',
                autoStart: false,
            }
        )
        setInterval(() => this.refreshClock(this.clock), 1000)
    }

    refreshClock(clock) {
        const duration = moment.duration(moment("2021-03-22").diff(moment()))
        const hours = duration.hours()
        const minutes = duration.minutes()
        const seconds = duration.seconds()
        clock.value = `${duration.asDays().toFixed()} ${(hours<=9?'0':'')+hours}:${(minutes<=9?'0':'')+minutes}:${(seconds<=9?'0':'')+seconds}`
    }

    stats() {
        return Object.entries(this.state.stats)
            .map(
                ([name, number]) => <div
                        key={name}
                        className="border-r last:border-0 flex-1 bg-white text-center flex flex-col justify-center"
                    >
                        <h2 className="text-42 font-bold text-raleway">{number}</h2>
                        <p>{name}</p>
                    </div>
            )
    }

    features() {
        const mobileClasses = "w-1/2 border-gray-300 border p-6"
        const desktopClasses = "rounded-lg bg-white px-6 pb-6 pt-16 mx-6"
        return this.state.features
            .map(
                ([image, name, description]) => <div
                    key={name}
                    className={this.isMobile() ? mobileClasses : desktopClasses}
                >
                    <img className="mx-auto mb-12" src={`/img/${image}`} style={{width: this.isMobile() ? '52px' : '76px'}} />
                    <p className="text-17 md:text-25 text-green text-center text-raleway font-bold mb-4">{name}</p>
                    <p className="text-14 text-center">{description}</p>
                </div>
            )
    }

    render() {
        return <div
        >
            <PromoHeader
                callToActionText="Inizia ora!"
                callToActionHandler={() => this.props.history.push(renderRegistrationUrl(this.state.token))}
            />
            <div className="relative">
                <div className="container bg-white md:bg-light-gray">
                    <div className="bg-white overflow-visible relative flex flex-col mb-32 rounded-lg desktop" style={{height: '235px', marginTop: '-294px'}}>
                        <div
                            className="bg-white absolute rounded-t-full w-80"
                            style={{
                                bottom: '100%',
                                left: '50%',
                                transform: 'translate(-50%, 0)',
                            }}
                        >
                            <div
                                className="w-48 h-48 bg-center bg-no-repeat mx-auto"
                                style={{
                                    backgroundImage: "url('/img/rocket.webp')",
                                    transform: 'rotate(45deg)',
                                    backgroundSize: '50%',
                                }}
                            ></div>
                            <p className="absolute bottom-0 text-center font-bold text-37 w-full">AL LANCIO!</p>
                        </div>
                        <div className="clock mx-auto mt-4"></div>
                        <p className="flex justify-around mx-auto" style={{width: 'calc(1000px + 2vw)'}}>
                            {["Giorni","Ore","Minuti","Secondi"].map((i, index) => <>
                                {index > 0 && <span className="clock-spacer"></span>}
                                <span className="text-center text-42 flex-1">{i}</span>
                            </>)}
                        </p>
                    </div>
                    <div className="flex flex-col pt-4 mobile">
                        <div className="clock mx-auto"></div>
                        <p className="flex justify-between">
                            {["Giorni","Ore","Minuti","Secondi"].map((i, index) => <>
                                {index > 0 && <span className="clock-spacer"></span>}
                                <span style={{fontSize: '4vw'}} className="text-center flex-1">{i}</span>
                            </>)}
                        </p>
                    </div>
                    <p className="text-center text-18 md:text-25 font-bold text-raleway py-12 md:mb-32 md:py-0">
                        SU QUETZZ PUOI...
                    </p>
                    <div className="flex flex-wrap md:flex-no-wrap justify-between md:-mx-6 pb-16">
                        {this.features()}
                    </div>
                </div>
            </div>
            <div className="bg-white py-24 px-4 md:px-0">
                <div className="container flex flex-wrap items-center">
                    <div className="w-full mobile p-12">
                        <img className="mx-auto" src="/img/professional.png" style={{maxHeight: '50vh'}} />
                    </div>
                    <div className="md:flex-1 w-full md:w-auto md:mr-32">
                        <div className="float-left md:float-right" style={this.isMobile() ? {} : {maxWidth: '482px'}}>
                            <p className="text-left md:text-right text-16 text-turquoise font-bold text-raleway mb-4">COME FUNZIONA</p>
                            <p className="text-left md:text-right text-20 md:text-25 font-bold text-raleway mb-8">Se sei un Professionista</p>
                            <p className="text-left md:text-right text-16 leading-relaxed mb-6">
                            Puoi entrare in contatto con utenti che sono già interessati ai servizi o prodotti che offri ad un costo irrisorio, senza dover investire
                             denaro in pubblicità per aumentare la tua visibilità ed acquisire nuovi clienti.
                            </p>
                            <p className="text-left md:text-right text-16 leading-relaxed">
                            A proposito di nuovi clienti, come reagiresti se ti dicessimo che saranno gli altri utenti a portarteli?
                            </p>
                        </div>
                    </div>
                    <div className="flex-1 desktop">
                        <img src="/img/professional.png" />
                    </div>
                </div>
            </div>
            <div className="py-24 px-4 md:px-0">
                <div className="container flex flex-wrap items-center">
                    <div className="w-full md:flex-1 mx-auto md:mr-32 p-12 md:p-0">
                        <img className="mx-auto" src="/img/user.png" style={{maxHeight: '50vh'}} />
                    </div>
                    <div className="flex-1">
                        <div className="float-left" style={this.isMobile() ? {} : {maxWidth: '482px'}}>
                            <p className="text-left text-16 text-turquoise font-bold text-raleway mb-4">COME FUNZIONA</p>
                            <p className="text-left text-20 md:text-25 font-bold text-raleway mb-8">Se sei un Utente</p>
                            <p className="text-left text-16 leading-relaxed mb-6">
                            Che tu stia cercando un servizio o un particolare prodotto, puoi pubblicare la tua richiesta gratuitamente senza dover perdere tempo a
                            condurre la ricerca tu stesso.
                            </p>
                            <p className="text-left text-16 leading-relaxed">
                            Dopo aver ricevuto le offerte di vari professionisti, potrai valutare il loro profilo e risparmiare denaro grazie all'opportunità di
                            comparare diversi preventivi contemporaneamente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white py-12 px-4 md:pt-24 md:pb-40 md:px-0">
                <div className="container">
                    <p className="text-center text-green text-3xl mb-12 md:mb-32 text-raleway font-bold">
                        ASPETTA, C'È DELL'ALTRO!
                    </p>
                    <div className="flex flex-wrap mb-12 md:mb-40 justify-between">
                        <div className="w-full md:flex-10" style={this.isMobile() ? {} : {maxWidth: '522px'}}>
                            <p className="leading-relaxed text-16 float-right mb-8">
                            Sia da utente che da professionista, hai sempre l'opportunità di essere ricompensato per aiutare gli altri connettendo la domanda e l'offerta.
                            Se raccomandi i professionisti giusti infatti, otterrai dei punti.
                            <br></br>
                            Se inviti professionisti sulla piattaforma, otterrai dei punti ogniqualvolta prenderanno in carico una richiesta, perché entreranno a far
                            parte della tua rete!
                            </p>
                        </div>
                        <div className="w-full md:flex-1" style={this.isMobile() ? {} : {maxWidth: '520px'}}>
                            <p className="leading-relaxed text-16 float-left mb-8">
                            Con Quetzz hai la possibilità di aiutare gli altri grazie al passaparola, ma soprattutto di farti ricompensare per qualcosa che fino a questo
                            momento hai fatto gratis.
                            </p>
                            <p className="leading-relaxed text-16 float-left mb-8">
                            Sei pronto a convertire i punti guadagnati nei buoni regalo di cui più hai bisogno?
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-center px-16 flex-wrap">
                        {
                            [
                                "https://quetzz.s3.eu-central-1.amazonaws.com/Tecnologia.png",
                                "https://quetzz.s3.eu-central-1.amazonaws.com/Sport.png",
                                "https://quetzz.s3.eu-central-1.amazonaws.com/Moda.png",
                                "https://quetzz.s3.eu-central-1.amazonaws.com/Viaggi.png",
                                "https://quetzz.s3.eu-central-1.amazonaws.com/More.png",
                            ].map(
                                url => <div className="mx-4 rounded-lg mb-4" style={{minWidth: '8rem', width: '12rem'}}>
                                    <img className="w-full" src={url} alt={url} />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="py-12 px-4 md:pt-24 md:pb-40 md:px-0">
                <div className="container text-center">
                    <p className="text-green text-3xl mb-12 md:mb-32 text-raleway font-bold">
                    PERCHÈ QUETZZ?
                    </p>
                    <p className="text-16 leading-relaxed mb-8 mx-auto" style={{maxWidth: '1166px'}}>
                    Ci siamo ispirati a Quetzalcóatl, che nella mitologia Azteca significa "Serpente Piumato" e veniva venerato come Dio dei Mercanti e delle
                    Arti, dei Mestieri e della Conoscenza.
                    </p>
                    <p className="text-16 leading-relaxed mx-auto" style={{maxWidth: '1166px'}}>
                    Così come la leggenda narra che la maschera del Dio Quetzalcóatl fosse fatta di piume del Quetzal splendente, un uccello diffuso in America
                    Centrale e caratterizzato proprio per i colori vivaci del suo piumaggio, allo stesso modo abbiamo immaginato una piattaforma in cui il motore
                     siano i suoi stessi utenti, che mettono a disposizione le proprie reti sociali per aiutare altri utenti a soddisfare le proprie richieste.
                    </p>
                    <p className="text-16 leading-relaxed mx-auto" style={{maxWidth: '1166px'}}>
                    L'unica differenza è che qui ci sono i punti, che non saranno spettacolari quanto le piume del quetzall, ma senza ombra di dubbio più utili!
                    </p>
                </div>
            </div>
            <div className="bg-white py-24 px-4 md:px-0">
                <div className="container text-center">
                    <p className="text-center text-black text-18 md:text-25 mb-8 text-raleway font-bold">
                        UNISCITI A NOI!
                    </p>
                    <p
                        className="text-center leading-relaxed mb-16 max-w-xl mx-auto spacing-0"
                        style={{maxWidth: '454px'}}
                    >
                       Tra vent'anni sarai più deluso dalle cose che non hai fatto che da quelle che hai fatto. Perciò molla gli ormeggi, esci dal porto sicuro e
                        lascia che il vento gonfi le tue vele.
                       <br></br>
                       Esplora. Sogna. Scopri.
                    </p>
                    <p
                        className="italic text-right leading-relaxed mb-16 max-w-xl mx-auto spacing-0"
                        style={{maxWidth: '454px'}}
                    >
                        Mark Twain
                    </p>
                    <Link
                        className="font-medium text-white bg-turquoise py-6 rounded block mx-auto text-center"
                        style={{width: this.isMobile() ? '100%' : '230px'}}
                        to={renderRegistrationUrl(this.state.token)}
                    >
                        Crea il tuo account
                    </Link>
                </div>
            </div>
        </div>
    }
}