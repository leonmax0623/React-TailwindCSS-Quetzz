import React from "react";
import Component from "./Component";
import { Provider } from "react-redux";
import store from "./store";
import Requests from "./components/Requests";
import Jobs from "./components/Jobs";
import Board from "./components/Board";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Router, Switch, Redirect } from "react-router-dom";
import Route from "./components/util/CustomRoute";
import Quetzzes from "./components/Quetzzes";
import QuetzzalPoints from "./components/QuetzzalPoints";
import Leaderboard from "./components/Leaderboard";
import BillingInfo from "./components/BillingInfo";
import PersonalInfo from "./components/PersonalInfo";
import Store from "./components/Store";
import Network from "./components/Network";
import Login from "./components/Login";
import RegisterUser from "./components/RegisterUser";
import RegisterPro from "./components/RegisterPro";
import Landing from "./components/Landing";
import PreregistrationLanding from "./components/PreregistrationLanding";
import UserNotifications from "./components/UserNotifications";
import NewRequest from "./components/NewRequest";
import RoutesWrapper from "./RoutesWrapper";
import UserProfile from "./components/UserProfile";
import ProfessionalProfile from "./components/ProfessionalProfile";
import ProNotifications from "./components/ProNotifications";
import InfoSupport from "./components/InfoSupport";
import FaqSupport from "./components/FaqSupport";
import PrivacySupport from "./components/PrivacySupport";
import VideoTutorial from "./components/VideoTutorial";
import TermsSupport from "./components/TermsSupport";
import CookieSupport from "./components/CookieSupport";
import CookieDeclaration from "./components/CookieDeclaration";
import GuidelinesDeclaration from "./components/GuidelinesDeclaration";
import WorkSupport from "./components/WorkSupport";
import ScrollToTop from "./components/util/ScrollToTop";
import ResetPassword from "./components/ResetPassword";
import ForgotUsername from "./components/ForgotUsername";
import BoardRequestDetails from "./components/request/BoardRequestDetails";
import MyRequestDetails from "./components/request/MyRequestDetails";
import JobRequestDetails from "./components/request/JobRequestDetails";
import InvitedRequestDetails from "./components/request/InvitedRequestDetails";
import { initNetworking, objectFromParams } from "./resources/util";
import { ToastContainer } from "react-toastify";
import history from "./history";
import "./styles/material-textfield.scss";
import "react-toastify/dist/ReactToastify.css";
import "react-toggle/style.css";
import "./styles/main.css"
import ConfirmRegistration from "./components/ConfirmRegistration";
import { PREREGISTRATION_MODE } from "./helpers";
import moment from "moment";
import "moment/locale/it";
import "react-datepicker/dist/react-datepicker.css";
import it from "date-fns/locale/it";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import initStomp from "./stomp";
import { resolveApplicationMounted, initialLogin, failedLogin } from "./global";
import { fetchNotifications as fetchProNotifications } from "./actions/proNotificationsAction";
import { fetchNotifications as fetchUserNotifications } from "./actions/userNotificationsAction";
import SetNewPassword from "./components/SetNewPassword";
import { setUser, fetchUser } from "./actions/userAction";
import { verificationAPI } from "./resources/verification";
import { fetchConfig } from "./actions/configAction";
import { fetchEmailCode } from "./actions/codesAction";

moment.locale("it");

registerLocale("it", it);
setDefaultLocale("it");

initStomp();
initNetworking();

class _Modals {
  id = 0;
  modals = {};
  callbacks = [];

  getNextId() {
    return ++this.id;
  }

  contains(id) {
    return this.modals[id] !== undefined;
  }

  clear() {
    this.modals = {};
    this.executeCallbacks();
  }

  add(modal, id) {
    // clear all already existing modals
    // for now we don't need a system where
    // multiple modals are open at the same time
    this.modals = [];

    this.modals[id] = modal;
    this.executeCallbacks();
  }

  remove(id) {
    const existed = this.contains(id);
    if (existed) {
      delete this.modals[id];
      this.executeCallbacks();
    }
    return existed;
  }

  get() {
    return Object.values(this.modals);
  }

  executeCallbacks() {
    setTimeout(() => this.callbacks.forEach((cb) => cb()), 0);
  }

  addCallback(callback) {
    this.callbacks.push(callback);
  }
}

export const Modals = new _Modals();

class App extends Component {
  state = {
    modals: [],
  };

  userLoggedIn = null;

