import React from 'react'
import Info from './Info'

export default class CookieSupport extends Info {
  iframe = React.createRef()

  title() {
    return 'Cookie policy'
  }
  width() {
    if (window.innerWidth >= 630) {
      return 100
    }
    return 0.000878564 * window.innerWidth * window.innerWidth - 1.18201 * window.innerWidth + 500.26
  }
  scale() {
    if (window.innerWidth >= 630) {
      return 1
    }
    return 1 - (630 - window.innerWidth) / 600
  }
  body() {
    return <div className="WordSection1 support">
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>La nostra Cookie Policy ha
      l’intento di descrivere le tipologie di cookie utilizzati dal sito web www.quetzz.it
            (di seguito “<b>Sito</b>” o “<b>Piattaforma</b>”), le finalità dei cookie
            installati e le modalità con cui l’Utente può accettare o rifiutare i cookie
            presenti sul Sito e che interagiscono con i servizi proposti.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Utilizziamo i cookie per
      rendere il nostro Sito più facile e intuitivo. I dati raccolti grazie ai cookie
      servono per rendere l’esperienza di navigazione più piacevole e più efficiente
            in futuro.</span></p>
      <p className="MsoNoSpacing"><span style={{ fontSize: '12.0pt', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing"><span style={{ fontSize: '12.0pt', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <h2 style={{ marginLeft: '18.0pt', textIndent: '-18.0pt' }}><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>1.<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span></b><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Cosa sono i Cookie</span></b></h2>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>I cookie sono stringhe di
      testo di piccole dimensioni che le applicazioni visitate dall’Utente inviano al
      suo terminale (solitamente al browser), dove vengono memorizzati per essere poi
      ritrasmessi alle stesse applicazioni alla successiva visita del medesimo
            Utente.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Con il termine cookie si vuol
            far riferimento sia agli stessi cookie sia a tutte le tecnologie similari.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>I cookie sono usati per
      accedere più rapidamente ai servizi online e per migliorare la navigazione
      dell’Utente attraverso il monitoraggio di sessioni, la memorizzazione di
            informazioni degli Utenti, il caricamento più rapido dei contenuti, etc.</span></p>
      <p className="MsoNoSpacing"><span style={{ fontSize: '12.0pt', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing"><span style={{ fontSize: '12.0pt', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <h2 style={{ marginLeft: '18.0pt', textIndent: '-18.0pt' }}><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>2.<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span></b><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Tipologie di Cookie</span></b></h2>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>I cookie possono essere:</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Cookie di prima parte:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;sono
      i cookie proprietari utilizzati dal Sito al fine di consentire all’Utente di
      navigare in modo più efficiente e/o di monitorare le azioni esercitate dallo
            stesso;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Cookie di terza parte:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;sono
      i cookie impostati da un sito diverso da quello che si sta attualmente
      visitando al fine di consentire all’Utente di navigare in modo più efficiente
            e/o di monitorare le azioni esercitate dallo stesso.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Inoltre, si distinguono
            diverse tipologie di cookie:</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '25.1pt', textIndent: '-18.0pt', lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>A.<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp; </span></span></b><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Cookie
              Tecnici e Analitici:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;sono i cookie relativi ad attività
        strettamente necessarie al funzionamento e all’erogazione del servizio (es.
        cookie di sessione per il login), cookie relativi ad attività di salvataggio
        delle preferenze e ottimizzazione (es. cookie di salvataggio del carrello o
        delle scelte di lingua/valuta, etc.), cookie analitici per raccogliere
            informazioni in forma anonima e aggregata.</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '25.1pt', lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></b></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '25.1pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>I
            cookie tecnici ricomprendono:</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '25.1pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Wingdings' }}>§<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp; </span></span><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Cookie
              di Sessione o di Navigazione:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;sono utilizzati per
        tenere traccia dell’attività dell’Utente in rete. Garantiscono la normale
        navigazione e fruizione del Sito, permettendo ad esempio di navigare più
        rapidamente, di realizzare un acquisto o di autenticarsi per accedere ad aree
            riservate, e sono di fatto necessari per il suo corretto funzionamento;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Wingdings' }}>§<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp; </span></span><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Cookie
              di Funzionalità:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;permettono all’Utente la navigazione in
        funzione di una serie di criteri selezionati (ad esempio, la lingua, i prodotti
        selezionati per l’acquisto, etc.) al fine di migliorare il servizio reso allo
            stesso;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}>&nbsp;</p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Wingdings' }}>§<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp; </span></span><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Cookie
              Analitici:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;utilizzati per raccogliere informazioni sull’utilizzo
        del Sito. Il Titolare usa tali informazioni per analisi statistiche, per
        migliorare il Sito e semplificarne l’utilizzo, oltre che per monitorarne il
        corretto funzionamento. Questo tipo di cookie raccoglie informazioni in forma
        anonima sull’attività degli Utenti nel Sito e sul modo in cui sono arrivati al
        Sito e alle pagine visitate. I cookie di questa categoria vengono inviati dal
            Sito stesso o da domini di terze parti. I cookie analitici possono essere:</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '53.45pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Courier New"' }}>o<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Cookie
              Analitici di prima parte:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;assimilati sul piano normativo ai
        cookie tecnici se utilizzati direttamente dal Titolare del Sito senza
        effettuare la profilazione dell’Utente ma solo per raccogliere informazioni, in
        forma aggregata e anonima, sul numero degli Utenti e su come questi visitano il
            Sito per finalità statistiche e per migliorare le performance del Sito;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '53.45pt', textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '53.45pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Courier New"' }}>o<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Cookie
              Analitici di terza parte:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;sono messi a disposizione da
        soggetti terzi e vengono assimilati ai cookie tecnici se le terze parti non
        effettuano la profilazione dell’Utente mediante l’utilizzo di strumenti idonei
        a ridurre il potere identificativo dei cookie (per esempio, mediante il
        mascheramento di porzioni significative dell’indirizzo IP) e senza incrociare le
            informazioni raccolte con altre di cui già dispongono.</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '25.25pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Per i
      cookie tecnici è richiesto il solo rilascio della Cookie Policy senza necessità
      di richiedere il consenso. La disabilitazione o cancellazione degli stessi,
      accedendo alle funzioni del proprio browser, potrebbe compromettere l’ottimale
            navigazione sul presente Sito.</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '25.5pt', textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '25.1pt', textIndent: '-18.0pt', lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>B.<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp; </span></span></b><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Cookie
              di Profilazione:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;sono utilizzati per monitorare la
            navigazione web dell’Utente e creare un profilo delle sue abitudini:</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '25.5pt', textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.15pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Wingdings' }}>§<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp; </span></span><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Cookie
              di profilazione di prima parte:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;installati dal Titolare
        per creare profili relativi all’Utente al fine di inviare messaggi pubblicitari
        in linea con le preferenze manifestate durante la navigazione in rete. Data la
        loro particolare invasività nella sfera privata degli utenti, la normativa applicabile
        richiede che l’Utente, previa adeguata informativa sull’uso degli stessi, debba
            esprimere il proprio consenso;</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.15pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Wingdings' }}>§<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp; </span></span><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Cookie
              di profilazione di terza parte:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;usati da soggetti terzi
        che accedono alle informazioni in chiaro, quindi non in modalità anonima e
        aggregata, e li incrociano con altri dati già in loro possesso. Il Sito non ha
        un controllo diretto dei singoli cookie di terze parti. L’Utente è pertanto
        invitato a verificare sul sito della terza parte l’informativa relativa ai
            cookie.</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '25.25pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>L’utilizzo
      di questi cookie necessita dell’acquisizione del preventivo consenso
            dell’Utente.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></b></p>
      <h2 style={{ marginLeft: '18.0pt', textIndent: '-18.0pt' }}><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>3.<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span></b><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Cookie installati</span></b></h2>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Si prega di visionare la “</span><a href="https://www.quetzz.it/dichiarazione-cookie"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Dichiarazione Cookie</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>” per accedere
            alla lista completa dei cookie utilizzati da questo Sito.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Inoltre, può accadere che il
      nostro Sito web utilizzi altri cookies e tecnologie simili per agevolare i
            seguenti servizi:</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Google
      OAuth2 – Per fornire agli utenti funzionalità di autenticazione delle proprie
            credenziali mantenendo le proprie informazioni personali private (</span><a href="https://policies.google.com/privacy?hl=it"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>privacy
              policy</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>,&nbsp;</span><a href="https://tools.google.com/dlpage/gaoptout"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>opt-out</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>).</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Google
      Analytics – Per misurare e analizzare l'utilizzo del nostro Sito web in forma
            anonima (</span><a href="https://policies.google.com/privacy?hl=it"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>privacy policy</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>,&nbsp;</span><a href="https://tools.google.com/dlpage/gaoptout"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>opt-out</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>).</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Google
      Tag Manager – Per gestire i tag di Google e di terze parti (Facebook Pixel)
            necessari a monitorare le conversioni che si verificano sul nostro Sito (</span><a href="https://policies.google.com/privacy?hl=it"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>privacy
              policy</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>,&nbsp;</span><a href="https://tools.google.com/dlpage/gaoptout"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>opt-out</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>).</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Google
      Ads – Per consentirci di monitorare le conversioni che si verificano sul nostro
            Sito come risultato delle inserzioni pubblicate su Google (</span><a href="https://policies.google.com/privacy?hl=it"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>privacy
              policy</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>,&nbsp;</span><a href="https://tools.google.com/dlpage/gaoptout"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>opt-out</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>).</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Facebook
      – Per consentirci di monitorare le conversioni che si verificano sul nostro
      Sito come risultato delle inserzioni pubblicate su Facebook e per offrire
            all’Utente funzionalità di condivisione sulla propria bacheca (</span><a href="https://www.facebook.com/privacy/explanation"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>privacy
              policy</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>).</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Linkedin
      – Per consentire agli Utenti di velocizzare il processo di creazione del
      Profilo Professionista sulla nostra Piattaforma importando le informazioni del
            proprio profilo Linkedin (</span><a href="https://www.linkedin.com/legal/privacy-policy"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>privacy
              policy</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>)</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Mailjet
            – Per effettuare attività di e-mail marketing (</span><a href="https://www.mailjet.com/security-privacy/"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>privacy
              policy</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>)</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Youtube
            – Per valutare il comportamento degli utenti di YouTube (</span><a href="https://policies.google.com/privacy?hl=it"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>privacy
              policy</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>).</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Hotjar
      – Per aiutarci a comprendere meglio il comportamento dei visitatori del nostro
            Sito web in forma anonima (</span><a href="https://www.hotjar.com/legal/policies/privacy/"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>privacy
              policy</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>).</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Stripe
      – Per consentire agli Utenti di completare gli acquisti dei Servizi offerti
            dalla nostra Piattaforma (</span><a href="https://stripe.com/it/privacy"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>privacy policy</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>)</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></b></p>
      <h2 style={{ marginLeft: '18.0pt', textIndent: '-18.0pt' }}><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>4.<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span></b><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Durata dei Cookie</span></b></h2>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>I cookie hanno una durata
      dettata dalla data di scadenza o da un’azione specifica come la chiusura del
            browser impostata al momento dell’installazione. </span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>I cookie possono essere:</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Wingdings' }}>§<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp; </span></span><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Temporanei
              o di sessione:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;sono utilizzati per archiviare informazioni
        temporanee, consentono di collegare le azioni eseguite durante una sessione
            specifica e vengono rimossi dal computer alla chiusura del browser;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Wingdings' }}>§<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp; </span></span><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Persistenti:</span></b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;sono
      utilizzati per archiviare informazioni, ad esempio il nome e la password di
      accesso, in modo da evitare che l’Utente debba digitarli nuovamente ogni volta
      che visita un sito specifico. Questi rimangono memorizzati nel computer anche
            dopo aver chiuso il browser.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Resta ferma la possibilità
            dell’Utente di modificare le scelte prestate in ogni momento.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></b></p>
      <h2 style={{ marginLeft: '18.0pt', textIndent: '-18.0pt' }}><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>5.<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span></b><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Manifestazione del consenso</span></b></h2>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Per i cookie che richiedono il
      consenso, alla prima visita del Sito l’Utente visualizza automaticamente un
            banner che richiede la manifestazione del consenso all’utilizzo dei cookie.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>In qualsiasi momento è
      possibile modificare o revocare il proprio consenso dalla pagina contenente la
            “</span><a href="https://www.quetzz.it/dichiarazione-cookie"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Dichiarazione
              dei cookie</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>”.</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <h2 style={{ marginLeft: '18.0pt', textIndent: '-18.0pt' }}><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>6.<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span></b><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Come disabilitare i Cookie</span></b></h2>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>L’Utente può gestire le
      preferenze relative ai cookie direttamente all’interno del proprio browser ed
            impedire che terze parti possano installarli.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Tramite le preferenze del
      browser è inoltre possibile eliminare i cookie installati in passato, incluso
      il cookie in cui è stato eventualmente salvato il consenso all’installazione di
      cookie da parte di questo Sito. Disabilitando tutti i cookie, il funzionamento
            di questo Sito potrebbe risultare compromesso.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>L’Utente può trovare
      informazioni ed esercitare il proprio diritto ad opporsi al tracciamento dei
            cookie nel proprio browser ai seguenti indirizzi:</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Internet
            Explorer:&nbsp;</span><a href="http://windows.microsoft.com/internet-explorer/delete-manage-cookies"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Clicca qui</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Google
            Chrome:&nbsp;</span><a href="https://support.google.com/chrome/answer/95647"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Clicca qui</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Mozilla
            Firefox:&nbsp;</span><a href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Clicca qui</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Opera:&nbsp;</span><a href="https://www.opera.com/help/tutorials/security/privacy/"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Clicca qui</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Apple
            Safari:&nbsp;</span><a href="https://support.apple.com/kb/ph21411"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Clicca qui</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>.</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Inoltre si può procedere alla
      cancellazione dei cookie chiedendo l’opt-out direttamente alle terze parti o
            tramite il sito&nbsp;</span><a href="http://www.youronlinechoices.com/"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>www.youronlinechoices.com</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>, dove è possibile
        gestire le preferenze di tracciamento della maggior parte degli strumenti
            pubblicitari.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Per modificare le impostazioni
            relative ai cookies Flash si può cliccare sul seguente collegamento&nbsp;</span><a href="https://www.macromedia.com/support/documentation/en/flashplayer/help/settings_manager07.html"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Clicca qui</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>.</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <h2 style={{ marginLeft: '18.0pt', textIndent: '-18.0pt' }}><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>7.<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span></b><b><span style={{ fontSize: '16.0pt', lineHeight: '107%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Diritti dell’Utente</span></b></h2>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Gli Utenti possono esercitare
            determinati diritti con riferimento ai Dati trattati dal Titolare. </span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>In particolare, l’Utente ha il
            diritto di:</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Courier New"' }}>o<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Revocare
            il consenso in ogni momento;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Courier New"' }}>o<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Opporsi
            al Trattamento dei propri Dati Personali;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Courier New"' }}>o<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Accedere
            ai propri Dati Personali;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Courier New"' }}>o<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Verificare
            e chiedere la rettifica;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Courier New"' }}>o<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Ottenere
            la limitazione del Trattamento;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Courier New"' }}>o<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Ottenere
            la cancellazione o rimozione dei propri Dati Personali;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Courier New"' }}>o<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Ricevere
            i propri Dati Personali o farli trasferire ad altro Titolare;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Courier New"' }}>o<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Proporre
            un reclamo ad un’Autorità di controllo;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Per esercitare i propri
      diritti, gli Utenti possono indirizzare una richiesta agli estremi di contatto
      del Titolare indicati in questo documento. Le richieste sono effettuate a
      titolo gratuito ed evase dal Titolare nel più breve tempo possibile, in ogni caso
            entro 30 (trenta) giorni.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Per esercitare tali diritti,
            scrivere al Titolare</span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}> Quetzz s.r.l</span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>, Via del Cotonificio
            129/B, 33100 – Udine (UD), </span><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>indirizzo e-mail </span><a href="mailto:info@quetzz.it"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>info@quetzz.it</span></a></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Le ulteriori informazioni
            riguardo al trattamento dei dati si possono trovare al seguente link&nbsp;</span><a href="https://www.quetzz.it/privacy"><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif', color: 'windowtext' }}>Informativa sulla Privacy</span></a><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '115%' }}><i><span style={{ fontSize: '12.0pt', lineHeight: '115%', fontFamily: '"Arial",sans-serif' }}>Ultimo aggiornamento: 02/03/2021</span></i></p>
    </div>
  }
}