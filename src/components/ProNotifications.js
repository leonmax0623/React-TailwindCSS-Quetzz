import React from "react";
import { connect } from "react-redux";
import {
  fetchNotifications,
  adjustNotificationCount,
  markNotificationRead,
} from "../actions/proNotificationsAction";
import Pagination from "./util/Pagination";
import { Link } from "react-router-dom";
import { PagableComponent } from "../PagableComponent";
import { FETCH_LIMIT } from "../helpers";
import { notificationToJSX } from "../actions/util";
import { notificationsAPI } from "../resources/notifications";
import clsx from "clsx";

class ProNotifications extends PagableComponent {
  state = {
    page: 0,
    loading: false,
  };

  onPageChange(page) {
    this.setState({ loading: true });
    this.props
      .fetchNotifications(page)
      .then(() => this.setState({ loading: false }))
      .then(() =>
        this.props.notifications
          .filter((n) => !n.read)
          .forEach((n) =>
            notificationsAPI.markRead(n.id).then(() => {
              this.props.adjustNotificationCount(-1);
              this.props.markNotificationRead(n);
            })
          )
      );
  }

  pageNavigation() {
    const unreadNotificationMark = (count) => {
      const countLabel = count <= 0 ? "" : count <= 9 ? `${count}` : "9+";
      return (
        <span
          style={{
            position: 'relative',
            bottom: '15px',
            right: '10px'
          }}
          className={clsx(
            "bg-red-500 text-white proNotification text-9 rounded-full leading-none py-1",
            {
              "px-1": countLabel.length > 1,
              "px-2": countLabel.length <= 1,
            }
          )}
        >
          {count}
        </span>
      );
    };

    return (
      <div className="my-8 px-4 md:px-0">
        <Link
          to="/user-notifications"
          className="text-16 md:text-20 text-raleway mr-2 md:mr-5"
        >
          <span className="mr-2">Notifiche Utente</span>
          {this.props.userUnread !== 0 &&
            unreadNotificationMark(this.props.userUnread)}
        </Link>
        <Link
          to="/pro-notifications"
          className="text-16 md:text-20 text-raleway font-bold border-black border-b-2 pb-1 ml-3"
        >
          <span className="mr-2">Notifiche Professionista</span>
          {this.props.proUnread !== 0 &&
            unreadNotificationMark(this.props.proUnread)}
        </Link>
      </div>
    );
  }

  mobilePageNavigation() {
    const unreadNotificationMark = (count) => {
      const countLabel = count <= 0 ? "" : count <= 9 ? `${count}` : "9+";
      return (
        <span
          style={{
            position: "relative",
            top: "-10px",
            // left: "-36%",
          }}
          className={clsx(
            "bg-red-500 text-white text-9 rounded-full leading-none py-1",
            {
              "px-1": countLabel.length > 1,
              "px-2": countLabel.length <= 1,
            }
          )}
        >
          {count}
        </span>
      );
    };

    return (
      <>
        <p className="gradient p-2 text-14 text-center text-white font-bold text-raleway">
          <i className="far fa-bell"></i> Notifiche
        </p>
        <div className="px-4 flex justify-around border-gray-200 border-b bg-white">
          <Link
            to="/user-notifications"
            className="py-8 flex-1 text-center text-16 mr-2 md:mr-5 pb-1 "
          >
            <i className="far fa-user"></i>
            {this.props.userUnread !== 0 &&
              unreadNotificationMark(this.props.userUnread)}
          </Link>
          <Link
            to="/pro-notifications"
            className="py-8 flex-1 text-center text-16 border-black border-b-2"
          >
            <i className="fas fa-briefcase" style={{color: '#2ec6d5'}}></i>
            {this.props.proUnread !== 0 &&
              unreadNotificationMark(this.props.proUnread)}
          </Link>
        </div>
      </>
    );
  }

  render() {
    const items = this.props.notifications.map((n) => (
      <li
        key={n.id}
        className={clsx(
          "flex flex-wrap justify-between bg-white md:mb-4 border-b md:border-0 border-gray-200 px-4",
          {
            "bg-white": n.read,
            "bg-gray-200": !n.read,
          }
        )}
      >
        <div className="flex-1 pt-4 pb-2 md:py-8">{notificationToJSX(n)}</div>
        <div className="pb-4 pt-2 md:py-8 w-full md:w-auto text-gray-500 md:text-black">
          <span className="mr-4">{n.created.format("HH:mm")}</span>
          <span>{n.created.format("D MMM YYYY")}</span>
        </div>
      </li>
    ));
    return (
      <div className="container">
        {this.isMobile() ? this.mobilePageNavigation() : this.pageNavigation()}
        {items.length === 0 ? (
          <p className="text-center p-24">Al momento non ci sono notifiche</p>
        ) : (
          <ul>{items}</ul>
        )}
        <Pagination
          hasMore={this.props.notifications.length === FETCH_LIMIT}
          currentPage={+this.state.page}
          url="pro-notifications"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  notifications: state.notifications.proNotifications.allNotifications,
  proUnread: state.notifications.proNotifications.toRead,
  userUnread: state.notifications.userNotifications.toRead,
});

export default connect(mapStateToProps, {
  fetchNotifications,
  adjustNotificationCount,
  markNotificationRead,
})(ProNotifications);
