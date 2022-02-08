import React from 'react'
import Component from '../../Component'
import TextField, { Input } from '@material/react-text-field'
import clsx from 'clsx'

export default class StepZero extends Component {
    state = {
        plainuser: false,
        quetzzer: false,
        pro: false,
        profession: '',
        loading: false,
    }
    form = React.createRef()

    render() {
        return <div className="narrow-modal relative md:my-32">
            <img
                className="absolute"
                style={{
                    height: this.isMobile() ? '145px' : '205px',
                    right: '44px',
                    top: '10px',
                }}
                src="/img/Discover-G.png"
            />
            <h1 className="ml-2 text-28 text-black text-raleway font-bold">Prima di iniziare...</h1>
            <p className="ml-2">
                <span className="text-gray-500">Dicci cosa ti piacerebbe fare!</span>
            </p>
            <form autoComplete="nope" autoCorrect="off" spellCheck="off" ref={this.form} className="my-8" onSubmit={this.submit}>
                <label className="checkbox-container text-gray-500 my-4 mx-2" style={{height: 'auto'}}>
                    Pubblicare richieste per trovare i servizi o i prodotti di cui ho bisogno
                    <input
                        type="checkbox"
                        checked={this.state.plainuser}
                        onChange={(e) => this.setState({plainuser: e.currentTarget.checked})}
                        />
                    <span className="checkmark"></span>
                </label>
                <label className="checkbox-container text-gray-500 my-4 mx-2" style={{height: 'auto'}}>
                    <span></span>Raccomandare professionisti per guadagnare punti e portarmi a casa i prodotti che più mi interessano
                    <input
                        type="checkbox"
                        checked={this.state.quetzzer}
                        onChange={(e) => this.setState({quetzzer: e.currentTarget.checked})}
                        />
                    <span className="checkmark"></span>
                </label>
                <label className="checkbox-container text-gray-500 my-4 mx-2" style={{height: 'auto'}}>
                    Acquisire nuovi clienti e guadagnare offrendo i miei servizi e/o prodotti
                    <input
                        type="checkbox"
                        checked={this.state.pro}
                        onChange={(e) => this.setState({pro: e.currentTarget.checked})}
                        />
                    <span className="checkmark"></span>
                </label>
                {
                    this.state.pro &&
                    <>
                        <p className="text-gray-500">Qual è la tua professione?</p>
                        <TextField>
                            <Input
                                type="text"
                                autoComplete="nope" autoCorrect="off" spellCheck="off"
                                required
                                value={this.state.profession}
                                onChange={(e) => this.setState({profession: e.currentTarget.value})}
                            />
                        </TextField>
                    </>
                }
            </form>
            <button
                className={clsx("p-6 text-white w-full", !this.readyToSubmit() ? "bg-gray-500" : "bg-turquoise")}
                onClick={this.submit}
            >
                INIZIA ORA!
            </button>
        </div>
    }

    submit = e => {
        e.preventDefault()
        if (this.readyToSubmit() && this.form.current.checkValidity()) {
            this.props.onAdvance({
                preferredRoles: [
                    ...(this.state.plainuser ? [{type: 'plainuser'}] : []),
                    ...(this.state.quetzzer ? [{type: 'quetzzer'}] : []),
                    ...(this.state.pro ? [{type: 'pro', profession: this.state.profession}] : []),
                ],
            })
        }
        else {
            this.form.current.reportValidity()
        }
    }

    readyToSubmit() {
        return this.state.plainuser || this.state.quetzzer || this.state.pro
    }
}