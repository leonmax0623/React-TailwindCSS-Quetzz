import TextField, { Input } from "@material/react-text-field";
import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";
import Component from "../Component";
import { createLoaderModal, createModal, optional } from "../helpers";
import { filtersAPI } from "../resources/filters";
import { requestAPI } from "../resources/requests";
import DropdownMenu from "./util/DropdownMenu";
import ConfirmationModal from "./util/modals/ConfirmationModal";
import OptionsModal from "./util/modals/OptionsModal";

export default class Login extends Component {
  provincesLoaded = null;
  citiesLoaded = null;

  state = {
    done: false,
    introShown: false,
    request: {
      expiration: "Scadrà in 30 giorni",
      category: null,
      city: null,
      province: null,
    },
    categories: [],
    subcategories: [],
    cities: [],
    provinces: [],
    region: [],
  };

  check() {
    window.onbeforeunload = () => {
      alert("dont go");
    };
  }

  pickProvince = () =>
    createLoaderModal(this.provincesLoaded)
      .then(() => createModal(OptionsModal, { options: this.state.provinces }))
      .then((province) => {
        this.setNestedState("request.province", province);
        this.citiesLoaded = filtersAPI
          .cities(province.id)
          .then((cities) => this.setState({ cities }));
      })
      .catch((err) => null)
      .then(() => null);


  pickCity = () => {
        if (this.state.request.province) {
          return createLoaderModal(this.citiesLoaded)
            .then(() => createModal(OptionsModal, { options: this.state.cities }))
            .then((city) => this.setNestedState("request.city", city))
            // .catch(() => this.setNestedState("request.city", null));
        }
      };

  componentDidMount() {
    super.componentDidMount();
    this.provincesLoaded = filtersAPI
      .provinces()
      .then((provinces) => this.setState({ provinces: provinces.sort(function(a, b) {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
       }) }));
    filtersAPI.cities().then((cities) => {
      this.setState({ cities })
  });
    filtersAPI.categories().then((categories) => {
      this.setState({ categories: categories.sort(function(a, b) {
        if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
       })  })
  });
  }

