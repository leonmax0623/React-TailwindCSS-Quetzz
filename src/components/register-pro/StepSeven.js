import React from 'react'
import Component from '../../Component'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class StepFive extends Component {
    render() {
        return (
            <div>
                <div className="narrow-modal md:mb-16 md:my-32">
                    <i className="block text-center far fa-check-circle fa-4x pr-8 pb-8 pl-4 pt-4 text-turquoise font-bold"></i>
                    <div className="mb-4">
                        <h1 className="text-3xl text-center text-black text-raleway font-bold">Ben fatto!!</h1>
                        <p className="text-gray-500 text-center">
                            Sei sulla strada giusta per diventare un pro!
                        </p>
                    </div>
                    <p className="mb-4 text-center">
                        Dacci un momento per controllare il tuo profilo,
                        e tieni sott'occhio le notifiche!
                    </p>
                    <p className="mb-4 text-center">
                        Visita la
                        <button
                            className="text-turquoise font-bold mx-1"
                            onClick={() => window.location.assign('/')}
                        >
                            Bacheca
                        </button>
                        per cercare richieste.
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
})

export default connect(mapStateToProps, {})(withRouter(StepFive))