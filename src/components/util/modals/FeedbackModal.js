import React from 'react'
import Component from '../../../Component'
import TextField, { Input } from '@material/react-text-field'
import Rating from '../Rating'
import clsx from 'clsx'

export default class FeedbackModal extends Component {
    state = {
        text: '',
        vote: 0
    }

    feedbackFilled = () => this.state.text.length > 0 && this.state.vote > 0

    render() {
        return <>
            <h1 className="text-raleway font-bold text-28 leading-none mb-2">Feedback</h1>
            <Rating onChange={vote => this.setState({vote})} size={1} />
            <TextField className="mb-4" label="Per favore lascia un feedback" textarea>
                <Input
                    maxLength={400}
                    type="text"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    value={this.state.text}
                    onChange={(e) => this.setState({ text: e.currentTarget.value })}
                />
            </TextField>
                <div className="flex -mx-4">
                    <button 
                        disabled={!this.feedbackFilled()}
                        className={clsx("mx-4 py-4 flex-1 text-white rounded", this.feedbackFilled() ? "bg-turquoise" : "bg-gray-500")}
                        onClick={() => this.props.onOk(this.state)}>Conferma</button>

                    <button 
                        className="mx-4 py-4 flex-1 bg-red-500 text-white rounded" 
                        onClick={() => this.props.onOk(null)}>Annulla</button>
                </div>
        </>
    }
}