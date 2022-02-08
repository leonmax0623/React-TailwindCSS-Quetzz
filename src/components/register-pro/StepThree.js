import React from "react";
import Component from "../../Component";
import TextField, { Input } from "@material/react-text-field";
import { handleTitle, defaultRequiredMessage, empty } from "../../helpers";
import moment from "moment";
var val;

export default class StepThree extends Component {
  state = {
    formOpen: false,
    editFormOpen: false,
    userEduIndex: -1,
    editObject: null,
    currentStudies: {},
    userEducationInfos: this.props.userEducationInfos || [],
  };
  form = React.createRef();

  updateCurrentStudies(key, value) {
    this.setState({
      currentStudies: {
        ...this.state.currentStudies,
        [key]: value,
      },
    });
  }

  updateEditEducation(key, value) {
    this.setState({
      editObject: {
        ...this.state.editObject,
        [key]: value,
      },
    });
  }

  field(label,  name, type = "text",  required, attributes, isEdit, ) {

    const onChange = (e) => {
      {
        let val = e.target.value;
        if (required === true && val == "" && type != "date" && name != "url") {
          e.target.setCustomValidity("Per favore compila questo campo");
        } else {
          e.target.setCustomValidity("");
        }
        isEdit
          ? this.updateEditEducation(name, val)
          : this.updateCurrentStudies(name, val);
      }
    }
    return (
      <TextField label={label}>
        <Input
          required={required}
          title={required ? defaultRequiredMessage: ""}
          autoComplete="nope" autoCorrect="off" spellCheck="off"
          type={type}
          value={
            isEdit
              ? this.state.editObject[name]
              : this.state.currentStudies[name]
          }
          onChange={onChange}
          {...attributes}
        />
      </TextField>
      
    );
  }

