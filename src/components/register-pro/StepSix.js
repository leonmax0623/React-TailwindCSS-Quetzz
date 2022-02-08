import React from "react";
import Component from "../../Component";
import TextField, { Input } from "@material/react-text-field";
import DropdownMenu from "../util/DropdownMenu";
import { proProfileAPI } from "../../resources/proProfile";
import {
  handleTitle,
  defaultRequiredMessage,
  alphanumericPattern,
  alphanumericPatternMessage,
  createLoaderModal,
  optional,
  validateTaxCodeChecksum,
  validateVatChecksum,
  createModal,
} from "../../helpers";
import clsx from "clsx";
import OptionsModal from "../util/modals/OptionsModal";
import { filtersAPI } from "../../resources/filters";
import { connect } from "react-redux";
import { cdnify } from "../../actions/util";
import Toggle from "react-toggle";
var val;

class StepSix extends Component {
  citiesLoaded = null;
  regionsLoaded = null;
  provincesLoaded = null;
  constructor(props) {
    super(props);
    this.state = {
      vat: this.props.vat || "",
      taxCode: this.props.taxCode || "",
      sdiIdentifier: {
        type: optional(this.props.sdiIdentifier, "type", "code"),
        value: optional(this.props.sdiIdentifier, "value", ""),
      },
      businessName: this.props.businessName,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      city: this.props.city,
      province: this.props.province,
      region: this.props.region,
      addressLine1: this.props.addressLine1,
      addressLine2: this.props.addressLine2,
      postalCode: this.props.postalCode,
      cities: [],
      regions: [],
      provinces: [],
      hasCompany: this.props.hasCompany || false,
    };
  }

  form = React.createRef();
  form2 = React.createRef();
  vatRef = React.createRef();
  taxRef = React.createRef();

  pickRegion = () =>
    createLoaderModal(this.regionsLoaded)
      .then(() => createModal(OptionsModal, { options: this.state.regions }))
      .then((region) => {
        this.setState({ region: region });
        this.provincesLoaded = filtersAPI
          .provinceSpecific(optional(this.state.region, "name"))
          .then((provinces) => this.setState({ provinces }));
      })
      .catch((err) => null);

  pickProvince = () => {
    if (this.state.region) {
      createLoaderModal(this.provincesLoaded)
        .then(() =>
          createModal(OptionsModal, { options: this.state.provinces })
        )
        .then((province) => {
          this.setState({ province: province });
          this.citiesLoaded = filtersAPI
            .cities(optional(this.state.province, "id"))
            .then((cities) => this.setState({ cities }));
        })
        .catch((err) => null);
    }
  };

  pickCity = () => {
    if (this.state.province) {
      return createLoaderModal(this.citiesLoaded)
        .then(() => createModal(OptionsModal, { options: this.state.cities }))
        .then((city) => this.setState({ city: city }));
      // .catch(() => this.setState({ city: null }));
    }
  };

  componentDidMount() {
    super.componentDidMount();
    this.regionsLoaded = filtersAPI
      .regionAll()
      .then((regions) => this.setState({ regions }));
  }

  field(label, name, type = "text", required = true, attributes) {
    return (
      <TextField label={label}>
        <Input
          title={required ? defaultRequiredMessage: ""}
          required={required}
          autoComplete="nope" autoCorrect="off" spellCheck="off"
          type={type}
          value={this.state[name]}
          onChange={(e) => {
            let val = e.currentTarget.value;
            if (val == "" && type != "date") {
              e.currentTarget.setCustomValidity(
                "Per favore compila questo campo"
              );
            } else {
              e.currentTarget.setCustomValidity("");
            }
            this.handleInputChange(name, val);
          }}
        />
      </TextField>
    );
  }

  handleInputChange(key, value) {
    this.setState({ [key]: value });
  }

