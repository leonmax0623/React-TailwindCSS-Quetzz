import React from "react";
import Component from "../../../Component";
import { debounce } from "../../../baseHelpers";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";
import TextField, { Input } from "@material/react-text-field";
import Toggle from "react-toggle";
import moment from "moment";
import { optional } from "../../../helpers";

const maxRange = 100;
const turquoise = { backgroundColor: "#2ec6d5" };
const mapToRange = (range) =>
  [maxRange * range[0], maxRange * range[1]].map((i) => i.toFixed());
const mapFromRange = (range) => [range[0] / maxRange, range[1] / maxRange];

export default class ApplyModal extends Component {
  state = {
    priceRange: [0, 0],
    deadline: "",
    rangeKey: 1,
    priceRangeType: "HOURLY",
    noDeadline: false,
  };

  rangeMin = React.createRef();

  render() {
    return (
      <>
        <div className="mb-12">
          <h1 className="text-raleway font-bold text-28 mb-12">
            Stabilisci un range di Prezzo e imposta la durata del tuo Servizio
          </h1>
          <p className="text-gray text-10 mb-3">
            Stabilisci un Prezzo minimo ed uno massimo
          </p>
          <div className="flex mb-4">
            <TextField label="Minimo">
              <Input
                ref={this.rangeMin}
                type="number"
                value={this.state.priceRange[0]}
                min="0"
                max="10000"
                onFocus={event => event.target.select()}
                onChange={(e) => {
                    const val = parseInt(e.currentTarget.value)
                    this.setState({
                      priceRange: [
                        isNaN(val) ? 0 : val,
                        this.state.priceRange[1] >= val ? 
                          this.state.priceRange[1] : val,
                      ],
                      rangeKey: this.state.rangeKey + 1,
                    })
                  }
                }
                onBlur={(e) => {
                  const val = parseInt(e.currentTarget.value)
                  if (val > parseInt(this.state.priceRange[1])) {
                    this.setState({
                      priceRange: [
                        this.state.priceRange[0],
                        this.state.priceRange[0]
                      ]
                    });
                  }
                }}
              />
            </TextField>
            <TextField label="Massimo">
              <Input
                type="number"
                value={this.state.priceRange[1]}
                min={this.state.priceRange[0]}
                autoComplete="nope" autoCorrect="off" spellCheck="off"
                max="10000"
                onFocus={event => event.target.select()}
                onChange={(e) =>
                  this.setState({
                    priceRange: [
                      this.state.priceRange[0],
                      parseInt(e.currentTarget.value)
                    ],
                    rangeKey: this.state.rangeKey + 1,
                  })
                }
                onBlur={(e) => {
                  if (parseInt(e.currentTarget.value) < parseInt(this.state.priceRange[0])) {
                    this.setState({
                      priceRange: [
                        this.state.priceRange[0],
                        this.state.priceRange[0]
                      ]
                    });
                  }
                }}
              />
            </TextField>
          </div>
          <div
            className="flex items-center m-8 ml-0"
            style={{ paddingTop: this.isMobile() ? "0" : "5px" }}
          >
            <Toggle
              icons={false}
              id="priceRangeType"
              defaultChecked={this.state.priceRangeType === "HOURLY"}
              onChange={(e) =>
                this.setState({
                  priceRangeType: e.currentTarget.checked
                    ? "HOURLY"
                    : "AT_COMPLETION",
                })
              }
            />
            <label className="ml-2" htmlFor="priceRangeType">
              {this.state.priceRangeType === "HOURLY"
                ? "Tariffa oraria"
                : "A lavoro completato"}
            </label>
          </div>
          {/*<Range
            key={this.state.rangeKey}
            defaultValue={mapFromRange(this.state.priceRange)}
            step={0.1}
            allowCross={false}
            trackStyle={[turquoise]}
            handleStyle={[turquoise, turquoise]}
            onChange={debounce(
              (range) => this.setState({ priceRange: mapToRange(range) }),
              100
            )}
            className="mb-9"
            />*/}
          <TextField label={`Data di Termine`}>
            <Input
              type="date"
              autoComplete="nope" autoCorrect="off" spellCheck="off"
              required={!this.state.noDeadline}
              value={this.state.noDeadline ? "" : this.state.deadline}
              disabled={this.state.noDeadline}
              min={moment().add(1, "day").format("YYYY-MM-DD")}
              max={moment().add(90, "day").format("YYYY-MM-DD")}
              onInvalid={(e) => {
                e.currentTarget.setCustomValidity("Inserisci una data corretta")
              }}
              onChange={(e) =>
                this.setState({ deadline: e.currentTarget.value })
              }
            />
          </TextField>
        </div>
        <label className="checkbox-container my-12 md:my-8 mx-2">
          <span class="text-12">
            Per questo servizio non è prevista una data di termine
          </span>
          <input
            type="checkbox"
            checked={this.state.noDeadline}
            onChange={(e) =>
              this.setState({ noDeadline: e.currentTarget.checked })
            }
          />
          <span className="checkmark"></span>
        </label>
        {this.state.noDeadline && (
          <p className="text-red-500 my-4 text-center text-12">
            La richiesta verrà completata automaticamente in 30 giorni
          </p>
        )}
        <button
          className={
            (this.readyToSubmit() ? "bg-turquoise" : "bg-gray-500") +
            " w-full py-6 text-white rounded"
          }
          onClick={() => {
            if (!this.readyToSubmit()) {
              return;
            }
            this.props.onOk({
              deadline: this.state.noDeadline
                ? null
                : this.state.deadline + "T00:00:00.000Z",
              start: +this.state.priceRange[0],
              end: +this.state.priceRange[1],
              type: this.state.priceRangeType
            });
          }}
        >
          Continua
        </button>
      </>
    );
  }

  readyToSubmit() {
    return (
      (this.state.noDeadline || this.state.deadline) &&
      optional(this.state.priceRange, "1") && (parseInt(this.state.priceRange[1]) >= parseInt(this.state.priceRange[0]))
    );
  }
}
