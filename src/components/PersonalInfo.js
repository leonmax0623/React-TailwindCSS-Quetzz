import React from "react";
import Component from "../Component";
import { connect } from "react-redux";
import TextField, { Input } from "@material/react-text-field";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { profileAPI } from "../resources/profile";
import {
  optional,
  createLoaderModal,
  createModal,
  handleError,
  handleInfo,
  namePattern,
  namePatternMessage,
  alphanumericPattern,
  alphanumericPatternMessage,
} from "../helpers";
import { filtersAPI } from "../resources/filters";
import OptionsModal from "./util/modals/OptionsModal";
import VerificationModal from "./util/modals/VerificationModal";
import { verificationAPI } from "../resources/verification";
import { authAPI } from "../resources/auth";
import clsx from "clsx";
import ConfirmationModal from "./util/modals/ConfirmationModal";
import InfoModal from "./util/modals/InfoModal";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { clone } from "../resources/util";
import { userAPI } from "../resources/users";

class PersonalInfo extends Component {
  provincesLoaded = null;
  citiesLoaded = null;

  state = {
    user: {},
    editMode: false,
    provinces: [],
    cities: [],
    copyState: {
      user: {},
      provinces: [],
      cities: [],
    },

    emailAvailable: undefined
  };

  form = React.createRef();
  cellphoneField = React.createRef();
  emailField = React.createRef();
  email = React.createRef();
  cellphone = React.createRef();

  pickProvince = () =>
    createLoaderModal(this.provincesLoaded)
      .then(() => createModal(OptionsModal, { options: this.state.provinces }))
      .then((province) => {
        this.setNestedState("user.province", province);
        this.citiesLoaded = filtersAPI
          .cities(province.id)
          .then((cities) => this.setState({ cities }));
      })
      .catch((err) => null)
      // .then(() => this.setNestedState("user.city", null));

  pickCity = () => {
    if (optional(this.state.user, "province.id")) {
      return createLoaderModal(this.citiesLoaded)
        .then(() => createModal(OptionsModal, { options: this.state.cities }))
        .then((city) => this.setNestedState("user.city", city))
        .catch((err) => null);
    }
  };

  startEditMode = () => {
    this.setState(
      {
        editMode: true
      })
  };

  componentDidMount() {
    super.componentDidMount();
    let copyState = {
      user: {},
      provinces: [],
      cities: [],
    }
    profileAPI
      .getPersonalInfo()
      .then((user) => ({ ...user, province: user.city.province }))
      .then((user) => {
        copyState = {...copyState, user: clone(user)}
        this.setState({ user, copyState })
      });
    this.provincesLoaded = filtersAPI
      .provincesAll()
      .then((provinces) => {
        copyState = {  ...copyState, provinces: clone(provinces) }
        this.setState({ provinces, copyState })
      })
      .then(
        () =>
          (this.citiesLoaded = filtersAPI.cities(
            optional(this.state.user, "province.id")
          ))
      )
      .then((cities) => {
        copyState = {...copyState, cities: clone(cities)  }
        this.setState({ cities, copyState })
      });
  }

  save = () =>  {
    if (!this.readyToSubmit()) {
      return;
    }
    if (this.readyToSubmit() && this.form.current) {
      if (this.form.current.checkValidity()) {
        createModal(ConfirmationModal, { title: "Sei sicuro?" })
          .then(() =>
            createLoaderModal(
              profileAPI.putPersonalInfo({
                firstName: this.state.user.firstName,
                lastName: this.state.user.lastName,
                birthDate: moment(this.state.user.birthDate),
                cityId: this.state.user.city.id,
              })
            )
          )
          .then(() => {
            const cln = clone(this.state.user);
          }).then(() => {
            createModal(InfoModal, {
              title: "Successo!",
              button: "Ho capito!",
              body:
                "Ottimo! Hai appena aggiornato con successo le tue informazioni personali!",
            })
            const copyState = {...this.state.copyState, user: clone(this.state.user)}
            this.setState({ editMode: false,  copyState});
          }
        ).catch(() => null);
      } else {
        this.form.current.reportValidity();
      }
    }
  }

