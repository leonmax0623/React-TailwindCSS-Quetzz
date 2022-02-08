import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { fetchCode, fetchEmailCode } from "../actions/codesAction";
import { objectFromParams } from "../resources/util";
import history from "../history";

class EmailConfirm extends Component {
  isConfirmedAlready() {
    return (
      this.props.user.verificationStatusDto.cellphone &&
      this.props.user.verificationStatusDto.email
    );
  }
  componentDidMount() {
    const params = objectFromParams(window.location.search);
    if (params.code) {
      this.props.fetchEmailCode(params.code);
      window.localStorage.setItem("email-code", params.code);
    }
    if (params.invite) {
      this.props.fetchCode(params.invite);
      window.localStorage.setItem("code", params.invite);
    }
    if (this.props.user.id) {
      //if user found redirect to confirm page
      this.isConfirmedAlready()
        ? history.push("/")
        : history.push("/confirm-registration");
    } else {
      history.push("/login");
    }
  }

  render() {
    return <p>Sorry invalid link :(</p>;
  }
}

const mapStateToProps = (state) => ({
  codes: state.codes,
  user: state.user,
});

export default connect(mapStateToProps, { fetchCode, fetchEmailCode })(
  withRouter(EmailConfirm)
);
