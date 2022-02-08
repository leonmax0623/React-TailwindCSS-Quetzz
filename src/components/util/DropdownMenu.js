import React from "react";
import Component from "../../Component";
import DropdownArrow from "./DropdownArrow";
import { escapeRegExp, optional } from "../../helpers";
import clsx from "clsx";
import { withRouter } from "react-router-dom";

class DropdownMenu extends Component {
  state = {
    show: false,
    filter: "",
  };

  lastFocus = null;

  wrapperRef = React.createRef();

  componentDidMount() {
    super.componentDidMount();
    this.props.history.listen(
      () => this.wrapperRef.current && this.wrapperRef.current.blur()
    );
  }

  toggle = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (new Date().getTime() - this.lastFocus > 300) {
      this.wrapperRef.current.blur();
    }
  };

  show = () => {
    this.setState({ show: true });
  };

  hide = () => {
    this.setState({ show: false });
  };

  disabled() {
    return this.props.disabled || false;
  }

  render() {
    return (
      <div
        ref={this.wrapperRef}
        tabIndex={this.disabled() ? "" : "0"}
        className={`
                relative
                bg-dark
                inline-block
                cursor-pointer
                outline-none
                ${this.props.fullWidth ? " flex " : ""}
                ${this.props.className || ""}
            `}
        onFocus={() => {
          this.show();
          this.lastFocus = new Date().getTime();
        }}
        onBlur={this.hide}
        style={this.props.style}
      >
        {this.props.icon}
        {this.text()}
        {this.rightIcon()}
        <ul
          style={{
            top: "100%",
            minWidth: "100%",
            overflow: 'auto',
            left: "0",
            maxHeight: "13em",
            display: this.state.show ? "block" : "none",
          }}
          className={`absolute border invisible-scrollbar bg-white z-10 ${this.props.listClassName}`}
        >
          {this.items()}
        </ul>
      </div>
    );
  }

  text() {
    const classes = clsx({
      "mr-4": true,
      "pl-4": !!this.props.icon,
      "text-gray-500": optional(this.props.value, "id") == 0,
      "outline-none w-24":
        this.props.searchable && optional(this.props.value, "id") == 0,
      "flex-1": this.props.fullWidth,
    });
    const text = this.props.textBody
      ? this.props.textBody(this.props.value)
      : optional(this.props.value, this.props.label || "name");
    if (this.props.searchable && optional(this.props.value, "id") == 0) {
      return (
        <input
          disabled={this.disabled()}
          required={!!this.props.required}
          ref={this.props.fieldRef}
          className={`${classes} ${this.props.inputClassName}`}
          placeholder={text}
          onChange={(e) => this.setState({ filter: e.target.value })}
          type="text"
          autoComplete="nope" autoCorrect="off" spellCheck="off"
        />
      );
    }

    return <span className={classes}>{text}</span>;
  }

  rightIcon() {
    if (this.props.searchable && optional(this.props.value, "id") > 0) {
      return (
        <i
          onClick={() => this.props.onSelect(null)}
          className="fas fa-times"
        ></i>
      );
    }
    return (
      <DropdownArrow
        active={this.state.show}
        onClick={this.toggle}
        className={this.disabled() ? "text-gray" : ""}
      />
    );
  }

  items() {
    const label = this.props.label || "name";
    const optionBody = this.props.optionBody || ((i) => i[label]);
    let items = this.props.items;
    if (this.state.filter.length > 0) {
      const reg = new RegExp(escapeRegExp(this.state.filter), "i");
      items = items.filter((i) => reg.test(i[label]));
    }
    return items.map((i, index) => (
      <li
        key={index}
        className="py-2 pl-8 pr-4 hover:bg-gray-200 whitespace-no-wrap cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          this.props.onSelect(i);
          this.setState({ filter: "" });
          this.wrapperRef.current.blur();
        }}
      >
        {optionBody(i)}
      </li>
    ));
  }
}

export default withRouter(DropdownMenu);
