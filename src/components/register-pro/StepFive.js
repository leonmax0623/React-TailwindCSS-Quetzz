import React from "react";
import Component from "../../Component";
import TextField, { Input } from "@material/react-text-field";
import {
  handleTitle,
  defaultRequiredMessage,
  createModal,
  handleError,
  objectFilter,
  underUploadThreshold,
  handleFileInfo
} from "../../helpers";
import { cdnAPI } from "../../resources/cdn";
import { cdnify, uncdnify } from "../../actions/util";
import AttachmentsModal from "../util/modals/AttachmentsModal";
import clsx from "clsx";
var val;

export default class StepFive extends Component {
  state = {
    formOpen: false,
    currentOffer: "",
    attachments: [],
    uploading: false,
    offers: (this.props.offers || []).map((o) => ({
      ...o,
      attachments: o.attachments.map(uncdnify),
    })),
  };
  form = React.createRef();
  uploadButton = React.createRef();

  loadFile = (e) => {
    const file = e.target.files[0];
    if (!["image", "video", "audio"].includes(file.type.split("/")[0])) {
      return handleError("Only photo/audio/video files allowed!");
    }
    if (!underUploadThreshold(file)) {
      return handleError("Maximum size exceeded!");
    }
    this.setState({ uploading: true });
    cdnAPI
      .upload(file)
      .then((fileKey) =>
        this.setState({
          attachments: this.state.attachments.concat(
            uncdnify({ keyName: fileKey.keyName, mimeType: file.type })
          ),
        }),
        handleFileInfo('File caricato')
      )
      .catch(() => null)
      .then(() => this.setState({ uploading: false }));
    e.target.value = "";
  };

  handleFileUpload = (file, i) => {
    if (!["image", "video", "audio"].includes(file.type.split("/")[0])) {
      return handleError("Only photo/audio/video files allowed!");
    }
    if (!underUploadThreshold(file)) {
      return handleError("Maximum size exceeded!");
    }
    this.setState({ uploading: true });
    return cdnAPI
      .upload(file)
      .then((fileKey) =>
        this.setNestedState(
          `offers.${i}.attachments.${this.state.offers[i].attachments.length}`,
          uncdnify({ keyName: fileKey.keyName, mimeType: file.type })
        )
      )
      .catch(() => null)
      .then(() => this.setState({ uploading: false }));
  };

  openAttachmentsModal = (i) =>
    createModal(
      AttachmentsModal,
      {
        offer: this.state.offers[i],
        editable: true,
        onRemove: (attachment) =>
          this.setNestedState(
            `offers.${i}.attachments`,
            this.state.offers[i].attachments.filter(
              (a) => a.url !== attachment.url
            ),
            () => this.openAttachmentsModal(i)
          ),
        onAdd: (file) =>
          this.handleFileUpload(file, i).then(() =>
            this.openAttachmentsModal(i)
          ),
      },
      "wide-modal"
    );

