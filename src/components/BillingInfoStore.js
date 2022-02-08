import React from "react";
import Component from "../Component";
import { connect } from "react-redux";
import TextField, { Input } from "@material/react-text-field";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { userAPI } from "../resources/users";
import {
  alphanumericPattern,
  alphanumericPatternMessage,
  createLoaderModal,
  createModal,
  optional,
  validateTaxCodeChecksum,
  validateVatChecksum,
} from "../helpers";
import { filtersAPI } from "../resources/filters";
import OptionsModal from "./util/modals/OptionsModal";
import clsx from "clsx";
import DropdownMenu from "./util/DropdownMenu";
import { clone } from "../resources/util";
import InfoModal from "./util/modals/InfoModal";
import Toggle from "react-toggle";

export const namePattern = "[A-Za-z ]{1,30}";
export const namePatternMessage = "I caratteri consentiti sono solo lettere e spazi";

class BillingInfoStore extends Component {
  constructor(props){
    super(props)
    this.state =  {
      billingInfo: {
        firstName: "",
        lastName: "",
        vat: "",
        taxCode: "",
        businessName: "",
        addressLine1: "",
        addressLine2: "",
        sdiIdentifier: {
          type: "code",
          value: "",
        },
        postalCode: "",
        cityDto: {
          id: 0,
          name: "",
        },
      },
      regions: [],
      provinces: [],
      cities: [],
      
      hasCompany: false,
      editMode: false,
      baseState: {
        billingInfo: {
          firstName: "",
          lastName: "",
          businessName: "",
          taxCode: "",
          vat: "",
          addressLine1: "",
          addressLine2: "",
          sdiIdentifier: {
            type: "code",
            value: "",
          },
          postalCode: "",
          cityDto: {
            id: 0,
            name: "",
          },
        },
        regions: [],
        provinces: [],
        cities: [],
        
        hasCompany: false,
      }
    };
    // preserve the initial state in a new object
  }

  
  form = React.createRef();
  regionRef = React.createRef();
  provinceRef = React.createRef();
  cityRef = React.createRef();
  vatRef = React.createRef();
  taxRef = React.createRef();
  sdi = React.createRef();
  regionsLoaded = null;
  provincesLoaded = null;

  handleCancelEvent() {
    this.props.onCancelEvent(undefined);
  }

  handleContinueEvent() {
    this.props.onContinueEvent(undefined);
  }

  startEditMode = () => {
    this.setState(
      {
        editMode: true
      })
  };

  pickRegion = () =>
    createLoaderModal(this.regionsLoaded)
      .then(() => createModal(OptionsModal, { options: this.state.regions }))
      .then((region) => {
        this.setNestedState("billingInfo.region", region);
        this.provincesLoaded = filtersAPI
          .provinces(optional(this.state.billingInfo, "region.id"))
          .then((provinces) => this.setState({ provinces }));
      })
      .catch((err) => null);
      // .then(() => this.setNestedState("billingInfo.province", null))
      // .then(() => this.setNestedState("billingInfo.cityDto", null));


  pickProvince = () =>
    createLoaderModal(this.provincesLoaded)
      .then(() => createModal(OptionsModal, { options: this.state.provinces }))
      .then((province) => {
        this.setNestedState("billingInfo.province", province);
        this.citiesLoaded = filtersAPI
          .cities(optional(this.state.billingInfo, "province.id"))
          .then((cities) => this.setState({ cities }));
      })
      .catch((err) => null);
      // .then(() => this.setNestedState("billingInfo.cityDto", null));

  pickCity = () => {
    if (optional(this.state.billingInfo, "province.id")) {
      return createLoaderModal(this.citiesLoaded)
        .then(() => createModal(OptionsModal, { options: this.state.cities }))
        .then((city) => this.setNestedState("billingInfo.cityDto", city))
        .catch((err) => null);
    }
  };

