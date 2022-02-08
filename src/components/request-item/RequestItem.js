import React from "react";
import Component from "../../Component";
import { empty, optional, requestInfo } from "../../helpers";
import StatusBadge from "../util/StatusBadge";
import clsx from "clsx";
import { Link } from "react-router-dom";

export default class RequestItem extends Component {
  renderLeftInfoItems() {
    return this.getLeftInfoItems().map((section, i) => (
      <div
        key={i}
        className="table-cell pb-11 pt-11 border-b-2 border-gray-100 pl-12"
        style={{ width: "10em" }}
      >
        {section.map((i, index) => (
          <div key={index} className={`${index === 0 ? "mb-4" : ""}`}>
            <p className="text-10 text-gray-500">{i}</p>
            <p className="text-black text-14 truncate">
              {requestInfo[i](this.props.request)}
            </p>
          </div>
        ))}
      </div>
    ));
  }

  renderRightInfoItems() {
    return this.getRightInfoItems().map((i, index) => {
      const value = (requestInfo[i] || (() => null))(this.props.request);
      return (
        <div
          key={index}
          className="table-cell px-4 last:pr-12 align-middle border-b-2 border-gray-100 w-32"
        >
          <div className="text-10 text-gray-500">{value !== null ? i : ""}</div>
          <div className="text-black text-14">{value}</div>
        </div>
      );
    });
  }

  mobileRender() {
    const r = this.props.request;
    if (empty(r)) return null;
    return (
      <Link
        className="bg-white pt-8 pb-2 px-6 md:p-4 mb-4 block"
        to={this.link}
      >
        <div className="flex justify-between items-center">
          <div>
            {this.mobileTopItems().map((i, index) => (
              <span
                key={index}
                className={clsx("text-10 mr-4", {
                  "border-l-2 pl-4": index > 0,
                })}
              >
                {requestInfo[i](this.props.request)}
              </span>
            ))}
          </div>
          {this.shouldDisplayBadge() ? (
            <StatusBadge flat status={r.type} />
          ) : null}
        </div>
        <div className="whitespace-no-wrap">
          <i className="fas fa-map-marker-alt fa-xs text-red mr-1"></i>
          <span className="text-10 text-turquoise">
            {" "}
            {(r.city || r.cityDto).name}{" "}
          </span>
        </div>
        <p
          className="text-black mb-4 text-14"
          style={{ wordBreak: "break-word" }}
        >
          {r.title}
        </p>
        <p
          className="text-gray-500 text-14 overflow-hidden text-justify mb-4"
          style={{ wordBreak: "break-word" }}
        >
          {this.trunc(r.shortDescription)}
        </p>
        <div className="flex justify-between mb-4">
          {this.renderMobileBottomItems()}
        </div>
        <div className="flex flex-wrap">{this.renderMobileActionButtons()}</div>
      </Link>
    );
  }

  renderMobileBottomItems() {
    return this.mobileBottomItems().map((i, index) => (
      <div key={index}>
        <span className="text-12 text-gray-500">{i}:</span>
        <br />
        <span className="text-12">
          {(requestInfo[i] || (() => null))(this.props.request)}
        </span>
      </div>
    ));
  }

  desktopRender() {
    const r = this.props.request;
    if (empty(r)) return null;
    const cellClasses =
      "table-cell px-4 pb-11 pt-11 border-b-2 border-gray-100";
    return (
      <Link
        key={r.id}
        className="table-row cursor-pointer bg-white hover:bg-gray-200"
        to={this.link}
      >
        {this.renderLeftInfoItems()}
        <div className={`px-20 ${cellClasses}`}>
          <div className="whitespace-no-wrap">
            <i className="fas fa-map-marker-alt fa-xs text-red mr-1"></i>
            <span className="text-10 text-turquoise">
              {" "}
              {(r.city || r.cityDto).name}{" "}
            </span>
          </div>
          <p
            className="text-black mb-2 text-14"
            style={{ wordBreak: "break-word" }}
          >
            {r.title}
          </p>
          <p className="text-gray-500 text-14 overflow-hidden text-justify">
            {this.trunc(r.shortDescription)}
          </p>
        </div>
        {this.renderRightInfoItems()}
        {this.renderActionButtons()}
        {this.renderDeleteButton()}
      </Link>
    );
  }

  render() {
    return this.isMobile() ? this.mobileRender() : this.desktopRender();
  }

  trunc(str) {
    const truncedWords = str.split(" ").slice(0, 20).join(" ");
    if (truncedWords.length === str.length) {
      return str;
    }
    return truncedWords.length > 150
      ? str.slice(0, 150) + "..."
      : truncedWords + "...";
  }
}
