import React from "react";
import Component from "../../Component";
import TextField, { Input } from "@material/react-text-field";
import { handleTitle, defaultRequiredMessage, empty } from "../../helpers";
import moment from "moment";

var val;

export default class StepFour extends Component {
  state = {
    formOpen: false,
    editFormOpen: false,
    userCertIndex: -1,
    editObject: null,
    currentLicenses: {},
    userCertificationInfos: this.props.userCertificationInfos || [],
  };
  form = React.createRef();

  updateCurrentLicenses(key, value) {
    this.setState({
      currentLicenses: {
        ...this.state.currentLicenses,
        [key]: value,
      },
    });
  }

  updateEditCertification(key, value) {
    this.setState({
      editObject: {
        ...this.state.editObject,
        [key]: value,
      },
    });
  }

  field(label, name, type = "text", required = true, attributes, isEdit) {
    return (
      <TextField label={label}>
        <Input
          title={required ? defaultRequiredMessage: ""}
          required={required}
          autoComplete="nope" autoCorrect="off" spellCheck="off"
          type={type}
          value={
            isEdit
              ? this.state.editObject[name]
              : this.state.currentLicenses[name]
          }
          onChange={(e) => {
            let val = e.target.value;
            if (val == "" && type != "date" && name != "url") {
              e.target.setCustomValidity("Per favore compila questo campo");
            } else {
              e.target.setCustomValidity("");
            }
            isEdit
              ? this.updateEditCertification(name, val)
              : this.updateCurrentLicenses(name, val);
          }}
          {...attributes}
        />
      </TextField>
    );
  }

  editLicensesForm() {
    return (
      <div className="mb-8">
        <form
          autoComplete="nope" autoCorrect="off" spellCheck="off"
          ref={this.form}
          onInvalid={(e) => {
            let val = e.target.value;
            if (val == "") {
              e.target.setCustomValidity("Per favore compila questo campo");
            } else {
              e.target.setCustomValidity("");
            }
          }}
        >
          <p
            className="bg-gray-100 cursor-pointer py-4 px-4 mb-8 text-lg"
            onClick={() => this.setState({ editFormOpen: false })}
          >
            <span className="break-words flex-1">
              {[
                this.state.editObject.qualification,
                this.state.editObject.organization,
              ]
                .filter(Boolean)
                .join(" - ")}
            </span>
            <i className="float-right leading-none fas fa-minus-circle fa-lg"></i>
          </p>
          {this.field(
            "Licenza o Certificazione",
            "qualification",
            "text",
            true,
            {
              maxLength: 50,
            },
            true
          )}
          {this.field(
            "Istituto Emittente",
            "organization",
            "text",
            true,
            {
              maxLength: 50,
            },
            true
          )}
          <div className="flex">
            {this.field(
              "Data rilascio",
              "date",
              "date",
              true,
              {
                max:
                  this.state.editObject.expiration ||
                  moment().format("YYYY-MM-DD"),
              },
              true
            )}
            {this.field(
              "Data scadenza",
              "expiration",
              "date",
              false,
              {
                min: this.state.editObject.date,
              },
              true
            )}
          </div>
          <TextField label="Id o Codice (opzionale)">
            <Input
              type="text"
              title={defaultRequiredMessage}
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              min={0}
              maxLength={10}
              value={
                this.state.editObject.identifier
                  ? this.state.editObject.identifier
                  : ""
              }
              onChange={(e) => {
                handleTitle(e)
                val = parseInt(
                  e.currentTarget.value < 2147483648
                    ? e.currentTarget.value
                    : val
                );
                this.updateEditCertification(
                  "identifier",
                  isNaN(val) ? "" : `${val}`
                );
              }}
            />
          </TextField>
        </form>
        <button
          className="text-white bg-green-400 px-12 py-4 mt-8"
          onClick={() => {
            if (this.form.current.checkValidity()) {
              let temp = this.state.userCertificationInfos;
              temp.splice(this.state.userCertIndex, 1, this.state.editObject);
              this.setState({
                editFormOpen: false,
                userCertificationInfos: temp,
                editObject: {},
              });
            } else {
              this.form.current.reportValidity();
            }
          }}
        >
          Conferma
        </button>
      </div>
    );
  }

