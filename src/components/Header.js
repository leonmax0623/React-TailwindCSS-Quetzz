import React from "react";
import Component from "../Component";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { authAPI } from "../resources/auth";
import Avatar from "./util/Avatar";
import DropdownArrow from "./util/DropdownArrow";
import "./styles/Header.scss";
import clsx from "clsx";
import {
  PREREGISTRATION_MODE,
  getQParam,
  renderRegistrationUrl,
} from "../helpers";
import FlipClock from "flipclock";
import "../../node_modules/flipclock/dist/flipclock.css";
import moment from "moment";
import history from "../history";
import { setUser } from "../actions/userAction";
import { userAPI } from "../resources/users";
import store from "../store";

class Header extends Component {
  state = {
    open: false,
    token: getQParam(this.props.location, "code") || "",
  };

  dropdownRef = React.createRef();
  clock = null;
  initialized = false;
  clockInterval = null;

  componentDidMount() {
    super.componentDidMount();
    const initClock = () => {
      if (PREREGISTRATION_MODE) {
        if (
          !this.initialized &&
          window.location.pathname !== "/" &&
          !this.props.user.id
        ) {
          this.initialized = true;
          setTimeout(() => {
            this.clock = new FlipClock(
              document.querySelector(".desktop .clock"),
              "00 00:00:00",
              {
                clockFace: "DayCounter",
                language: "en",
                autoStart: false,
              }
            );
            if (this.clockInterval) {
              clearInterval(this.clockInterval);
            }
            this.clockInterval = setInterval(
              () => this.refreshClock(this.clock),
              1000
            );
          }, 1000);
        } else if (this.initialized && window.location.pathname === "/") {
          this.initialized = false;
          if (this.clockInterval) {
            clearInterval(this.clockInterval);
          }
        }
      }
    };
    history.listen(initClock);
    initClock();
    // this.setState({this.props.user.verificationStatusDto.cellphone: true  })
  }

  refreshClock(clock) {
    const duration = moment.duration(moment("2021-03-22").diff(moment()));
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    clock.value = `${duration.asDays().toFixed()} ${
      (hours <= 9 ? "0" : "") + hours
    }:${(minutes <= 9 ? "0" : "") + minutes}:${
      (seconds <= 9 ? "0" : "") + seconds
    }`;
  }

