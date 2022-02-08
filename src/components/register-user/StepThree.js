import React from "react";
import Component from "../../Component";
import TextField, { Input } from "@material/react-text-field";
import ReactTooltip from "react-tooltip";
import { userAPI } from "../../resources/users";
import clsx from "clsx";
import { handleTitle, defaultRequiredMessage, createLoaderModal, handleError } from "../../helpers";
import moment from "moment";

export default class StepThree extends Component {
  state = {
    cellphone: this.props.cellphone,
    password: this.props.password,
    passwordConfirm: this.props.passwordConfirm,
    loading: false,
    policyAccepted: !!this.props.policyAccepted,
  };

  form = React.createRef();
  cellphone = React.createRef();
  passwordRepeat = React.createRef();

  render() {
    return (
      <div className="narrow-modal md:my-32">
        <h1 className="text-3xl text-black text-raleway font-bold">
          Crea il tuo Account
        </h1>
        <p>
          <span className="text-gray-500">Passaggio </span>
          <span>3 </span>
          <span className="text-gray-500">di </span>
          <span>4 </span>
        </p>
        <form autoComplete="nope" autoCorrect="off" spellCheck="off" ref={this.form} className="my-8" autoComplete="nope" autoCorrect="off" spellCheck="off">
          <TextField
            label="Numero di cellulare"
            leadingIcon={<i className="fas fa-phone-alt"></i>}
            onTrailingIconSelect={() => null}
            trailingIcon={
              <i
                data-tip
                data-for="phone-tooltip"
                data-event={'focus', 'click'}
                data-event-off={'focusout'}
                className="fas fa-info-circle z-10 p-3 -m-3"
              ></i>
            }
          >
            <Input
              ref={this.cellphone}
              required
              title={defaultRequiredMessage}
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              type="search"
              id="tel-num"
              minLength={10}
              maxLength={17}
              pattern="^\+?\d{10,16}$"
              value={this.state.cellphone}
              onInvalid={(e) => {
                if (e.currentTarget.validity.patternMismatch) {
                  e.currentTarget.setCustomValidity("Inserisci un numero di telefono valido");
                }
              }}
              onInput={(e) => {
                if (e.currentTarget.validity.patternMismatch) {
                  e.currentTarget.setCustomValidity("Inserisci un numero di telefono valido");
                } else {
                  e.currentTarget.setCustomValidity("");
                }
              }}
              onChange={(e) => {
                  handleTitle(e)
                  this.setState({ cellphone: e.currentTarget.value })
              }}
              /*onBlur={(e) => {
                if (e.currentTarget.value && this.cellphone.current.inputElement.checkValidity()) {
                  userAPI.checkCellphone(e.currentTarget.value)
                    .then((taken) => {
                      if (taken && this.cellphone.current) {
                        this.cellphone.current.inputElement.setCustomValidity("Il numero inserito è già in uso!");
                      } else if (!taken && this.cellphone.current) {
                        this.cellphone.current.inputElement.setCustomValidity("");
                      }

                      if (this.form.current)
                        this.form.current.reportValidity();
                    })
                    .catch((err) => {
                      handleError("Oops! Qualcosa è andato storto.");
                    });
                }
              }}*/
            />
          </TextField>
          <TextField
            label="Password"
            leadingIcon={<i className="fas fa-unlock-alt"></i>}
          >
            <Input
              required
              title={defaultRequiredMessage}
              type="password"
              id="password"
              autoComplete="new-password" autoCorrect="off" spellCheck="off"
              maxLength={200}
              minLength={8}
              value={this.state.password}
              onInvalid={(e) => {
                e.currentTarget.setCustomValidity("Inserisci una password valida con più di 8 caratteri.");
              }}
              onInput={(e) => {
                e.currentTarget.setCustomValidity("");
              }}
              onChange={(e) => {
                handleTitle(e)
                this.setState({ password: e.currentTarget.value })
              }}
            />
          </TextField>
          <TextField
            label="Ripeti Password"
            leadingIcon={<i className="fas fa-unlock-alt"></i>}
          >
            <Input
              required
              title={defaultRequiredMessage}
              ref={this.passwordRepeat}
              type="password"
              id="password-repeat"
              autoComplete="new-password" autoCorrect="off" spellCheck="off"
              maxLength={200}
              minLength={8}
              value={this.state.passwordConfirm}
              onInput={(e) => {
                e.currentTarget.setCustomValidity("");
              }}
              onChange={(e) => {
                handleTitle(e)
                this.setState({ passwordConfirm: e.currentTarget.value })
              }}
              onBlur={(e) => {
                if (this.state.passwordConfirm != this.state.password) {
                  this.passwordRepeat.current.inputElement.setCustomValidity("Le password devono corrispondere");
                }
              }}
            />
          </TextField>
        </form>
        <label className="checkbox-container text-center mb-12">
          Creando l'Account, accetti i nostri
          <a
            target="_blank"
            href="/terms"
            className="ml-2 text-black font-bold border-b border-red-500"
          >
            Termini & Condizioni
          </a>
          <input
            type="checkbox"
            required
            title={defaultRequiredMessage}
            onChange={(e) => {
              handleTitle(e)
              this.setState({ policyAccepted: e.target.checked })
            }}
          />
          <span className="checkmark"></span>
        </label>
        <div className="flex">
          <button
            className="bg-turquoise p-6 text-white flex-1 mr-2"
            onClick={() =>
              this.props.onRetreat({
                cellphone: this.state.cellphone,
                password: this.state.password,
              })
            }
          >
            Indietro
          </button>
          <button
            className={clsx(
              "p-6 text-white flex-1",
              this.readyForNextStep() ? "bg-turquoise" : "bg-gray-500"
            )}
            disabled={!this.readyForNextStep()}
            onClick={() => {
              if (!this.readyForNextStep()) {
                return;
              }
              this.passwordRepeat.current.inputElement.setCustomValidity(
                this.state.passwordConfirm !== this.state.password
                  ? "Le password devono corrispondere"
                  : ""
              );
              if (this.form.current.checkValidity()) {
                this.setState({ loading: true });
                userAPI
                  .checkCellphone(this.state.cellphone)
                  .then((cellphoneAvailable) => {
                    this.cellphone.current.inputElement.setCustomValidity(
                      !cellphoneAvailable
                        ? ""
                        : "Il numero di cellulare risulta già registrato"
                    );
                    if (this.form.current.checkValidity()) {
                      const code = window.localStorage.getItem("code");
                      return createLoaderModal(
                        userAPI.signup({
                          firstName: this.props.firstName,
                          lastName: this.props.lastName,
                          birthDate: moment(this.props.birthDate).format(
                            "YYYY-MM-DD"
                          ),
                          nickname: this.props.nickname.toLowerCase(),
                          cityId: this.props.city.id,
                          email: this.props.email.toLowerCase(),
                          emailConfirm: this.props.emailConfirm.toLowerCase(),
                          password: this.state.password,
                          passwordConfirm: this.state.passwordConfirm,
                          cellphone: this.state.cellphone,
                          policyAccepted: this.state.policyAccepted,
                          ...(code ? { token: code } : {}),
                          username: this.props.username.toLowerCase(),
                          preferredRoles: this.props.preferredRoles,
                        })
                      )
                        .then(() =>
                          window.location.assign(
                            "/confirm-registration?registration=1"
                          )
                        )
                        .catch(() =>
                          handleError(
                            "Oh no! Qualcosa è andato storto. Controlla di aver inserito correttamente tutti i tuoi dati personali."
                          )
                        )
                        .then(() => window.localStorage.removeItem("code"));
                    } else {
                      this.form.current.reportValidity();
                    }
                  })
                  .catch(() => null)
                  .then(() => this.setState({ loading: false }));
              } else {
                this.form.current.reportValidity();
              }
            }}
          >
            Continua
          </button>
        </div>

        <ReactTooltip
          id="phone-tooltip"
          place="right"
          type="dark"
          effect="solid"
        >
          <p>
            La nostra priorità è garantire un servizio
            <br />
            di qualità, perciò verifichiamo SEMPRE
            <br />
            l'autenticità dei profili che riceviamo.
            <br />
            Inoltre, questa informazione è essenziale
            <br />
            per assicurare il contatto tra gli utenti
            <br />
            ed i professionisti.
          </p>
        </ReactTooltip>
      </div>
    );
  }

  readyForNextStep() {
    return this.state.policyAccepted && this.state.cellphone && this.state.password && this.state.passwordConfirm && !this.state.loading;
  }
}
