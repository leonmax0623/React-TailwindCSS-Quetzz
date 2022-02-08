import { createElement } from "react";
import Modal from "./components/util/Modal";
import { Modals } from "./App";
import React from "react";
import Loader from "./components/util/Loader";
import moment from "moment";
import Rating from "./components/util/Rating";
import { toast } from "react-toastify";
import InfoModal from "./components/util/modals/InfoModal";
import { notificationToJSX } from "./actions/util";

export const FETCH_LIMIT = 10;

export const PREREGISTRATION_MODE = false;

export const quotes = [
  "Dopo il verbo amare, il verbo aiutare è il più bello del mondo.",
];

export const inviteUrl = (token) =>
  `${window.location.protocol}//${window.location.hostname}?invite=${token}`;

export const getQParam = (location, name) => {
  const value = new URLSearchParams(location.search).get(name);
  return value !== "null" ? value : null;
};

export const renderRegistrationUrl = (token) =>
  token ? `/register-user?code=${token}` : "/register-user";

export const objectFilter = (o, fn) => {
  const res = {};
  Object.entries(o).forEach(([key, val]) => {
    if (fn(key, val)) {
      res[key] = val;
    }
  });
  return res;
};

export const underUploadThreshold = (file) => {
  switch (file.type.split("/")[0]) {
    case "image":
      return file.size <= 5000000;
    case "video":
      return file.size <= 20000000;
    case "audio":
      return file.size <= 5000000;
    default:
      return false;
  }
};

export const format = (f) =>
({
  SVG: "svg+xml",
  PNG: "image/png",
  JPEG: "image/jpeg",
  GIT: "image/gif",
  "svg+xml": "SVG",
  "image/png": "PNG",
  "image/jpeg": "JPEG",
  "image/gif": "GIT",
}[f]);

export const copy = (text) =>
  navigator.clipboard
    .writeText(text)
    .then(() => handleInfo("copiato!"))
    .catch(() => handleError("Qualcosa è andato storto!"));

export const empty = (obj) =>
  (!obj && obj !== 0) ||
  (Object.keys(obj).length === 0 && obj.constructor === Object);

export const equals = (o1, o2) => JSON.stringify(o1) === JSON.stringify(o2);

export const optional = (obj, path, def = null) => {
  if (empty(obj)) return def;
  if (path === undefined) return obj;
  path = path.split(".", 2);
  return optional(obj[path[0]], path[1], def);
};

export const defaultRequiredMessage = "Per favore compila questo campo"

export const handleTitle = e => {
  e.currentTarget.setAttribute('title', e.currentTarget.value ? '' : defaultRequiredMessage)
}

export const namePattern = "[A-Za-z ]{1,30}";
export const namePatternMessage = "I caratteri consentiti sono solo lettere e spazi";

export const alphanumericPattern = "^[-.,'\\w\\s]+$";
export const alphanumericPatternMessage =
  "I caratteri ammessi sono lettere, numeri ed i seguenti: -.,'";

export const identificationPattern =
  "^[-!\"£$&()=?^*\\[\\]{}#._';:@\\s\\d\\w]+$";

export const identificationPatternMessage =
  "I caratteri ammessi sono lettere, numeri ed i seguenti: !\"£$&()=?^*[]{}#.-_';:@";

export const createModal = (modal, props = {}, className = "") =>
  new Promise((resolve, reject) => {
    const id = Modals.getNextId();
    const closeModal = (after) => (param) => {
      if (Modals.remove(id)) {
        after(param);
      }
    };
    const onOk = closeModal(resolve);
    const onCancel = closeModal(reject);
    Modals.add(
      createElement(
        Modal,
        { onCancel, className },
        createElement(modal, { onOk, onCancel, ...props })
      ),
      id
    );
  });

export const createLoaderModal = (promise) => {
  const id = Modals.getNextId();
  const remove = () => Modals.remove(id);
  Modals.add(
    createElement(
      Modal,
      { dismissable: false },
      <div className="mt-12">
        <Loader />
      </div>
    ),
    id
  );

  return promise
    .then((ret) => {
      remove();
      return ret;
    })
    .catch((e) => {
      remove();
      throw e;
    });
};

export const simulateRequest = (failProb = 0, timeout = 500) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (Math.random() >= failProb) {
        resolve();
      } else {
        reject();
      }
    }, timeout)
  );

export const handleError = (err) => {
  if (err !== undefined) {
    createModal(InfoModal, {
      button: "Ok!",
      title: "Errore",
      body: err,
    }).catch(() => null);
  }
};