  loggedOutActions() {
    if (PREREGISTRATION_MODE) {
      return (
        <div className="absolute inset-0 container">
          <Link
            to={this.state.token ? `/?code=${this.state.token}` : "/"}
            className="absolute"
            style={{ left: "1rem", top: "1.5rem" }}
          >
            <img src={this.logoImage()} alt="logo" style={{ height: "30px" }} />
          </Link>
          {window.location.pathname === "/" ? (
            <Link
              className="font-medium bg-turquoise text-white py-3 px-8 rounded-lg absolute"
              style={{ right: "60px", bottom: "15px" }}
              to={renderRegistrationUrl(this.state.token)}
            >
              ISCRIVITI
            </Link>
          ) : (
            <div className="desktop flex justify-center">
              <div
                className="header-clock -mt-2 mr-4"
                style={{ width: `${313 + (window.innerWidth - 1024) / 30}px` }}
              >
                <div className="clock mx-auto mt-4"></div>
                <p className="flex justify-between">
                  {["Giorni", "Ore", "Minuti", "Secondi"].map((i, index) => (
                    <>
                      {index > 0 && <span className="clock-spacer"></span>}
                      <span className="text-center text-14 flex-1">{i}</span>
                    </>
                  ))}
                </p>
              </div>
              <p className="text-42 font-bold">AL LANCIO!</p>
              <div
                className="w-24 h-24 bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/img/rocket.webp')",
                  transform: "rotate(45deg) translate(0%, -15%)",
                  backgroundSize: "100%",
                }}
              ></div>
            </div>
          )}
        </div>
      );
    }
    return (
      <>
        <span className="md:inline hidden text-gray mr-8">
          Hai già un account?
        </span>
        <Link className="font-medium text-black mr-4 md:mr-8" to="/login">
          Login
        </Link>
        <Link
          className="font-medium bg-turquoise text-white py-3 px-8 rounded-sm"
          to={renderRegistrationUrl(this.state.token)}
        >
          ISCRIVITI
        </Link>
      </>
    );
  }

  notificationBell() {
    const count =
      this.props.proNotificationCount + this.props.userNotificationCount;
    const countLabel = count <= 0 ? "" : count <= 9 ? `${count}` : "9+";
    const unreadNotificationMark = (
      <span
        style={{
          position: "absolute",
          top: "-25%",
          left: "50%",
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
    return (
      <Link to={
        this.props.proNotificationCount != 0 && this.props.userNotificationCount == 0 ? 
        "/pro-notifications" : "/user-notifications"
      }>
        <span className="fa-stack mr-2 md:mr-4 text-12">
          <i className="far fa-bell fa-stack-2x text-darkest-gray"></i>
          {countLabel.length > 0 && unreadNotificationMark}
        </span>
      </Link>
    );
  }

  loggedInActions() {
    if (PREREGISTRATION_MODE) {
      return null;
    }
    return (
      <div>
        <Link to="/video-tutorial">
          <i className="far fa-question-circle mr-2"></i>
        </Link>
        {this.props.user.verificationStatusDto.email && (
          <Link
            className="text-turquoise font-medium px-2 md:px-6 py-2 md:mr-4 text-14 md:text-18"
            to="/new"
          >
            + Nuova Richiesta
          </Link>
        )}
        <span className="border-r border-gray-400 mr-2 md:mr-6"></span>
        {this.notificationBell()}
        <span
          tabIndex="0"
          ref={this.dropdownRef}
          className="relative align-middle outline-none"
          onFocus={() => this.setState({ open: true })}
          onBlur={() => this.setState({ open: false })}
        >
          <span className="mr-2 md:mr-4 desktop">
            {this.props.user.nickname}
          </span>
          <Avatar
            className="mr-2 inline-block align-text-bottom"
            user={this.props.user}
            size={1.75}
          />
          <DropdownArrow className="align-text-top" />
          {this.isMobile() ? this.userMenuMobile() : this.userMenuDesktop()}
        </span>
      </div>
    );
  }

  userMenuDesktop() {
    let items = [];
    if (
      this.props.user.verificationStatusDto.email &&
      this.props.user.verificationStatusDto.cellphone
    ) {
      items = Object.entries({
        Bacheca: "/",
        Profilo: `/user-profile/${this.props.user.id}`,
        "Le mie Richieste": "/requests",
        ...(this.props.user.proStatus === "COMPLETED"
          ? { "I miei Lavori": "/jobs" }
          : {}),
        "I miei Quetzz": "/quetzzes",
        Negozio: "/store",
        Supporto: "/support",
      }).map(([key, value], index) => (
        <span
        onClick={(e) => {
          e.preventDefault();
          this.props.history.push(value);
          setTimeout(() => this.dropdownRef.current.blur(), 0);
        }}
        style={{
          cursor: 'pointer',
          display: 'inline-block'
        }}
        className="no-underline pointer text-12 w-100 mb-2 pl-8 p-2 pr-16 pointer hover:bg-gray-200 whitespace-no-wrap"
      >
        {key}
      </span>

        // <Link key={index} style={{ cursor: 'pointer', display: 'inline-block' }} className="no-underline text-12 mb-2 pl-8 py-2 pr-20 pointer hover:bg-gray-200 whitespace-no-wrap" to={value}>
        //   {key}
        // </Link>
      ));
    }
    items.push(
      <span
      style={{
        cursor: 'pointer',
        display: 'inline-block'
      }}
        className="no-underline pointer text-12 w-100 mb-2 pl-8 p-2 pr-16 pointer hover:bg-gray-200 whitespace-no-wrap"
        onClick={(e) => {
          e.preventDefault();
          authAPI.logout();
        }}
      >
        Logout
      </span>
    );
    return (
      <ul
        style={{ top: "100%" }}
        className="absolute py-4 bg-white z-100 right-0"
        id="user-menu"
      >
        {items.map((element, index) => (
          <li
            key={index}
            className=" "
          >
            {element}
          </li>
        ))}
      </ul>
    );
  }

  userMenuMobile() {
    let items = [];
    if (this.props.user.verificationStatusDto.email) {
      items = Object.entries({
        Bacheca: "/",
        Profilo: `/user-profile/${this.props.user.id}`,
        "Le mie Richieste": "/requests",
        ...(this.props.user.proStatus === "COMPLETED"
          ? { "I miei Lavori": "/jobs" }
          : {}),
        "I miei Quetzz": "/quetzzes",
        Negozio: "/store",
        Supporto: "/support",
      }).map(([key, value]) => (
        <span
          onClick={(e) => {
            e.preventDefault();
            this.props.history.push(value);
            setTimeout(() => this.dropdownRef.current.blur(), 0);
          }}
          style={{
            cursor: 'pointer',
            display: 'inline-block'
          }}
          className="no-underline pointer text-12 w-100 mb-2 pl-8 p-2 pr-16 pointer hover:bg-gray-200 whitespace-no-wrap"
        >
          {key}
        </span>
      ));
    }
    items.push(
      <span
      style={{
        cursor: 'pointer',
        display: 'inline-block'
      }}
        className="no-underline pointer text-12 w-100 mb-2 pl-8 p-2 pr-16 pointer hover:bg-gray-200 whitespace-no-wrap"
        onClick={(e) => {
          e.preventDefault();
          authAPI.logout();
        }}
      >
        Logout
      </span>
    );
    return (
      <div
        style={{
          top: this.isMobile() ? "73px" : "100%",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
        className={clsx(
          "fixed md:absolute py-4 z-100 right-0 bottom-0 md:bottom-auto left-0 md:left-auto",
          {
            hidden: !this.state.open,
          }
        )}
        onClick={() => setTimeout(() => this.dropdownRef.current.blur(), 0)}
      >
        <ul className="bg-white absolute top-0 right-0 bottom-0 py-8 text-20">
          {items.map((element, index) => (
            <li
              key={index}
              className=""
            >
              {element}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  logoImage() {
    return this.isMobile() && !!this.props.user.id
      ? "/img/logo-compact.png"
      : "/img/logo-header.png";
  }

  render() {
    return (
      <header
        className="bg-white flex justify-center items-center px-4 py-6 border-b md:border-none relative"
        style={{ height: "78px" }}
      >
        {!PREREGISTRATION_MODE && (
          <Link to="/">
            <img src={this.logoImage()} alt="logo" style={{ height: "30px" }} />
          </Link>
        )}
        <div className="flex-1"></div>
        {!!this.props.user.id
          ? this.loggedInActions()
          : this.loggedOutActions()}
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  proNotificationCount: state.notifications.proNotifications.toRead,
  userNotificationCount: state.notifications.userNotifications.toRead,
});

export default connect(mapStateToProps, {})(withRouter(Header));
