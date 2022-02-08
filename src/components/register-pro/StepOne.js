import React from "react";
import Component from "../../Component";
import TextField, { Input } from "@material/react-text-field";
import DropdownMenu from "../util/DropdownMenu";
import languages from "../../languages";
import {
  handleTitle,
  defaultRequiredMessage,
  handleError,
  underUploadThreshold,
  empty,
  optional,
} from "../../helpers";
import Avatar from "../util/Avatar";
import { cdnAPI } from "../../resources/cdn";

export default class StepOne extends Component {
  state = {
    profession: this.props.profession,
    knownLanguages: (this.props.knownLanguages || [null]).map((l) => ({
      name: l,
      id: l,
    })),
    photo: this.props.photo || {},
    uploading: false,
  };
  form = React.createRef();
  uploadButton = React.createRef();

  loadImage = (e) => {
    const photoBlob = e.target.files[0];
    if (photoBlob) {
      if (!underUploadThreshold(photoBlob)) {
        return handleError("Maximum size exceeded!");
      }
      this.setState({ uploading: true });
      cdnAPI.upload(photoBlob).then((photoKey) => {
        this.setState({
          photo: { url: `${this.props.config.cdnBasePath}${photoKey.keyName}` },
        });
        this.setState({ uploading: false });
      });
      e.target.value = "";
    }
  };

  languages() {
    const usedLanguages = this.state.knownLanguages.map(
      (l) => (l || { id: null }).id
    );
    return this.state.knownLanguages.map((language, i) => (
      <div className="flex items-center">
        <DropdownMenu
          required
          value={
            optional(language, "id")
              ? language
              : { id: 0, name: "Seleziona una lingua" }
          }
          items={languages
            .filter((l) => !usedLanguages.includes(l))
            .map((l) => ({ id: l, name: l }))}
          onSelect={(item) => this.setNestedState(`knownLanguages.${i}`, item)}
          className="mt-10 pb-4 mb-4 mr-4 border-b pl-4 flex-1"
          fullWidth
          listClassName="max-w-full"
        />
        {i > 0 ? (
          <i
            className="fas fa-trash-alt cursor-pointer"
            onClick={() =>
              this.setState({
                knownLanguages: [
                  ...this.state.knownLanguages.slice(0, i),
                  ...this.state.knownLanguages.slice(i + 1),
                ],
              })
            }
          />
        ) : null}
      </div>
    ));
  }

  render() {
    return (
      <div className="narrow-modal md:my-32">
        <h1 className="text-3xl text-black text-raleway font-bold">
          Profilo Professionista
        </h1>
        <p>
          <span className="text-gray-500">Passaggio </span>
          <span>1 </span>
          <span className="text-gray-500">di </span>
          <span>6 </span>
        </p>
        <form
          autoComplete="nope" autoCorrect="off" spellCheck="off"
          ref={this.form}
          className="my-8"
          onInvalid={(e) => {
            let val = e.target.value;
            if (val == "" && e.target.type != "date") {
              e.target.setCustomValidity("Per favore compila questo campo");
            } else {
              e.target.setCustomValidity("");
            }
          }}
        >
          <div className="relative">
            <Avatar
              className="block mx-auto"
              size={10}
              user={this.state}
              fallback="/img/avatar.png"
            />
            <input
              className="absolute inset-0"
              type="file"
              accept=".jpg,.jpeg,.png,.gif,.svg"
              onChange={this.loadImage}
              ref={this.uploadButton}
              style={{ zIndex: -1 }}
            />
          </div>
          <button
            type="button"
            className="mx-auto block mt-8 font-bold text-turquoise text-lg"
            onClick={() => this.uploadButton.current.click()}
          >
            Carica
          </button>
          <p className="text-gray-500 text-center">(Dimensioni massime: 5MB)*</p>
          <TextField label="Professione">
            <Input
              required
              title={defaultRequiredMessage}
              maxLength={50}
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              type="text"
              value={this.state.profession}
              onChange={(e) => {
                handleTitle(e)
                let val = e.target.value;
                if (val == "" && e.target.type != "date") {
                  e.target.setCustomValidity("Per favore compila questo campo");
                } else {
                  e.target.setCustomValidity("");
                }
                this.setState({ profession: e.currentTarget.value });
              }}
            />
          </TextField>
          {this.languages()}
          <p
            className="text-turquoise bg-turquoise-100 cursor-pointer py-4 px-6 mb-8 text-lg"
            hidden={this.state.knownLanguages[this.state.knownLanguages.length-1]?.name == null &&
              this.state.knownLanguages[this.state.knownLanguages.length-1]?.id == null}
            onClick={() =>
              this.setState({
                knownLanguages: this.state.knownLanguages.concat(null),
              })
            }
          >
            Aggiungi un'altra lingua
            <i className="float-right leading-none fas fa-plus-circle fa-lg"></i>
          </p>
        </form>
        <button
          disabled={this.state.uploading}
          className={
            (this.ready() && !this.state.uploading
              ? "bg-turquoise"
              : "bg-gray-500") + " p-6 text-white w-full"
          }
          onClick={() => {
            this.uploadButton.current.setCustomValidity(
              !empty(this.state.photo) ? "" : "Per favore inserisci una foto"
            );
            if (this.form.current.checkValidity()) {
              this.props.onAdvance({
                profession: this.state.profession,
                knownLanguages: this.state.knownLanguages
                  .filter((l) => l)
                  .map((l) => l.name),
                photo: this.state.photo,
              });
            } else {
              this.form.current.reportValidity();
            }
          }}
        >
          {!this.state.uploading ? (
            "Continua"
          ) : (
            <i className="fas fa-spinner fa-pulse"></i>
          )}
        </button>
      </div>
    );
  }

  ready() {
    return (
      !!this.state.profession &&
      !!this.state.knownLanguages.filter((l) => optional(l, "id", 0) !== 0)
        .length > 0 &&
      !!optional(this.state.photo, "url")
    );
  }
}