  editButtons() {
    if (this.state.editMode) {
      return (
        <>
          <div
            className="md:inline-flex mr-4 md:mr-8 cursor-pointer"
            onClick={() => {
              this.setState({ ...this.state.copyState,  editMode: false });
            }}
          >
            <span className="text-14 px-2 py-1 bg-dark-gray rounded text-white">
              Annulla
            </span>
          </div>
          <div
            className="md:inline-flex mr-4 md:mr-8 cursor-pointer"
            onClick={this.save}
          >
            <span className={(this.readyToSubmit() ? "bg-turquoise" : "bg-gray-500") + " text-14 px-2 py-1 rounded text-white"}>
              Salva
            </span>
          </div>
        </>
      );
    } else {
      return (
        <div
          className="md:inline-flex mr-8 cursor-pointer"
          onClick={this.startEditMode}
        >
          <div>
            <i className="fas fa-edit"></i>
          </div>
          <span className="ml-4 text-14 desktop">Modifica il Profilo</span>
        </div>
      );
    }
  }

  pageNavigation() {
    return (
      <div className="bg-white md:bg-transparent flex justify-between py-8 px-4 md:px-0">
        <div className="text-16 md:text-20 font-bold text-raleway">
          Informazioni Personali
        </div>
        <div className="inline-flex">
          {this.editButtons()}
          <Link
            to={`/user-profile/${this.props.user.id}`}
            className="inline-flex mr-4 md:mr-8"
          >
            <div>
              <i className="fas fa-user"></i>
            </div>
            <span className="desktop ml-4 text-14">Profilo</span>
          </Link>
          <span className="inline-flex mr-4 md:mr-8 border-b-2 border-black">
            <div>
              <i className="fas fa-list"></i>
            </div>
            <span className="desktop ml-4 text-14">Informazioni Personali</span>
          </span>
          {this.props.user.proStatus !== "NONE" ? (
            <Link
              to={`/professional-profile/${this.props.user.id}`}
              className="inline-flex rounded bg-gray-900 text-white px-4 -mt-2 cursor-pointer"
            >
              <div className="pt-2">
                <i className="fas fa-sync-alt"></i>
              </div>
              <span className="ml-4 desktop text-14 pt-2">Cambia Profilo</span>
            </Link>
          ) : (
            <Link
              to="/register-pro"
              className="inline-flex rounded bg-gray-900 text-white px-4 -mt-2"
            >
              <div className="pt-2">
                <i className="fas fa-suitcase"></i>
              </div>
              <span className="ml-4 desktop text-14 pt-2">Diventa un PRO!</span>
            </Link>
          )}
        </div>
      </div>
    );
  }


