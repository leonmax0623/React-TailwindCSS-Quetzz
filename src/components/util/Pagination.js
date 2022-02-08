import React from "react";
import Component from "../../Component";
import { objectToParams } from "../../resources/util";
import { Link } from "react-router-dom";

export default class Pagination extends Component {
  link(page, text) {
    const link = `/${this.props.url}${objectToParams({
      ...this.props.params,
      page,
    })}`;
    return (
      <Link
        className="hover:font-bold mx-1 text-light-gray hover:text-black"
        to={link}
      >
        {text}
      </Link>
    );
  }

  previous() {
    return this.props.currentPage > 0
      ? this.link(
          this.props.currentPage - 1,
          <i className="fas fa-2x fa-chevron-left"></i>
        )
      : null;
  }

  next() {
    return this.props.hasMore
      ? this.link(
          this.props.currentPage + 1,
          <i className="fas fa-2x fa-chevron-right"></i>
        )
      : null;
  }

  first() {
    return this.props.currentPage > 1 ? (
      <p className="inline-flex">
        {this.link(
          0,
          <>
            <i className="fas fa-2x fa-chevron-left"></i>
            <i className="fas fa-2x fa-chevron-left"></i>
          </>
        )}
      </p>
    ) : null;
  }

  render() {
    if (
      this.props.currentPage === null ||
      typeof this.props.currentPage === "undefined"
    ) {
      return null;
    }
    return (
      <div className="flex w-64 mx-auto my-20 justify-center">
        {this.first()}
        {this.previous()}
        {this.next()}
      </div>
    );
  }
}
