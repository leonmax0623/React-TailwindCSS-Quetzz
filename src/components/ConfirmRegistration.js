import React from "react";
import Component from "../Component";
import TextField, { Input } from "@material/react-text-field";
import { verificationAPI } from "../resources/verification";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { handleTitle, defaultRequiredMessage, createModal, handleError, handleInfo, optional, PREREGISTRATION_MODE } from "../helpers";
import { profileAPI } from "../resources/profile";
import InfoModal from "./util/modals/InfoModal";
import { objectFromParams } from "../resources/util";
import { userAPI } from "../resources/users";
import { setUser } from "../actions/userAction";
import store from "../store";

class ConfirmRegistration extends Component {
  state = {
    code: "",
    loading: false,
    resending: false,
    token: null,
    sms: false,
    email: false,
    registrationInProgress: false,
    counter: 0,
    congrats: false,
    congratsCall: false,
  };

  form = React.createRef();

  redirect(url) {
    this.props.history.push(url);
  }

  componentDidMount() {
    super.componentDidMount();

    const params = objectFromParams(window.location.search);
    this.setState({
      sms: this.props.user.verificationStatusDto.cellphone,
      email: this.props.user.verificationStatusDto.email,
      registrationInProgress: optional(params, "registration", false),
      counter: 0,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.state.sms && !this.state.email && this.state.counter == 0) {
      userAPI.me().then((data) => {
        this.setState({
          email: data.verificationStatusDto.email,
          counter: 1,
        });
      });
    }

    if (this.state.sms && !this.state.congratsCall) {
      this.props.setUser({
        verificationStatusDto: {
          ...{
            email: this.state.email,
            cellphone: this.state.sms,
            policy: this.props.user.verificationStatusDto.policy,
          },
        },
      });
      return this.setState({ congratsCall: true });
    }
  }

  render() {
    if (!this.state.sms) {
      return this.sms();
    } else if (!this.state.email) {
      return this.email();
    } else if (PREREGISTRATION_MODE) {
      return this.preregistrationConfirmed();
    } else if (!this.state.congrats) {
      return this.confirmed();
    } else {
      this.props.history.push("/");
      return "";
    }
  }

  email() {
    return (
      <div className="narrow-modal md:my-32">
        <h1 className="text-3xl text-black text-raleway font-bold">
          {this.state.registrationInProgress
            ? "Grande! Il tuo account è stato creato!"
            : "Attiva il tuo account"}
        </h1>
        {!this.state.registrationInProgress && (
          <p className="my-8">
            Ciao <strong>{this.props.user.fullname}</strong>,
          </p>
        )}
        {this.state.registrationInProgress ? (
          <>
            <p className="my-8">
              Adesso ci resta solo da verificare il tuo indirizzo di posta
              elettronica.
            </p>
            <p className="my-8">
              Clicca sul link che hai ricevuto via mail o inserisci il codice
              manualmente qui sotto per attivare il tuo account!
            </p>
          </>
        ) : (
          <>
            <p className="my-8">
              Abbiamo notato che non hai ancora attivato il tuo account!
            </p>
            <p className="my-8">
              Clicca il link di attivazione ricevuto via e-mail o inserisci il
              codice manualmente qui sotto.
            </p>
          </>
        )}
        <form ref={this.form} className="my-8 flex items-center">
          <TextField
            label="Codice di conferma"
            autoComplete="nope" autoCorrect="off" spellCheck="off"
            className="flex-1 mr-8"
            leadingIcon={<i className="far fa-check-circle"></i>}
          >
            <Input
              type="text"
              title={defaultRequiredMessage}
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              value={this.state.code}
              maxLength={6}
              onChange={(e) => {
                handleTitle(e)
                let val = parseInt(e.currentTarget.value);
                this.setState({
                  code: isNaN(val) ? "" : val,
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  this.confirmEmail();
                }
              }}
            />
          </TextField>
          {this.refreshEmailButton()}
        </form>
        <div className="flex">
          <button
            className={`p-6 text-white flex-1 ${
              this.readyForNextStep() && this.state.code.toString().length == 6 ? "bg-turquoise" : "bg-gray-500"
            }`}
            disabled={this.state.code.toString().length != 6}
            onClick={this.confirmEmail}
          >
            Continua
          </button>
        </div>
      </div>
    );
  }

  readyForNextStep() {
    return this.state.code && !this.state.loading;
  }

  refreshEmailButton() {
    if (this.state.resending) {
      return <i className="fas text-gray-500 fa-spinner fa-pulse"></i>;
    }
    return (
      <div className="text-center">
        <p className="text-turquoise text-9">
          Il codice non <br /> è arrivato?
        </p>
        <i
          className="fas text-gray-500 fa-sync-alt cursor-pointer"
          onClick={() => {
            this.setState({ resending: true });
            verificationAPI
              .resendEmail()
              .then(() => handleInfo('Email inviata con successo!'))
              .catch(() => handleError('Oops! Hai effettuato troppe richieste! Se non hai ricevuto nessuna email contattaci per ricevere assistenza.'))
              .then(() => this.setState({ resending: false }));
          }}
        ></i>
      </div>
    );
  }

  confirmEmail = () => {
    if (this.state.loading || (this.state.code.toString().length != 6)) {
      return;
    }
    this.setState({ loading: true });
    verificationAPI
      .email(this.state.code)
      .then(() => window.location.reload())
      .catch((err) => {
        if (err == 'Too Many Requests') {
          handleError('Oops! Hai fatto troppi tentativi ed il codice non è più valido! \nRichiedine uno nuovo cliccando l\'apposito bottone!');
        } else {
          handleError('Oops! Sembra che tu abbia inserito un codice sbagliato!');
        }
      })
      .then(() => this.setState({ 
        loading: false,
        code: ""
      }));
  };

  refreshSmsButton() {
    if (this.state.resending) {
      return <i className="fas text-gray-500 fa-spinner fa-pulse"></i>;
    }
    return (
      <div className="text-center">
        <p className="text-turquoise text-9">
          Il codice non <br /> è arrivato?
        </p>
        <i
          className="fas text-gray-500 fa-sync-alt cursor-pointer"
          onClick={() => {
            this.setState({ resending: true });
            verificationAPI
              .resendSms()
              .then(() => handleInfo('Messaggio inviato con successo!'))
              .catch(() => handleError('Oops! Hai effettuato troppe richieste! Se non hai ricevuto alcun sms contattaci per ricevere assistenza.'))
              .then(() => {
                this.setState({ resending: false });
              });
          }}
        ></i>
      </div>
    );
  }

  sms() {
    return (
      <div className="narrow-modal md:my-32">
        <h1 className="text-3xl text-black text-raleway font-bold">
          Crea il tuo Account
        </h1>
        <p>
          <span className="text-gray-500">Passaggio </span>
          <span>4 </span>
          <span className="text-gray-500">di </span>
          <span>4 </span>
        </p>
        <form ref={this.form} className="my-8 flex items-center">
          <TextField
            label="Codice di conferma"
            autoComplete="nope" autoCorrect="off" spellCheck="off"
            className="flex-1 mr-8"
            leadingIcon={<i className="far fa-check-circle"></i>}
          >
            <Input
              type="text"
              title={defaultRequiredMessage}
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              value={this.state.code}
              maxLength={6}
              onChange={(e) => {
                handleTitle(e)
                let val = parseInt(e.currentTarget.value);
                this.setState({
                  code: isNaN(val) ? "" : val,
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  this.confirmSms();
                }
              }}
            />
          </TextField>
          {this.refreshSmsButton()}
        </form>
        <p className="my-8 text-gray-500">
          Ti abbiamo inviato un SMS <i className="far fa-comment"></i>{" "}
          contenente il codice.
        </p>
        <p className="my-8 text-gray-500">
          La nostra priorità è garantire un servizio di qualità, perciò
          verifichiamo l'autenticità delle informazioni che riceviamo.
        </p>
        <div className="flex">
          <button
            className={`p-6 text-white flex-1 ${
              this.readyForNextStep() && this.state.code.toString().length == 6 ? "bg-turquoise" : "bg-gray-500"
            }`}
            disabled={this.state.code.toString().length != 6}
            onClick={this.confirmSms}
          >
            Continua
          </button>
        </div>
      </div>
    );
  }

  confirmSms = () => {
    if (this.state.loading || (this.state.code.toString().length != 6)) {
      return;
    }
    this.setState({ loading: true });
    verificationAPI
      .sms(this.state.code)
      .then(() => {
        this.setState({ sms: true });
        profileAPI.getReferralToken().then((token) => this.setState({ token }));
      })
      .then(() =>
        userAPI
          .me()
          .then((data) =>
            this.setState({ email: data.verificationStatusDto.email })
          )
      )
      .catch((err) => {
        if (err == 'Too Many Requests') {
          handleError('Oops! Hai fatto troppi tentativi ed il codice non è più valido! \nRichiedine uno nuovo cliccando l\'apposito bottone!');
        } else {
          handleError('Oops! Sembra che tu abbia inserito un codice sbagliato!');
        }
      })
      .then(
        this.setState({
          loading: false,
          code: "",
        })
      );
  };

  readyForNextStep() {
    return this.state.code && !this.state.loading;
  }

  preregistrationConfirmed() {
    return (
      <div
        className="flex px-8 pt-8 mx-auto flex-wrap md:flex-no-wrap"
        style={{ maxWidth: "1100px" }}
      >
        <div className="text-18 w-full text-center md:text-left md:w-auto">
          <p className="text-60">
            GRAZIE!
            <span className="text-green-500 ml-2">✓</span>
          </p>
          <img
            src="/img/Appreciation.gif"
            className="mx-auto mobile"
            style={{ height: "150px" }}
          />
          <p>La tua registrazione ci ha reso</p>
          <p className="text-23 mb-8">persone felici.</p>
          <p>Leggi le brevi istruzioni per trarre</p>
          <p>il meglio da Quetzz e preparati per</p>
          <p>
            il
            <span className="text-23 ml-2">grande lancio</span>, che avverrà
          </p>
          <p className="mb-8">
            il
            <span className="text-23 ml-2">22 marzo 2021.</span>
          </p>
          <img
            src="/img/rocket.png"
            style={{ height: "180px" }}
            className="mx-auto"
          />
          {!this.isMobile() && this.social()}
        </div>
        <img
          style={{ height: "50vw", maxHeight: "570px" }}
          className="mt-auto mx-16 desktop"
          src="/img/Happy-G.png"
        />
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-8 md:ml-8">
            <p className="font-bold text-18 mb-4">
              1. ECCO IL TUO LINK D'INVITO!
            </p>
            <p className="text-white bg-turquoise italic text-center mb-4">{`${window.location.protocol}//${window.location.host}?code=${this.state.token}`}</p>
            <p className="italic">
              Invialo ai tuoi amici per farli registrare a Quetzz!
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 mb-8 md:ml-8">
            <p className="font-bold text-18 mb-4">2. CREA LA TUA RETE</p>
            <p className="italic">Approfittane ora che siamo agli inizi!</p>
            <p className="italic">
              Più amici inviterai, più soddisfazioni avrai!
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 mb-8">
            <p className="font-bold text-18 mb-4">3. RESTA SINTONIZZATO</p>
            <p className="italic">
              A breve riceverai una e-mail di riepilogo contenente il tuo link
              di invito, inoltre, avrai accesso a una serie di video che ti
              permetteranno di approfondire gli aspetti di Quetzz che più ti
              interessano!
            </p>
          </div>
          {this.isMobile() && this.social()}
        </div>
      </div>
    );
  }

  social() {
    return (
      <>
        <p>Nel frattempo, perché non seguirci</p>
        <p className="mb-8">sui social?</p>
        <div className="flex justify-center mb-8">
          <a href="https://www.facebook.com/quetzzitalia" target="_blank">
            <img className="h-12 mr-8" src="/img/facebook.png" />
          </a>
          <a href="https://www.instagram.com/quetzzitalia/" target="_blank">
            <img className="h-12 mr-8" src="/img/instagram.png" />
          </a>
          <a href="https://www.linkedin.com/company/quetzz" target="_blank">
            <img className="h-12 mr-8" src="/img/linkedin.png" />
          </a>
        </div>
      </>
    );
  }

  confirmed() {
    return (
      <div>
        <div className="narrow-modal md:mb-16 md:mt-32">
          <i className="block text-center far fa-check-circle fa-4x pr-7 pb-8 pl-4 pt-4 text-turquoise font-bold"></i>
          <div className="flex-1">
            <div className="mb-4">
              <h1 className="text-center text-20 md:text-28 text-black text-raleway font-bold mb-4">
                Congratulazioni!
              </h1>
              <p className="text-gray-500 text-center">
                Il tuo Account è stato attivato con successo!
              </p>
            </div>
            <p className="text-center mb-4">
              Crea subito la tua
              <button
                className="text-turquoise font-bold mx-1"
                onClick={() => this.redirect("/new")}
              >
              richiesta
              </button>
              !
            </p>
            <p className="text-center">
              Vuoi aggiornare le tue informazioni personali? Vai subito al tuo
              <button
                className="text-turquoise font-bold ml-1"
                onClick={() =>
                  this.redirect(`/user-profile/${this.props.user.id}`)
                }
              >
                Profilo
              </button>
              !
            </p>
          </div>
        </div>
        <div style={{ maxWidth: "350px" }} className="border-b mx-auto"></div>
        <div className="text-center md:text-left narrow-modal md:mt-16 md:mb-32">
          <h1 className="text-20 md:text-28 text-black text-raleway font-bold mb-4">
            Diventa un professionista!
          </h1>
          <p className="mb-10">
            Ti interessa diventare un Professionista? Inizia subito a creare il
            tuo Profilo!
          </p>
          <Link
            to="/register-pro"
            className="bg-turquoise p-6 text-white w-full block text-center"
          >
            Continua
          </Link>
        </div>
      </div>
    );
  }

  afterPreregistration() {
    createModal(InfoModal, {
      button: "Ho capito!",
      title: "Email inviata!",
      body:
        'Controlla che non sia finita nella casella dello spam o delle "promozioni" (se usi gmail)',
    });
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { setUser })(
  withRouter(ConfirmRegistration)
);