const generateNotification = (title, body) => (
  <>
    <h1 className="bg-turquoise text-white p-4 text-raleway text-24">
      <i className="fas fa-exclamation-circle text-gray-800 mr-2"></i>
      {title}
    </h1>
    <p className="bg-white text-black p-4 flex align-middle">
      <i className="far fa-bell text-32 mr-2"></i>
      <p>{body}</p>
    </p>
  </>
);

const generateFileNotification = (title, body) => (
  <>
    <h1 className="bg-turquoise text-white p-4 text-raleway text-24">
      <i className="fas fa-exclamation-circle text-gray-800 mr-2"></i>
      {title}
    </h1>
    <p className="bg-white text-black p-4 flex align-middle">
      <i className="fas fa-check text-green-400 text-32 mr-2"></i>
      <p>{body}</p>
    </p>
  </>
);

export const handleInfo = (info) =>
  info !== undefined &&
  toast.success(generateNotification("Informazioni", info), {
    className: "mt-100"
  });

export const handleNotification = (notification) =>
  toast.success(
    generateNotification(notification.title, notificationToJSX(notification)),
    {
      className: "px-100"
    }
  );

export const handleFileInfo = (info) =>
  toast.success(
    generateFileNotification("Informazioni", info),
    {
      className: "px-100"
    }
);

export const limitWords = (str, len) =>
  (str.length <= len ? str : str.substr(0, str.lastIndexOf(" ", len))) + "...";

export const jobStatusColor = (status) => {
  if (!status) {
    return null;
  }
  return (
    jobStatuses.find((s) => s.id.toLowerCase() === status.toLowerCase()) || {
      color: null,
    }
  ).color;
};

export const requestStatusColor = (status) => {
  if (!status) {
    return null;
  }
  return (
    requestStatuses.find(
      (s) => s.id.toLowerCase() === status.toLowerCase()
    ) || { color: null }
  ).color;
};

export const quetzzStatusColor = (statusId) => {
  return (quetzzFilters.find((s) => s.id === statusId) || { color: null })
    .color;
};

export const quetzzId = (quetzzStatus, requestStatus) => {
  if (quetzzStatus === "CHOICE_PENDING" && requestStatus !== "RUNNING") {
    return 2;
  }
  return quetzzFilters.find(
    (q) => q.id !== 2 && q.statuses.includes(quetzzStatus)
  ).id;
};

export const jobStatuses = [
  { id: "cancelled", name: "Annullato", color: "red" },
  { id: "cancelledDueChange", name: "Annullato", color: "red" },
  { id: "cancelledDueChangeCustomReason", name: "Annullato", color: "red" },
  { id: "pending", name: "In attesa", color: "yellow" },
  { id: "pendingToConfirm", name: "Scelto", color: "purple" },
  { id: "ongoing", name: "In corso", color: "blue" },
  { id: "inDeadline", name: "Completata", color: "green" },
  { id: "completed", name: "Completata", color: "green" },
];

export const jobStatusDescription = (status) =>
  jobStatuses.find((s) => s.id.toLocaleLowerCase() === status.toLowerCase())
    .name;

export const requestStatuses = [
  { id: "pending_approval", name: "In approvazione", color: "purple" },
  { id: "approved", name: "In attesa", color: "yellow" },
  { id: "running", name: "In corso", color: "blue" },
  { id: "deadline", name: "Completata", color: "green" },
  { id: "cancelled", name: "Annullata", color: "red" },
  { id: "expired", name: "Scaduta", color: "black" },
  { id: "completed", name: "Completata", color: "green" },
];

export const requestStatusDescription = (status) =>
  requestStatuses.find((s) => s.id.toLocaleLowerCase() === status.toLowerCase())
    .name;

export const quetzzFilters = [
  {
    id: 1,
    name: "In sospeso",
    color: "yellow",
    statuses: ["APPLICATION_IGNORED"],
  },
  { id: 2, name: "Non scelto", color: "yellow", statuses: ["CHOICE_PENDING"] },
  { id: 3, name: "In attesa", color: "yellow", statuses: ["CHOICE_PENDING"] },
  { id: 4, name: "Scelto", color: "green", statuses: ["CHOSEN"] },
  {
    id: 5,
    name: "Rifiutato",
    color: "red",
    statuses: ["APPLICATION_REJECTED", "SELECTION_REJECTED"],
  },
  { id: 6, name: "Non scelto", color: "red", statuses: ["NOT_CHOSEN"] },
  {
    id: 7,
    name: "Scaduto",
    color: "black",
    statuses: ["APPLICATION_EXPIRED", "CANCELLED", "CHOICE_EXPIRED"],
  },
];