  inputForms() {
    return (
      <div>
        <form autoComplete="nope" autoCorrect="off" spellCheck="off" ref={this.form} className="my-8">
          {this.state.hasCompany ? (
            <>
              {this.field("Ragione sociale", "businessName", "text", true, {
                pattern: "[-.'ws]+",
              })}
              {this.field("n° Partita IVA", "vat", "text", true, {
                pattern: "^[0-9]{11}$",
                ref: this.vatRef,
              })}

              <div className="flex">
                <div
                  className="flex items-center"
                  style={{ paddingTop: this.isMobile() ? "0" : "5px" }}
                >
                  <Toggle
                    icons={false}
                    id="sdiIdentifier"
                    defaultChecked={this.state.sdiIdentifier.type === "code"}
                    onChange={(e) =>
                      this.setNestedState(
                        "sdiIdentifier.type",
                        e.currentTarget.checked ? "code" : "pec"
                      )
                    }
                  />
                  <label className="ml-2" htmlFor="sdiIdentifier">
                    {this.state.sdiIdentifier.type === "code" ? "SDI" : "PEC"}
                  </label>
                </div>
                <TextField
                  label={
                    this.state.sdiIdentifier.type === "code" ? "SDI" : "PEC"
                  }
                  className="flex-1 ml-2"
                >
                  <Input
                    maxLength="7"
                    autoComplete="nope" autoCorrect="off" spellCheck="off"
                    minLength="7"
                    type="text"
                    required
                    title={defaultRequiredMessage}
                    value={this.state.sdiIdentifier.value}
                    onChange={(e) => {
                      handleTitle(e)
                      this.setNestedState(
                        "sdiIdentifier.value",
                        e.currentTarget.value
                      )
                    }}
                  />
                </TextField>
              </div>
            </>
          ) : (
            <>
              <TextField label="Nome">
                <Input
                  required={true}
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  type="text"
                  title={defaultRequiredMessage}
                  value={this.state.firstName}
                  maxLength="30"
                  onChange={(e) => {
                    handleTitle(e)
                    val =
                      e.currentTarget.value.match("^[a-zA-Z ]*$") != null
                        ? e.currentTarget.value
                        : val;
                    if (val == "") {
                      e.currentTarget.setCustomValidity(
                        "Per favore compila questo campo"
                      );
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                    this.handleInputChange("firstName", val);
                  }}
                  pattern={alphanumericPattern}
                />
              </TextField>

              <TextField label="Cognome">
                <Input
                  required={true}
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  type="text"
                  title={defaultRequiredMessage}
                  value={this.state.lastName}
                  maxLength="30"
                  onChange={(e) => {
                    handleTitle(e)
                    val =
                      e.currentTarget.value.match("^[a-zA-Z ]*$") != null
                        ? e.currentTarget.value
                        : val;
                    if (val == "") {
                      e.currentTarget.setCustomValidity(
                        "Per favore compila questo campo"
                      );
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                    this.handleInputChange("lastName", val);
                  }}
                  pattern={alphanumericPattern}
                />
              </TextField>

              <TextField label="Codice Fiscale">
                <Input
                  required={true}
                  type="text"
                  autoComplete="nope" autoCorrect="off" spellCheck="off"
                  ref={this.taxRef}
                  title={defaultRequiredMessage}
                  value={this.state.taxCode}
                  maxLength={16}
                  pattern="^[0-9A-Z]{16}$"
                  onInvalid={(e) => {
                    if (e.currentTarget.value === "") {
                      e.currentTarget.setCustomValidity(
                        "Per favore compila questo campo"
                      );
                    }
                  }}
                  onChange={(e) => {
                    handleTitle(e)
                    let val = e.currentTarget.value.toUpperCase().trim();
                    if (!validateTaxCodeChecksum(val)) {
                      e.currentTarget.setCustomValidity(
                        "Oops! Sei sicuro di aver inserito un codice fiscale corretto?"
                      );
                    } else {
                      e.currentTarget.setCustomValidity("");
                    }
                    this.handleInputChange("taxCode", val);
                  }}
                />
              </TextField>
            </>
          )}
          <label className="checkbox-container mt-3 mx-2">
            Hai un'azienda?
            <input
              type="checkbox"
              checked={this.state.hasCompany}
              onChange={(e) =>
                this.setState({ hasCompany: e.currentTarget.checked })
              }
            />
            <span className="checkmark"></span>
          </label>
        </form>
        <div className="flex-column justify-content-center">
          <div
            className={
              (optional(this.state.region, "name")
                ? "text-black province-border "
                : "province-border text-gray-500") + " md:mr-4"
            }
          >
            <button onClick={this.pickRegion} className='pb-3 pl-3 pr-3'>
              {optional(this.state.region, "name", "Seleziona la regione")}
            </button>
            <i
              className={clsx("fas fa-times cursor-pointer text-black pl-2 pt-1", {
                hidden: !optional(this.state.region, "name"),
              })}
              onClick={() => {
                this.setState({ region: null });
                setTimeout(() => this.setState({ province: null }, null), 0);
                setTimeout(() => this.setState({ city: null }), 0);
              }}
            ></i>
          </div>

          <div
            className={
              (optional(this.state.province, "name")
                ? "text-black province-border "
                : "text-gray-500 province-border ") + " pt-3 md:mr-4"
            }
          >
            <button onClick={this.pickProvince} className=' pt-2 pb-3 pl-3 pr-3 '>
              {optional(this.state.province, "name", "Seleziona la Provincia")}
            </button>
            <i
              className={clsx("fas fa-times cursor-pointer text-black pl-2 pt-3", {
                hidden: !optional(this.state.province, "name"),
              })}
              onClick={() => {
                this.setState({ province: null });
                setTimeout(() => this.setState({ city: null }), 0);
              }}
            ></i>
          </div>
          <div
            className={
              (optional(this.state.city, "name")
                ? "text-black province-border "
                : "text-gray-500 province-border ") + " pt-3 md:mr-4"
            }
          >
            <button onClick={this.pickCity} className='pt-2 pb-3 pl-3 pr-3'>
              {optional(this.state.city, "name", "Seleziona il Comune")}
            </button>
            <i
              className={clsx("fas fa-times  cursor-pointer text-black pl-2 pt-3", {
                hidden: !optional(this.state.city, "name"),
              })}
              onClick={() => {
                this.setState({ city: null });
              }}
            ></i>
          </div>
        </div>
        <form autoComplete="nope" autoCorrect="off" spellCheck="off" ref={this.form2} className="">
          <div className="">
            <TextField label="Codice Postale">
              <Input
                required={true}
                title={defaultRequiredMessage}
                autoComplete="nope" autoCorrect="off" spellCheck="off"
                type="text"
                value={this.state["postalCode"]}
                maxLength={5}
                onChange={(e) => {
                  handleTitle(e)
                  val = parseInt(
                    e.currentTarget.value < 2147483648
                      ? e.currentTarget.value
                      : val
                  );
                  if (val == "") {
                    e.currentTarget.setCustomValidity(
                      "Per favore compila questo campo"
                    );
                  } else if (val > 2147483648) {
                    e.currentTarget.setCustomValidity(
                      "valore fuori ambito, inserisci un numero piccolo"
                    );
                  } else {
                    e.currentTarget.setCustomValidity("");
                  }
                  this.handleInputChange(
                    "postalCode",
                    isNaN(val) ? "" : `${val}`
                  );
                }}
              />
            </TextField>
            {this.field("Indirizzo", "addressLine1", "text", true, {maxLength: 100})}
            {this.field("Indirizzo alternativo", "addressLine2", "text", false, {maxLength: 100})}
          </div>
        </form>
      </div>
    );
  }
  render() {
    return (
      <div className="narrow-modal md:my-32">
        <h1 className="text-3xl text-black text-raleway font-bold">
          Profilo Professionista
        </h1>
        <p>
          <span className="text-gray-500">Passaggio</span>
          <span> 6 </span>
          <span className="text-gray-500"> di </span>
          <span>6 </span>
        </p>
        {this.inputForms()}
        <div className="flex">
          <button
            className="bg-turquoise p-6 text-white flex-1 mr-2 mt-6"
            onClick={() =>
              this.props.onRetreat({
                vat: this.state.vat,
                businessName: this.state.businessName,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                taxCode: this.state.taxCode,
                cityId: optional(this.state.city, "id"),
                region: this.state.region,
                province: this.state.province,
                city: this.state.city,
                addressLine1: this.state.addressLine1,
                addressLine2: this.state.addressLine2,
                postalCode: this.state.postalCode,
                sdiIdentifier: this.state.sdiIdentifier,
                hasCompany: this.state.hasCompany,
              })
            }
          >
            Indietro
          </button>
          <button
            className={
              (this.ready() ? "bg-turquoise" : "bg-gray-500") +
              " p-6 text-white flex-1 mt-6"
            }
            onClick={() => {
              if (!this.ready()) {
                return;
              }
              if (this.vatRef.current) {
                if (!validateVatChecksum(this.state.vat)) {
                  this.vatRef.current.inputElement.setCustomValidity(
                    "Oops! Sei sicuro di aver inserito un numero di p.iva corretto?"
                  );
                } else {
                  this.vatRef.current.inputElement.setCustomValidity("");
                }
              }

              // if (this.taxRef.current) {
              //   if (!validateTaxCodeChecksum(this.state.taxCode)) {
              //     this.taxRef.current.inputElement.setCustomValidity(
              //       "Oops! Sei sicuro di aver inserito un codice fiscale corretto?"
              //     );
              //   } else {
              //     this.taxRef.current.inputElement.setCustomValidity("");
              //   }
              // }
              if (
                this.form.current.checkValidity() &&
                this.form2.current.checkValidity()
              ) {
                createLoaderModal(
                  proProfileAPI.register({
                    billingInfo: {
                      cityId: optional(this.state.city, "id"),
                      addressLine1: this.state.addressLine1,
                      postalCode: parseInt(this.state.postalCode),
                      type: this.state.hasCompany
                        ? "VATBillingInfo"
                        : "SSNBillingInfo",
                      ...(this.state.addressLine2
                        ? { addressLine2: this.state.addressLine2 }
                        : {}),
                      ...(this.state.hasCompany
                        ? { sdiIdentifier: this.state.sdiIdentifier }
                        : {}),
                      ...(this.state.hasCompany
                        ? { businessName: this.state.businessName }
                        : { firstName: this.state.firstName,
                            lastName: this.state.lastName  }),
                      ...(this.state.hasCompany
                        ? { vat: this.state.vat }
                        : { taxCode: this.state.taxCode }),
                    },
                    proUserProfileRequestDto: {
                      baseProUserProfileRequestData: {
                        knownLanguages: this.props.knownLanguages,
                        profession: this.props.profession,
                        userCertificationInfos: this.props.userCertificationInfos,
                        userEducationInfos: this.props.userEducationInfos,
                        userExperienceInfos: this.props.userExperienceInfos
                      },
                      cdnProUserProfileRequestData: {
                        offers: this.props.offers,
                        ...(this.props.photo
                          ? { photo: cdnify(this.props.photo) }
                          : {})
                      }
                    },
                  })
                ).then(() => this.props.onAdvance());
              } else {
                this.form.current.reportValidity();
                // ||                  this.form2.current.reportValidity();
              }
            }}
          >
            Continua
          </button>
        </div>
      </div>
    );
  }

  ready() {
    return !!(
      ((this.state.hasCompany &&
        this.state.vat &&
        this.state.businessName &&
        optional(this.state.sdiIdentifier, "value")) ||
        (!this.state.hasCompany &&
          this.state.firstName &&
          this.state.lastName &&
          this.state.taxCode)) &&
      optional(this.state.city, "id") &&
      this.state.addressLine1 &&
      this.state.postalCode
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(StepSix);
