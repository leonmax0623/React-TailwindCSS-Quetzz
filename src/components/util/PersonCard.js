import React from 'react'
import Component from '../../Component'
import Rating from './Rating'
import Avatar from './Avatar'

export default class PersonCard extends Component {
    render() {
        return <div className="flex items-center p-9">
            <Avatar className="mr-7 hidden md:block" user={this.props.person} size={7} alt="profile"/>
            <Avatar className="mr-5 block md:hidden" user={this.props.person} size={4} alt="profile"/>
            <div>
                <div className="flex items-center justify-between">
                    <span className="text-12 md:text-19 mr-2 truncate hidden md:inline" title={this.props.person.fullname} style={{maxWidth: '10em'}}>
                        {this.props.person.fullname}
                    </span>
                    <span className="text-14 md:text-19 mr-2 truncate inline md:hidden" title={this.props.person.fullname} style={{maxWidth: '9em'}}>
                        {this.props.person.fullname}
                    </span>
                    <span className="text-11">{this.props.person.profession}</span>
                </div>
                {
                    this.props.person.rating ?
                    <Rating className="pb-7" rating={this.props.person.rating} size={0.75} /> :
                    null
                }
                <div className="flex justify-between text-center">
                    {
                        this.props.person.jobs !== undefined ?
                        <div>
                            <p>{this.props.person.jobs}</p>
                            <p className="text-gray text-12">Lavori</p>
                        </div> :
                        null
                    }
                    {
                        this.props.person.feedbackVotes ?
                        <div>
                            <p>{(this.props.person.feedbackVotes || []).length}</p>
                            <p className="text-gray text-12">Feedback</p>
                        </div> :
                        null
                    }
                </div>
            </div>
        </div>
    }
}