  componentDidMount() {
    super.componentDidMount();
    resolveApplicationMounted();
    const onConfirmEmailPage = window.location.pathname.startsWith(
      "/email/confirm"
    );
    const params = objectFromParams(window.location.search);
    if (params.code && onConfirmEmailPage) {
      window.localStorage.setItem("email-code", params.code);
      fetchEmailCode(window.localStorage.getItem("email-code"))(store.dispatch);
    }
    if (params.invite) {
      window.localStorage.setItem("code", params.invite);
      window.localStorage.getItem("code");
    }

    failedLogin.then((emptyUser) => {
      if (onConfirmEmailPage) {
        history.push("/login");
      }
      setUser(emptyUser)(store.dispatch);
    });

    initialLogin.then(({ user, explicit }) => {
      if (onConfirmEmailPage) {
        window.location.assign("/confirm-registration");
      } else {
        let code = window.localStorage.getItem("email-code");

        if (!code) {
          fetchConfig()(store.dispatch);
          setUser(user)(store.dispatch);
        } else {
          verificationAPI
            .email(code)
            .catch(() => null)
            .then(() => {
              window.localStorage.removeItem("email-code");
              window.location.assign("/confirm-registration");
            })
            .then(() => fetchUser());
        }

        if (
          !user.verificationStatusDto.cellphone ||
          (!user.verificationStatusDto.email && !code)
        ) {
          history.push("/confirm-registration");
          return;
        }

        fetchProNotifications(0)(store.dispatch);
        fetchUserNotifications(0)(store.dispatch);

        if (explicit) {
          fetchConfig()(store.dispatch);

          history.push("/");
        }
      }
    });

    store.subscribe(() => {
      const userId = this.userId();
      if (this.userLoggedIn === null || this.userLoggedIn === !userId) {
        this.userLoggedIn = !!userId;
        this.forceUpdate();
      }
    });

    Modals.addCallback(() =>
      this.setState({
        modals: Modals.get(),
      })
    );
  }

  userId = () => store.getState().user.id;

  render() {
    if (this.userId() !== undefined) {
      return (
        <Router history={history}>
          <ScrollToTop />
          <Provider store={store}>
            <RoutesWrapper>
              <div>
                <Header />                
                <Switch>
                  <Redirect strict from="/payments/jobs" to={{ pathname: "/jobs", state: { search: window.location.search}}} />
                  <Redirect strict from="/payments/store" to={{ pathname: "/store", state: { search: window.location.search}}} />
                  <Route
                    privateRoute
                    exact
                    path="/requests"
                    component={Requests}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/requests/:id"
                    component={BoardRequestDetails}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/my-requests/:id"
                    component={MyRequestDetails}
                  />
                  <Route privateRoute exact path="/jobs" component={Jobs} />
                  <Route
                    privateRoute
                    exact
                    path="/jobs/:id"
                    component={JobRequestDetails}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/quetzzes"
                    component={Quetzzes}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/network"
                    component={Network}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/quetzzal-points"
                    component={QuetzzalPoints}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/leaderboard"
                    component={Leaderboard}
                  />
                  <Route privateRoute exact path="/store" component={Store} />
                  <Route
                    privateRoute
                    exact
                    path="/user-notifications"
                    component={UserNotifications}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/pro-notifications"
                    component={ProNotifications}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/billing-info"
                    component={BillingInfo}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/personal-info"
                    component={PersonalInfo}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/user-profile/:id"
                    component={UserProfile}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/new"
                    component={NewRequest}
                  />
                  <Route
                    privateRoute
                    exact
                    path="/professional-profile/:id"
                    component={ProfessionalProfile}
                  />
                  <Route
                    privateRoute
                    nonProRoute
                    exact
                    path="/register-pro"
                    component={RegisterPro}
                  />
                  <Route publicRoute exact path="/login" component={Login} />
                  <Route
                    publicRoute
                    exact
                    path="/register-user"
                    component={RegisterUser}
                  />
                  <Route
                    exact
                    path="/confirm-registration"
                    component={ConfirmRegistration}
                  />
                  <Route exact path="/support" component={InfoSupport} />
                  <Route exact path="/faq" component={FaqSupport} />
                  <Route exact path="/privacy" component={PrivacySupport} />
                  <Route
                    exact
                    path="/video-tutorial"
                    component={VideoTutorial}
                  />
                  <Route exact path="/terms" component={TermsSupport} />
                  <Route exact path="/cookie" component={CookieSupport} />
                  <Route
                    exact
                    path="/dichiarazione-cookie"
                    component={CookieDeclaration}
                  />
                  <Route
                    exact
                    path="/regolamento"
                    component={GuidelinesDeclaration}
                  />
                  <Route exact path="/work" component={WorkSupport} />
                  <Route
                    exact
                    path="/reset-password"
                    component={ResetPassword}
                  />
                  <Route
                    exact
                    path="/forgot-username"
                    component={ForgotUsername}
                  />
                  <Route
                    exact
                    path="/credentials/password/reset"
                    component={SetNewPassword}
                  />
                  <Route
                    exact
                    path="/quetzz/:id"
                    render={(props) => (
                      <InvitedRequestDetails {...props} external />
                    )}
                  />
                  <Route
                    exact
                    path="/"
                    component={
                      PREREGISTRATION_MODE
                        ? PreregistrationLanding
                        : !!this.userId()
                        ? Board
                        : Landing
                    }
                  />
                </Switch>
                <Footer />
                {this.state.modals}
              </div>
            </RoutesWrapper>
          </Provider>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            closeButton={false}
          />
        </Router>
      );
    }
    return (
      <div className="flex items-center justify-center h-screen">
        <img src="/img/logo-header.png" />
      </div>
    );
  }
}

export default App;
