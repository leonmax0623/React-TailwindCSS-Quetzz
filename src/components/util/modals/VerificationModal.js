import React from 'react'
import Component from '../../../Component'
import TextField, { Input } from '@material/react-text-field'
import clsx from 'clsx'

export default class VerificationModal extends Component {
    state = {
        code: ''
    }
    render() {
        return <>
            <p>{this.props.description}</p>
            <TextField label="Codice" className="mb-4">
                <Input
                    type="text"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    value={this.state.code}
                    onChange={(e) => this.setState({code: e.currentTarget.value})}
                />
            </TextField>
            <button
                className={clsx("text-white bg-turquoise rounded w-full p-4", {'opacity-50': !this.state.code})}
                onClick={() => !!this.state.code && this.props.onOk(this.state.code)}
            >
                Invia
            </button>
        </>
    }
}