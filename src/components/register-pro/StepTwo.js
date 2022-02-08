import React from "react";
import Component from "../../Component";
import TextField, { Input } from "@material/react-text-field";
import { handleTitle, defaultRequiredMessage, empty } from "../../helpers";
import moment from "moment";

export default class StepTwo extends Component {
  state = {
    formOpen: false,
    editFormOpen: false,
    userExpIndex: -1,
    editObject: null,
    currentExperience: {},
    userExperienceInfos: this.props.userExperienceInfos || [],
  };
  form = React.createRef();

  componentDidMount() {
    super.componentDidMount();
  }

  updateCurrentExperience(key, value) {
    this.setState({
      currentExperience: {
        ...this.state.currentExperience,
        [key]: value,
      },
    });
  }

  updateEditExperience(key, value) {
    this.setState({
      editObject: {
        ...this.state.editObject,
        [key]: value,
      },
    });
  }

  field(label, name, type = "text", attributes, isEdit) {
    return (
      <TextField label={label}>
        <Input
          required
          title={defaultRequiredMessage}
          autoComplete="nope" autoCorrect="off" spellCheck="off"
          type={type}
          value={
            isEdit
              ? this.state.editObject[name]
              : this.state.currentExperience[name]
          }
          onChange={(e) => {
            handleTitle(e)
            let val = e.target.value;
            if (val == "" && e.target.type != "date") {
              e.target.setCustomValidity("Per favore compila questo campo");
            } else if (e.target.type == "date") {
              let currentDate = new Date(Date.parse(val));
              let endDate = new Date(
                Date.parse(this.state.currentExperience["end"])
              );

              if (currentDate >= endDate) {
                e.target.setCustomValidity(
                  "Errore, la data di fine deve essere inferiore"
                );
              } else {
                e.target.setCustomValidity("");
              }
              e.target.setCustomValidity(
                "Per favore inserisci una data valida"
              );
            } else {
              e.target.setCustomValidity("");
            }
            isEdit
              ? this.updateEditExperience(name, val)
              : this.updateCurrentExperience(name, val);
          }}
          {...attributes}
        />
      </TextField>
    );
  }

