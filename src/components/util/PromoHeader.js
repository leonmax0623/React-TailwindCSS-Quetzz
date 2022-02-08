import React from 'react'
import Component from '../../Component'
import { PREREGISTRATION_MODE } from '../../helpers'

export default class PromoHeader extends Component {
    button(forMobile) {
        return <button
            className={`
                text-lg
                shadow-lg
                text-turquoise
                bg-white
                font-medium
                text-center
                py-6
                rounded
                z-10
                mt-6
                md:mt-0
                ${forMobile ? 'mobile' : 'desktop'}
            `}
            style={{width: forMobile ? '100%' : '280px'}}
            onClick={this.props.callToActionHandler}
        >
            {this.props.callToActionText}
        </button>
    }

    render() {
        return <div
                className="py-12 md:py-24"
                style={{
                    height: this.isMobile() ? '' : '970px',
                    backgroundImage: 'url(/img/promo-header-bg.png)',
                    backgroundSize: '100% 970px'
                }}
            >
            <div className="container flex flex-wrap justify-between relative px-4 lg:px-0">
                <img src="/img/bubbles-left.png" className="absolute"
                    style={{
                        left: this.isMobile() ? '-20px' : '-80px',
                        top: this.isMobile() ? '-30px' : '-65px',
                        zIndex: 0
                    }}
                />
                <img src="/img/bubbles-right.png" className="absolute"
                    style={{
                        right: this.isMobile() ? '-20px' : '-90px',
                        bottom: this.isMobile() ? '0' : '-90px',
                        zIndex: 0
                    }}
                />
                <div className="flex-1 z-10 px-9 md:pl-0 lg:px-0" style={{maxWidth: '583px', minWidth: '300px'}}>
                    <h1 className="text-raleway text-33 md:text-60 mb-2 font-bold">Quetzz</h1>
                    <p className="md:text-28 leading-0 leading-loose text-justify mb-8">
                        Abbiamo rivoluzionato il <strong>passaparola</strong> per connettere i bisogni delle persone con
                        professionisti <strong>selezionati </strong>del Friuli-Venezia Giulia.
                    </p>
                    {this.button(false)}
                </div>
                <div
                    className="flex-1 z-10 relative"
                    style={{height: this.isMobile() ? '208px' : '331px', maxWidth: '583px', minWidth: '300px'}}
                >
                    {
                        PREREGISTRATION_MODE &&
                        <img
                            className="absolute w-auto"
                            style={{
                                bottom: '78%',
                                left: '90%',
                                height: '59%',
                            }}
                            src="/img/Home-G.png"
                        />
                    }
                    <div className="bg-white p-4 rounded-lg w-full h-full">
                        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/sCcHmXgM1t4" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </div>
                {this.button(true)}
            </div>
            <div className="desktop" style={{height: '200px'}}></div>
        </div>
    }
}