  componentDidMount() {
    super.componentDidMount();
    userAPI.getBillingInfo().then((billingInfo) =>
      this.setState({
        billingInfo: {
          ...billingInfo,
          region: billingInfo?.cityDto?.province.region,
          province: billingInfo?.cityDto?.province,
        },
        hasCompany: billingInfo?.type === "VATBillingInfo",
        baseState: {
          billingInfo: {
            ...billingInfo,
            region: billingInfo?.cityDto?.province.region,
            province: billingInfo?.cityDto?.province,
          },
          hasCompany: billingInfo?.type === "VATBillingInfo",
        }
      }),
    );
    
    filtersAPI
      .provinces(optional(this.state.billingInfo, "region.id"))
      .then((provinces) => this.setState({ provinces}))
      .then(
        () =>
          (this.citiesLoaded = filtersAPI.cities(
            optional(this.state.billingInfo, "province.id")
          ))
      )
      .then((cities) => this.setState({ cities }));
    this.regionsLoaded = filtersAPI
      .regionAll()
      .then((regions) => this.setState({ regions }));
    this.provincesLoaded = filtersAPI
      .provinces(optional(this.state.billingInfo, "region.id"))
      .then((provinces) => this.setState({ provinces }));
  }

  save = () => {
    if (!this.readyToSubmit()) {
      return;
    }
    if (!this.form.current.checkValidity()) {
      this.form.current.reportValidity();
      return;
    }
    if (this.sdi.current) {
      if (
        optional(this.state.billingInfo, "sdiIdentifier.value") ===
        "0000000"
      ) {
        this.sdi.current.inputElement.setCustomValidity(
          "Il valore inserito non è valido"
        );
      } else {
        this.sdi.current.inputElement.setCustomValidity("");
      }
    }
    if (this.regionRef.current) {
      if (!optional(this.state.billingInfo.region, "id", false)) {
        this.regionRef.current.setCustomValidity(
          "Per favore compila questo campo"
        );
      } else {
        this.regionRef.current.setCustomValidity("");
      }
    }
    if (this.provinceRef.current) {
      if (!optional(this.state.billingInfo.province, "id", false)) {
        this.provinceRef.current.setCustomValidity(
          "Per favore compila questo campo"
        );
      } else {
        this.provinceRef.current.setCustomValidity("");
      }
    }
    if (this.cityRef.current) {
      if (!optional(this.state.billingInfo.cityDto, "id", false)) {
        this.cityRef.current.setCustomValidity(
          "Per favore compila questo campo"
        );
      } else {
        this.cityRef.current.setCustomValidity("");
      }
    }
    if (this.vatRef.current) {
      if (!validateVatChecksum(this.state.billingInfo.vat)) {
        this.vatRef.current.inputElement.setCustomValidity(
          "Oops! Sei sicuro di aver inserito un numero di p.iva corretto?"
        );
      } else {
        this.vatRef.current.inputElement.setCustomValidity("");
      }
    }
    if (this.taxRef.current) {
      if (
        !validateTaxCodeChecksum(this.state.billingInfo.taxCode)
      ) {
        this.taxRef.current.inputElement.setCustomValidity(
          "Oops! Sei sicuro di aver inserito un codice fiscale corretto?"
        );
      } else {
        this.taxRef.current.inputElement.setCustomValidity("");
      }
    }
    if (this.form.current.checkValidity()) {
      const billingInfo = clone(this.state.billingInfo);
      const sharedBillingInfo = {
        cityId: billingInfo.cityDto.id,
        type: this.state.hasCompany
          ? "VATBillingInfo"
          : "SSNBillingInfo",
        postalCode: parseInt(billingInfo.postalCode),
        addressLine1: billingInfo.addressLine1,
        ...(this.state.hasCompany
          ? { sdiIdentifier: billingInfo.sdiIdentifier }
          : {}),
        ...(billingInfo.addressLine2
          ? { addressLine2: billingInfo.addressLine2 }
          : {}),
      };
      let dataToSend;
      if (this.state.hasCompany) {
        dataToSend = {
          ...sharedBillingInfo,
          businessName: billingInfo.businessName,
          vat: billingInfo.vat,
        };
      } else {
        dataToSend = {
          ...sharedBillingInfo,
          taxCode: billingInfo.taxCode,
          firstName: billingInfo.firstName,
          lastName: billingInfo.lastName,
        };
      }

      createLoaderModal(
        userAPI.putBillingInfo(dataToSend)
      ).then(() =>
        createModal(InfoModal, {
          title: "Successo!",
          button: "Ho capito!",
          body:
            "Ottimo! Hai appena aggiornato con successo le tue informazioni di fatturazione!",
        }),
        this.setState({editMode: false})
      );
    } else {
      this.form.current.reportValidity();
    }
  }

