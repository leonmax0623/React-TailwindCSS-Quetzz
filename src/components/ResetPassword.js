import React from 'react'
import Component from '../Component'
import TextField, { Input } from '@material/react-text-field'
import { Link } from 'react-router-dom'
import clsx from "clsx";
import { resetAPI } from '../resources/reset'
import { handleTitle, defaultRequiredMessage, createModal } from '../helpers'
import InfoModal from './util/modals/InfoModal'
import history from '../history'

export default class ResetPassword extends Component {
    state = {
        username: ''
    }

    sendEmail = () => {
        if (this.state.username === '') {
            return
        }
        resetAPI.passwordLink(this.state.username)
            .then(() => createModal(
                InfoModal,
                {
                    button: "Ok!",
                    title: "Detto fatto",
                    body: "Se il nome utente risulta presente nei nostri sistemi riceverai a breve una e-mail"
                }
            ))
            .catch(() => null)
            .then(() => history.push('/login'))
    }

    render() {
        return (
            <div className="narrow-modal md:my-32">
                <h1 className="text-3xl text-black text-raleway font-bold">Ripristino Password</h1>
                <p>Per recuperare la tua password, inserisci il tuo nome utente. Ti verrà inviata una e-mail con le istruzioni necessarie a ripristinarla.</p>
                <TextField label="Inserisci il tuo nome utente" className="mb-4">
                    <Input
                        type="text"
                        required
                        title={defaultRequiredMessage}
                        autoComplete="nope" autoCorrect="off" spellCheck="off"
                        value={this.state.username}
                        onChange={(e) => {
                            handleTitle(e)
                            this.setState({ username: e.currentTarget.value })
                        }}
                    />
                </TextField>
                <button
                    className={clsx(
                        "p-6 text-white w-full",
                        this.state.username ? "bg-turquoise" : "bg-gray-500"
                    )}
                    onClick={this.state.username && this.sendEmail}
                >
                    Conferma
                </button>
                <Link to="/forgot-username" className="text-center block text-red-500 mt-8 font-bold">
                    Hai dimenticato il tuo nome utente?
                </Link>
            </div>
        )
    }
}