import React from 'react'
import Component from '../Component'

export default class Info extends Component {
    render() {
        return (
            <div className="container">
                <div className="flex justify-between py-16 px-4 md:px-0 bg-white md:bg-transparent">
                    <div className="text-20 font-bold text-raleway">
                        {this.title()}
                    </div>
                </div>
                <div className="wide-modal md:mb-32">
                    {this.body()}
                </div>
            </div>
        )
    }
}