  continue = () => {
    if (!this.readyToSubmit()) {
      return;
    }
    this.handleContinueEvent();
  }

  pageNavigation() {
    return (
      <div className="bg-white md:bg-transparent flex justify-between py-8 px-4 md:px-0">
        <div className="text-16 md:text-20 font-bold text-raleway">
          Informazioni di Fatturazione
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container mb-10">
        {this.pageNavigation()}
        {this.state.editMode == false ? 
          <div  className="wide-modal">
            <div className="flex-1 text-right mb-4">
              <div
                className="md:inline-flex mr-4 md:mr-8 cursor-pointer"
                onClick={() => {
                  this.setState({ editMode: true});
                }}
              >
                <span className="text-14 px-2 py-1 bg-dark-gray rounded text-white">
                  Modifica
                </span>
              </div>
            </div>
            {this.state.hasCompany  ? 
              <>
                <div className='flex justify-between flex-wrap md:flex-no-wrap'>
                  <div className="p-3 md:mr-20 pr-20" style={{marginRight: '7rem'}}>
                    <span style={{color: '#a0aec0'}} >
                      Regionale sociale : &nbsp;
                    </span>
                      {this.state.billingInfo.businessName}
                  </div>
                  <div className="p-3 md:ml-25 pr-25" style={{paddingRight: '7rem'}}>
                    <span style={{color: '#a0aec0'}}>
                      n° Partita IVA : &nbsp;
                    </span>
                      {this.state.billingInfo.vat}
                  </div>
                </div>
                <div className="p-3 md:mr-20 pr-20" style={{marginRight: '7rem'}}>
                    <span style={{color: '#a0aec0'}} >
                      {this.state.billingInfo.sdiIdentifier.type === "code" ? 
                        "SDI" : "PEC"
                      } : &nbsp;
                    </span>
                      {this.state.billingInfo.sdiIdentifier.value || ""}
                </div>
              </> 
              : 
              <>
                <div className='flex justify-between flex-wrap md:flex-no-wrap'>
                  <div className="p-3 md:mr-20 pr-20">
                    <span style={{color: '#a0aec0'}} >
                      Nome : &nbsp;
                    </span>
                      {this.state.billingInfo.firstName}
                  </div>
                  <div className="p-3 md:mr-20 pr-20">
                    <span style={{color: '#a0aec0'}} >
                      Cognome : &nbsp;
                    </span>
                      {this.state.billingInfo.lastName}
                  </div>
                  <div className="p-3 md:ml-25 pr-25" style={{paddingRight: '7rem'}}>
                    <span style={{color: '#a0aec0'}}>
                      Codice Fiscale : &nbsp;
                    </span>
                      {this.state.billingInfo.taxCode}
                  </div>
                </div>
              </>
            }
            <div className="p-3 md:mr-20 pr-20" style={{marginRight: '7rem'}}>
              <span style={{color: '#a0aec0'}} >
                Regione : &nbsp;
              </span>
              {optional(
                    this.state.billingInfo,
                    "region.name",
                    "Seleziona la regione"
              )}
            </div>
            <div className="p-3 md:ml-25 pr-25" style={{paddingRight: '7rem'}}>
              <span style={{color: '#a0aec0'}}>
              Provincia : &nbsp;
              </span>
              {optional(
                    this.state.billingInfo,
                    "province.name",
                    "Seleziona la Provincia"
              )}
            </div>
            <div className="p-3 md:ml-25 pr-25" style={{paddingRight: '7rem'}}>
              <span style={{color: '#a0aec0'}}>
                Comune : &nbsp;
              </span>
              {optional(
                   this.state.billingInfo,
                   "cityDto.name",
                   "Seleziona il Comune"
              )}
            </div>
            <div className='flex justify-between flex-wrap md:flex-no-wrap'>
              <div className="p-3 md:mr-20 pr-20" style={{marginRight: '7rem'}}>
                <span style={{color: '#a0aec0'}} >
                  Codice Postale : &nbsp;
                </span>
                  {this.state.billingInfo.postalCode}
              </div>
            </div>
            <div className='flex justify-between flex-wrap md:flex-no-wrap'>
              <div className="p-3 md:ml-25 pr-25" style={{paddingRight: '7rem'}}>
                <span style={{color: '#a0aec0'}}>
                  Indirizzo : &nbsp;
                </span>
                  {this.state.billingInfo.addressLine1 || ""}
              </div>
            </div>
            <div className='flex justify-between flex-wrap md:flex-no-wrap'>
              <div className="p-3 md:ml-25 pr-25" style={{paddingRight: '7rem'}}>
                <span style={{color: '#a0aec0'}}>
                  Indirizzo Alternativo: &nbsp;
                </span>
                  {this.state.billingInfo.addressLine2 || <span style={{color: '#a0aec0'}}>Non specificato</span>}
              </div>
            </div>
            <div className="flex-1 text-center my-4">
              <span
                className="md:inline-flex mr-4 md:mr-8 cursor-pointer"
                onClick={() => {
                  this.handleCancelEvent();
                }}
              >
                <span className="text-14 px-2 py-1 bg-dark-gray rounded text-white">
                  Indietro
                </span>
              </span>
              <span
                className="md:inline-flex mr-4 md:mr-8 cursor-pointer"
                onClick={this.continue}
              >
                <span className={(this.readyToSubmit() ? "bg-turquoise" : "bg-gray-500") + " text-14 px-2 py-1 rounded text-white"}>
                  Conferma
                </span>
              </span>
            </div>
          </div> :
          <div className="wide-modal">
            <form
              ref={this.form}
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              onSubmit={e => e.preventDefault()}
              className="my-8 pb-8"
            >
              <>
                {this.state.hasCompany ? (
                  <>
                    <div className="flex justify-between flex-wrap md:flex-no-wrap">
                      <TextField className="md:ml-4" label="Ragione sociale">
                        <Input
                          type="text"
                          autoComplete="nope" autoCorrect="off" spellCheck="off"
                          required
                          pattern="[-.'\w\s]+"
                          value={this.state.billingInfo.businessName}
                          onChange={(e) =>
                            this.setNestedState(
                              "billingInfo.businessName",
                              e.currentTarget.value
                            )
                          }
                          onInvalid={(e) => {
                            if (e.currentTarget.value === "") {
                              e.currentTarget.setCustomValidity(
                                "Per favore compila questo campo"
                              );
                            } else {
                              e.currentTarget.setCustomValidity("Inserisci una ragione sociale valida");
                            }
                          }}
                          onInput={(e) => e.currentTarget.setCustomValidity("")}
                        />
                      </TextField>
                      <TextField className="md:ml-4" label="n° Partita IVA">
                        <Input
                          type="text"
                          autoComplete="nope" autoCorrect="off" spellCheck="off"
                          required
                          pattern="^[0-9]{11}$"
                          value={this.state.billingInfo.vat}
                          ref={this.vatRef}
                          onChange={(e) =>
                            this.setNestedState(
                              "billingInfo.vat",
                              e.currentTarget.value
                            )
                          }
                          onInvalid={(e) => {
                            if (e.currentTarget.value === "") {
                              e.currentTarget.setCustomValidity(
                                "Per favore compila questo campo"
                              );
                            } else {
                              e.currentTarget.setCustomValidity("Inserisci una P.IVA valida");
                            }
                          }}
                          onInput={(e) => e.currentTarget.setCustomValidity("")}
                        />
                      </TextField>
                    </div>
                    <div className="md:flex justify-between flex-wrap md:flex-no-wrap items-center">
                      <Toggle
                        icons={false}
                        id="sdiIdentifier"
                        defaultChecked={
                          this.state.billingInfo.sdiIdentifier.type === "code"
                        }
                        onChange={(e) =>
                          this.setNestedState(
                            "billingInfo.sdiIdentifier.type",
                            e.currentTarget.checked ? "code" : "pec"
                          )
                        }
                      />
                      <label className="ml-2" htmlFor="sdiIdentifier">
                        {this.state.billingInfo.sdiIdentifier.type === "code"
                          ? "SDI"
                          : "PEC"}
                      </label>
                      <TextField
                        className="ml-2 md:ml-4 flex-1"
                        label={
                          this.state.billingInfo.sdiIdentifier.type === "code"
                            ? "SDI"
                            : "PEC"
                        }
                      >
                        <Input
                          type="text"
                          autoComplete="nope" autoCorrect="off" spellCheck="off"
                          maxLength="7"
                          minLength="7"
                          ref={this.sdi}
                          required
                          value={this.state.billingInfo.sdiIdentifier.value || ""}
                          onChange={(e) =>
                            this.setNestedState(
                              "billingInfo.sdiIdentifier.value",
                              e.currentTarget.value
                            )
                          }
                          onInvalid={(e) => {
                            if (e.currentTarget.value === "") {
                              e.currentTarget.setCustomValidity(
                                "Per favore compila questo campo"
                              );
                            } else {
                              e.currentTarget.setCustomValidity("Inserisci un identificativo SDI valido");
                            }
                          }}
                          onInput={(e) => e.currentTarget.setCustomValidity("")}
                        />
                      </TextField>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between flex-wrap md:flex-no-wrap">
                    <TextField className="md:mr-4" label="Nome">
                      <Input
                        type="text"
                        autoComplete="nope" autoCorrect="off" spellCheck="off"
                        required
                        value={this.state.billingInfo.firstName}
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
                        onChange={(e) =>
                          this.setNestedState(
                            "billingInfo.firstName",
                            e.currentTarget.value
                          )
                        }
                      />
                    </TextField>
                    <TextField className="md:mr-4" label="Cognome">
                      <Input
                        type="text"
                        autoComplete="nope" autoCorrect="off" spellCheck="off"
                        required
                        value={this.state.billingInfo.lastName}
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
                        onChange={(e) =>
                          this.setNestedState(
                            "billingInfo.lastName",
                            e.currentTarget.value
                          )
                        }
                      />
                    </TextField>
                    <TextField className="md:ml-4" label="Codice Fiscale">
                      <Input
                        type="text"
                        autoComplete="nope" autoCorrect="off" spellCheck="off"
                        required
                        pattern="^[0-9A-Z]{16}$"
                        value={this.state.billingInfo.taxCode}
                        ref={this.taxRef}
                        onChange={(e) =>
                          this.setNestedState(
                            "billingInfo.taxCode",
                            e.currentTarget.value
                          )
                        }
                        onInput={(e) => {
                          e.currentTarget.setCustomValidity("");
                          if (e.currentTarget.value.length > 16) {
                            e.currentTarget.value = e.currentTarget.value.slice(0, 16);
                          }
                        }}
                        onInvalid={(e) => {
                          if (e.currentTarget.value === "") {
                            e.currentTarget.setCustomValidity("Per favore compila questo campo");
                          } else {
                            e.currentTarget.setCustomValidity("Inserisci un codice fiscale valido");
                          }
                        }}
                      />
                    </TextField>
                  </div>
                )}
              </>
              <label className="checkbox-container mx-2 mb-3">
                Hai un’azienda?
                <input
                  type="checkbox"
                  checked={this.state.hasCompany}
                  onChange={(e) => {
                    let newBillingInfo = this.state.billingInfo;
                    if (!newBillingInfo.sdiIdentifier) {
                      newBillingInfo.sdiIdentifier = {
                        type: "code",
                        value: "",
                      };
                    }
                    this.setState({
                      hasCompany: e.currentTarget.checked,
                      billingInfo: newBillingInfo,
                    });
                  }}
                />
                <span className="checkmark"></span>
              </label>
              <span>
                  <div className='label-top pl-4 pt-1'>
                    Regione
                  </div>
                  <span
                    className={
                      (optional(this.state.billingInfo, "region.name")
                        ? "text-black province-border"
                        : "text-gray-500 province-border") + " p-2 md:mr-4 pl-2 flex-1"
                    }
                  >
                    <button onClick={this.pickRegion} className='pl-3'>
                      {optional(
                        this.state.billingInfo,
                        "region.name",
                        "Seleziona la regione"
                      )}
                    </button>
                    <i
                      className={clsx(
                        "fas fa-times cursor-pointer pt-1 text-black pl-2",
                        { hidden: !optional(this.state.billingInfo, "region.name") }
                      )}
                      onClick={() => {
                        this.setNestedState("billingInfo.region", null);
                        setTimeout(
                          () => this.setNestedState("billingInfo.province", null),
                          0
                        );
                        setTimeout(
                          () => this.setNestedState("billingInfo.cityDto", null),
                          0
                        );
                      }}
                    />
                  </span>
                </span>
                <span>
                  <div className='label-top pl-4 pt-1'>
                  Provincia
                  </div>
                  <span
                    className={
                      (optional(this.state.billingInfo, "province.name")
                        ? "text-black province-border"
                        : "text-gray-500 province-border") + " p-2 md:mr-4 pl-2 flex-1"
                    }
                  >
                    <button onClick={this.pickProvince} className='pl-3'>
                      {optional(
                        this.state.billingInfo,
                        "province.name",
                        "Seleziona la Provincia"
                      )}
                    </button>
                    <i
                      className={clsx(
                        "fas fa-times cursor-pointer pt-1 text-black pl-2",
                        { hidden: !optional(this.state.billingInfo, "province.name") }
                      )}
                      onClick={() => {
                      this.setNestedState("billingInfo.province", null);
                      setTimeout(
                        () => this.setNestedState("billingInfo.cityDto", null),
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
                      (optional(this.state.billingInfo, "cityDto.name")
                        ? "text-black province-border"
                        : "text-gray-500 province-border") + " p-2 md:mr-4 pl-2 flex-1"
                    }
                  >
                    <button onClick={this.pickCity} className='pl-3'>
                      {optional(
                        this.state.billingInfo,
                        "cityDto.name",
                        "Seleziona il Comune"
                      )}
                    </button>
                    <i
                      className={clsx(
                        "fas fa-times cursor-pointer pt-1 text-black pl-2",
                        { hidden: !optional(this.state.billingInfo, "cityDto.name") }
                      )}
                      onClick={() => {
                        this.setNestedState("billingInfo.cityDto", null);
                      }}
                    />
                  </span>
                </span>
                <div className="flex justify-between flex-wrap pt-2 md:flex-no-wrap">
                  <TextField className="md:mr-4" label="Codice Postale">
                    <Input
                      type="number"
                      autoComplete="nope" autoCorrect="off" spellCheck="off"
                      maxLength="5"
                      required
                      value={this.state.billingInfo.postalCode}
                      onChange={(e) =>
                        this.setNestedState(
                          "billingInfo.postalCode",
                          e.currentTarget.value
                        )
                      }
                      onInput={(e) => {
                        e.currentTarget.setCustomValidity("");
                        if (e.currentTarget.value.length > 5) {
                          e.currentTarget.value = e.currentTarget.value.slice(0, 5);
                        }
                      }}
                      onInvalid={(e) => {
                        if (e.currentTarget.value === "") {
                          e.currentTarget.setCustomValidity("Per favore compila questo campo");
                        } else {
                          e.currentTarget.setCustomValidity("Inserisci un codice postale valido");
                        }
                      }}
                    />
                  </TextField>
                </div>
                <div className="flex justify-between flex-wrap pt-2 md:flex-no-wrap">
                  <TextField className="md:mr-4" label="Indirizzo">
                    <Input
                      type="text"
                      autoComplete="nope" autoCorrect="off" spellCheck="off"
                      max="100"
                      required
                      value={this.state.billingInfo.addressLine1 || ""}
                      onChange={(e) =>
                        this.setNestedState(
                          "billingInfo.addressLine1",
                          e.currentTarget.value
                        )
                      }
                      onInvalid={(e) => {
                        if (e.currentTarget.value === "") {
                          e.currentTarget.setCustomValidity("Per favore compila questo campo");
                        } else if (e.currentTarget.value.length > 100) {
                          e.currentTarget.setCustomValidity("L'indirizzo non può essere più lungo di 100 caratteri");
                        }
                      }}
                      onInput={(e) => {
                        e.currentTarget.setCustomValidity("");
                        if (e.currentTarget.value.length > 100) {
                          e.currentTarget.value = e.currentTarget.value.slice(0, 100);
                        }
                      }}
                    />
                  </TextField>
                </div>
                <div className="flex justify-between flex-wrap pt-2 md:flex-no-wrap">
                  <TextField className="md:mr-4" label="Indirizzo Alternativo">
                    <Input
                      type="text"
                      autoComplete="nope" autoCorrect="off" spellCheck="off"
                      max="100"
                      value={this.state.billingInfo.addressLine2 || ""}
                      onChange={(e) =>
                        this.setNestedState(
                          "billingInfo.addressLine2",
                          e.currentTarget.value
                        )
                      }
                      onInvalid={(e) => {
                        if (e.currentTarget.value.length > 100) {
                          e.currentTarget.setCustomValidity("L'indirizzo non può essere più lungo di 100 caratteri");
                        }
                      }}
                      onInput={(e) => {
                        e.currentTarget.setCustomValidity("");
                        if (e.currentTarget.value.length > 100) {
                          e.currentTarget.value = e.currentTarget.value.slice(0, 100);
                        }
                      }}
                    />
                  </TextField>
                </div>
            </form>
            <div className="flex-1 text-center my-4">
              <span
                className="md:inline-flex mr-4 md:mr-8 cursor-pointer"
                onClick={() => {
                  this.setState({
                    editMode: false,
                    billingInfo: this.state.baseState.billingInfo,
                    hasCompany: this.state.baseState.hasCompany,
                  });
                }}
              >
                <span className="text-14 px-2 py-1 bg-dark-gray rounded text-white">
                  Annulla
                </span>
              </span>
              <span
                className="md:inline-flex mr-4 md:mr-8 cursor-pointer"
                onClick={this.save}
              >
                <span className={(this.readyToSubmit() ? "bg-turquoise" : "bg-gray-500") + " text-14 px-2 py-1 rounded text-white"}>
                  Salva
                </span>
              </span>
            </div>
          </div>
        }
      </div>
    );
  }

  readyToSubmit() {
    const b = this.state.billingInfo;
    return (
      optional(b.cityDto, "id") &&
      b.postalCode &&
      b.addressLine1 &&
      ((this.state.hasCompany && b.businessName && b.vat) ||
        (!this.state.hasCompany && b.taxCode && b.firstName && b.lastName))
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withRouter(BillingInfoStore));
