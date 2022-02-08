import React from 'react'
import Component from '../../../Component'
import TextField, { Input } from '@material/react-text-field'

export default class ReasonModal extends Component {
    state = {
        reason: ''
    }

    render() {
        return <>
            <h1 className="text-raleway font-bold text-28 leading-none mb-2">Ti dispiacerebbe condividere il motivo con noi?</h1>
            <p className="text-gray mb-12">Il tuo feedback è preziosissimo!</p>
            <TextField label="Motivo" textarea className="mb-4">
                <Input
                    maxLength={1500}
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    value={this.state.reason}
                    onChange={(e) => this.setState({reason: e.currentTarget.value})}
                />
            </TextField>
            <button
                className="w-full px-6 py-4 bg-turquoise text-white rounded"
                onClick={() => this.props.onOk(this.state.reason)}
                >
                    Invia
            </button>
        </>
    }
}