export const quetzzStatuses = [
  { id: "APPLICATION_IGNORED", name: "In sospeso", color: "yellow" },
  { id: "CHOICE_PENDING", name: "Non scelto", color: "yellow" },
  { id: "CHOICE_PENDING", name: "In attesa", color: "yellow" },
  { id: "CHOSEN", name: "Scelto", color: "green" },
  { id: "APPLICAION_REJECTED", name: "Rifiutato", color: "red" },
  { id: "SELECTION_REJECTED", name: "Rifiutato", color: "red" },
  { id: "NOT_CHOSEN", name: "Non scelto", color: "red" },
  { id: "APPLICATION_EXPIRED", name: "Scaduto", color: "black" },
  { id: "CANCELLED", name: "Scaduto", color: "black" },
  { id: "CHOICE_EXPIRED", name: "Scaduto", color: "black" },
];

export const escapeRegExp = (str) =>
  str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

const subcat = (r) => r.subcategory || r.subcategoryDto;

export const extractInfo = (info) => info && info.info;

export const isExtractable = (deletable) =>
  ["DeletedInfo", "ActualInfo"].includes(optional(deletable, "type"));

export const deletedAccFallback = (deletable) => {
  return deletable.type === "DeletedInfo" ? (
    <strong>Utente cancellato</strong>
  ) : (
    extractInfo(deletable) || "/"
  );
};

export const requestInfo = {
  Autore: (r) => {
    let name = r.postingNickname || r.author;
    if (isExtractable(name)) {
      name = deletedAccFallback(name);
    }
    return (
      <span title={name} className="text-turquoise">
        {name}
      </span>
    );
  },
  "Annullata il": (r) => r.cancelled.format("D/M/YYYY"),
  Sottocategoria: (r) => subcat(r).name,
  Categoria: (r) => (subcat(r).category || subcat(r).categoryDto).name,
  "Data di Completamento": (r) => r.completed.format("D/M/YYYY"),
  "Termina in": (r) => {
    let difference = new Date(r.deadline).getTime() - moment()._d.getTime();
    let netDate = Math.round(difference / (1000 * 3600 * 24));
    return moment().isAfter(r.deadline)
      ? "0 giorni"
      : isNaN(netDate)
        ? "0" + " giorni "
        : netDate + " giorni";
  },
  "Scade in": (r) => {
    let difference = new Date(r.expiration).getTime() - moment()._d.getTime();
    let netDate = Math.round(difference / (1000 * 3600 * 24));
    return moment().isAfter(r.deadline)
      ? "0 giorni"
      : isNaN(netDate)
        ? "0" + " giorni "
        : netDate + " giorni";
  },
  "Data di Termine": (r) => r.expiration.format("D/M/YYYY"),
  Feedback: (r) => r.feedback && <Rating rating={r.feedback.rating} />,
  Offerte: (r) => r.candidatesPending,
  Pubblicata: (r) => r.created.format("D/M/YYYY"),
  "Range di Prezzo": (r) =>
    `${r.priceRange.start.toFixed(2)} - ${r.priceRange.end.toFixed(2)}€`,
  Quetzzer: (r) =>
    (isExtractable(r.quetzzer) && deletedAccFallback(r.quetzzer)) || "/",
  Visualizzazioni: (r) => r.views,
};

const aliases = {
  Cliente: "Autore",
  "Completata il": "Data di Completamento",
  "Scaduta il": "Data di Termine",
};

for (let alias in aliases) {
  requestInfo[alias] = requestInfo[aliases[alias]];
}

export const nth = (n) =>
  !n ? "" : ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";

export const validateVatChecksum = (vat) =>
  Array.from(vat)
    .map((chr, idx) => {
      chr = parseInt(chr);
      if (idx % 2 === 1) {
        chr *= 2;
      }
      if (chr > 9) {
        chr -= 9;
      }
      return chr;
    })
    .reduce((acc, curr) => acc + curr, 0) %
  10 ===
  0;

const taxCodeMap = "BAFHJNPRTVCESULDGIMOQKWZYX";
export const validateTaxCodeChecksum = (tax) =>
  (Array.from(tax)
    .slice(0, 15)
    .map((chr, idx) => {
      chr = chr.charCodeAt(0);
      if (chr < 65) {
        chr -= 48;
      } else {
        chr -= 65;
      }
      if (idx % 2 === 0) {
        chr = taxCodeMap.charCodeAt(chr) - 65;
      }
      return chr;
    })
    .reduce((acc, curr) => acc + curr, 0) %
    26) +
  65 ===
  tax.charCodeAt(15);