  studiesFormEdit() {
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
            className="bg-gray-100 cursor-pointer py-4 px-6 mb-8 text-lg"
            onClick={() => this.setState({ editFormOpen: false })}
          >
            <span className="flex-1 break-words">
              {[this.state.editObject.schoolOrUni, this.state.editObject.course]
                .filter(Boolean)
                .join(" - ")}
            </span>{" "}
            <i className="float-right leading-none fas fa-minus-circle fa-lg"></i>
          </p>
          {this.field(
            "Scuola o Università",
            "schoolOrUni",
            "text",
            true,
            {
              maxLength: 50,
            },
            true,
            "something"
          )}
          {this.field("Corso", "course", "text", true, { maxLength: 50 }, true, true)}
          {this.field(
            "Qualifica",
            "qualification",
            "text",
            true,
            {
              maxLength: 50,
            },
            true
          )}
          <label className="checkbox-container">
            Sto attualmente frequentando
            <input
              type="checkbox"
              onChange={(e) =>
                this.updateEditEducation("attending", e.target.checked)
              }
            />
            <span className="checkmark"></span>
          </label>
          <div className="flex">
            {this.field(
              "Data di inizio",
              "start",
              "date",
              true,
              {
                max: this.state.editObject.end || moment().format("YYYY-MM-DD"),
              },
              true
            )}
            {this.state.editObject.attending
              ? null
              : this.field(
                  "Data di fine",
                  "end",
                  "date",
                  true,
                  {
                    max: moment().format("YYYY-MM-DD"),
                    min: this.state.editObject.start,
                  },
                  true
                )}
          </div>

          {this.state.editObject.attending
              ? null
              : <TextField label="Punteggio">
                  <Input
                    type="number"
                    title={defaultRequiredMessage}
                    min={0}
                    max={110}
                    value={this.state.editObject.grade}
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    required
                    onInvalid={(e) => {
                      e.currentTarget.setCustomValidity("Inserisci un punteggio corretto compreso tra 0 e 110");
                    }}
                    onInput={(e) => {
                      e.currentTarget.setCustomValidity("");
                    }}
                    onChange={(e) => {
                      handleTitle(e)
                      val = parseInt(
                        e.currentTarget.value <= 110 ? e.currentTarget.value : val
                      );
                      this.updateEditEducation("grade", isNaN(val) ? "" : `${val}`);
                    }}
                  />
                </TextField>
          }
          {this.field(
            "Attività svolte o Materie studiate*",
            "description",
            "text",
            true,
            { maxLength: 400 },
            true
          )}
        </form>
        <button
          className="text-white bg-green-400 px-12 py-4 mt-8"
          onClick={() => {
            if (this.form.current.checkValidity()) {
              let temp = this.state.userEducationInfos;
              temp.splice(this.state.userEduIndex, 1, this.state.editObject);
              this.setState({
                editFormOpen: false,
                userEducationInfos: temp,
                editObject: { attending: false },
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

  studiesForm() {
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
            className="bg-gray-100 cursor-pointer py-4 px-6 mb-8 text-lg"
            onClick={() => this.setState({ formOpen: false })}
          >
            Aggiungi Studio
            <i className="float-right leading-none fas fa-minus-circle fa-lg"></i>
          </p>
          {this.field("Scuola o Università", "schoolOrUni", "text", true, {
            maxLength: 50,
          })}
          {this.field("Corso", "course", "text", true, { maxLength: 50 })}
          {this.field("Qualifica", "qualification", "text", { maxLength: 50 })}
          <label className="checkbox-container">
            Sto attualmente frequentando
            <input
              type="checkbox"
              onChange={(e) =>
                this.updateCurrentStudies("attending", e.target.checked)
              }
            />
            <span className="checkmark"></span>
          </label>
          <div className="flex">
            {this.field("Data di inizio", "start", "date", true, {
              max:
                this.state.currentStudies.end || moment().format("YYYY-MM-DD"),
            })}
            {this.state.currentStudies.attending
              ? null
              : this.field("Data di fine", "end", "date", true, {
                  max: moment().format("YYYY-MM-DD"),
                  min: this.state.currentStudies.start,
                })}
          </div>
          {this.state.currentStudies.attending
              ? null
              : <TextField label="Punteggio">
                  <Input
                    type="text"
                    min={0}
                    max={110}
                    value={this.state.currentStudies.grade}
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    required
                    title={defaultRequiredMessage}
                    onInvalid={(e) => {
                      e.currentTarget.setCustomValidity("Inserisci un punteggio corretto compreso tra 0 e 110");
                    }}
                    onInput={(e) => {
                      e.currentTarget.setCustomValidity("");
                    }}
                    onChange={(e) => {
                      handleTitle(e)
                      val = parseInt(
                        e.currentTarget.value <= 110 ? e.currentTarget.value : val
                      );
                      this.updateCurrentStudies("grade", isNaN(val) ? "" : `${val}`);
                    }}
                  />
                </TextField>
          }
          {this.field(
            "Attività svolte o Materie studiate",
            "description",
            "text",
            true,
            { maxLength: 400 }
          )}
        </form>
        <button
          className="text-white bg-green-400 px-12 py-4 mt-8"
          onClick={() => {
            if (this.form.current.checkValidity()) {
              this.setState({
                formOpen: false,
                userEducationInfos: [
                  ...this.state.userEducationInfos,
                  {
                    ...this.state.currentStudies,
                    grade: this.state.currentStudies.attending ? undefined : parseInt(this.state.currentStudies.grade),
                  },
                ],
                currentStudies: { attending: false },
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
    return this.state.editFormOpen == true ? (
      ""
    ) : (
      <div className="mb-8">
        <p
          className="text-turquoise bg-turquoise-100 cursor-pointer py-4 px-6 mb-8 text-lg"
          onClick={() => this.setState({ formOpen: true })}
        >
          Aggiungi Studio
          <i className="float-right leading-none fas fa-plus-circle fa-lg"></i>
        </p>
        <p className="text-gray-500">
          Ricordati che più il tuo profilo sarà completo, più possibilità avrai
          di essere scelto dagli utenti!
        </p>
      </div>
    );
  }

  studies() {
    return this.state.userEducationInfos.map((e, index) =>
      this.state.editFormOpen && this.state.userEduIndex == index ? (
        this.studiesFormEdit()
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
                userEduIndex: index,
                editObject: this.state.userEducationInfos[index],
              })
            }
          >
            {[e.schoolOrUni, e.course].filter(Boolean).join(" - ")}
          </span>
          <i
            className="float-right leading-none fas fa-trash-alt fa-lg"
            onClick={() =>
              this.setState({
                userEducationInfos: this.state.userEducationInfos.filter(
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
          <span>3 </span>
          <span className="text-gray-500">di </span>
          <span>6 </span>
        </p>
        {this.studies()}
        {this.state.formOpen ? this.studiesForm() : this.formOpenButton()}
        {this.state.formOpen || this.state.editFormOpen ? (
          ""
        ) : (
          <div className="flex">
            <button
              className="bg-turquoise p-6 text-white flex-1 mr-2"
              onClick={() =>
                this.props.onRetreat({
                  userEducationInfos: this.state.userEducationInfos,
                })
              }
            >
              Indietro
            </button>
            <button
              className={
                "p-6 text-white flex-1 " +
                (this.state.userEducationInfos.length > 0
                  ? "bg-turquoise"
                  : "bg-gray-500")
              }
              onClick={() => {
                if (this.state.userEducationInfos.length > 0) {
                  this.props.onAdvance({
                    userEducationInfos: this.state.userEducationInfos.filter(
                      (i) => !empty(i)
                    ),
                  });
                }
              }}
            >
              {this.state.userEducationInfos.length > 0
                ? "Continua"
                : "Aggiungi uno studio"}
            </button>
          </div>
        )}
      </div>
    );
  }
}
