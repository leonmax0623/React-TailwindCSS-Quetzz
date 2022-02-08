import React from 'react'
import Component from '../../../Component'
import { escapeRegExp } from '../../../helpers'
import TextField, { Input } from '@material/react-text-field'

export default class OptionsModal extends Component {
    state = {
        search: ''
    }

    options() {
        if (this.state.search.length > 0) {
            const reg = new RegExp(escapeRegExp(this.state.search), 'i')
            return this.props.options.filter(i => reg.test(i.name))
        }
        return this.props.options
    }

    render() {
        const options = this.options().map(
            c => <li className="mb-4 p-4 flex justify-between items-center" key={c.id}>
                <button onClick={() => this.props.onOk(c)}>{c.name}</button>
            </li>
        )
        return <>
            <TextField label="Cerca">
                <Input
                    type="text"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    value={this.state.search}
                    onChange={(e) => this.setState({search: e.currentTarget.value})}
                />
            </TextField>
            <ul className="list-none w-full">{options}</ul>
        </>
    }
}