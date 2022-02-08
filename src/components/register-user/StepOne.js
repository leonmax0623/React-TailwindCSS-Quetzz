import React from "react";
import Component from "../../Component";
import TextField, { Input } from "@material/react-text-field";
import { Link } from "react-router-dom";
import { userAPI } from "../../resources/users";
import clsx from "clsx";
import {
  handleTitle,
  defaultRequiredMessage,
  alphanumericPattern,
  alphanumericPatternMessage,
  namePattern,
  namePatternMessage,
  PREREGISTRATION_MODE,
} from "../../helpers";

export default class StepOne extends Component {
  state = {
    firstName: this.props.firstName,
    lastName: this.props.lastName,
    email: this.props.email,
    emailConfirm: this.props.emailConfirm,
    checking: false,
    emailAvailable: undefined,
  };
  nameInput = React.createRef();
  form = React.createRef();
  email = React.createRef();
  emailRepeat = React.createRef();
  pattern = new RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  );

  render() {
    return (
      <div className="narrow-modal md:my-32">
        <h1 className="text-3xl text-black text-raleway font-bold">
          Crea il tuo Account
        </h1>
        <p>
          <span className="text-gray-500">Passaggio </span>
          <span>1 </span>
          <span className="text-gray-500">di </span>
          <span>4 </span>
        </p>
        <form
          autoComplete="nope" autoCorrect="off" spellCheck="off"
          ref={this.form}
          className="my-8"
          // onInvalid={(e) => {
          //   let val = e.target.value;
          //   if (val === "") {
          //     e.target.setCustomValidity("Per favore compila questo campo");
          //   } else {
          //     e.target.setCustomValidity("");
          //   }
          // }}
        >
          <TextField label="Nome">
            <Input
              ref={this.nameInput}
              type="text"
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              required
              title={defaultRequiredMessage}
              maxLength={30}
              minLength={1}
              pattern={namePattern}
              onInvalid={(e) => {
                if (e.currentTarget.value === "") {
                  e.currentTarget.setCustomValidity(
                    "Per favore compila questo campo"
                  );
                } else if (e.currentTarget.validity.patternMismatch) {
                  e.currentTarget.setCustomValidity(namePatternMessage);
                }
              }}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              value={this.state.firstName}
              onChange={(e) =>{
                  handleTitle(e)
                  this.setState({ firstName: e.currentTarget.value })
                }
              }
            />
          </TextField>
          <TextField label="Cognome">
            <Input
              type="text"
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              required
              title={defaultRequiredMessage}
              onMouseEnter={handleTitle}
              maxLength={30}
              minLength={1}
              pattern={namePattern}
              onInvalid={(e) => {
                if (e.currentTarget.value === "") {
                  e.currentTarget.setCustomValidity(
                    "Per favore compila questo campo"
                  );
                } else {
                  e.currentTarget.setCustomValidity(namePatternMessage);
                }
              }}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              value={this.state.lastName}
              onChange={(e) => {
                handleTitle(e)
                this.setState({ lastName: e.currentTarget.value })
              }}
            />
          </TextField>
          <TextField
            label="Email"
            leadingIcon={<i className="far fa-envelope"></i>}
          >
            <Input
              ref={this.email}
              type="email"
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              required
              title={defaultRequiredMessage}
              maxLength={100}
              minLength={1}
              value={this.state.email}
              //pattern={this.pattern}
              onInvalid={(e) => {
                if (e.currentTarget.validity.patternMismatch) {
                  e.currentTarget.setCustomValidity("Si prega di inserire un indirizzo email valido")  
                } else {
                  e.currentTarget.setCustomValidity(
                    this.state.emailAvailable == true ? 
                    "Questa email risulta già registrata" : 
                    "Si prega di inserire un indirizzo email valido"
                  );
                }
              }}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              onChange={(e) => {
                handleTitle(e)
                this.setState({ email: e.currentTarget.value.trim() })
                this.setState({ emailAvailable: undefined })
              }}
              /*onBlur={(e) => {
                if (this.state.email && this.email.current.inputElement.checkValidity()) {
                  userAPI.checkEmail(this.state.email)
                  .then((emailTaken) => {
                    if (emailTaken == true) {
                      this.state.emailAvailable = emailTaken;
                      if (this.email.current)
                        this.email.current.inputElement.setCustomValidity("Questa email risulta già registrata");
                      if (this.form.current)
                        this.form.current.reportValidity();
                    } else if (this.email.current) {
                      this.email.current.inputElement.setCustomValidity("");
                    }
                  });
                }
              }}*/
            />
          </TextField>
          <TextField
            label="Conferma Email"
            leadingIcon={<i className="far fa-envelope"></i>}
          >
            <Input
              ref={this.emailRepeat}
              type="text"
              title={defaultRequiredMessage}
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              required
              maxLength={100}
              minLength={1}
              value={this.state.emailConfirm}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              onChange={(e) => {
                handleTitle(e)
                this.setState({ emailConfirm: e.currentTarget.value.trim() })
              }}
            />
          </TextField>
        </form>
        <button
          className={clsx(
            "p-6 text-white w-full",
            !this.readyForNextStep() ? "bg-gray-500" : "bg-turquoise"
          )}
          disabled={!this.readyForNextStep()}
          onClick={() => {
            if (this.state.checking) {
              return;
            }
            if (!this.form.current.checkValidity()) {
              this.form.current.reportValidity();
              return;
            }
            // this.email.current.inputElement.setCustomValidity(
            //   !this.pattern.test(this.state.email)
            //     ? "Si prega di inserire un indirizzo email valido"
            //     : ""
            // );
            this.emailRepeat.current.inputElement.setCustomValidity(
              this.state.emailConfirm != this.state.email
                ? "Le e-mail devono corrispondere"
                : ""
            );
            if (this.form.current.checkValidity()) {
              this.setState({ checking: true });
              userAPI
                .checkEmail(this.state.email)
                .then((emailAvailable) => {
                  this.state.emailAvailable = emailAvailable;
                  this.email.current.inputElement.setCustomValidity(
                    emailAvailable == true ? "Questa email risulta già registrata" : ""
                  );
                  if (this.form.current.checkValidity()) {
                    this.props.onAdvance({
                      firstName: this.state.firstName,
                      lastName: this.state.lastName,
                      email: this.state.email,
                      emailConfirm: this.state.emailConfirm,
                    });
                  } else {
                    this.form.current.reportValidity();
                  }
                })
                .catch((err) => null)
                .then(() => this.setState({ checking: false }));
            } else {
              this.form.current.reportValidity();
            }
          }}
        >
          Continua
        </button>
        {!PREREGISTRATION_MODE && (
          <p className="text-center mt-8">
            <span className="text-gray-500">Hai già un account? </span>
            <Link to="/login" className="text-turquoise">
              Accedi
            </Link>
          </p>
        )}
      </div>
    );
  }

  readyForNextStep() {
    if (!this.form.current) {
      this.setState({firstName: this.state.firstName}); //just using this to refresh the state and make sure we can check form validity
    }

    return this.state.firstName && 
      this.state.lastName && 
      this.state.email && 
      this.state.emailConfirm //&&
      //this.state.email == this.state.emailConfirm && 
      //!this.state.emailAvailable && //emailAvailable return true if the email is already taken.
      //this.form.current?.checkValidity();
  }
}