  experienceFormEdit() {
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
            <span className="break-words flex-1">
              {[this.state.editObject.qualification, this.state.editObject.firm]
                .filter(Boolean)
                .join(" - ")}
            </span>
            <i className="float-right leading-none fas fa-minus-circle fa-lg"></i>
          </p>
          {this.field("Azienda", "firm", "text", { maxLength: 50 }, true)}
          {this.field("Città", "city", "text", { maxLength: 150 }, true)}
          {this.field(
            "Posizione ricoperta",
            "qualification",
            "text",
            {
              maxLength: 50,
            },
            true
          )}
          {this.field("Settore", "sector", "text", { maxLength: 50 }, true)}
          <label className="checkbox-container">
            La sto attualmente ricoprendo
            <input
              type="checkbox"
              onChange={(e) =>
                this.updateEditExperience("currentPosition", e.target.checked)
              }
            />
            <span className="checkmark"></span>
          </label>
          <div className="flex">
            {this.field(
              "Data di Inizio",
              "start",
              "date",
              {
                max: this.state.editObject.end || moment().format("YYYY-MM-DD"),
              },
              true
            )}
            {this.state.editObject.currentPosition
              ? ""
              : this.field("Data di Fine", "end", "date", {
                  max: moment().format("YYYY-MM-DD"),
                  min: this.state.editObject.start,
                })}
          </div>
          {this.field(
            "Descrizione",
            "description",
            "text",
            { maxLength: 400 },
            true
          )}
        </form>
        <button
          className="text-white bg-green-400 px-12 py-4 mt-8"
          onClick={() => {
            if (this.form.current.checkValidity()) {
              let temp = this.state.userExperienceInfos;
              temp.splice(this.state.userExpIndex, 1, this.state.editObject);
              this.setState({
                editFormOpen: false,
                userExperienceInfos: temp,
                userExpIndex: -1,
                editObject: { currentPosition: false },
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

  experienceForm() {
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
            Aggiungi Esperienza lavorativa
            <i className="float-right leading-none fas fa-minus-circle fa-lg"></i>
          </p>
          {this.field("Azienda", "firm", "text", { maxLength: 50 })}
          {this.field("Città", "city", "text", { maxLength: 150 })}
          {this.field("Posizione ricoperta", "qualification", "text", {
            maxLength: 50,
          })}
          {this.field("Settore", "sector", "text", { maxLength: 50 })}
          <label className="checkbox-container">
            La sto attualmente ricoprendo
            <input
              type="checkbox"
              onChange={(e) =>
                this.updateCurrentExperience(
                  "currentPosition",
                  e.target.checked
                )
              }
            />
            <span className="checkmark"></span>
          </label>
          <div className="flex">
            {this.field("Data di Inizio", "start", "date", {
              max:
                this.state.currentExperience.end ||
                moment().format("YYYY-MM-DD"),
            })}
            {this.state.currentExperience.currentPosition
              ? null
              : this.field("Data di Fine", "end", "date", {
                  max: moment().format("YYYY-MM-DD"),
                  min: this.state.currentExperience.start,
                })}
          </div>
          {this.field("Descrizione", "description", "text", { maxLength: 400 })}
        </form>
        <button
          className="text-white bg-green-400 px-12 py-4 mt-8"
          onClick={() => {
            if (this.form.current.checkValidity()) {
              this.setState({
                formOpen: false,
                userExperienceInfos: [
                  ...this.state.userExperienceInfos,
                  this.state.currentExperience,
                ],
                currentExperience: { currentPosition: false },
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
          Aggiungi Esperienza lavorativa
          <i className="float-right leading-none fas fa-plus-circle fa-lg"></i>
        </p>
        <p className="text-gray-500">
          Ricordati che più il tuo profilo sarà completo, più possibilità avrai
          di essere scelto dagli utenti!
        </p>
      </div>
    );
  }

  experiences() {
    return this.state.userExperienceInfos.map((userExpInfo, index) =>
      this.state.editFormOpen && this.state.userExpIndex == index ? (
        this.experienceFormEdit()
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
                userExpIndex: index,
                editObject: this.state.userExperienceInfos[index],
              })
            }
          >
            {[userExpInfo.qualification, userExpInfo.firm]
              .filter(Boolean)
              .join(" - ")}
          </span>
          <i
            className="float-right leading-none fas fa-trash-alt fa-lg"
            onClick={() =>
              this.setState({
                userExperienceInfos: this.state.userExperienceInfos.filter(
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
          <span>2 </span>
          <span className="text-gray-500">di </span>
          <span>6 </span>
        </p>
        {this.experiences()}
        {this.state.formOpen ? this.experienceForm() : this.formOpenButton()}
        {this.state.formOpen || this.state.editFormOpen ? (
          ""
        ) : (
          <div className="flex">
            <button
              className="bg-turquoise p-6 text-white flex-1 mr-2"
              onClick={() =>
                this.props.onRetreat({
                  userExperienceInfos: this.state.userExperienceInfos,
                })
              }
            >
              Indietro
            </button>
            <button
              className={
                "p-6 text-white flex-1 " +
                (this.state.userExperienceInfos.length > 0
                  ? "bg-turquoise"
                  : "bg-gray-500")
              }
              onClick={() => {
                if (this.state.userExperienceInfos.length > 0) {
                  this.props.onAdvance({
                    userExperienceInfos: this.state.userExperienceInfos.filter(
                      (i) => !empty(i)
                    ),
                  });
                }
              }}
            >
              {this.state.userExperienceInfos.length > 0
                ? "Continua"
                : "Aggiungi un'esperienza"}
            </button>
          </div>
        )}
      </div>
    );
  }
}
