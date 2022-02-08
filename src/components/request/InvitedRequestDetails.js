import React from "react";
import RequestDetails from "./RequestDetails";
import PromoHeader from "../util/PromoHeader";
import { connect } from "react-redux";
import {
  fetchInvitedRequest,
  cleanupRequest,
} from "../../actions/requestAction";
import history from "../../history";

class InvitedRequestDetails extends RequestDetails {
  componentDidMount() {
    super.componentDidMount();
    this.props.fetchInvitedRequest(this.props.match.params.id);
    window.localStorage.setItem("code", this.props.match.params.id);
    window.localStorage.getItem("code");
  }

  statusBadge() {
    return null;
  }

  getTopInfoItems() {
    return [];
  }

  renderTopBar() {
    return null;
  }

  rightInfo() {
    const r = this.props.request;
    return (
      <div className="w-full md:w-4/12 p-10 md:p-16 overflow-auto relative bg-light-gray">
        <p className="mb-10 text-center">
          Sei stato invitato a prendere in considerazione questa richiesta. Dacci un'occhiata!
        </p>
        <a
          href={`/register-user?code=${this.props.match.params.id}`}
          className="block text-center text-white bg-turquoise w-full py-4 mb-4"
        >
          Candidati
        </a>
      </div>
    );
  }

  bottomInfo() {
    return null;
  }

  render() {
    const header = (
      <PromoHeader
        callToActionText="Candidati"
        callToActionHandler={() => history.push("/register-user")}
      />
    );
    const body = (
      <div style={this.isMobile() ? {} : { marginTop: "-30rem" }}>
        {super.render()}
      </div>
    );
    if (this.isMobile()) {
      return [body, header];
    }
    return [header, body];
  }
}

const mapStateToProps = (state) => ({
  request: state.request,
});

export default connect(mapStateToProps, {
  fetchInvitedRequest,
  cleanupRequest,
})(InvitedRequestDetails);
