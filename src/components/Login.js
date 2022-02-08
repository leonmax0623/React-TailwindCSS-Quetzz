import React from "react";
import Component from "../Component";
import TextField, { Input } from "@material/react-text-field";
import { Link } from "react-router-dom";
import { authAPI } from "../resources/auth";
import { createModal } from "../helpers";
import InfoModal from "./util/modals/InfoModal";
import { fetchEmailCode, setEmailCode } from "../actions/codesAction";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    emailPhone: "",
    password: "",
    loading: false,
    counter: 0,
  };

  form = React.createRef();

  login = () => {
    this.setState({ loading: true });
    authAPI
      .login(this.state.emailPhone, this.state.password)
      .catch(() => null)
      .then(() => this.setState({ loading: false }));
  };

  componentDidMount() {
    super.componentDidMount();

    if (this.props.codes.emailCode) {
      createModal(InfoModal, {
        title: <p className="text-center">Ci sei quasi!</p>,
        body: (
          <p className="text-center">
            Effettua il login per
            <br />
            confermare il tuo indirizzo e-mail!
          </p>
        ),
        button: "Ok!",
      }).then(() => this.props.setEmailCode(""));
    }
  }

  render() {
    return (
      <div className="container">
        <div className="narrow-modal md:my-32">
          <h1 className="text-3xl text-black text-raleway font-bold">
            Benvenuto
          </h1>
          <p className="text-gray-500">Effettua il login per continuare</p>
          <form className="my-8" ref={this.form}>
            <TextField
              label="Username"
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              leadingIcon={<i className="fas fa-user"></i>}
            >
              <Input
                type="text"
                required
                value={this.state.emailPhone}
                onChange={(e) =>
                  this.setState({ emailPhone: e.currentTarget.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    this.login();
                  }
                }}
              />
            </TextField>
            <TextField
              label="Password"
              autoComplete="current-password"
              leadingIcon={<i className="fas fa-unlock-alt"></i>}
            >
              <Input
                type="password"
                required
                value={this.state.password}
                onChange={(e) =>
                  this.setState({ password: e.currentTarget.value })
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    this.login();
                  }
                }}
              />
            </TextField>
          </form>
          <button
            className="bg-turquoise p-6 text-white w-full"
            onClick={() => {
              if (this.state.loading) {
                return;
              }
              if (!this.form.current.checkValidity()) {
                this.form.current.reportValidity();
                return;
              }
              this.login();
            }}
          >
            {this.state.loading ? (
              <i className="fas fa-spinner fa-pulse"></i>
            ) : (
              "Accedi"
            )}
          </button>
          <Link
            to="/reset-password"
            className="text-center block mt-8 font-bold"
          >
            Hai dimenticato la <span className="text-turquoise">password?</span>
          </Link>
          <Link
            to="/forgot-username"
            className="text-center block mt-8 font-bold"
          >
            Hai dimenticato il tuo{" "}
            <span style={{ color: "rgb(116, 182, 156)" }}>nome utente?</span>
          </Link>
          <p className="text-center mt-8">
            <span className="text-gray-500">Non hai ancora un account? </span>
            <Link to="/register-user" className="text-turquoise">
              Registrati
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  codes: state.codes,
});

export default connect(mapStateToProps, { fetchEmailCode, setEmailCode })(
  Login
);
