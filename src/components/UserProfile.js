import React from "react";
import { connect } from "react-redux";
import {
  fetchProfile,
  setProfile,
  updateProfileAvatar,
} from "../actions/profileAction";
import { Link } from "react-router-dom";
import Avatar from "./util/Avatar";
import moment from "moment";
import Rating from "./util/Rating";
import {
  empty,
  createLoaderModal,
  createModal,
  copy,
  handleInfo,
  handleError,
  inviteUrl,
  extractInfo
} from "../helpers";
import { ordersAPI } from "../resources/orders";
import OrdersModal from "./util/modals/OrdersModal";
import VerificationModal from "./util/modals/VerificationModal";
import { UrlDependentComponent } from "../UrlDependentComponent";
import { verificationAPI } from "../resources/verification";
import InfoModal from "./util/modals/InfoModal";
import AvatarModal from "./util/modals/AvatarModal";

class UserProfile extends UrlDependentComponent {
  state = {
    editMode: false,
    copy: {},
    avatarPreview: null,
    orders: [],
    emailVerified: false,
  };

  startEditMode = () => {
    this.setState(
      {
        editMode: true,
        copy: JSON.parse(JSON.stringify(this.props.user)),
      },
      () =>
        document.querySelectorAll("textarea").forEach((textarea) => {
          textarea.style.height = `${textarea.scrollHeight}px`;
        })
    );
  };

  onUrlChange() {
    const profileId = +this.props.match.params.id;
    this.props.fetchProfile(+this.props.me.id === profileId ? null : profileId);
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.props.setProfile({});
  }

  feedbacks() {
    const items = this.props.user.quetzzerFeedback.map((u) => (
      <div
        key={extractInfo(u.userNickname)}
        className="px-1 py-1 md:pb-4 md:px-4 flex items-center justify-center w-1/2 md:w-1/6"
      >
        <div className="bg-white w-full py-16 px-4 h-full">
          <Avatar
            className="block mx-auto text-center mb-2"
            user={u}
            size={this.isMobile() ? 4 : 3}
          />
          <span className="block mx-auto text-center truncate text-14 mb-2">
            {extractInfo(u.userNickname)}
          </span>
          <Rating
            className="block mx-auto text-center"
            rating={u.vote}
            size={0.8}
          />
        </div>
      </div>
    ));
    if (items.length > 0) {
      return (
        <div className="flex flex-wrap content-start md:justify-between mb-32 -mx-1 md:-mx-4">
          {items}
        </div>
      );
    } else {
      return null;
    }
  }

