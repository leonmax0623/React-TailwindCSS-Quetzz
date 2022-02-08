import React from "react";
import Filters from "./Filters";
import DropdownMenu from "../DropdownMenu";
import Datepicker from "../Datepicker";
import { optional, jobStatuses, jobStatusColor } from "../../../helpers";
import clsx from "clsx";

export default class JobFilters extends Filters {
  componentDidMount() {
    super.componentDidMount();
    const statuses = new Map();
    jobStatuses.forEach((status) => {
      if (!statuses.has(status.id)) {
        statuses.set(status.name, status);
      }
    });
    this.setState({
      statuses: [{ id: 0, name: "Stato" }, ...Array.from(statuses.values())],
    });
  }

  filterList() {
    const filterClass =
      "mb-2 md:mr-16 md:mb-10 flex items-center p-4 md:p-0 bg-gray md:bg-white rounded-lg w-full";
    return [
      <span className={`text-gray-500 ${filterClass}`}>
        <i className="text-gray fas fa-th-large mr-4"></i>
        <button onClick={this.pickCategory}>
          {optional(this.state.filters, "category.name", "Categoria")}
        </button>
        <i
          className={clsx("fas fa-times cursor-pointer text-black pl-2", {
            hidden: !optional(this.state.filters, "category.name"),
          })}
          onClick={() => {
            this.updateFilter("category", null);
            setTimeout(() => this.updateFilter("category", null), 0);
          }}
        ></i>
      </span>,
      optional(this.state.filters, "category.name") && (
        <span className={`text-gray-500 ${filterClass}`}>
          <i className="text-gray fas fa-th-large mr-4"></i>
          <button onClick={this.pickSubcategory}>
            {optional(this.state.filters, "subcategory.name", "Sottocategoria")}
          </button>
          <i
            className={clsx("fas fa-times cursor-pointer text-black pl-2", {
              hidden: !optional(this.state.filters, "subcategory.name"),
            })}
            onClick={() => this.updateFilter("subcategory", null)}
          ></i>
        </span>
      ),
      <DropdownMenu
        fullWidth
        icon={
          <i
            className={`${this.statusFilterIconColor(
              optional(this.state.filters, "status")
            )} fas fa-circle fa-xs`}
          ></i>
        }
        value={optional(this.state.filters, "status")}
        items={this.state.statuses}
        onSelect={(item) => this.updateFilter("status", item)}
        className={`${filterClass} z-16`}
        optionBody={(o) => (
          <span className={this.statusFilterIconColor(o)}>
            <i className="fas fa-circle fa-xs mr-4"></i>
            {o.name}
          </span>
        )}
      />,
      <Datepicker
        fullWidth
        shortcuts
        range={[
          optional(this.state.filters, "minDate"),
          optional(this.state.filters, "maxDate"),
        ].filter((i) => i)}
        onSelect={(range) =>
          this.props.onUpdate(
            this.cleanFilters({
              ...this.state.filters,
              minDate: range[0],
              maxDate: range[1],
            })
          )
        }
        className={`${filterClass} z-15`}
      />,
    ].filter(Boolean);
  }

  render() {
    let filterList = this.filterList();
    if (this.isMobile()) {
      filterList = [filterList.flat()];
    }
    let filterWrapperClass =
      "md:w-auto flex items-center " +
      (this.props.doubleCol ? "w-1/2" : "w-full");
    if (this.isMobile()) {
      filterWrapperClass += " pr-2 flex-col";
    }
    return (
      <div className={this.props.className}>
        <div className="py-4 px-8 bg-white flex justify-between mobile border-b border-gray-50">
          <span>Filtri</span>
          <i className="fas fa-bars"></i>
        </div>
        <div className="bg-white mb-6 pt-6 md:pt-10 pb-2 md:pb-0">
          <div
            className={`flex ${
              this.props.center ? "justify-center" : "justify-start"
            } flex-wrap pl-4 pr-2 md:px-10`}
          >
            {filterList.map((filter, filterIndex) => (
              <div key={filterIndex} className={filterWrapperClass}>
                {filter}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  statusFilterIconColor(o) {
    const colorClass = jobStatusColor(optional(o, "id"));
    if (colorClass !== "black") {
      return colorClass ? `text-${colorClass}-500` : "text-gray";
    } else {
      return `text-${colorClass}`;
    }
  }
}
