import React from "react";
import { objectFromParams } from "../resources/util";
import StepOne from "./register-pro/StepOne";
import StepTwo from "./register-pro/StepTwo";
import StepThree from "./register-pro/StepThree";
import StepFour from "./register-pro/StepFour";
import StepFive from "./register-pro/StepFive";
import StepSix from "./register-pro/StepSix";
import StepSeven from "./register-pro/StepSeven";
import { UrlDependentComponent } from "../UrlDependentComponent";
import { connect } from "react-redux";

const steps = [
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
  StepSeven,
];

class RegisterPro extends UrlDependentComponent {
  state = {
    step: 1,
  };

  onUrlChange = () => {
    let step = +objectFromParams(window.location.search).step || 1;
    if (step >= steps.length) {
      step = steps.length;
    }
    this.setState({ step });
  };

  render() {
    if (!this.props.config.cdnBasePath) {
      return null;
    }
    const ComponentToRender = steps[this.state.step - 1];
    return (
      <div className="container">
        <ComponentToRender
          config={this.props.config}
          onAdvance={(data) => {
            this.setState({
              ...this.state,
              ...data,
            });
            this.props.history.push(
              `/register-pro?step=${this.state.step + 1}`
            );
          }}
          onRetreat={(data) => {
            if (this.state.step <= 1) {
              return;
            }
            this.setState({
              ...this.state,
              ...data,
            });
            this.props.history.push(
              `/register-pro?step=${this.state.step - 1}`
            );
          }}
          {...this.state}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  config: state.config,
});

export default connect(mapStateToProps, {})(RegisterPro);
