import React from 'react'
import Component from '../Component'
import TextField, { Input } from '@material/react-text-field'
import { createModal } from '../helpers'
import InfoModal from './util/modals/InfoModal'
import { resetAPI } from '../resources/reset'
import history from '../history'
import { handleTitle, defaultRequiredMessage, handleError } from "../helpers";

export default class ForgotUsername extends Component {
    state = {
        email: ''
    }

    email = React.createRef();

    sendEmail = () => {
        if (!this.readyForNextStep() || !this.email.current.isValid()) {
            this.email.current.inputElement.reportValidity();
            return;
        }
        resetAPI.forgotUsername(this.state.email)
            .then(() => createModal(
                InfoModal,
                {
                    button: "Ok!",
                    title: "Detto fatto",
                    body: "Se il nome utente risulta presente nei nostri sistemi riceverai a breve una e-mail",
                }
            ))
            .catch((err) => {
                return null
            })    
            .then(() => history.push('/login'))
    }

    render() {
        return (
            <div className="narrow-modal md:my-32">
                <h1 className="text-3xl text-black text-raleway font-bold">Recupero nome utente</h1>
                <p>Per recuperare il tuo nome utente inserisci l'indirizzo e-mail con il quale ti sei registrato. Ti verrà inviata una e-mail con il tuo nome utente.</p>
                <TextField label="Inserisci la tua e-mail" className="mb-4">
                    <Input
                        ref={this.email}
                        type="email"
                        title={defaultRequiredMessage}
                        autoComplete="nope" autoCorrect="off" spellCheck="off"
                        required
                        maxLength={100}
                        minLength={1}
                        value={this.state.email}
                        pattern="^.+\..+$"
                        onInvalid={(e) => {
                            e.currentTarget.setCustomValidity(
                                "Si prega di inserire un indirizzo email valido"
                            );
                        }}
                        onInput={(e) => {
                            e.currentTarget.setCustomValidity("")
                        }}
                        onChange={(e) => {
                            handleTitle(e)
                            this.setState({ email: e.currentTarget.value })
                        }}
                    />
                </TextField>
                <button
                    className={!this.readyForNextStep() ? "bg-gray-500 p-6 text-white w-full" : "bg-turquoise p-6 text-white w-full"}
                    onClick={this.sendEmail}
                >
                    Conferma
                </button>
            </div>
        )
    }

    readyForNextStep() {
        return this.state.email != undefined && 
            this.state.email != '' &&
            this.state.email.length >= 1 &&
            this.state.email.length <= 100
    }
}