  licensesForm() {
    return (
      <div className="mb-8">
        <form
          autoComplete="nope" autoCorrect="off" spellCheck="off"
          ref={this.form}
          onInvalid={(e) => {
            let val = e.target.value;
            if (val == "") {
              e.target.setCustomValidity("Per favore compila questo campo");
            } else {
              e.target.setCustomValidity("");
            }
          }}
        >
          <p
            className="bg-gray-100 cursor-pointer py-4 px-4 mb-8 text-lg"
            onClick={() => this.setState({ formOpen: false })}
          >
            Aggiungi Licenze e Certificazioni
            <i className="float-right leading-none fas fa-minus-circle fa-lg"></i>
          </p>
          {this.field(
            "Licenza o Certificazione",
            "qualification",
            "text",
            true,
            { maxLength: 50 }
          )}
          {this.field("Istituto Emittente", "organization", "text", true, {
            maxLength: 50,
          })}
          <div className="flex">
            {this.field("Data rilascio", "date", "date", true, {
              max:
                this.state.currentLicenses.expiration ||
                moment().format("YYYY-MM-DD"),
            })}
            {this.field("Data scadenza", "expiration", "date", false, {
              min: this.state.currentLicenses.date,
            })}
          </div>
          <TextField label="Id o Codice (opzionale)">
            <Input
              type="text"
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              min={0}
              maxLength={10}
              value={this.state.currentLicenses.identifier}
              onChange={(e) => {
                val = parseInt(
                  e.currentTarget.value < 2147483648
                    ? e.currentTarget.value
                    : val
                );
                this.updateCurrentLicenses(
                  "identifier",
                  isNaN(val) ? "" : `${val}`
                );
              }}
            />
          </TextField>
        </form>
        <button
          className="text-white bg-green-400 px-12 py-4 mt-8"
          onClick={() => {
            if (this.form.current.checkValidity()) {
              this.setState({
                formOpen: false,
                userCertificationInfos: [
                  ...this.state.userCertificationInfos,
                  {
                    ...this.state.currentLicenses,
                    identifier: parseInt(this.state.currentLicenses.identifier),
                  },
                ],
                currentLicenses: {},
              });
            } else {
              this.form.current.reportValidity();
            }
          }}
        >
          Conferma
        </button>
      </div>
    );
  }

  formOpenButton() {
    return (
      <div className="mb-8">
        <p
          className="text-turquoise bg-turquoise-100 cursor-pointer py-4 px-4 mb-8 text-lg"
          onClick={() => this.setState({ formOpen: true })}
        >
          Aggiungi Licenze e Certificazioni
          <i className="float-right leading-none fas fa-plus-circle fa-lg"></i>
        </p>
        <p className="text-gray-500">
          Ricordati che più il tuo profilo sarà completo, più possibilità avrai
          di essere scelto dagli utenti!
        </p>
      </div>
    );
  }

  licenses() {
    return this.state.userCertificationInfos.map((e, index) =>
      this.state.editFormOpen && this.state.userCertIndex == index ? (
        this.editLicensesForm()
      ) : (
        <p
          key={index}
          className="flex text-white bg-turquoise cursor-pointer py-4 px-8 mb-8 text-lg"
        >
          <span
            className="truncate flex-1"
            onClick={() =>
              this.setState({
                editFormOpen: true,
                userCertIndex: index,
                editObject: this.state.userCertificationInfos[index],
              })
            }
          >
            {[e.qualification, e.organization].filter(Boolean).join(" - ")}
          </span>
          <i
            className="float-right leading-none fas fa-trash-alt fa-lg"
            onClick={() =>
              this.setState({
                userCertificationInfos: this.state.userCertificationInfos.filter(
                  (_, i) => i !== index
                ),
              })
            }
          ></i>
        </p>
      )
    );
  }

  render() {
    return (
      <div className="narrow-modal md:my-32">
        <h1 className="text-3xl text-black text-raleway font-bold">
          Profilo Professionista
        </h1>
        <p>
          <span className="text-gray-500">Passaggio </span>
          <span>4 </span>
          <span className="text-gray-500">di </span>
          <span>6 </span>
        </p>
        {this.licenses()}
        {this.state.formOpen ? this.licensesForm() : this.formOpenButton()}
        {this.state.formOpen ? null : (
          <div className="flex">
            <button
              className="bg-turquoise p-6 text-white flex-1 mr-2"
              onClick={() =>
                this.props.onRetreat({
                  userCertificationInfos: this.state.userCertificationInfos.filter(
                    (i) => !empty(i)
                  ),
                })
              }
            >
              Indietro
            </button>
            <button
              className="bg-turquoise p-6 text-white flex-1"
              onClick={() =>
                this.props.onAdvance({
                  userCertificationInfos: this.state.userCertificationInfos,
                })
              }
            >
              Continua
            </button>
          </div>
        )}
      </div>
    );
  }
}
