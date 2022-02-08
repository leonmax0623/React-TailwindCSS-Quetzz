import React from 'react'
import { objectFromParams } from '../resources/util'
import StepZero from './register-user/StepZero'
import StepOne from './register-user/StepOne'
import StepTwo from './register-user/StepTwo'
import StepThree from './register-user/StepThree'
import { UrlDependentComponent } from '../UrlDependentComponent'
import { PREREGISTRATION_MODE } from '../helpers'
import Component from '../Component'

const earliestStep = PREREGISTRATION_MODE ? 0 : 1

const steps = [
    StepZero, StepOne, StepTwo, StepThree
]

export default class RegisterUser extends Component {
    state = {
        step: earliestStep,
        location: this.props.location
    }

    render() {
        const ComponentToRender = steps[this.state.step]
        return (
            <div className="container">
                <ComponentToRender
                    onAdvance={data => {
                        this.setState({
                            ...this.state,
                            ...data,
                            step: this.state.step+1,
                        })
                    }}
                    onRetreat={data => {
                        if (this.state.step <= 1) {
                            return
                        }
                        this.setState({
                            ...this.state,
                            ...data,
                            step: this.state.step-1,
                        })
                    }}
                    {...this.state}
                />
            </div>
        )
    }
}