  offersForm() {
    return (
      <div className="mb-8">
        <form
          autoComplete="nope" autoCorrect="off" spellCheck="off"
          ref={this.form}
          onInvalid={(e) => {
            let val = e.target.value;
            if (val == "" && e.target.type != "date") {
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
            Cosa Offro
            <i className="float-right leading-none fas fa-minus-circle fa-lg"></i>
          </p>
          <div className="flex relative items-center">
            <input
              className="absolute"
              style={{ top: -1000000 }}
              type="file"
              accept="image/*,audio/*,video/*"
              onChange={(e) => this.loadFile(e)}
              ref={this.uploadButton}
            />
            <TextField label="Offerta" className="flex-1">
              <Input
                required
                title={defaultRequiredMessage}
                autoComplete="nope" autoCorrect="off" spellCheck="off"
                type="text"
                value={this.state.currentOffer}
                maxLength="400"
                onChange={(e) => {
                  handleTitle(e)
                  if (e.target.value.length > e.target.maxLength) {
                    e.target.value = e.target.value.slice(
                      0,
                      e.target.maxLength
                    );
                  }
                  this.setState({ currentOffer: e.currentTarget.value });
                }}
              />
            </TextField>
            <img
              alt="add-file"
              className="h-8 cursor-pointer"
              onClick={() => this.uploadButton.current.click()}
              src="/img/add_file_icon.png"
            />
          </div>
        </form>
        <div className="flex justify-between items-center">
          <button
            className="text-white bg-green-400 px-12 py-4 mt-8"
            onClick={() => {
              if (this.state.uploading) {
                return;
              }
              if (this.form.current.checkValidity()) {
                this.setState({
                  formOpen: false,
                  offers: this.state.offers.concat({
                    description: this.state.currentOffer,
                    attachments: this.state.attachments,
                  }),
                  currentOffer: "",
                  attachments: [],
                });
              } else {
                this.form.current.reportValidity();
              }
            }}
          >
            {this.state.uploading ? (
              <i className="fas fa-spinner fa-pulse"></i>
            ) : (
              "Conferma"
            )}
          </button>
          <span style={{color: '#2ec6d5'}}>{this.state.attachments.length === 1 ? `${this.state.attachments.length} File caricato` : this.state.attachments.length > 1 ? `${this.state.attachments.length} File caricati` : '' }</span>
        </div>
      </div>
    );
  }

  formOpenButton() {
    return (
      <div className="mb-8">
        <p
          className="text-turquoise bg-turquoise-100 cursor-pointer py-4 px-6 mb-8 text-lg"
          onClick={() => this.setState({ formOpen: true })}
        >
          Cosa Offro
          <i className="float-right leading-none fas fa-plus-circle fa-lg"></i>
        </p>
        <p className="text-gray-500">
          Ricordati che più il tuo profilo sarà completo, più possibilità avrai
          di essere scelto dagli utenti!
        </p>
      </div>
    );
  }

  getOfferAttachmentTypes = (offer) => {
    const res = { image: 0, audio: 0, video: 0 };
    for (let att of offer.attachments) {
      const type = att.mimeType.split("/")[0];
      if (res[type] !== undefined) {
        res[type]++;
      }
    }
    return Object.entries(objectFilter(res, (_, val) => val > 0)).map(
      ([key, val]) => (
        <>
          <div className="mr-2 w-8">
            <img className="w-full h-auto" src={`/img/${key}_icon_white.png`} />
          </div>
          <span className="text-12">{val}</span>
        </>
      )
    );
  };

  offers() {
    return this.state.offers.map((offer, index) => (
      <div className="text-white bg-turquoise cursor-pointer py-4 px-8 mb-8 text-lg">
        <div className="flex">
          <span className="truncate flex-1">{offer.description}</span>
          <button
            className={clsx("text-white mr-4", {
              hidden: false //offer.attachments.length === 0,
            })}
            onClick={() => this.openAttachmentsModal(index)}
          >
            Vedi
          </button>
          <i
            className="float-right leading-none fas fa-trash-alt fa-lg"
            onClick={() =>
              this.setState({
                offers: this.state.offers.filter((_, i) => i !== index),
              })
            }
          ></i>
        </div>
        <div className="flex">
          <div className="flex-1 flex items-baseline">
            {this.getOfferAttachmentTypes(offer)}
          </div>
        </div>
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
          <span>5 </span>
          <span className="text-gray-500">di </span>
          <span>6 </span>
        </p>
        {this.offers()}
        {this.state.formOpen ? this.offersForm() : this.formOpenButton()}
        {this.state.formOpen ? null : (
          <div className="flex">
            <button
              className="bg-turquoise p-6 text-white flex-1 mr-2"
              onClick={() => {
                if (this.state.uploading) {
                  return;
                }
                this.props.onRetreat({
                  offers: this.state.offers.map((o) => ({
                    ...o,
                    attachments: o.attachments.map(cdnify),
                  })),
                });
              }}
            >
              {this.state.uploading ? (
                <i className="fas fa-spinner fa-pulse"></i>
              ) : (
                "Indietro"
              )}
            </button>
            <button
              className={
                "p-6 text-white flex-1 " +
                (this.state.offers.length > 0 ? "bg-turquoise" : "bg-gray-500")
              }
              onClick={() => {
                if (this.state.uploading || this.state.offers.length <= 0) {
                  return;
                }
                this.props.onAdvance({
                  offers: this.state.offers.map((o) => ({
                    ...o,
                    attachments: o.attachments.map(cdnify),
                  })),
                });
              }}
            >
              {this.state.offers.length > 0
                ? "Continua"
                : "Aggiungi una offerta"}
            </button>
          </div>
        )}
      </div>
    );
  }
}