  render() {
    return (
      <div className="container">
        {this.pageNavigation()}
        <div className="wide-modal md:my-2">
          <div className="my-4 ">
            {this.state.editMode ? 
            <div>
            <div className="flex pb-8">
              <p className="text-16 md:text-20 flex-1"></p>
            </div>
              
            <form ref={this.form} autoComplete="nope" autoCorrect="off" spellCheck="off" onSubmit={(e) => e.preventDefault()}>
              <div className="flex justify-between flex-wrap md:flex-no-wrap">
                <TextField className="md:mr-4" label="Nome">
                  <Input
                    type="text"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    required
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
                    value={this.state.user.firstName}
                    onChange={(e) =>
                      this.setNestedState(
                        "user.firstName",
                        e.currentTarget.value
                      )
                    }
                  />
                </TextField>
                <TextField className="md:ml-4" label="Cognome">
                  <Input
                    type="text"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    required
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
                    value={this.state.user.lastName}
                    onChange={(e) =>
                      this.setNestedState(
                        "user.lastName",
                        e.currentTarget.value
                      )
                    }
                  />
                </TextField>
              </div>
              
              <div className='label-top pl-4 pt-1'>
                  Data di Nascita
              </div>
              <div className="province-border py-3 pl-4">
               
                <ReactDatePicker
                  maxDate={moment().subtract(18, "years").toDate()}
                  required
                  dateFormat="dd/MM/yyyy"
                  selected={moment(this.state.user.birthDate).toDate()}
                  onChange={(birthDate) =>
                    this.setNestedState("user.birthDate", birthDate)
                  }
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="Data di Nascita*"
                />
              </div>
              
              
                <span>
                  <div className='label-top pl-4 pt-1'>
                  Provincia
                  </div>
                  <span
                    className={
                      (optional(this.state.user, "province.name")
                        ? "text-black province-border"
                        : "text-gray-500 province-border") + " p-2 md:mr-4 pl-2 flex-1"
                    }
                  >
                    <button onClick={this.pickProvince} className='pl-3'>
                      {optional(
                        this.state.user,
                        "province.name",
                        "Seleziona la Provincia"
                      )}
                    </button>
                    <i
                      className={clsx(
                        "fas fa-times cursor-pointer pt-1 text-black pl-2",
                        { hidden: !optional(this.state.user, "province.name") }
                      )}
                      onClick={() => {
                        this.setNestedState("user.province", null);
                        setTimeout(
                          () => this.setNestedState("user.city", null),
                          0
                        );
                      }}
                    />
                  </span>
                </span>
                <span>
                <div className='label-top pl-4 pt-1'>
                Comune
                </div>
                <span
                  className={
                    (optional(this.state.user, "city.name")
                      ? "text-black province-border"
                      : "text-gray-500 province-border") + " p-2 pl-2 flex-1"
                  }
                >
                  <button onClick={this.pickCity} className='pl-3'>
                    {optional(
                      this.state.user,
                      "city.name",
                      "Seleziona il Comune"
                    )}
                  </button>
                  <i
                    className={clsx(
                      "fas fa-times cursor-pointer pt-1 text-black pl-2",
                      { hidden: !optional(this.state.user, "city.name") }
                    )}
                    onClick={() => this.setNestedState("user.city", null)}
                  ></i>
                </span>
                </span>
                
             
            </form>
          
            <form
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              className="flex justify-between flex-wrap md:flex-no-wrap mt-20 items-center"
              ref={this.cellphoneField}
            >
              <TextField
                className="md:mr-4 flex-1"
                label="Numero di Cellulare"
                leadingIcon={<i className="fas fa-phone-alt"></i>}
              >
                <Input
                  ref={this.cellphone}
                  type="tel"
                  pattern="^\+?\d{10,16}$"
                  maxLength="17"
                  mminlength="10"
                  required
                  onInvalid={(e) => {
                      if (e.currentTarget.validity.patternMismatch) {
                        e.currentTarget.setCustomValidity("Inserisci un numero di cellulare valido");
                      }
                    }
                  }
                  onInput={(e) => {
                    if (!new RegExp("^\\+?\\d{10,16}$").test(e.currentTarget.value)) {
                      e.currentTarget.setCustomValidity("Inserisci un numero di cellulare valido");
                      e.currentTarget.reportValidity();
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onChange={(e) =>
                    this.setNestedState("user.cellphone", e.currentTarget.value)
                  }
                  value={this.state.user.cellphone}
                  onBlur={(e) => {
                    if (e.currentTarget.value && new RegExp("^\\+?\\d{10,16}$").test(e.currentTarget.value) && e.currentTarget.value != this.state.copyState.user.cellphone) {
                      // userAPI.checkCellphone(e.currentTarget.value)
                      //   .then((taken) => {
                      //     if (taken && this.cellphoneField.current) {
                      //       this.cellphone.current.inputElement.setCustomValidity("Il numero inserito è già in uso!");
                      //     } else if (!taken && this.cellphoneField.current) {
                      //       this.cellphone.current.inputElement.setCustomValidity("");
                      //     }

                      //     this.cellphone.current.inputElement.reportValidity();
                      //   })
                      //   .catch((err) => {
                      //     handleError("Oops! Qualcosa è andato storto.");
                      //   });
                    }
                  }}
                />
              </TextField>
              <div>
                <i
                  className={
                    (this.cellphoneChanged() ? "bg-turquoise" : "bg-gray-500") +
                    " p-2 rounded text-white far fa-save"
                  }
                  onClick={() => {
                    if (!this.cellphoneField.current.checkValidity()) {
                      this.cellphoneField.current.reportValidity();
                      return;
                    }
                    if (this.cellphoneChanged()) {
                      let cnt = 0;
                      const modal = () =>
                        createModal(VerificationModal, {
                          description:
                            "A breve riceverai un SMS contenente un codice. Inseriscilo qui!",
                        })
                          .catch(() => {
                            throw "dismiss";
                          })
                          .then(verificationAPI.sms)
                          .then(() =>
                            handleInfo(
                              "Il cambio del numero di Cellulare è avvenuto correttamente!"
                            )
                          )
                          .then(() =>
                            this.setState({
                              copyState: {
                                ...this.state.copyState,
                                user: {
                                  ...this.state.copyState.user,
                                  cellphone: this.state.user.cellphone
                                }
                              },
                            })
                          )
                          .catch((e) => {
                            if (e === "dismiss") {
                              return;
                            } else if (cnt++ <= 3) {
                              modal();
                            } else {
                              handleError(
                                "Hai raggiunto il limite massimo di tentativi!"
                              );
                            }
                          });
                      createLoaderModal(
                        profileAPI.putCellphone(this.state.user.cellphone)
                      ).then(modal);
                    }
                  }}
                ></i>
              </div>
            </form>
            <form
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              className="flex justify-between flex-wrap md:flex-no-wrap items-center mb-24"
              ref={this.emailField}
            >
              <TextField
                label="Email"
                className="md:mr-4 flex-1"
                leadingIcon={<i className="far fa-envelope"></i>}
              >
                <Input
                  ref={this.email}
                  type="email"
                  required
                  value={this.state.user.email}
                  onChange={(e) => {
                      this.setNestedState("user.email", e.currentTarget.value)
                      this.setState({ emailAvailable: undefined })
                    }
                  }
                  pattern="^.+\..+$"
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
                  onBlur={(e) => {
                    if (this.state.user?.email && this.email.current.inputElement.checkValidity()) {
                      // userAPI.checkEmail(this.state.user.email)
                      // .then((emailTaken) => {
                      //   if (emailTaken == true) {
                      //     this.state.emailAvailable = emailTaken;
                      //     if (this.email.current)
                      //       this.email.current.inputElement.setCustomValidity("Questa email risulta già registrata");

                      //     if (this.form.current)
                      //       this.form.current.reportValidity();
                      //   } else if (this.email.current) {
                      //     this.email.current.inputElement.setCustomValidity("");
                      //   }
                      // });
                    }
                  }}
                />
              </TextField>
              <div>
                <i
                  className={
                    (this.emailChanged() ? "bg-turquoise" : "bg-gray-500") +
                    " p-2 rounded text-white far fa-save"
                  }
                  onClick={() => {
                    if (!this.emailField.current.checkValidity()) {
                      this.emailField.current.reportValidity();
                      return;
                    }
                    if (this.emailChanged()) {
                      let cnt = 0;
                      const modal = () =>
                        createModal(VerificationModal, {
                          description:
                            "A breve riceverai un'email contenente un codice. Inseriscilo qui",
                        })
                          .catch(() => null)
                          .then(verificationAPI.email)
                          .then(() =>
                            handleInfo(
                              "Il cambio dell'email è avvenuto correttamente!"
                            )
                          )
                          .then(() =>
                          this.setState({
                            copyState: {
                              ...this.state.copyState,
                              user: {
                                ...this.state.copyState.user,
                                email: this.state.user.email
                              }
                            },
                          })
                          )
                          .catch((e) => {
                            if (e === "dismiss") {
                              return;
                            } else if (cnt++ <= 3) {
                              modal();
                            } else {
                              handleError(
                                "Hai raggiunto il limite massimo di tentativi!"
                              );
                            }
                          });
                      createLoaderModal(
                        profileAPI.putEmail(this.state.user.email)
                      ).then(modal).catch(() => null);
                    }
                  }}
                ></i>
              </div>
            </form>
            <div>
              <button className="text-gray-500" onClick={this.deleteProfile}>
                Elimina il mio Profilo
              </button>
            </div>
            </div>
            :
            <div>
              <div className='flex justify-between flex-wrap md:flex-no-wrap'>
                <div className="p-3 md:mr-20 pr-20" style={{marginRight: '7rem'}}>
                  <span style={{color: '#a0aec0'}} >
                    Nome : &nbsp;
                  </span>
                    {this.state.user.firstName}
                </div>
                <div className="p-3 md:ml-25 pr-25" style={{paddingRight: '7rem'}}>
                  <span style={{color: '#a0aec0'}}>
                    Cognome : &nbsp;
                  </span>
                    {this.state.user.lastName}
                </div>
              </div>
              <div className="p-3">
                <span style={{color: '#a0aec0'}}>
                  Data di Nascita : &nbsp;
                </span>
                {this.state.user.birthDate}
              </div>
              <div className="p-3">
                <span style={{color: '#a0aec0'}}>
                  Provincia : &nbsp;
                </span>
                {optional(
                      this.state.user,
                      "province.name",
                      "Seleziona la Provincia"
                )}
              </div>
              <div className="p-3">
                <span style={{color: '#a0aec0'}}>
                  Comune : &nbsp;
                </span>
                {optional(
                      this.state.user,
                      "city.name",
                      "Seleziona il Comune"
                )}
              </div>
              <div className="p-3">
                <span style={{color: '#a0aec0'}}>
                        Numero di Cellulare : &nbsp;
                </span>
                {this.state.user.cellphone}
              </div>
              <div className="p-3">
                <span style={{color: '#a0aec0'}}>
                  Email : &nbsp;
                </span>
                {this.state.user.email}
              </div>
            </div>
          }
          </div>
        </div>
      </div>
    );
  }

  deleteProfile = () =>
    createModal(ConfirmationModal, {
      title: "Sei proprio sicuro di volerlo fare?",
    })
      .then(() => {
        userAPI.deleteUser(optional(this.props.user, "nickname"));
      })
      .then(() =>
        createModal(InfoModal, {
          title: "Il tuo account è stato disattivato",
          button: "OK",
        })
      )
      .then(() => {
        authAPI.logout();
      })
      .catch(() => null);

  readyToSubmit() {
    return (
      optional(this.state.user, "city.id") &&
      this.state.user.firstName &&
      this.state.user.lastName &&
      this.state.user.birthDate &&
      (optional(this.state.user, "city.id") !==
        optional(this.state.copyState.user, "city.id") ||
        this.state.user.firstName !== this.state.copyState.user.firstName ||
        this.state.user.lastName !== this.state.copyState.user.lastName ||
        this.state.user.birthDate !== this.state.copyState.user.birthDate)
    );
  }

  emailChanged() {
    return (
      this.state.user.email &&
      this.state.user.email !== this.state.copyState.user.email
    );
  }

  cellphoneChanged() {
    return (
      this.state.user.cellphone &&
      this.state.user.cellphone !== this.state.copyState.user.cellphone
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withRouter(PersonalInfo));
