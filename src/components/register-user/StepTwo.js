import React from "react";
import Component from "../../Component";
import TextField, { Input } from "@material/react-text-field";
import { withStyles } from "@material-ui/core/styles";
import ReactTooltip from "react-tooltip";
import clsx from "clsx";
import { userAPI } from "../../resources/users";
import {
  handleTitle,
  defaultRequiredMessage,
  identificationPattern,
  identificationPatternMessage,
  handleError,
  optional,
  createLoaderModal,
  createModal,
} from "../../helpers";
import OptionsModal from "../util/modals/OptionsModal";
import { filtersAPI } from "../../resources/filters";
import ReactDatePicker from "react-datepicker";
import moment from "moment";

export default class StepTwo extends Component {
  provincesLoaded = null;
  citiesLoaded = null;

  state = {
    username: this.props.username,
    nickname: this.props.nickname,
    birthDate: this.props.birthDate,
    city: optional(this.props, "city"),
    province: optional(this.props, "province"),
    tooltipVisible: false,
    checking: false,
    cities: [],
    provinces: [],
  };

  form = React.createRef();
  nickname = React.createRef();
  username = React.createRef();

  pickProvince = () =>
    createLoaderModal(this.provincesLoaded)
      .then(() => createModal(OptionsModal, { options: this.state.provinces }))
      .then((province) => {
        this.setState({
          province: {
            name: province.name,
            region: {
              country: { name: "Italia", id: 1 },
              id: 2,
              name: "Friuli Venezia Giulia",
            },
            id: province.id,
          },
        });
        this.citiesLoaded = filtersAPI
          .cities(province.id)
          .then((cities) => this.setState({ cities }))
          .catch((e) => null);
      })
      .catch((err) => null);

  pickCity = () => {
    if (this.state.province) {
      return createLoaderModal(this.citiesLoaded)
        .then(() => createModal(OptionsModal, { options: this.state.cities }))
        .then((city) =>
          this.setState({ city: { id: city.id, name: city.name } })
        )
        .catch((err) => null);
    }
  };

  componentDidMount() {
    super.componentDidMount();
    this.provincesLoaded = filtersAPI
      .provinces()
      .then((provinces) => this.setState({ provinces }));

    if (this.state.cities.length == 0 && this.state.province) {
      this.citiesLoaded = filtersAPI
        .cities(this.state.province.id)
        .then((cities) => this.setState({ cities }));
    }
  }