  categoryPicker() {
    return [
      <p className="my-8 text-center text-2xl text-raleway font-bold mb-8" key={1}>
        Crea una nuova Richiesta
      </p>,
      <div className="wide-modal mx-8 bg-white py-4" key={2}>
        <div className="flex justify-around mb-12">
          <div
            className="h-32 md:h-64 flex-1 px-16 bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('/img/services.png')" }}
          />
          <div
            className="h-32 md:h-64 flex-1 px-16 bg-center bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('/img/products.png')" }}
          />
        </div>
        <p className="mb-10">
          La tua ricerca su Quetzz parte da qua!
          <br></br>
          Tieni sempre bene a mente due cose:
          <br></br>
          <br></br>
          1. Su Quetzz l'anonimato è garantito perché c'è il tuo nickname a
          proteggerti! Ciò significa che ti puoi permettere di chiedere
          qualsiasi cosa!
          <br></br>
          <br></br>
          2. Sii esaustivo! Più informazioni la tua richiesta conterrà, più
          dettagliate saranno le offerte che riceverai!
        </p>
        <button
          className="bg-turquoise text-white py-4 px-12 mt-4 mb-4 mx-auto block"
          onClick={() => {
            requestAPI
              .check()
              .then(() => this.setState({ introShown: true }))
              .catch(() => null)
          } }
        >
          Nuova Richiesta
        </button>
      </div>,
    ];
  }

  form() {
    const r = this.state.request;
    return (
      <div className="bg-white p-4 md:p-16 md:mt-8">
        <div className="mb-16">
          <div className="flex justify-between">
            <p className="text-raleway font-bold text-16 md:text-20 mb-16 md:mb-0">
              Crea una nuova Richiesta
            </p>
          </div>
          <div>
            {this.dropdown(
              "Seleziona Categoria",
              "category",
              this.state.categories,
              "fas fa-th-large",
              (item) => {
                if (item?.id) {
                  this.setNestedState("request.category", item);
                  setTimeout(
                    () => this.setNestedState("request.subcategory", null),
                    0
                  );
                  filtersAPI
                    .subcategories(item.id)
                    .then((subcategories) => this.setState({ subcategories: subcategories.sort(function(a, b) {
                      if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                      if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                      return 0;
                     })  }));
                } else {
                  this.setState({
                    subcategories: [],
                    request: {
                      ...this.state.request,
                      category: null,
                      subcategory: null,
                    },
                  });
                }
              }
            )}
          </div>
          <div className="flex flex-wrap justify-between">
            {this.dropdown(
              "Seleziona Sottocategoria",
              "subcategory",
              this.state.subcategories,
              "fas fa-layer-group",
              (item) => this.setNestedState("request.subcategory", item),
              !optional(this.state.request.category, "id")
            )}
          </div>
          <div className="flex justify-between flex-wrap md:flex-no-wrap">
            <span
              className={
                (optional(this.state.request, "province.name")
                  ? "text-black province-border "
                  : "text-gray-500 province-border ") + " p-4 md:mr-4 flex-1"
              }
            >
              <button onClick={this.pickProvince}>
                {optional(
                  this.state.request,
                  "province.name",
                  "Seleziona la Provincia"
                )}
              </button>
              <i
                className={clsx("fas fa-times cursor-pointer text-black pl-2", {
                  hidden: !optional(this.state.request, "province.name"),
                })}
                onClick={() => {
                  this.setNestedState("request.province", null);
                  setTimeout(
                    () => this.setNestedState("request.city", null),
                    0
                  );
                }}
              ></i>
            </span>
            <span
              className={
                (optional(this.state.request, "city.name")
                  ? "text-black province-border "
                  : "text-gray-500 province-border ") + " p-4 ml-4 flex-1"
              }
            >
              <button onClick={this.pickCity}>
                {optional(
                  this.state.request,
                  "city.name",
                  "Seleziona il Comune"
                )}
              </button>
              <i
                className={clsx("fas fa-times cursor-pointer text-black pl-2", {
                  hidden: !this.state.request.city ? true : false,
                })}
                onClick={() => this.setNestedState("request.city", null)}
              ></i>
            </span>
          </div>
          <div className='pt-2'>
            {this.field(
              "Scade in...",
              "expiration",
              <i className="fas fa-calendar-times"></i>,
              null,
              false,
              true
            )}
            {this.field("Titolo", "title", null, null, false, false, 150)}
            {this.field(
              "Descrizione",
              "description",
              null,
              null,
              true,
              false,
              1500
            )}
          </div>
          
        </div>
        <button
          className={clsx(
            "text-white rounded-sm px-16 py-4 w-full md:w-auto",
            this.readyToSubmit() ? "bg-turquoise" : "bg-gray-500"
          )}
          onClick={() => {
            if (this.readyToSubmit()) {
              createModal(ConfirmationModal, { title: "È tutto corretto?" })
                .then(() => requestAPI.store(this.state.request))
                .then(() => this.setState({ done: true }))
                .catch(() => null);
            }
          }}
        >
          Pubblica
        </button>
      </div>
    );
  }

  readyToSubmit() {
    const r = this.state.request;
    return r.title && r.description && r.city?.id && r.subcategory?.id;
  }

  dropdown(label, name, options, icon, onSelect, disabled = false) {
    return (
      <DropdownMenu
        icon={<i className={icon}></i>}
        value={optional(this.state.request, name) || { id: 0, name: label }}
        items={options}
        onSelect={
          onSelect || ((item) => this.setNestedState(`request.${name}`, item))
        }
        className="p-4 border-b border-gray-300 flex-1"
        inputClassName="bg-white"
        fullWidth
        listClassName=""
        disabled={disabled}
      />
    );
  }

  field(
    label,
    name,
    icon = null,
    className = "",
    textarea = false,
    disabled = false,
    limit = 0
  ) {
    return (
      <TextField
        label={label}
        textarea={textarea}
        className={className}
        leadingIcon={icon}
      >
        <Input
          value={this.state.request[name]}
          onChange={(e) =>
            this.setState({
              request: { ...this.state.request, [name]: e.currentTarget.value },
            })
          }
          disabled={disabled}
          maxLength={limit}
        />
      </TextField>
    );
  }

  updateVisibilities(key, val) {
    this.setState({
      visibilities: { ...this.state.visibilities, [key]: val },
    });
  }

  doneMessage() {
    return (
      <div className="narrow-modal mb-16 md:mt-32">
        <div className="flex mb-4">
          <i className="far fa-check-circle fa-4x pr-8 pb-8 pl-4 pt-4 text-turquoise"></i>
          <div>
            <h1 className="text-3xl text-black text-raleway font-bold">
              Complimenti!
            </h1>
            <p className="text-gray-500">La richiesta è stata completata!</p>
          </div>
        </div>
        <p>Ci stiamo prendendo un momento per controllarla.</p>
        <p className="mb-16">Tieni sott'occhio le notifiche!</p>
        <Link
          to="/requests"
          className="w-full bg-turquoise text-white block py-4 text-center rounded-sm mb-4"
        >
          Vai a "Le mie Richieste"
        </Link>
        <Link
          to="/"
          className="w-full bg-gray-900 text-white block py-4 text-center rounded-sm"
        >
          Vai a "Bacheca"
        </Link>
      </div>
    );
  }

  render() {
    let body;
    if (this.state.done) {
      body = this.doneMessage();
    } else if (this.state.introShown) {
      body = this.form();
    } else {
      body = this.categoryPicker();
    }
    const narrowMargins = this.isMobile() && this.state.request.category;
    return (
      <div
        className={clsx({
          container: true,
          "py-16": !narrowMargins && !this.isMobile() && this.state.done,
          "py-12 bg-white":
            narrowMargins && !this.isMobile() && this.state.done,
        })}
      >
        {body}
      </div>
    );
  }
}
