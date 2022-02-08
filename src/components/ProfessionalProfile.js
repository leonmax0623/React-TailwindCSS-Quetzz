import React from "react";
import { connect } from "react-redux";
import {
  fetchProProfile,
  updateProProfile,
  setProProfile,
} from "../actions/profileAction";
import { Link } from "react-router-dom";
import Avatar from "./util/Avatar";
import Rating from "./util/Rating";
import {
  handleTitle,
  defaultRequiredMessage,
  createModal,
  empty,
  handleError,
  objectFilter,
  optional,
  underUploadThreshold,
  extractInfo,
  deletedAccFallback
} from "../helpers";
import TextField, { Input } from "@material/react-text-field";
import DropdownMenu from "./util/DropdownMenu";
import clsx from "clsx";
import { UrlDependentComponent } from "../UrlDependentComponent";
import possibleLanguages from "../languages";
import { clone } from "../resources/util";
import {
  momentifyProProfile,
  cdnifyProProfile,
  uncdnify,
} from "../actions/util";
import { cdnAPI } from "../resources/cdn";
import AttachmentsModal from "./util/modals/AttachmentsModal";
import UploadArea from "./util/UploadArea";
import moment from "moment";
import "../styles/main.css";
import OptionsModal from "./util/modals/OptionsModal";

class ProfessionalProfile extends UrlDependentComponent {
  state = {
    editMode: false,
    uploads: 0,
    copy: {},
    avatarUpload: false,
  };
  photoKey = null;
  photoMime = null;
  uploads = 0;
  uploadButton = React.createRef();
  form = React.createRef();

  startEditMode = () => {
    this.setState(
      {
        editMode: true,
        copy: clone(this.props.user),
      },
      () =>
        document.querySelectorAll("textarea").forEach((textarea) => {
          textarea.style.height = `${textarea.scrollHeight}px`;
        })
    );
  };

  onUrlChange() {
    const profileId = +this.props.match.params.id;
    this.props.fetchProProfile(
      +this.props.me.id === profileId ? null : profileId
    );
  }