  render() {
    return (
      <div className="narrow-modal md:my-32">
        <h1 className="text-3xl text-black text-raleway font-bold">
          Crea il tuo Account
        </h1>
        <p>
          <span className="text-gray-500">Passaggio </span>
          <span>2 </span>
          <span className="text-gray-500">di </span>
          <span>4 </span>
        </p>
        <form autoComplete="nope" autoCorrect="off" spellCheck="off" ref={this.form} className="mt-8 m-b4">
          <TextField
            label="Username"
            onTrailingIconSelect={() => null}
            trailingIcon={
              <i
                data-tip
                data-for="username-tooltip"
                data-event={'focus', 'click'}
                data-event-off={'focusout'}
                className="fas fa-info-circle z-10 p-3 -m-3"
              ></i>
            }
          >
            <Input
              required
              ref={this.username}
              title={defaultRequiredMessage}
              pattern={identificationPattern}
              maxLength={30}
              minLength={1}
              type="text"
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              value={this.state.username}
              onInvalid={(e) => {
                if (e.currentTarget.value === "") {
                  e.currentTarget.setCustomValidity(
                    "Per favore compila questo campo"
                  );
                } else if (e.currentTarget.validity.patternMismatch) {
                  e.currentTarget.setCustomValidity(
                    identificationPatternMessage
                  );
                }
              }}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              onChange={(e) => {
                  handleTitle(e)
                  this.setState({ username: e.currentTarget.value })
                }
              }
              /*onBlur={(e) => {
                if (e.currentTarget.value) {
                  userAPI.checkUsername(e.currentTarget.value)
                    .then((taken) => {
                      if (taken && this.username.current) {
                        this.username.current.inputElement.setCustomValidity("L'username inserito è già in uso!");
                      } else if (!taken && this.username.current) {
                        this.nickname.current.inputElement.setCustomValidity("");
                      }

                      if (this.form.current)
                        this.form.current.reportValidity();
                    })
                    .catch((err) => {
                      handleError("Oops! Qualcosa è andato storto.");
                    })
                }
              }}*/
            />
          </TextField>
          <TextField
            label="Nickname"
            leadingIcon={<i className="fas fa-at"></i>}
            onTrailingIconSelect={() => null}
            trailingIcon={
              <i
                data-tip
                data-for="nickname-tooltip"
                data-event={'focus', 'click'}
                data-event-off={'focusout'}
                className="fas fa-info-circle z-10 p-3 -m-3"
              ></i>
            }
          >
            <Input
              required
              ref={this.nickname}
              title={defaultRequiredMessage}
              pattern={identificationPattern}
              maxLength={30}
              minLength={1}
              type="text"
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              value={this.state.nickname}
              onInvalid={(e) => {
                if (e.currentTarget.value === "") {
                  e.currentTarget.setCustomValidity(
                    "Per favore compila questo campo"
                  );
                } else if (e.currentTarget.validity.patternMismatch) {
                  e.currentTarget.setCustomValidity(
                    identificationPatternMessage
                  );
                }
              }}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
              onChange={(e) => {
                handleTitle(e)
                this.setState({ nickname: e.currentTarget.value })
              }}
              /*onBlur={(e) => {
                if (e.currentTarget.value) {
                  userAPI.checkNickname(e.currentTarget.value)
                    .then((taken) => {
                      if (taken && this.nickname.current) {
                        this.nickname.current.inputElement.setCustomValidity("Il nickname inserito è già in uso!");
                      } else if (!taken && this.nickname.current) {
                        this.nickname.current.inputElement.setCustomValidity("");
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
          <div className="border-b-2 border-gray-200 p-4">
            <ReactDatePicker
              maxDate={moment().subtract(18, "years").toDate()}
              required
              title={defaultRequiredMessage}
              dateFormat="dd/MM/yyyy"
              selected={this.state.birthDate}
              onChange={(birthDate, e) => {
                handleTitle(e)
                this.setState({ birthDate });
                if (birthDate === "") {
                  birthDate.currentTarget.setCustomValidity(
                    "Per favore compila questo campo"
                  );
                }
              }}
              onInvalid={(e) => {
                if (e.currentTarget.value === "") {
                  e.currentTarget.setCustomValidity(
                    "Per favore compila questo campo"
                  );
                }
              }}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="Data di nascita*"
              popperPlacement="bottom"
              popperModifiers={{
                flip: {
                  enabled: false,
                },
                preventOverflow: {
                  escapeWithReference: true,
                },
              }}
            />
          </div>
          <TextField>
            <Input
              type="text"
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              disabled
              value="Friuli-Venezia Giulia"
              className="pointer-events-none"
              style={{color: '#000'}}
            />
          </TextField>
        </form>
        <div className="flex py-6">
          <span
            className={
              (optional(this.state.province, "name")
                ? "text-black province-border"
                : "text-gray-500 province-border") + " flex flex-1 items-center justify-left  pl-4"
            }
          >
              <button onClick={this.pickProvince} className="provinceName mr-3 pb-3 pl-3 pr-3">
                {optional(this.state.province, "name", "Provincia*")}
              </button>
              <i
                className={clsx("fas fa-times pb-3 cursor-pointer text-black pl-2", {
                  hidden: !optional(this.state.province, "name"),
                })}
                onClick={() => {
                  this.setState({ province: null });
                  setTimeout(() => this.setState({ city: null }), 0);
                }}
              ></i>
          </span>
          <span
            className={
              (optional(this.state.city, "name")
                ? "text-black province-border ml-2"
                : "text-gray-500 province-border ml-2") + " flex flex-1 items-center justify-end"
            }
          >
              <button className="inline  pb-3 pl-3 pr-3" onClick={this.pickCity}>
                {optional(this.state.city, "name", "Comune*")}
              </button>
              <i
                style={{ overflow: "visible" }}
                className={clsx("fas fa-times pb-3 cursor-pointer text-black pl-2 pr-4", {
                  hidden: !optional(this.state.city, "name"),
                })}
                onClick={() => this.setState({ city: null })}
              ></i>
          </span>
        </div>
        <div className="flex">
          <button
            className="bg-turquoise p-6 text-white flex-1 mr-5"
            onClick={() =>
              this.props.onRetreat({
                username: this.state.username,
                nickname: this.state.nickname,
                birthDate: this.state.birthDate,
                city: this.state.city,
                province: this.state.province,
              })
            }
          >
            Indietro
          </button>
          <button
            className={clsx(
              "p-6 text-white flex-1",
              !this.state.checking && this.ready()
                ? "bg-turquoise"
                : "bg-gray-500"
            )}
            disabled={this.state.checking || !this.ready()}
            onClick={() => {
              if (this.state.checking || !this.ready()) {
                return;
              }
              // this.nickname.current.inputElement.setCustomValidity(
              //   !this.namepattern.test(this.state.nickname)
              //     ? identificationPatternMessage
              //     : ""
              // );
              // this.username.current.inputElement.setCustomValidity(
              //   !this.namepattern.test(this.state.username)
              //     ? identificationPatternMessage
              //     : ""
              // );
              if (!this.form.current.checkValidity()) {
                return this.form.current.reportValidity();
              }
              this.setState({ checking: true });
              Promise.all([
                userAPI.checkUsername(this.state.username).catch(() => {
                  handleError("C'è un errore con l'username");
                  return true;
                }),
                userAPI.checkNickname(this.state.nickname).catch(() => {
                  handleError("C'è un errore con il nickname");
                  return true;
                }),
              ])
                .then(([usernameTaken, nicknameTaken]) => {
                  this.username.current.inputElement.setCustomValidity(
                    usernameTaken ? "L'username è già in uso" : ""
                  );
                  this.nickname.current.inputElement.setCustomValidity(
                    nicknameTaken ? "Il nickname è già in uso" : ""
                  );
                  if (this.form.current.checkValidity()) {
                    this.props.onAdvance({
                      username: this.state.username,
                      nickname: this.state.nickname,
                      birthDate: this.state.birthDate,
                      city: this.state.city,
                      province: this.state.province,
                    });
                  } else {
                    this.form.current.reportValidity();
                  }
                })
                .then(() => this.setState({ checking: false }));
            }}
          >
            Continua
          </button>
        </div>

        <ReactTooltip
          id="username-tooltip"
          multiline
          place={this.isMobile() ? "left" : "right"}
          type="dark"
          effect="solid"
        >
          <span>
            Tienilo bene a mente perché lo userai
            <br />
            per effettuare il login!
          </span>
        </ReactTooltip>
        <ReactTooltip
          multiline
          id="nickname-tooltip"
          place={this.isMobile() ? "left" : "right"}
          type="dark"
          effect="solid"
        >
          <span>
            La tua privacy su quetzz è GARANTITA!
            <br />
            Usa l'immaginazione e crea lo pseudonimo
            <br />
            con cui gli altri utenti ti "conosceranno"!
          </span>
        </ReactTooltip>
      </div>
    );
  }

  ready() {
    //return this.state.city && optional(this.state, "province.name");
    return this.state.username &&
    this.state.nickname &&
    this.state.birthDate &&
    this.state.city &&
    this.state.province
  }
}
