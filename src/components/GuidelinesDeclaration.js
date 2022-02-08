import React from 'react'
import Info from './Info'

export default class GuidelinesDeclaration extends Info {
  iframe = React.createRef()

  title() {
    return 'Regolamento'
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
    return <div className="guidelinesSection">
      <p className="MsoNormal" align="center" style={{ marginBottom: '0cm', textAlign: 'center', lineHeight: '150%', textAutospace: 'none' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Reso ai sensi degli articoli
          46 e 47 del DPR 28 dicembre 2000, n. 445</span></b></p>
      <p className="MsoNormal" style={{ marginBottom: '0cm', lineHeight: '150%', textAutospace: 'none' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>I sottoscritti <b>Giacomo Bonaldo</b>,
        nato a Venezia il <b>22/06/1989</b>,<b> </b>residente e domiciliato in Via Antonio
        Lasciac, 38/2 – 34170 Gorizia (GO) e Francesco Marino, nato a Monfalcone il <b>27/12/1989</b>,
        residente e domiciliato in Via del Faiti, 6 – 34170 Gorizia (GO), in qualità di
        Soci Amministratori della Società <b>Quetzz S.r.l. </b>(di seguito la Società
        Promotrice) con sede legale in via del Cotonificio, 129/B 33100 Udine c.f. /
        p.IVA 03015750304<b> </b></span></p>
      <p className="MsoNormal" align="center" style={{ marginBottom: '0cm', textAlign: 'center', lineHeight: '150%', textAutospace: 'none' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>consapevoli</span></b></p>
      <p className="MsoNormal" style={{ marginBottom: '0cm', lineHeight: '150%', textAutospace: 'none' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>che
      il rilascio di dichiarazioni mendaci è punito ai sensi del codice penale e
        delle leggi speciali in materia e in conformità a quanto disposto dall’art. <b>76
        </b>del d.lgs. <b>28.12.2000, n. 445, </b></span></p>
      <p className="MsoNormal" align="center" style={{ marginBottom: '0cm', textAlign: 'center', lineHeight: '150%', textAutospace: 'none' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>dichiarano</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>ai sensi dell’art. 47 del
      d.lgs. n. 445/2000, l’intento di promuovere la presente operazione a premi secondo
        le modalità contenute nei seguenti articoli.</span></p>
      <p className="MsoNoSpacing" style={{ textAlign: 'justify', lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 1.</span></b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}> <b>Denominazione
          della manifestazione a premi</b> </span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><u><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>INVITA E RACCOMANDA PROFESSIONISTI
          SU QUETZZ!</span></u></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><u><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}><span style={{ textDecoration: 'none' }}>&nbsp;</span></span></u></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 2. Tipologia della
          manifestazione a premio </span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Operazione a premi con
        consegna del premio contestuale all’atto di acquisto.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 3. Periodo di
          svolgimento </span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Dal 17/02/2021 al 31/12/2022.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>La Società Promotrice
      s’impegna a non dare inizio alla presente operazione a premi, prima
      dell’avvenuta consegna al Ministero dello Sviluppo Economico della
        documentazione necessaria per il corretto avvio dell’operazione a premio.</span></p>
      <p className="MsoNormal" style={{ marginBottom: '0cm', lineHeight: 'normal', textAutospace: 'none' }}><span style={{ fontSize: '12.0pt', fontFamily: '"Tahoma",sans-serif', color: 'black' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 4. Area di
          svolgimento della promozione</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Friuli-Venezia Giulia.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 5. Premi promozionati
        </span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>I premi consistono in buoni sconto
      sotto forma di punti virtuali che possono essere utilizzati per acquistare
      qualsiasi articolo proposto dalla piattaforma, siano essi dei buoni regalo o
        altre tipologie di prodotto.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 6. Partecipanti
          aventi diritto all’iniziativa</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Consumatori finali.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 7. Meccanica dell’operazione
          a premi </span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Tutti gli utenti che nel
      periodo indicato all’Art. 3 svolgeranno attività di passaparola sulla
        piattaforma (di seguito anche “Il Sito”) accessibile dal sito internet </span><a href="http://www.quetzz.it"><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>www.quetzz.it</span></a><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>, riceveranno dei punti
        che potranno essere utilizzati per acquistare a prezzo scontato qualsiasi articolo
        proposto dalla piattaforma.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Nello specifico, le attività
      di passaparola riguardano la possibilità, per qualsiasi utente registrato, di
      raccomandare un professionista già iscritto alla piattaforma (di seguito anche
        “<b><i>Quetzz-in</i></b>”), in relazione a una specifica richiesta,
        precedentemente pubblicata sul Sito da un altro utente (di seguito anche “<b><i>Autore</i></b>”).</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>L’utente che raccomanderà il
      professionista che verrà poi scelto dall’autore della richiesta, riceverà un
        premio pari a 100 punti.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>In aggiunta, rientra nelle
      attività di passaparola anche la possibilità da parte dell’utente registrato,
      di invitare sulla piattaforma professionisti che non abbiano ancora effettuato
        la registrazione al Sito (di seguito anche “<b><i>Invito</i></b>”), o
        parimenti, di raccomandare un professionista non iscritto alla piattaforma (di
        seguito anche “<b><i>Quetzz-out</i></b>”), in relazione a una specifica
        richiesta, precedentemente pubblicata sul Sito dall’autore.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Nel caso dell’invito, l’utente
      riceverà un premio pari a 100 punti ogniqualvolta il professionista invitato
      verrà scelto in relazione a tutte le richieste a cui deciderà di candidarsi, a
        patto che:</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>-<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span></span><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Il
        professionista si sia candidato alla richiesta spontaneamente;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>-<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span></span><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Il
        professionista non sia stato raccomandato da un altro utente;<br />
        In questo caso infatti, il premio verrà percepito solo ed esclusivamente
        dall’utente che avrà effettuato il quetzz-in;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Nel caso del quetzz-out
      invece, qualora il professionista venisse scelto dall’autore della richiesta,
        l’utente percepirebbe un premio pari a 200 punti.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Lo stesso premio verrebbe
      percepito dall’utente che, in relazione a una richiesta, raccomandi un
      professionista iscritto (“Quetzz-in”) che ha precedentemente provveduto ad
      invitare sul sito (“Invito”), e questi venisse scelto dall’autore della
        richiesta.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>In tutti i casi sopra
      menzionati, i premi verranno consegnati contestualmente all’acquisto da parte
      dei professionisti, del servizio che la piattaforma offre per metterli in
        contatto con gli autori delle richieste.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 8. Determinazione del
          prezzo d’acquisto dei prodotti</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>L’entità dello sconto
      applicato al momento dell’acquisto, è proporzionale all’ammontare dei punti
        fino a quel momento accumulati, in relazione al valore dell’articolo desiderato.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Per garantire agli utenti una
      comprensione immediata del valore dei punti accumulati in relazione agli
      acquisti che intendano effettuare sulla Piattaforma, la Società Promotrice ha
        stabilito che 100 punti assumano un controvalore di 1 €.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Qualora l’utente disponesse di
      un quantitativo di punti pari al valore dell’articolo richiesto, potrà
      richiedere il prodotto desiderato senza dover corrispondere alcun contributo in
        denaro. </span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>In qualsiasi caso diverso da
      quello appena menzionato, il prezzo d’acquisto del prodotto desiderato
      corrisponderà alla differenza data dal valore in punti del suddetto prodotto e
        dal numero di punti posseduti dall’utente in quel preciso momento.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Es. Se un prodotto valesse
      2700 punti e l’utente possedesse 1300 punti, il prezzo d’acquisto corrisponderebbe
        a 14,00 €.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>N.B.</span></b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}> I
      meccanismi di assegnazione dei punti e di determinazione del rispettivo
      controvalore sono descritti al paragrafo 10 “Punti e Reti” del documento
      contenente i “Termini &amp; Condizioni” di utilizzo del servizio offerto, che
        invitiamo tutti gli utenti a consultare direttamente all’indirizzo </span><a href="https://quetzz.it/terms"><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>https://quetzz.it/terms</span></a></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 9. Validità dei punti
          e limitazioni al loro utilizzo</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>I punti potranno essere
        utilizzati fino al 31/12/2022, data di termine dell’Operazione a premi.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>L’utente dunque comprende che
        il mancato utilizzo entro tale data, comporti la perdita di <b><u>tutti</u></b>
        i punti fino a quel momento accumulati.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 10. Acquisto dei prodotti</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Gli utenti che desiderino
      utilizzare i propri punti per acquistare uno o più prodotti, potranno visitare
      la sezione “Negozio” (la quale risulta accessibile a tutti gli utenti
      registrati) e ordinare qualsiasi articolo tra quelli disponibili, in
        ottemperanza alle condizioni di cui all’Art.9.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Sulla base di quanto detto
        finora, si specifica che:</span></p>
      <p className="MsoNormal" style={{ marginBottom: '0cm', lineHeight: 'normal', textAutospace: 'none' }}><span style={{ fontSize: '12.0pt', fontFamily: '"Tahoma",sans-serif', color: 'black' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>la
      Società Promotrice non ha alcuna responsabilità nel caso in cui i dati indicati
      dal consumatore in fase di registrazione al Sito risultino, ai fini della ricezione
      del buono o del prodotto desiderato, errati, comportando così l’invio dell’articolo
      ad un indirizzo (fisico o di posta elettronica) non corretto. A tal fine, si
      raccomanda a tutti gli utenti di controllare la veridicità dei dati personali forniti
      nell’apposita sezione “Informazioni Personali”, accessibile dal proprio Profilo
        Utente;</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Le
      disponibilità degli articoli presenti sul Sito possono variare, in dipendenza
      delle quantità messe a disposizione dalle aziende che hanno emesso o
        distribuito gli articoli in oggetto; </span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>La
      Società Promotrice si riserva il diritto di non consegnare il premio nel caso
      in cui, a seguito di opportuni accertamenti, si evinca che l’utente abbia
        utilizzato la Piattaforma </span><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>o qualsiasi software esterno per
        attribuire al proprio Account un quantitativo di punti immeritato e
        ingiustificato;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 11. Modalità di
          partecipazione alla presente operazione a premi</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>L’utente comprende
      l’importanza di accettare indistintamente tutte le clausole contenute nel
      presente regolamento, al fine di poter partecipare alla presente operazione a
        premi.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 12. Revoca della
          promessa o modifica delle modalità di esecuzione</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>La Società Promotrice potrà
      revocare o modificare le modalità di esecuzione della presente manifestazione a
      premi per giusta causa, ai sensi e nei termini di cui dell’Art. 1990 del codice
      civile dandone preventivamente comunicazione ai consumatori nella stessa forma
        della promessa o in forma equivalente.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 13. Termine di consegna
          dei premi</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>La Società Promotrice si
      impegna a consegnare i premi contestualmente all’atto di acquisto, nelle
        modalità descritte all’Art.7.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 14. Modalità di
          consegna dei prodotti</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>I prodotti verranno spediti
      agli indirizzi (fisici o di posta elettronica) indicati dagli utenti in fase di
        registrazione al Sito o conseguentemente all’acquisto dei prodotti desiderati.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 15. Responsabilità
          relative alla consegna dei prodotti</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Poiché la consegna dei prodotti
      avviene tramite posta elettronica o spedizione con corriere, nessuna
      responsabilità è imputabile alla Società Promotrice di fronte ad eventuali
      mancate ricezioni dei prodotti da parte degli utenti a causa di inottemperanze estranee
        alla Società stessa.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 16.</span></b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}> <b>Mezzi
      di comunicazione usati per la pubblicizzazione della presente operazione a
          premi</b></span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Materiale
        cartaceo (flyers, volantini, etc.)</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '150%' }}><span lang="EN-US" style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span></span><span lang="EN-US" style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Social networks (Facebook ADS, Google ADS)</span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '150%' }}><span lang="EN-US" style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span></span><span lang="EN-US" style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>E-mail</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span lang="EN-US" style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 17.</span></b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}> <b>Mezzi
          usati per la pubblicizzazione del regolamento della presente operazione a premi</b></span></p>
      <p className="MsoNoSpacing" style={{ marginLeft: '36.0pt', textIndent: '-18.0pt', lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: 'Symbol' }}>·<span style={{ font: '7.0pt "Times New Roman"' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Sito
        internet </span><a href="https://quetzz.it/regolamento"><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>https://quetzz.it/regolamento</span></a></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 18. Trattamento dei
          dati personali</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>La partecipazione da parte dei
      consumatori alla presente operazione a premi, non comporta il rilascio di alcun
      dato personale aggiuntivo rispetto a quelli già forniti in sede di
        registrazione al Sito, i quali, come già specificato nel documento “</span><a href="https://www.quetzz.it/terms"><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Termini &amp; Condizioni</span></a><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>”,
        sono necessari per garantire il corretto funzionamento del servizio offerto.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Solamente nel caso in cui
      l’utente desideri acquistare un prodotto fisico, gli verrà successivamente
        richiesto di indicare l’indirizzo per la spedizione.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Si precisa che tale dato
      personale verrà utilizzato dalla Società Promotrice solo ed esclusivamente ai
        fini della consegna del prodotto acquistato.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Una corretta gestione dei dati
      personali è un aspetto di fondamentale importanza per la Società Promotrice,
      dal momento che la piattaforma è stata strutturata per tutelare la privacy dei
        propri Utenti.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>I dati degli Utenti saranno dunque
      trattati dalla Società Promotrice nel rispetto della normativa vigente in
      materia di privacy e ai sensi della nostra Privacy Policy, liberamente
        consultabile a questo </span><a href="https://www.quetzz.it/privacy"><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>link</span></a><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 19. Diritto di
          accesso ai dati</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>La informiamo che, ai sensi
      dell’art.15 del GDPR, Lei ha il diritto di accedere ai suoi dati personali per
      chiederne la rettifica o la cancellazione, od opporsi in tutto o in parte al
        loro trattamento. </span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Per esercitare tali diritti
        potrà rivolgersi al Titolare del trattamento, <b>Quetzz s.r.l</b>, con sede
        legale in Via del Cotonificio 129/B, 33100 – Udine (UD) Codice Fiscale/Partita
        Iva </span><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>01185810312</span><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>, a
        mezzo mail </span><a href="mailto:support@quetzz.it"><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>support@quetzz.it</span></a></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Articolo 20. Controversie </span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>La Società Promotrice agisce
      sempre in buona fede cercando di tutelare, sia i propri interessi, che quelli
        degli Utenti.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>Per questa ragione, qualora
      dovesse nascere qualsivoglia tipo di controversia, invitiamo l’Utente a
        contattarci al fine di risolvere la questione amichevolmente.</span></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></p>
      <p className="MsoNormal" style={{ marginBottom: '0cm', lineHeight: 'normal', textAutospace: 'none' }}><b><span style={{ fontSize: '12.0pt', fontFamily: '"Arial",sans-serif', color: 'black' }}>QUETZZ S.R.L. </span></b></p>
      <div style={{ border: 'none', borderBottom: 'solid windowtext 1.0pt', padding: '0cm 0cm 1.0pt 0cm' }}>
        <p className="MsoNormal" style={{ marginBottom: '0cm', lineHeight: 'normal', textAutospace: 'none', border: 'none', padding: '0cm' }}><b><span style={{ fontSize: '12.0pt', fontFamily: '"Arial",sans-serif', color: 'black' }}>&nbsp;</span></b></p>
      </div>
      <p className="MsoNormal" style={{ marginBottom: '0cm', lineHeight: 'normal', textAutospace: 'none' }}><b><span style={{ fontSize: '12.0pt', fontFamily: '"Arial",sans-serif', color: 'black' }}>&nbsp;</span></b></p>
      <p className="MsoNormal" style={{ marginBottom: '0cm', lineHeight: 'normal', textAutospace: 'none' }}><span style={{ fontSize: '12.0pt', fontFamily: '"Arial",sans-serif', color: 'black' }}>Via
        del Cotonificio, 129/B</span></p>
      <p className="MsoNormal" style={{ marginBottom: '0cm', lineHeight: 'normal', textAutospace: 'none' }}><span style={{ fontSize: '12.0pt', fontFamily: '"Arial",sans-serif', color: 'black' }}>33100
        – Udine (UD)</span></p>
      <p className="MsoNormal" style={{ marginBottom: '0cm', lineHeight: 'normal', textAutospace: 'none' }}><a href="mailto:info@quetzz.it"><span style={{ fontSize: '12.0pt', fontFamily: '"Arial",sans-serif' }}>info@quetzz.it</span></a></p>
      <p className="MsoNormal" style={{ marginBottom: '0cm', lineHeight: 'normal', textAutospace: 'none' }}><span style={{ fontSize: '12.0pt', fontFamily: '"Arial",sans-serif', color: 'black' }}>+39
        348 437 7386</span></p>
      <p className="MsoNoSpacing" align="center" style={{ textAlign: 'center', lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></b></p>
      <p className="MsoNoSpacing" style={{ lineHeight: '150%' }}><b><span style={{ fontSize: '12.0pt', lineHeight: '150%', fontFamily: '"Arial",sans-serif' }}>&nbsp;</span></b></p>
    </div>
  }
}