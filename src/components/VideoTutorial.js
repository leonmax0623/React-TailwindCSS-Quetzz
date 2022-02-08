import React from "react";
import Info from "./Info";

export default class VideoTutorial extends Info {
  state = {
    section: null,
  };

  title() {
    return "Tutorial Video";
  }

  first() {
    if (!this.state.first) {
      return null;
    }
  }

  videoPage() {
    const ids = {
      first: {
        items: [
          {
            id: "kOxRqCdnwyk",
            description: "Parte 1",
          },
          {
            id: "iKV3LfSxy0M",
            description: "Parte 2",
          },
          {
            id: null,
            description: "Parte 3",
          },
        ],
        title: "Approfondisci la tua esperienza da Utente",
      },
      second: {
        items: [
          {
            id: "683QaXYzG_M",
            description: "Parte 1",
          },
          {
            id: "-t7Rd3B7UcE",
            description: "Parte 2",
          },
          {
            id: null,
            description: "Parte 3",
          },
        ],
        title: "Approfondisci la tua esperienza da Quetzzer",
      },
      third: {
        items: [
          {
            id: "I4EZnqsZUJI",
            description: "Parte 1",
          },
          {
            id: "N9YbZnYSopc",
            description: "Parte 2",
          },
          {
            id: null,
            description: "Parte 3",
          },
        ],
        title: "Approfondisci la tua esperienza da Professionista",
      },
    };
    return (
      <>
        <h1 className="text-32 flex justify-between">
          {ids[this.state.section].title}
          <i
            onClick={() => this.setState({ section: null })}
            className="fas fa-undo cursor-pointer"
          ></i>
        </h1>
        <div
          className={
            "flex justify-between pt-8" + (this.isMobile() ? " flex-col" : "")
          }
        >
          {ids[this.state.section].items.map((obj, index) => (
            <div
              className="p-4 flex-1 mb-16 md:mb-0"
              style={{ height: `${this.height()}px` }}
              key={index}
            >
              {obj.id ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${obj.id}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div
                  className="h-full w-full bg-gray-500 bg-center bg-cover bg-no-repeat"
                  style={{ backgroundImage: "url('/img/coming_soon.jpg')" }}
                ></div>
              )}
              <p className="text-20 text-center">{obj.description}</p>
            </div>
          ))}
        </div>
      </>
    );
  }

  height() {
    if (!this.isMobile()) {
      return 164;
    }
    const w = window.innerWidth;
    if (w >= 900) {
      return 455;
    }
    return 455 - (900 - w) * 0.53;
  }

  body() {
    const cls =
      "text-turquoise cursor-pointer hover:opacity-50 text-20 mb-8 border-gray-500 border-2 p-4 shadow-xl bg-white";
    return !this.state.section ? (
      <>
        <h1 className="text-32">Cosa vorresti fare su Quetzz?</h1>
        <div className="p-8">
          <p
            className={cls}
            onClick={() => this.setState({ section: "first" })}
          >
            Pubblicare richieste per trovare i servizi o i prodotti di cui ho
            bisogno
          </p>
          <p
            className={cls}
            onClick={() => this.setState({ section: "second" })}
          >
            Raccomandare professionisti per guadagnare punti e portarmi a casa i
            prodotti che più mi interessano
          </p>
          <p
            className={cls}
            onClick={() => this.setState({ section: "third" })}
          >
            Acquisire nuovi clienti e guadagnare offrendo i miei servizi e/o
            prodotti
          </p>
        </div>
      </>
    ) : (
      this.videoPage()
    );
  }
}
