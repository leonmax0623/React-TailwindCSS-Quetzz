import React from "react";
import Component from "../../../Component";
import { Link } from "react-router-dom";
import Avatar from "../Avatar";
import { connect } from "react-redux";

class QuetzzRequestsModal extends Component {
  desktopRender() {
    const requests = this.props.quetzzRequests.map((r) => (
      <li key={r.id} className="table-row mb-4">
        <div className="table-cell border-b border-gray-500 align-middle p-4 w-16">
          <Avatar className="block" user={this.props.user} size={3.5} />
        </div>
        {r.avatar ? (
          <div className="table-cell border-b border-gray-500 align-middle p-4 w-16">
            <Avatar className="block" user={r} size={3} />
          </div>
        ) : null}
        <p className="table-cell border-b border-gray-500 align-middle p-4">
          Hai ricevuto un
          <Link
            className="mx-1 text-turquoise font-bold"
            to={`/requests/${r.requestId}`}
          >
            nuovo Quetzz
          </Link>
        </p>
        <p className="table-cell border-b border-gray-500 align-middle p-4">
          {r.quetzzerId ? (
            <Link
              className="mx-1 text-black font-bold"
              to={`/user-profile/${r.quetzzerId}`}
            >
              {r.quetzzerFullName}
            </Link>
          ) : (
            <span className="mx-1 text-black font-bold">
              {r.quetzzerFullName}
            </span>
          )}
        </p>
        <p className="table-cell border-b border-gray-500 align-middle p-4 text-center">
          {r.created.format("D MMM YYYY")}
          <br />
          {r.created.format("HH:mm")}
        </p>
      </li>
    ));

    return (
      <ul className="list-none table border-separate table-fixed w-full">
        {requests.length ? requests : "Non hai ancora ricevuto dei quetzz"}
      </ul>
    );
  }

  mobileRender() {
    const requests = this.props.quetzzRequests.map((r) => (
      <li key={r.id} className="mb-4 p-4">
        <div className="flex">
          <div className="relative" style={{ width: "6em" }}>
            <div className="align-middle absolute left-0 top-0">
              <Avatar
                className="block border-3 border-white"
                user={this.props.user}
                size={3.5}
              />
            </div>
            {r.avatar ? (
              <div className="align-middle absolute top-0">
                <Avatar
                  className="block border-3 border-white"
                  user={r}
                  size={3.5}
                />
              </div>
            ) : null}
          </div>
          <p className="align-middle px-4">
            Hai ricevuto un
            <Link
              className="mx-1 text-turquoise font-bold"
              to={`/requests/${r.requestId}`}
            >
              nuovo Quetzz
            </Link>
            da
            {r.quetzzerId ? (
              <Link
                className="mx-1 text-black font-bold"
                to={`/user-profile/${r.quetzzerId}`}
              >
                {r.quetzzerFullName}
              </Link>
            ) : (
              <span className="mx-1 text-black font-bold">
                {r.quetzzerFullName}
              </span>
            )}
          </p>
        </div>
        <p className="align-middle text-right text-gray-500">
          {r.created.format("D MMM YYYY HH:mm")}
        </p>
      </li>
    ));
    return (
      <ul className="list-none w-full">
        {requests.length ? requests : "Non hai ancora ricevuto dei quetzz"}
      </ul>
    );
  }

  render() {
    return this.isMobile() ? this.mobileRender() : this.desktopRender();
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(QuetzzRequestsModal);
