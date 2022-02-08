import React from 'react'
import Component from '../../../Component'
import { avatarAPI } from '../../../resources/avatar'

export default class AvatarModal extends Component {
    state = {
        avatars: null,
    }

    componentDidMount() {
        super.componentDidMount()
        avatarAPI.get()
            .then(avatars => this.setState({avatars}))
    }

    render() {
        return <>
            <h1 className="text-raleway font-bold text-28 mb-12">
                Scegli il tuo avatar!
            </h1>
            <div className="flex flex-wrap justify-center">
                {
                    this.state.avatars === null ?
                    <i className="fas fa-spin fa-pulse text-gray-500"></i> :
                    this.state.avatars.map(
                        a => <img
                            style={{maxWidth: '8rem'}}
                            className="rounded-full p-4 cursor-pointer hover:opacity-50"
                            onClick={() => this.props.onOk(a)}
                            key={a.id}
                            src={a.url}
                        />
                    )
                }
            </div>
        </>
    }
}