  componentDidMount() {
    super.componentDidMount();
  }
  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.setProProfile({});
  }

  feedbacks() {
    const items = this.props.user.proFeedback.map((u) => (
      <div
      key={extractInfo(u.userNickname)}
        className="pb-4 md:p-4 w-full md:w-1/3 md:inline-block"
      >
        <div className="bg-white rounded p-8 w-full flex">
          <Avatar className="mr-4" user={u} size={3} />
          <div className="flex-1">
            <div className="flex flex-wrap justify-between mb-4">
              <div>{deletedAccFallback(u.userNickname)}</div>
              <Rating rating={u.vote} size={1} />
            </div>
            <div className="flex">
              <span className="inline-block overflow-hidden break-all whitespace-normal">{u.text}</span>
            </div>
          </div>
        </div>
      </div>
    ));
    return <div className="w-full md:w-auto md:-mx-4">{items}</div>;
  }

  experience() {
    const state = this.state.editMode ? this.state.copy : this.props.user;
    const items = state.proUserProfile.userExperienceInfos.map((e, i) => (
      <li
        key={i}
        className={
          (!this.state.editMode || !this.isMobile() ? "table-row " : "") +
          "border-b-2 last:border-b-0 p-8 my-8"
        }
      >
        {!this.state.editMode || !this.isMobile() ? (
          <div className={`table-cell w-40 align-middle px-8 md:pl-20 md:pr-0`}>
            <img className="mr-12" src="/img/experience.png" />
          </div>
        ) : null}
        {this.state.editMode ? (
          <>
            <div className="md:table-cell align-middle">
              <TextField label="Posizione">
                <Input
                  type="text"
                  value={e.qualification}
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  maxLength={50}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userExperienceInfos.${i}.qualification`,
                      e.currentTarget.value
                    )
                  }
                />
              </TextField>
              <TextField label="Settore">
                <Input
                  type="text"
                  value={e.sector}
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  maxLength={50}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userExperienceInfos.${i}.sector`,
                      e.currentTarget.value
                    )
                  }
                />
              </TextField>
              <TextField label="Azienda">
                <Input
                  type="text"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  value={e.firm}
                  maxLength={50}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userExperienceInfos.${i}.firm`,
                      e.currentTarget.value
                    )
                  }
                />
              </TextField>
              <TextField label="Data di Inizio">
                <Input
                  type="date"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  value={e.start}
                  max={e.end}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userExperienceInfos.${i}.start`,
                      e.currentTarget.value
                    )
                  }
                />
              </TextField>
              <label className="checkbox-container my-4 mx-2">
                Attuale
                <input
                  type="checkbox"
                  checked={e.currentPosition}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userExperienceInfos.${i}.currentPosition`,
                      e.currentTarget.checked
                    )
                  }
                />
                <span className="checkmark"></span>
              </label>
              {!e.currentPosition && (
                <TextField label="Data di Termine">
                  <Input
                    type="date"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    value={e.end || ""}
                    min={e.start}
                    max={moment().format("YYYY-MM-DD")}
                    required
                    onChange={(e) =>
                      this.setNestedState(
                        `copy.proUserProfile.userExperienceInfos.${i}.end`,
                        e.currentTarget.value
                      )
                    }
                  />
                </TextField>
              )}
              <TextField label="Luogo">
                <Input
                  type="text"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  value={e.city}
                  maxLength={150}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userExperienceInfos.${i}.city`,
                      e.currentTarget.value
                    )
                  }
                />
              </TextField>
              <TextField label="Descrizione" textarea="true">
                <Input
                  type="text"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  value={e.description}
                  maxLength={400}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userExperienceInfos.${i}.description`,
                      e.currentTarget.value
                    )
                  }
                />
              </TextField>
            </div>
            <i
              className="fas fa-trash-alt cursor-pointer mx-8 my-2 float-right"
              onClick={() =>
                this.setNestedState(
                  "copy.proUserProfile.userExperienceInfos",
                  state.proUserProfile.userExperienceInfos.filter(
                    (s) => s !== e
                  )
                )
              }
            ></i>
          </>
        ) : (
          <>
            <div className="table-cell align-middle pr-4">
              <p className="text-18 mb-2 break-words"> {e.qualification} </p>
              <p className="text-18 mb-2 break-words"> {e.sector} </p>
              <p className="text-14 mb-2 break-words"> {e.firm} </p>
              <p className="text-14 text-gray-500 mb-2">
                {[e.start.year(), e.end?.year() || "present"].join(" - ")}
              </p>
              <p className="text-14 text-red mb-2 break-words"> {e.city} </p>
              <p className="mobile text-14 break-words">{e.description}</p>
            </div>
            <div className="table-cell desktop align-middle text-14 px-8 break-words">
              {e.description}
            </div>
          </>
        )}
      </li>
    ));
    return (
      <div className="mb-8 bg-white rounded mx-4 md:mx-0">
        <div className="flex p-8 border-b-2 border-gray-200">
          <p className="text-16 md:text-20 flex-1">Esperienza</p>
          {this.state.editMode && (
            <>
              {this.editButtons()}
              <i
                className="fas fa-plus-circle fa-lg cursor-pointer pt-2"
                onClick={() =>
                  this.setNestedState(
                    "copy.proUserProfile.userExperienceInfos",
                    [
                      { id: Math.random(), currentPosition: false },
                      ...this.state.copy.proUserProfile.userExperienceInfos,
                    ]
                  )
                }
              ></i>
            </>
          )}
        </div>
        <ul className="table table-fixed border-spacing-8 w-full">{items}</ul>
      </div>
    );
  }

  studies() {
    const state = this.state.editMode ? this.state.copy : this.props.user;
    const items = state.proUserProfile.userEducationInfos.map((s, i) => (
      <li
        key={i}
        className={
          (!this.state.editMode || !this.isMobile() ? "table-row " : "") +
          "border-b-2 last:border-b-0 p-8 my-8"
        }
      >
        {!this.state.editMode || !this.isMobile() ? (
          <div className="table-cell w-40 align-middle px-8 md:pl-20 md:pr-0">
            <img className="mr-12" src="/img/studies.png" />
          </div>
        ) : null}
        {this.state.editMode ? (
          <>
            <div className="md:table-cell align-middle">
              <TextField label="Istituto">
                <Input
                  type="text"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  value={s.schoolOrUni}
                  maxLength={50}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userEducationInfos.${i}.schoolOrUni`,
                      e.currentTarget.value
                    )
                  }
                />
              </TextField>
              <TextField label="Corso">
                <Input
                  type="text"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  value={s.course}
                  maxLength={50}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userEducationInfos.${i}.course`,
                      e.currentTarget.value
                    )
                  }
                />
              </TextField>
              <TextField label="Qualifica">
                <Input
                  type="text"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  value={s.qualification}
                  maxLength={50}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userEducationInfos.${i}.qualification`,
                      e.currentTarget.value
                    )
                  }
                />
              </TextField>
              <TextField label="Data di Inizio">
                <Input
                  type="date"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  value={s.start}
                  max={s.end}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userEducationInfos.${i}.start`,
                      e.currentTarget.value
                    )
                  }
                />
              </TextField>
              <label className="checkbox-container my-4 mx-2">
                Attuale
                <input
                  type="checkbox"
                  checked={s.attending}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userEducationInfos.${i}.attending`,
                      e.currentTarget.checked
                    )
                  }
                />
                <span className="checkmark"></span>
              </label>
              {!s.attending && (
                <TextField label="Data di Termine">
                  <Input
                    type="date"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    value={s.end || ""}
                    min={s.start}
                    max={moment().format("YYYY-MM-DD")}
                    required
                    title={defaultRequiredMessage}
                    onMouseEnter={handleTitle}
                    onInvalid={(e) => {
                      if (e.currentTarget.value === "") {
                        e.currentTarget.setCustomValidity(defaultRequiredMessage);
                      } else {
                        e.currentTarget.setCustomValidity("");
                      }
                    }}
                    onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                    onChange={(e) =>
                      this.setNestedState(
                        `copy.proUserProfile.userEducationInfos.${i}.end`,
                        e.currentTarget.value
                      )
                    }
                  />
                </TextField>
              )}
              <TextField label="Punteggio">
                <Input
                  type="number"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  value={s.grade}
                  min={1}
                  max={110}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("Inserisci un numero valido compreso tra 1 e 110");
                    }
                  }}
                  onInput={(e) => {
                    e.currentTarget.setCustomValidity("");
                  }}
                  onChange={(e) => {
                    let val = parseInt(e.currentTarget.value);
                    this.setNestedState(
                      `copy.proUserProfile.userEducationInfos.${i}.grade`,
                      isNaN(val) ? "" : `${val}`
                    );
                  }}
                />
              </TextField>
              <TextField label="Attività svolte / Materie di studio" textarea="true">
                <Input
                  type="text"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  value={s.description}
                  maxLength={400}
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  onChange={(e) =>
                    this.setNestedState(
                      `copy.proUserProfile.userEducationInfos.${i}.description`,
                      e.currentTarget.value
                    )
                  }
                />
              </TextField>
            </div>
            <i
              className="fas fa-trash-alt cursor-pointer mx-8 my-2 float-right"
              onClick={() =>
                this.setNestedState(
                  "copy.proUserProfile.userEducationInfos",
                  state.proUserProfile.userEducationInfos.filter(
                    (st) => st !== s
                  )
                )
              }
            ></i>
          </>
        ) : (
          <>
            <div className="table-cell align-middle pr-4">
              <p className="text-18 mb-2 break-words"> {s.schoolOrUni} </p>
              <p className="text-14 mb-2 break-words"> {s.course} </p>
              <p className="text-14 mb-2 break-words"> {s.qualification} </p>
              <p className="text-14 text-gray-500 mb-2">
                {[s.start.year(), s.end?.year() || "present"].join(" - ")}
              </p>
              <p className="text-14 mb-2 break-words"> {s.grade} </p>
              <p className="mobile text-14 break-words">{s.description}</p>
            </div>
            <div className="table-cell align-middle desktop text-14 px-8 break-words">
              <p>{s.description}</p>
            </div>
          </>
        )}
      </li>
    ));
    return (
      <div className="mb-8 bg-white rounded mx-4 md:mx-0">
        <div className="p-8 border-b-2 border-gray-200 flex">
          <p className="text-16 md:text-20 flex-1">Studi</p>
          {this.state.editMode && (
            <>
              {this.editButtons()}
              <i
                className="fas fa-plus-circle fa-lg cursor-pointer pt-2"
                onClick={() =>
                  this.setNestedState(
                    "copy.proUserProfile.userEducationInfos",
                    [
                      { id: Math.random(), attending: false },
                      ...this.state.copy.proUserProfile.userEducationInfos,
                    ]
                  )
                }
              ></i>
            </>
          )}
        </div>
        <ul className="table table-fixed border-spacing-8 w-full">{items}</ul>
      </div>
    );
  }

  styles(i, len) {
    let styles = "border-r-2";
    if (i >= (this.isMobile() ? 1 : 2)) {
      styles += " border-t-2";
    }
    if (i % 2 === 0 || this.isMobile()) {
      styles += " border-l-2";
    }
    if (i >= len - (!this.isMobile() ? 2 : 1)) {
      styles += " border-b-2";
    }
    return styles;
  }

  certifications() {
    const state = this.state.editMode ? this.state.copy : this.props.user;
    const items = state.proUserProfile.userCertificationInfos.map((c, i) => (
      <div
        key={i}
        className={clsx("w-full  p-16", {
          "table-row": !this.state.editMode || !this.isMobile(),
          // "border-r-2 border-b-2": true,
          "border-l-2": i % 2 === 0 || this.isMobile(),
          "last:border-b-0": this.isMobile(),
        })}
      >
        {!this.state.editMode || !this.isMobile() ? (
          <div className="pl-4 pr-8 table-cell align-middle md:flex-auto md:block">
            <img src="/img/certifications.png" />
          </div>
        ) : null}
        <div className="md:table-cell py-4 align-middle flex-auto">
          {this.state.editMode ? (
            <div className="md:flex">
              <div className="flex-1">
                <TextField label="Certificazione">
                  <Input
                    type="text"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    value={c.qualification}
                    maxLength={50}
                    required
                    onChange={(e) =>
                      this.setNestedState(
                        `copy.proUserProfile.userCertificationInfos.${i}.qualification`,
                        e.currentTarget.value
                      )
                    }
                  />
                </TextField>
                <TextField label="Istituto Emittente">
                  <Input
                    type="text"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    value={c.organization}
                    maxLength={50}
                    required
                    onChange={(e) =>
                      this.setNestedState(
                        `copy.proUserProfile.userCertificationInfos.${i}.organization`,
                        e.currentTarget.value
                      )
                    }
                  />
                </TextField>
                <TextField label="Data Rilascio">
                  <Input
                    type="date"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    value={c.date}
                    max={c.expiration}
                    required
                    onChange={(e) =>
                      this.setNestedState(
                        `copy.proUserProfile.userCertificationInfos.${i}.date`,
                        e.currentTarget.value
                      )
                    }
                  />
                </TextField>
                <TextField label="Data Scadenza">
                  <Input
                    type="date"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    value={c.expiration || undefined}
                    min={c.date}
                    onChange={(e) =>
                      this.setNestedState(
                        `copy.proUserProfile.userCertificationInfos.${i}.expiration`,
                        e.currentTarget.value
                      )
                    }
                  />
                </TextField>
                <TextField label="Codice">
                  <Input
                    type="number"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    value={c.identifier || undefined}
                    min={0}
                    max={2147483647}
                    maxLength={10}
                    onChange={(e) => {
                      let val = parseInt(e.currentTarget.value);
                      this.setNestedState(
                        `copy.proUserProfile.userCertificationInfos.${i}.identifier`,
                        isNaN(val) ? "" : `${val}`
                      );

                      e.currentTarget.reportValidity();
                    }}
                    onInvalid={(e) => {
                      if (parseInt(e.currentTarget.value) > 2147483647) {
                        e.currentTarget.setCustomValidity(
                          "Per favore inserisci un numero minore di 2147483647."
                        );
                      } else if (parseInt(e.currentTarget.value) < 0) {
                        e.currentTarget.setCustomValidity(
                          "Per favore inserisci un numero maggiore di 0."
                        )
                      }
                    }}
                    onInput={(e) => {
                      e.currentTarget.setCustomValidity("");
                      if (e.currentTarget.value.length > 10) {
                        e.currentTarget.value = e.currentTarget.value.slice(0, 10);
                      }
                    }}
                    onBlur={(e) => {
                      e.target.reportValidity();
                    }}
                  />
                </TextField>
              </div>
              <i
                className="fas fa-trash-alt cursor-pointer my-2 mx-8 float-right"
                onClick={() =>
                  this.setNestedState(
                    "copy.proUserProfile.userCertificationInfos",
                    state.proUserProfile.userCertificationInfos.filter(
                      (s) => s !== c
                    )
                  )
                }
              ></i>
            </div>
          ) : (
            <>
              <p className="text-18 mb-2 break-words"> {c.qualification} </p>
              <p className="text-14 mb-2 break-words"> {c.organization} </p>
              <p className="text-gray-500 text-14">
                {[c.date.year(), c.expiration?.year()].join(" - ")}
              </p>
              <p className="text-14 mb-2 break-words"> {c.identifier} </p>
            </>
          )}
        </div>
      </div>
    ));
    return (
      <div className="mb-8 bg-white rounded mx-4 md:mx-0">
        <div className="p-8 border-b-2 border-gray-200 flex">
          <p className="text-16 md:text-20 flex-1">Certificazioni</p>
          {this.state.editMode && (
            <>
              {this.editButtons()}
              <i
                className="fas fa-plus-circle fa-lg cursor-pointer pt-2"
                onClick={() =>
                  this.setNestedState(
                    "copy.proUserProfile.userCertificationInfos",
                    [
                      { id: Math.random() },
                      ...this.state.copy.proUserProfile.userCertificationInfos,
                    ]
                  )
                }
              ></i>
            </>
          )}
        </div>
        {items.length === 0 && !this.state.editMode ? (
          <p className="text-center p-24">
            Per il momento non sono state aggiunte certificazioni
          </p>
        ) : (
          <div className="table md:flex md:flex-wrap md:content-start">
            {items}
          </div>
        )}
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
          <span className="text-center w-6">{val}</span>
          <div className="mr-2 w-8">
            <img className="w-full h-auto" src={`/img/${key}_icon.png`} />
          </div>
        </>
      )
    );
  };

  openAttachmentsModal = (offer, i) =>
    createModal(
      AttachmentsModal,
      {
        offer,
        editable: this.state.editMode,
        onRemove: (attachment) =>
          this.setNestedState(
            `copy.proUserProfile.offers.${i}.attachments`,
            this.state.copy.proUserProfile.offers[i].attachments.filter(
              (a) => a.url !== attachment.url
            ),
            () =>
              this.openAttachmentsModal(
                this.state.copy.proUserProfile.offers[i],
                i
              )
          ),
        onAdd: (file) =>
          this.handleFileUpload(file, i).then(() => {
            this.openAttachmentsModal(
              this.state.copy.proUserProfile.offers[i],
              i
            );
          }),
      },
      "wide-modal"
    );

  handleFileUpload = (file, i) => {
    if (!["image", "video", "audio"].includes(file.type.split("/")[0])) {
      return handleError("Only photo/audio/video files allowed!");
    }
    if (!underUploadThreshold(file)) {
      return handleError("Maximum size exceeded!");
    }
    this.updateUploads(1);
    return cdnAPI
      .upload(file)
      .then((fileKey) =>
        this.setNestedState(
          `copy.proUserProfile.offers.${i}.attachments.${this.state.copy.proUserProfile.offers[i].attachments.length}`,
          uncdnify({ keyName: fileKey.keyName, mimeType: file.type })
        )
      )
      .catch(() => null)
      .then(() => this.updateUploads(-1));
  };

  offerItem(o, i, state) {
    return (
      <>
        {this.state.editMode ? (
          <TextField
            label="Cosa Offro"
            className="flex-1 mr-2"
            onTrailingIconSelect={() => {
              this.setNestedState(
                "copy.proUserProfile.offers",
                state.proUserProfile.offers.filter((s) => s !== o)
              );
            }}
          >
            <Input
              type="text"
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              value={o.description}
              title={defaultRequiredMessage}
              onMouseEnter={handleTitle}
              onInvalid={(e) => {
                if (e.currentTarget.value === "") {
                  e.currentTarget.setCustomValidity(defaultRequiredMessage);
                } else {
                  e.currentTarget.setCustomValidity("");
                }
              }}
              onInput={(e) => { e.currentTarget.setCustomValidity("") }}
              required
              onChange={(e) =>
                this.setNestedState(
                  `copy.proUserProfile.offers.${i}.description`,
                  e.currentTarget.value
                )
              }
            />
          </TextField>
        ) : (
          <div className="flex-1 mr-2 break-words break-all">{o.description}</div>
        )}
        {this.getOfferAttachmentTypes(o)}
        <button
          className={clsx("text-turquoise mr-2", {
            hidden: o.attachments.length === 0,
          })}
          onClick={() => this.openAttachmentsModal(o, i)}
        >
          Vedi
        </button>
        <UploadArea
          className={clsx(
            "w-64 text-center border-dashed border-2 border-turquoise text-gray-500 p-4 cursor-pointer mr-2",
            { hidden: !this.state.editMode }
          )}
          handleDrop={(file) => this.handleFileUpload(file, i)}
        />
        <i
          className={clsx("fas fa-trash-alt cursor-pointer", {
            hidden: !this.state.editMode,
          })}
          onClick={() =>
            this.setNestedState(
              "copy.proUserProfile.offers",
              state.proUserProfile.offers.filter((s) => s !== o)
            )
          }
        ></i>
      </>
    );
  }

  offers() {
    const state = this.state.editMode ? this.state.copy : this.props.user;
    const items = state.proUserProfile.offers.map((o, i) => (
      <li key={i} className="p-2 mx-4 md:leading-4 items-center flex flex-wrap break-words">
        <div className="mx-4 w-8">
          <i className="fas fa-circle color-black text-xs p-2"></i>
        </div>
        {this.offerItem(o, i, state)}
      </li>
    ));
    return <ul className="px-4 py-8">{items}</ul>;
  }

  editButtons() {
    if (this.state.editMode) {
      return (
        <>
          <div
            className="md:inline-flex mr-4 md:mr-8 cursor-pointer"
            onClick={() => this.setState({ editMode: false })}
          >
            <span className="text-14 px-2 py-1 bg-dark-gray rounded text-white">
              Annulla
            </span>
          </div>
          <div
            className="md:inline-flex mr-4 md:mr-8 cursor-pointer"
            onClick={this.save}
          >
            <span className="text-14 px-2 py-1 bg-turquoise rounded text-white">
              {this.noUploadsPending() ? (
                "Salva"
              ) : (
                <i className="fas fa-spinner fa-pulse"></i>
              )}
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
    if (this.props.match.params.id == this.props.me.id) {
      return (
        <div className="flex justify-between py-8 px-4 md:px-0">
          <div className="text-16 md:text-20 font-bold text-raleway whitespace-no-wrap truncate">
            Profilo Professionista
          </div>
          <div className="inline-flex">
            {this.editButtons()}
            <span className="md:inline-flex mr-4 md:mr-8 border-b-2 border-black">
              <div>
                <i className="fas fa-user"></i>
              </div>
              <span className="desktop ml-4 text-14">Profilo</span>
            </span>
            <Link
              to="/billing-info"
              className="md:inline-flex mr-8 cursor-pointer"
            >
              <div>
                <i className="fas fa-receipt"></i>
              </div>
              <span className="desktop ml-4 text-14">
                Informazioni di Fatturazione
              </span>
            </Link>
            <Link
              to={`/user-profile/${this.props.match.params.id}`}
              className="md:inline-flex rounded bg-gray-900 text-white px-4 -mt-2 cursor-pointer"
            >
              <div className="pt-2">
                <i className="fas fa-sync-alt"></i>
              </div>
              <span className="ml-4 desktop text-14 pt-2">Cambia Profilo</span>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-between py-8 px-4 md:px-0">
          <div className="text-16 md:text-20 font-bold text-raleway">
            Profilo Professionista
          </div>
        </div>
      );
    }
  }

  buttons() {
    if (this.state.editMode) {
      return (
        <div className="flex justify-between m-50 px-4 md:px-0">
          <button
            className="text-16 md:text-20 rounded bg-dark-gray text-white py-2 px-4 text-center"
            onClick={(e) => this.setState({ editMode: false })}
          >
            Annulla
          </button>
          <button
            className="text-16 md:text-20 rounded bg-turquoise text-white py-2 px-4 text-center"
            onClick={this.save}
          >
            {this.noUploadsPending() ? (
              "Salva"
            ) : (
              <i className="fas fa-spinner fa-pulse"></i>
            )}
          </button>
        </div>
      );
    } else {
      return null;
    }
  }

  avatar() {
    const u = this.props.user;
    return (
      <>
        <div className="relative">
          <Avatar
            className="block mx-auto my-6 ml-2"
            user={
              this.state.editMode
                ? this.state.copy.proUserProfile
                : u.proUserProfile
            }
            size={this.isMobile() ? 5 : 8}
          />
          <input
            className="absolute"
            style={{ top: -1000000 }}
            type="file"
            accept="image/*"
            onChange={(e) => this.loadImage(e)}
            ref={this.uploadButton}
          />
          <button
            type="button"
            className={clsx(
              "mx-auto block mt-2 font-bold text-turquoise text-lg",
              { hidden: !this.state.editMode }
            )}
            onClick={() => this.uploadButton.current.click()}
          >
            {this.state.avatarUpload ? (
              <i className="fas fa-spinner fa-pulse"></i>
            ) : (
              "Cambia"
            )}
          </button>
        </div>
      </>
    );
  }

  updateUploads = (by) => {
    let r;
    const p = new Promise((res) => (r = res));
    this.uploads = this.uploads + by;
    this.setState({ uploads: this.uploads }, r);
    return p;
  };

  noUploadsPending = () => this.uploads === 0;

  isValidProfile = () => {
    const profile = this.state.copy.proUserProfile;
    if (profile.userEducationInfos.length === 0) {
      handleError("Devi aver inserito almeno un percorso di studi!");
      return false;
    }
    if (profile.userExperienceInfos.length === 0) {
      handleError("Devi aver inserito almeno un'esperienza!");
      return false;
    }
    return true;
  };

  save = () => {
    if (this.noUploadsPending() && this.isValidProfile()) {
      if (this.form.current.checkValidity()) {
        const newProfile = cdnifyProProfile(
          momentifyProProfile(this.state.copy)
        );

        if (this.photoKey) {
          newProfile.proUserProfile.photo = {
            keyName: this.photoKey,
            mimeType: this.photoMime,
          };
          this.photoKey = null;
        }
        this.props.updateProProfile(newProfile);
        this.setState({ editMode: false });
      } else {
        this.form.current.reportValidity();
      }
    }
  };

  loadImage = (e) => {
    const photoBlob = e.target.files[0];
    if (photoBlob) {
      if (!underUploadThreshold(photoBlob)) {
        return handleError("Hai superato le dimensioni massime!");
      }
      const reader = new FileReader();
      reader.onload = (e) =>
        this.setNestedState("copy.proUserProfile.photo", {
          url: e.target.result,
        });
      reader.readAsDataURL(photoBlob);
      this.updateUploads(1).then(() => this.setState({ avatarUpload: true }));
      cdnAPI
        .upload(photoBlob)
        .then((photoKey) => {
          this.photoKey = photoKey.keyName;
          this.photoMime = photoBlob.type;
        })
        .catch(() => null)
        .then(() =>
          this.updateUploads(-1).then(() =>
            this.setState({ avatarUpload: false })
          )
        );
      e.target.value = "";
    }
  };

  personalInfo() {
    const u = this.props.user;
    const l = optional(this.state.copy, "proUserProfile.knownLanguages", []);
    const langToValue = (lang) => {
      if (lang) {
        if (lang.id) {
          return lang;
        } else {
          return { id: lang, name: lang };
        }
      } else {
        return { id: 0, name: "Seleziona Lingua" };
      }
    };
    const selectedLanguages = l.filter(Boolean);
    const languages = l.map((language, i) => 
    <div className="inline-block">
      <span>
        {language}
        {selectedLanguages.length > 1 && language != null && (
          <i
            className="fas fa-trash-alt px-2"
            onClick={() =>
              this.setNestedState("copy.proUserProfile.knownLanguages", [
                ...l.slice(0, i),
                ...l.slice(i + 1),
              ])
            }
          ></i>
        )}
      </span>
    </div>
    );
    return (
      <div className="md:ml-4 bg-white md:mb-0 mb-4 rounded md:flex-1">
        <p className="text-16 md:text-20 p-8 border-b-2 border-gray-200 md:mb-8">
          Informazioni Personali
        </p>
        {!this.state.editMode ? (
          <div className="flex flex-wrap -mx-4 p-8 md:px-16">
            <div className="m-4">
              <div className="text-gray-500">Età</div>
              <div>{u.age}</div>
            </div>
            <div className="m-4">
              <div className="text-gray-500">Professione</div>
              <div>{u.proUserProfile.profession}</div>
            </div>
            <div className="m-4">
              <div className="text-gray-500">Lingue parlate</div>
              <div>{u.proUserProfile.knownLanguages.join(", ")}</div>
            </div>
            <div className="m-4">
              <div className="text-gray-500">Città</div>
              <div>{u.city.name}</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mt-8 flex p-4">
              <TextField className="flex-1 mr-2" label="Professione">
                <Input
                  required
                  title={defaultRequiredMessage}
                  onMouseEnter={handleTitle}
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(defaultRequiredMessage);
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                  }}
                  onInput={(e) => { e.currentTarget.setCustomValidity("") }}
                  minLength={1}
                  maxLength={50}
                  type="text"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  value={this.state.copy.proUserProfile.profession}
                  onChange={(e) => {
                    handleTitle(e)
                    this.setNestedState(
                      "copy.proUserProfile.profession",
                      e.currentTarget.value
                    )
                  }}
                />
              </TextField>
            </div>
            <div className="mt-2 flex p-4">
              <div className="flex-1">
                <p className="px-4 pb-1 text-gray-500" style={{fontSize: "0.75rem"}}>
                  Lingue conosciute*
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                  {languages}
                </div>
                <DropdownMenu
                  value={{id: 0, name: "Aggiungi una Lingua"}}
                  items={possibleLanguages
                    .filter((l) => !selectedLanguages.includes(l))
                    .map((l) => ({ id: l, name: l }))}
                  onSelect={(item) => {
                    this.setNestedState(
                      `copy.proUserProfile.knownLanguages`,
                      [...this.state.copy.proUserProfile.knownLanguages, item.name]
                    );
                  }}
                  className="mt-4 px-4 pb-4 mb-4 border-b flex-1 mr-4"
                  searchable
                  fullWidth
                />
              </div>
            </div>
          </div>
        )}
      
      
      </div>
    );
  }

  render() {
    if (empty(this.props.user)) {
      return null;
    }
    const active = "mx-4 border-b-2 border-black cursor-pointer";
    const inactive = "mx-4 cursor-pointer";
    const u = this.props.user;
    const feedbackCount = u.proFeedback.length;
    const rating =
      feedbackCount > 0
        ? u.proFeedback.reduce((prev, curr) => prev + curr.vote, 0) /
          feedbackCount
        : 0;
    return (
      <div className="container">
        {this.pageNavigation()}
        <form autoComplete="nope" autoCorrect="off" spellCheck="off" ref={this.form} onSubmit={(e) => e.preventDefault()}>
          <div className="md:flex mb-8 md:h-info mx-4 md:mx-0">
            <div className="flex rounded md:mb-0 md:mr-4 mb-4 bg-white p-8 outerDiv">
              {this.avatar()}
              <div className="ml-8 p-4">
                <div className="">
                  <p>
                    {u.firstName ? `${u.firstName} ${u.lastName}` : u.initials}
                  </p>
                  <p className="text-gray-500 mobile">
                    {u.proUserProfile.profession}
                  </p>
                  <Rating rating={rating} size={1} />
                </div>
                <div className="inline-flex pt-8 proProfileFixes">
                  <div className="mr-4 md:mx-4">
                    <div className="text-center">{u.jobsCompleted}</div>
                    <div className="text-gray-500 text-center">
                      Lavori completati
                    </div>
                  </div>
                  <div className="md:mx-4">
                    <div className="text-center text-turquoise">
                      {feedbackCount}
                    </div>
                    <div className="text-turquoise text-center">Feedback</div>
                  </div>
                </div>
              </div>
            </div>
            {this.personalInfo()}
          </div>
          <div className="mb-8 bg-white rounded mx-4 md:mx-0">
            <div className="p-8 border-b-2 border-gray-200 flex">
              <p className="text-16 md:text-20 flex-1">Cosa Offro</p>
              {this.state.editMode && (
                <>
                  {this.editButtons()}
                  <i
                    className="fas fa-plus-circle fa-lg cursor-pointer pt-2"
                    onClick={() =>
                      this.setNestedState(
                        `copy.proUserProfile.offers.${this.state.copy.proUserProfile.offers.length}`,
                        { description: "", attachments: [] }
                      )
                    }
                  ></i>
                </>
              )}
            </div>
            {this.offers()}
          </div>
          {this.experience()}
          {this.studies()}
          {this.certifications()}
        </form>
        {this.buttons()}
        <div className="my-8 mx-4 md:mx-0">
          {feedbackCount > 0 ? (
            <p className="text-16 md:text-20 mb-8">Feedback</p>
          ) : null}
          {this.feedbacks()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.proProfile,
  me: state.user,
});

export default connect(mapStateToProps, {
  fetchProProfile,
  updateProProfile,
  setProProfile,
})(ProfessionalProfile);
