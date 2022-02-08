import clsx from "clsx";
import React from "react";
import Component from "../../../Component";

export default class AttachmentsModal extends Component {
  uploadButton = React.createRef();

  state = {
    loading: false,
  };

  loadFile = (e) => {
    this.props
      .onAdd(e.target.files[0])
      .then(() => this.props.onOk())
      .then(() => this.setState({ loading: false }));
    this.setState({ loading: true });
    e.target.value = "";
  };

  render() {
    const o = this.props.offer;
    const editable = this.props.editable;
    return (
      <>
        <h1
          className="text-raleway font-bold text-28 leading-none text-wrap mb-2"
          style={{ wordWrap: "break-word" }}
        >
          {o.description}

          {this.state.loading && (
            <i className="ml-4 fas fa-spinner fa-pulse"></i>
          )}
        </h1>
        <ul className="flex flex-wrap">
          {o.attachments
            .map((a) => {
              const type = a.mimeType.split("/")[0];
              return typeof this[type] === "function"
                ? [a, this[type](a)]
                : false;
            })
            .filter(Boolean)
            .map(([attachment, rendered]) => (
              <li className="w-1/4 p-4">
                {rendered}
                <button
                  className={clsx(
                    "bg-turquoise rounded-lg text-white px-2 py-1 mx-auto block",
                    { hidden: !editable }
                  )}
                  onClick={() => {
                    this.props.onRemove(attachment);
                    this.props.onOk();
                  }}
                >
                  Rimuovi
                </button>
              </li>
            ))}
          {editable ? (
            <li className="w-1/4 p-4 relative">
              <input
                className="absolute"
                style={{ top: -1000000 }}
                type="file"
                accept="image/*,audio/*,video/*"
                onChange={(e) => this.loadFile(e)}
                ref={this.uploadButton}
              />
              {this.image({ url: "/img/add_file_icon.png" }, false)}
              <button
                className={clsx(
                  "bg-gray-800 rounded-lg text-white px-2 py-1 mx-auto block",
                  { hidden: !editable }
                )}
                onClick={() => this.uploadButton.current.click()}
              >
                Aggiungi
              </button>
            </li>
          ) : null}
        </ul>
      </>
    );
  }

  video = (v) => (
    <video className="w-full h-32 mb-4" controls preload="none">
      <source src={v.url} type={v.mimeType} />
    </video>
  );

  image = (i, previewable = true) => (
    <div
      className={clsx({ "cursor-pointer": previewable }, "relative h-32 mb-4")}
      onClick={(e) => {
        if (previewable) {
          e.stopPropagation();
          if (document.fullscreenElement === e.currentTarget) {
            document.exitFullscreen();
          } else {
            e.currentTarget.requestFullscreen();
          }
        }
      }}
    >
      <img
        className="object-contain max-h-full max-w-full absolute"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        src={i.url}
      />
    </div>
  );

  audio = (a) => (
    <audio className="w-full h-32 mb-4" controls preload="none">
      <source src={a.url} type={a.mimeType} />
    </audio>
  );
}