  pageNavigation() {
    if (this.props.match.params.id == this.props.me.id) {
      return (
        <div className="flex justify-between py-8 px-4 md:px-0">
          <div className="text-16 md:text-20 font-bold text-raleway">
            Profilo Utente
          </div>
          <div className="inline-flex">
            <span className="inline-flex mr-4 md:mr-8">
              <div>
                <i className="fas fa-user"></i>
              </div>
              <span className="desktop ml-4 text-14">Profilo</span>
            </span>
            <Link to="/personal-info" className="inline-flex mr-4 md:mr-8">
              <div>
                <i className="fas fa-list"></i>
              </div>
              <span className="desktop ml-4 text-14">
                Informazioni Personali
              </span>
            </Link>
            {this.becomeAProButton()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex justify-between m-50 px-4 md:px-0">
          <div className="text-20 font-bold text-raleway">Profilo Utente</div>
        </div>
      );
    }
  }

  becomeAProButton() {
    switch (this.props.me.proStatus) {
      case "NONE":
        return (
          <Link
            to="/register-pro"
            className="inline-flex rounded bg-gray-900 text-white px-4 -mt-2"
          >
            <div className="pt-2">
              <i className="fas fa-suitcase"></i>
            </div>
            <span className="ml-4 desktop text-14 pt-2">Diventa un PRO!</span>
          </Link>
        );
      case "PENDING":
        return (
          <div className="d-flex px-4 text-right">
            <span
              to={`/professional-profile/${this.props.me.id}`}
              className="inline-flex rounded bg-gray-900 text-white px-4 -mt-2 cursor-pointer"
            >
              <div className="py-2">
                <i className="far fa-clock"></i>
              </div>
              <span className="ml-4 desktop text-14 py-2">In approvazione</span>
            </span>
            <p
              className="mobile mt-1 d-block"
              style={{ fontSize: "0.6rem", width: "min-content" }}
            >
              Profilo da PRO in approvazione
            </p>
          </div>
        );
      case "COMPLETED":
        return (
          <Link
            to={`/professional-profile/${this.props.me.id}`}
            className="inline-flex rounded bg-gray-900 text-white px-4 -mt-2 cursor-pointer"
          >
            <div className="pt-2">
              <i className="fas fa-sync-alt"></i>
            </div>
            <span className="ml-4 desktop text-14 pt-2">Cambia Profilo</span>
          </Link>
        );
    }
  }

  verification() {
    if (
      !this.props.user.verificationStatusDto.email &&
      !this.state.emailVerified
    ) {
      return (
        <div className="block md:inline-flex items-center bg-dark-gray md:w-full rounded mx-4 md:mx-0 p-4">
          <i className="fas fa-exclamation text-white m-2"></i>
          <span className="text-12 md:text-14 text-white m-2">
            Verifica ora il tuo Profilo
          </span>
          <button
            className="text-12 md:text-14 text-red"
            onClick={() => {
              let cnt = 0;
              const modal = () =>
                createModal(VerificationModal, {
                  description:
                    "A breve riceverai un'email contenente un codice. Inseriscilo qui!",
                })
                  .catch(() => {
                    throw "dismiss";
                  })
                  .then(verificationAPI.email)
                  .then(() => {
                    this.setState({ emailVerified: true });
                    handleInfo("Email verificata con successo!");
                  })
                  .catch((e) => {
                    if (e === "dismiss") {
                      return;
                    } else if (cnt++ <= 3) {
                      modal();
                    } else {
                      handleError(
                        "Hai raggiunto il limite massimo di tentativi!"
                      );
                    }
                  });
              verificationAPI.resendEmail().then(modal);
            }}
          >
            Invia email di verifica
          </button>
        </div>
      );
    }
    return null;
  }

  pickAvatar = () =>
    createModal(AvatarModal, {}, "wide-modal")
      .then(this.props.updateProfileAvatar)
      .catch(() => null);

  avatar() {
    const u = this.props.user;
    return (
      <>
        <div className="relative">
          <Avatar
            className="block mx-auto mb-6 mt-6"
            user={u}
            size={this.isMobile() ? 3 : 8}
          />
          <button
            type="button"
            className="mx-auto block mt-2 font-bold text-turquoise"
            onClick={this.pickAvatar}
          >
            Cambia
          </button>
        </div>
      </>
    );
  }

  loadImage(avatar) {
    if (avatar) {
      // load avatar preview
      const reader = new FileReader();
      reader.onload = (e) =>
        this.props.setProfile({ ...this.props.user, avatar: e.target.result });
      reader.readAsDataURL(avatar);
    }
  }

  openOrdersModal = () => {
    createLoaderModal(ordersAPI.get()).then((orders) => {
      if (orders.length > 0) {
        createModal(
          OrdersModal,
          {
            orders: orders
          },
          "overflow-auto modal"
        );
      } else {
        createModal(InfoModal, {
          title: "Ci dispiace!",
          subtitle: "",
          body: "Non hai ancora effettuato alcun ordine",
        });
      }
    });
  };

  render() {
    if (empty(this.props.user)) {
      return null;
    }
    const u = this.props.user;
    const feedbackCount = u.quetzzerFeedback.length;
    const rating =
      feedbackCount > 0
        ? u.quetzzerFeedback.reduce((prev, curr) => prev + curr.vote, 0) /
          feedbackCount
        : 0;
    return (
      <div className="container">
        {this.pageNavigation()}
        {this.verification()}
        <div className="md:flex mt-8 md:h-info mx-4 md:mx-0">
          <div
            className="flex md:mb-0 mb-8 rounded md:mr-4 bg-white p-4 md:p-8"
            style={{ width: !this.isMobile() ? "460px" : "100%" }}
          >
            {this.avatar()}
            <div className="flex-1 max-w-4"></div>
            <div className="min-w-0 md:ml-8 p-4">
              <div>
                <div className="truncate" title={u.nickname}>
                  {u.nickname}
                </div>
                <Rating rating={rating} size={0.9} />
              </div>
              <div className="inline-flex pt-10">
                <div className="mr-4">
                  <div className="text-center">{u.quetzzCompleted}</div>
                  <div className="text-gray-500 text-12">Quetzz</div>
                </div>
                <div className="mr-4">
                  <div className="text-center">{feedbackCount}</div>
                  <div className="text-gray-500 text-12">Feedback</div>
                </div>
                <div className="text-turquoise">
                  <div className="text-center">{u.ladderRank || "N/A"}</div>
                  <div className="text-12">Classifica</div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:ml-4 bg-white pb-8 md:pb-0 rounded md:flex-1">
            <p className="text-16 md:text-20 p-8 border-b-2 border-gray-200">
              Informazioni Personali
            </p>
            <div className="flex mt-8">
              <div className="mx-16">
                <div className="text-gray-500 text-12">Età</div>
                <div>{u.age}</div>
              </div>
              <div className="mx-4">
                <div className="text-gray-500 text-12">Luogo</div>
                <div>{u.city.name}</div>
              </div>
              <div className="mx-4">
                <button
                  className="bg-turquoise text-white rounded p-2"
                  onClick={() => copy(inviteUrl(u.inviteToken))}
                >
                  Copia il link di Invito
                  <i className="fas fa-copy ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex mt-8 mx-4 md:mx-0">
          <div
            className="bg-white rounded md:mr-4"
            style={{ width: !this.isMobile() ? "460px" : "100%" }}
          >
            <p className="text-16 md:text-20 p-8 border-b-2 border-gray-200">
              Punti
            </p>
            <div className="flex items-center md:pb-8 pt-8 text-turquoise">
              <span
                className="text-center flex-1 text-80"
                style={{ lineHeight: "0" }}
              >
                {u.points}
              </span>
              <Link to="/leaderboard" className="text-center flex-1">
                <i className="fas fa-award text-42"></i>
                <br />
                <span>CLASSIFICA</span>
              </Link>
            </div>
          </div>
          <div className="md:ml-4 bg-white pb-8 md:pb-0 rounded md:flex-1">
            <p className="text-16 md:text-20 p-8 border-b-2 border-gray-200">
              Buoni Regalo
            </p>
            <div className="flex justify-around py-8">
              <span
                className="flex-1 text-center cursor-pointer"
                onClick={this.openOrdersModal}
              >
                <span className="fa-stack text-white bg-dark-gray rounded-full w-16 h-16 text-42 text-center mb-4">
                  <i
                    className="fas fa-shopping-cart"
                    style={{ lineHeight: "66px" }}
                  ></i>
                  <i
                    className="fas fa-check bg-green-500 rounded-full p-1 text-9 absolute"
                    style={{ top: "7px", right: "7px" }}
                  ></i>
                </span>
                <p>I miei Ordini</p>
              </span>
              <Link to="/store" className="flex-1 text-center">
                <span className="fa-stack text-white bg-dark-gray rounded-full w-16 h-16 text-42 text-center mb-4">
                  <i
                    className="fas fa-shopping-cart"
                    style={{ lineHeight: "66px" }}
                  ></i>
                  <i
                    className="fas fa-plus bg-turquoise rounded-full p-1 text-9 absolute"
                    style={{ top: "7px", right: "7px" }}
                  ></i>
                </span>
                <p>Negozio</p>
              </Link>
            </div>
          </div>
        </div>
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
  user: state.profile,
  me: state.user,
});

export default connect(mapStateToProps, {
  fetchProfile,
  setProfile,
  updateProfileAvatar,
})(UserProfile);
