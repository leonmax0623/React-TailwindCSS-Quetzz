import React from "react";
import Component from "../Component";
import TextField, { Input } from "@material/react-text-field";
import { objectFromParams } from "../resources/util";
import { resetAPI } from "../resources/reset";
import InfoModal from "./util/modals/InfoModal";
import history from "../history";
import { handleTitle, defaultRequiredMessage, createModal } from "../helpers";

export default class SetNewPassword extends Component {
  state = {
    token: "",
    password: "",
    confirmedPassword: "",
  };

  form = React.createRef();
  passwordRepeat = React.createRef();

  componentDidMount() {
    super.componentDidMount();

    const params = objectFromParams(window.location.search);
    if (params.code) {
      this.setState({ token: params.code });
    } else {
      history.push("/");
    }
  }

  resetPassword = (e) => {
    this.passwordRepeat.current.inputElement.setCustomValidity(
      this.state.confirmedPassword !== this.state.password
        ? "Le password devono corrispondere"
        : ""
    );
    e.preventDefault();
    if (this.form.current.checkValidity()) {
      resetAPI
        .resetPassword(
          this.state.password,
          this.state.confirmedPassword,
          this.state.token
        )
        .then(() =>
          createModal(InfoModal, {
            button: "Ok!",
            title: "Operazione effettuata",
            body: "Password modificata con successo!",
          })
        )
        .catch(() => null)
        .then(() => history.push("/"));
    } else {
      this.form.current.reportValidity();
    }
  };

  render() {
    return (
      <div className="narrow-modal md:my-32">
        <h1 className="text-3xl text-black text-raleway font-bold mb-6">
          Imposta la nuova password
        </h1>
        <form autoComplete="nope" autoCorrect="off" spellCheck="off" ref={this.form}>
          <TextField
            label="Nuova password"
            className="mb-4"
            leadingIcon={<i className="fas fa-unlock-alt"></i>}
          >
            <Input
              required
              title={defaultRequiredMessage}
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              maxLength={200}
              minLength={8}
              type="password"
              value={this.state.password}
              onChange={(e) => {
                handleTitle(e)
                this.setState({ password: e.currentTarget.value })
              }}
            />
          </TextField>
          <TextField
            label="Conferma nuova password"
            className="mb-4"
            leadingIcon={<i className="fas fa-unlock-alt"></i>}
          >
            <Input
              required
              title={defaultRequiredMessage}
              ref={this.passwordRepeat}
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              maxLength={200}
              minLength={8}
              type="password"
              value={this.state.confirmedPassword}
              onChange={(e) =>{
                  handleTitle(e)
                  this.setState({ confirmedPassword: e.currentTarget.value })
              }}
            />
          </TextField>
          <button
            className="bg-turquoise p-6 text-white w-full"
            onClick={this.resetPassword}
          >
            Conferma
          </button>
        </form>
      </div>
    );
  }
}
