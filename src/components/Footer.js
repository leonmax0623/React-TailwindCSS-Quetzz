import React from 'react'
import Component from '../Component'
import { withRouter, Link } from 'react-router-dom'
import { PREREGISTRATION_MODE } from '../helpers'

class Footer extends Component {
    render() {
        return this.isMobile() ? this.renderMobile() : this.renderDesktop()
    }

    renderMobile() {
        return <footer className="bg-white">
            <p className="text-12 text-center py-12 gradient">
                Hai qualche dubbio o domanda? Non esitare e
                <Link to="/support" className="text-white"> Contattaci</Link>
            </p>
            <div className="pt-8 pb-6 px-4">
                <div className="flex justify-between mb-6">
                    <Link to="/">
                        <img src="/img/logo-header.png" alt="logo-large" style={{width: '126px'}} />
                    </Link>
                    <ul>
                        <li className="inline-block">
                            <a href="https://www.facebook.com/quetzzitalia" target="_blank" rel="noopener noreferrer" className="text-turquoise">
                                <i className="fab fa-facebook mr-3"></i>
                            </a>
                        </li>
                        <li className="inline-block">
                            <a href="https://www.instagram.com/quetzzitalia" target="_blank" rel="noopener noreferrer" className="text-turquoise">
                                <i className="fab fa-instagram mr-3"></i>
                            </a>
                        </li>
                        <li className="inline-block">
                            <a href="https://www.linkedin.com/company/quetzz" target="_blank" rel="noopener noreferrer" className="text-turquoise">
                                <i className="fab fa-linkedin mr-3"></i>
                            </a>
                        </li>
                    </ul>
                </div>  
                <ul className="text-11 text-black flex justify-between mb-6">
                    <li className="inline-block"><Link to="/privacy">Privacy Policy</Link></li>
                    <li className="inline-block"><Link to="/terms">Termini & Condizioni</Link></li>
                    {!PREREGISTRATION_MODE && <li className="inline-block"><Link to="/faq">Pagina FAQ</Link></li>}
                    <li className="inline-block"><Link to="/support">Serve aiuto?</Link></li>
                </ul>
                <p className="text-11">© 2020 Quetzz. Tutti i diritti riservati.</p>
            </div>
        </footer>
    }

    renderDesktop() {
        return (
            <footer className="bg-white">
                <p className="text-center py-12 gradient">
                    Hai qualche dubbio o domanda? Non esitare e
                    <Link to="/support" className="text-white"> contattaci</Link>
                </p>
                <div
                    className="flex justify-between leading-normal pl-16 pt-24 relative"
                    style={{paddingRight: '300px', height: '500px'}}
                >
                    <img
                        src="/img/footer-right.png"
                        alt="footer-right"
                        className="absolute"
                        style={{bottom: '46px', right: '142px'}}
                    />
                    
                    <Link to="/" className="mr-16">
                        <img src="/img/footer-left.png" alt="logo-large"/>
                    </Link>
                    <div style={{maxWidth: '1030px'}} className="flex justify-between flex-1 pt-16">
                        <div className="mr-4">
                            <h3 className="font-bold mb-4 text-poppins text-20">Chi siamo</h3>
                            <p className="text-14" style={{maxWidth: '291px'}}>
                            Siamo dei giovani affiatati con la missione di rivoluzionare il passaparola
                             per connettere i bisogni delle persone con professionisti selezionati.
                            </p>
                        </div>
                        <div className="mr-4">
                            <h3 className="font-bold mb-4 text-poppins text-20">Link Utili</h3>
                            <ul className="text-14 leading-loose">
                                {!PREREGISTRATION_MODE && <li><Link to="/faq" className="text-turquoise">Pagina FAQ</Link></li>}
                                <li><Link to="/privacy" className="text-turquoise">Privacy Policy</Link></li>
                                <li><Link to="/terms" className="text-turquoise">Termini & Condizioni</Link></li>
                                <li><Link to="/support" className="text-turquoise">Serve aiuto?</Link></li>
                            </ul>
                        </div>
                        <div className="mr-4">
                            <h3 className="font-bold mb-4 text-poppins text-20">Contatti</h3>
                            <ul className="text-14">
                                <li>Quetzz s.r.l</li>
                                <li>Via del Cotonificio 129/B</li>
                                <li>33100 Udine (UD)</li>
                                <li>Italia</li>
                                <li>{PREREGISTRATION_MODE ? 'info@quetzz.it' : '+39 3770935429'}</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4 text-poppins text-20">Social</h3>
                            <ul className="text-14 leading-loose">
                                <li>
                                    <a href="https://www.facebook.com/quetzzitalia" target="_blank" rel="noopener noreferrer" className="text-turquoise">
                                        <i className="fab fa-facebook mr-3"></i> Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.instagram.com/quetzzitalia" target="_blank" rel="noopener noreferrer" className="text-turquoise">
                                        <i className="fab fa-instagram mr-3"></i> Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/company/quetzz" target="_blank" rel="noopener noreferrer" className="text-turquoise">
                                        <i className="fab fa-linkedin mr-3"></i> Linkedin
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="px-16 pb-8">© 2020 Quetzz. Tutti i diritti riservati.</p>
            </footer>
        )
    }
}

export default withRouter(Footer)