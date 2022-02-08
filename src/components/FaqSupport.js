import React from 'react'
import Info from './Info'
import Faq from "react-faq-component";

const data = {
    rows: [
        {
            title: "Quali sono le linee guida da rispettare in relazione al processo di pubblicazione di una richiesta?",
            content:<span className='px-2'>
                    <b>È vietato</b>:
                        <ol className='px-4'>
                            <li>1. Usare linguaggio volgare od offensivo; </li>
                            <li>2. Pubblicare dati o informazioni false o diffamatorie nei confronti di persone fisiche e/o giuridiche;</li>
                            <li>3. Pubblicare volontariamente richieste in sottocategorie del Sito diverse da quelle pertinenti;</li>
                            <li>4. Pubblicare richieste al fine di ottenere prodotti e/o servizi illegali; </li>
                            <li>5. Pubblicare richieste false o inventate al solo scopo di far perdere tempo agli Utenti e senza che vi sia una reale necessità di usufruire del prodotto e/o servizio richiesto;  </li>
                            <li>6. Pubblicare richieste contenenti informazioni di contatto (nomi, cognomi, indirizzi fisici, indirizzi e-mail e numeri di telefono) proprie o di terzi al fine di eludere il sistema di pagamento della Piattaforma che fornisce accesso ai Servizi offerti;</li>
                            <li>7. Pubblicare link a siti terzi non pertinenti con il contenuto della richiesta; </li>
                        </ol> 
                    </span>,
        },
        {
            title: "Che cos’è Quetzz?",
            content:
            <p className='px-2'>Quetzz è una piattaforma che rivoluziona il passaparola per connettere i bisogni delle persone con le competenze di professionisti e aziende del Friuli-Venezia Giulia.
            </p>,
        },
        {
            title: "Come funziona?",
            content: <ul className='px-2'>
                        <li>Puoi utilizzare la piattaforma per pubblicare le tue richieste gratuitamente e trovare il servizio o il prodotto artigianale che stai cercando.</li>
                        <li>In aggiunta, puoi aiutare gli altri utenti raccomandando il professionista giusto per le loro richieste, e in cambio ottenere dei punti, da usare nel nostro negozio, per portarti a casa i prodotti che ti interessano.</li>
                        <li>Se sei un professionista invece, puoi entrare in contatto con utenti che sono già interessati ai servizi o prodotti che offri ad un costo ridicolo, senza dover investire denaro in pubblicità per aumentare la tua visibilità ed acquisire nuovi clienti. </li>
                    </ul>
                    ,
        },
        {
            title: "Il servizio è gratuito?",
            content: <ul className='px-2'>
                        <li>Per gli utenti il servizio è SEMPRE gratuito, sia che pubblichino richieste o inviino quetzz.</li>
                        <li>I professionisti invece hanno la possibilità di candidarsi gratuitamente alle richieste degli utenti, ma gli verrà chiesto di pagare il costo del servizio solo ed esclusivamente quando l'utente, dopo aver espresso interesse verso i servizi e/o prodotti che offre, lo avrà scelto in relazione alla sua richiesta.</li>
                    </ul>,
        },
        {
            title: "Se pubblico una richiesta su Quetzz, come viene tutelata la mia privacy?",
            content: <ul className='px-2'>
                        <li>Su Quetzz è garantito l'anonimato.</li>
                        <li>Al momento della registrazione, ti verrà chiesto di inserire un nickname, ossia un soprannome di fantasia con cui pubblicherai le tue richieste.</li>
                        <li>Nessun utente potrà vedere i tuoi dati personali, ad eccezione dei professionisti che sceglierai in relazione alle tue richieste.</li>
                    </ul>,
        },
        {
            title: "Qual è la differenza tra un utente ed un professionista?",
            content: <ul className='px-2'>
                        <li>L’utente ha un solo profilo (profilo utente), il professionista invece ne ha due (profilo utente + profilo professionista).</li>
                        <li>Un utente può pubblicare richieste e inviare quetzz ad altri utenti, un professionista invece può anche candidarsi alle richieste.</li>
                    </ul>,
        },
        {
            title: "Chiunque può visitare il mio profilo utente? ",
            content: <ul className='px-2'>
                        <li>Quetzz non deve essere inteso come un social network.</li>
                        <li>Il tuo profilo utente può essere visualizzato solamente in un caso:</li>
                        <li className='px-2'>- Se hai inviato un quetzz, l’autore della richiesta può vedere il tuo profilo per visionare i feedback.</li>
                    </ul>,
        },
        {
            title: "Che cosa vuol dire “inviare un quetzz”? ",
            content: <ul className='px-2'>
                        <li>Significa raccomandare un professionista in relazione a una determinata richiesta.</li>
                        <li>Si parla di quetzz-in quando la persona che si intende raccomandare è già iscritta alla piattaforma.</li>
                        <li>Si parla di quetzz-out quando il professionista che si intende raccomandare non è ancora iscritto a Quetzz.</li>
                    </ul>,
        },
        {
            title: "Chi può inviare un Quetzz?",
            content: <p className='px-2'>
                        Tutti gli utenti registrati, indipendentemente dal fatto che abbiano o meno un profilo da professionista.
                    </p>,
        },
        {
            title: "Come si invia un Quetzz?",
            content: <ul className='px-2'>
                        <li>Il pulsante “Quetzz” è presente nel dettaglio di ogni richiesta e ti permette di raccomandare una persona che conosci in relazione alla specifica richiesta che stai visualizzando.</li>
                        <li>Ti basterà inserire l’email e/o il numero di cellulare della persona che vuoi raccomandare per verificare se è già iscritta alla piattaforma. </li>
                        <li>Se sì, il quetzz verrà inviato istantaneamente.</li>
                        <li>Se no, la piattaforma genererà un link associato al tuo profilo che dovrai inviare privatamente alla persona che vuoi raccomandare e che lo accompagnerà nel processo di registrazione e di candidatura alla richiesta. </li>
                        <li>Se no, la piattaforma genererà un link associato al tuo profilo che dovrai inviare privatamente alla persona che vuoi raccomandare e che lo accompagnerà nel processo di registrazione e di candidatura alla richiesta.</li>
                        <li>Inoltre, qualora il professionista che intendessi raccomandare fosse già iscritto alla Piattaforma e facesse parte della tua Rete (v. sotto “Che cos’è la Rete?”) potrai facilmente trovare il suo contatto usando la funzione “Rubrica”.</li>
                    </ul>,
        },
        {
            title: "Che cosa vuol dire “ricevere un Quetzz”? ",
            content: <p className='px-2'>
                        Significa che si è stati raccomandati in relazione a una determinata richiesta. 
                    </p>,
        },
        {
            title: "Chi può ricevere un Quetzz? ",
            content: <p className='px-2'>
                        Chiunque, sia utenti registrati che non.
                    </p>,
        },
        {
            title: "Cosa vuol dire “accettare un Quetzz”?  ",
            content: <p className='px-2'>
                        Significa decidere di candidarsi alla richiesta per cui si è stati raccomandati. 
                    </p>,
        },
        {
            title: "Chi può accettare un Quetzz?  ",
            content: <p className='px-2'>
                        Solamente gli utenti registrati che dispongono di un profilo da professionista. 
                    </p>,
        },
        {
            title: "Un Quetzz può essere rifiutato? ",
            content: <p className='px-2'>
                       Si, potrebbe succedere nel caso in cui il professionista non dovesse essere interessato alla richiesta per cui è stato raccomandato. 
                    </p>,
        },
        {
            title: "Cosa sono i Punti? ",
            content: <p className='px-2'>
                      Sono le ricompense per le attività di passaparola che gli utenti svolgono sulla piattaforma. 
                    </p>,
        },
        {
            title: "Come si ottengono i Punti?",
            content: <span className='px-2'>
                        <b>I punti possono essere ottenuti in tre modi</b>:
                        <ol className='px-4'>
                            <li>1. Raccomandando professionisti in relazione alle richieste degli altri utenti (=inviando quetzz, sia in che out); </li>
                            <li>2. Sviluppando la propria rete e invitando nuovi professionisti ad iscriversi a Quetzz con il proprio codice di invito. Ogniqualvolta un professionista appartenente alla tua rete prenderà in carico una richiesta, otterrai una ricompensa in punti, a meno che non sia stato raccomandato da un altro utente.</li>
                            <li>3. Diventando un campione dei quetzz! Tieni d’occhio la classifica perché ci saranno grandi sorprese per i primi 3 classificati!</li>
                        </ol> 
                    </span>,
        },
        {
            title: "Quanti punti si ottengono con ogni Quetzz? ",
            content: <p className='px-2'>
                     100, l’equivalente di 1,00 € da spendere in buoni regalo.  
                    </p>,
        },
        {
            title: "Ottengo punti ogniqualvolta invio un quetzz? ",
            content: <p className='px-2'>
                     Non proprio. Ottieni punti ogniqualvolta l’utente autore della richiesta sceglie un professionista che hai raccomandato.
                    </p>,
        },
        {
            title: "Un utente può ottenere punti solo con i Quetzz? ",
            content: <p className='px-2'>
                      No, lo può fare anche espandendo la sua Rete. Infatti, ogniqualvolta un professionista che fa parte della sua rete si candida spontaneamente per prendere in carico una nuova richiesta, gli vengono attribuiti 100 punti, anche se non l’ha raccomandato direttamente. 
                    </p>,
        },
        {
            title: "Che cos’è la Rete? ",
            content: <ul className='px-2'>
                        <li>È l’insieme degli utenti che si sono registrati sulla piattaforma grazie ad un tuo quetzz o al tuo link di invito e che hanno contestualmente creato il loro profilo da professionista. </li>
                        <li>Se ad esempio hai invitato sulla Piattaforma 10 persone, delle quali 6 hanno creato il loro profilo da professionista, allora la tua rete sarà composta da 6 professionisti. </li>
                    </ul>,
        },
        {
            title: "Come faccio ad invitare le persone sulla piattaforma? ",
            content: <span className='px-2'>
                        <b>Puoi farlo in 2 modi</b>:
                        <ol className='px-4'>
                            <li>1. Facendoli registrare con il tuo link di invito;  </li>
                            <li>2. Facendoli registrare dopo aver inviato loro un quetzz-out; </li>
                        </ol> 
                    </span>,
        },
        {
            title: "Quanti punti si ottengono con la rete? ",
            content: <ul className='px-2'>
                        <li>Dipende da quanti professionisti ne fanno parte e da quante richieste prendono in carico. </li>
                        <li>In linea generale, per ogni richiesta presa in carico da un professionista appartenente alla tua rete, ottieni 100 punti (l’equivalente di 1,00 € da spendere in buoni regalo), a meno che il suddetto professionista non sia stato raccomandato da qualcun altro!</li>
                    </ul>,
        },
        {
            title: "Come posso utilizzare i punti che ottengo? ",
            content: <ul className='px-2'>
                        <li>Nella sezione “Negozio” la piattaforma mette a disposizione molti buoni regalo di importo variabile e spendibili nei negozi che preferisci. </li>
                        <li>Puoi utilizzare i tuoi punti per portarti a casa qualsiasi buono regalo, gratis se hai tutti i punti richiesti, o a prezzo scontato pagando la differenza tra il valore dei tuoi punti e del buono regalo desiderato!</li>
                        <li>(Es. Se per un buono regalo sono richiesti 2900 punti e tu ne hai 1200, pagherai la differenza, corrispondente ad un prezzo d’acquisto di 17,00 €). </li>
                    </ul>,
        },
        {
            title: "Come faccio ad ottenere più punti?",
            content: <p className='px-2'>
                     La combo vincente consiste nell’inviare quetzz ai professionisti della tua rete, per ottenere ben 200 punti al colpo!
                    </p>,
        },
        {
            title: "Posso convertire i punti in euro? ",
            content: <p className='px-2'>
                     Attualmente i punti non possono essere convertiti in moneta FIAT. 
                    </p>,
        },
        {
            title: "Se sono un professionista, quanto mi costa candidarmi alle richieste degli utenti? ",
            content: <p className='px-2'>
                      Nulla, il professionista si candida alle richieste gratuitamente. 
                    </p>,
        },
        {
            title: "Da professionista, che cosa ottengo pagando il costo del servizio?  ",
            content: <ul className='px-2'>
                        <li>Sbloccherai le informazioni di contatto di un potenziale cliente che ha già espresso interesse verso i prodotti e/o servizi che offri, in modo tale da poterlo contattare privatamente. </li>
                        <li>Inoltre, avrai l’esclusiva sul suo contatto per 8 ore. </li>
                    </ul>,
        },
        {
            title: "Se lascio che siano gli altri utenti a cercare le richieste al posto mio, vengo penalizzato in qualche modo?",
            content: <ul className='px-2'>
                        <li>Assolutamente no! Questa comodità la offre la casa! </li>
                        <li>Il costo del servizio infatti rimarrà inviariato, mentre toccherà a noi rinunciare a una parte dei guadagni per devolverla al Quetzzer.</li>
                    </ul>,
        },
        {
            title: "Qual è la differenza tra il candidarsi spontaneamente alle richieste o farlo accettando i quetzz? ",
            content: <p className='px-2'>
                    Nel primo caso dovrai cercarti le richieste da solo, nel secondo caso saranno gli utenti a farlo al posto tuo! 
                    </p>,
        },
        {
            title: "A quanto corrisponde il costo del servizio? ",
            content: <p className='px-2'>
                     l costo del servizio corrisponde a 6,90 €, scontato a 4,90 € per i primi 6 mesi dal lancio della piattaforma! 
                    </p>,
        },
        {
            title: "Un utente può cambiare professionista? ",
            content: <p className='px-2'>
                      Certamente. 
                      Passate le 8 ore dal momento della scelta del professionista, l’utente può decidere di sceglierne un altro. 
                    </p>,
        },
        {
            title: "Se sono un utente non sono un professionista e viceversa? ",
            content: <p className='px-2'>
                     Ogni professionista è allo stesso tempo anche un utente ma non è detto che un utente disponga di un profilo da professionista. 
                    </p>,
        },
        {
            title: "Bisogna creare un nuovo account per diventare professionista? ",
            content: <p className='px-2'>
                     Per diventare un professionista e potersi candidare alle richieste bisogna semplicemente creare il proprio profilo da professionista utilizzando lo stesso account con cui ci si è registrati a Quetzz.
                    </p>,
        },
        {
            title: "Come si diventa professionisti? ",
            content: <p className='px-2'>
                     Fornendo i dati necessari a creare ed attivare il proprio profilo da professionista. 
                    </p>,
        },
        {
            title: "Che dati sono richiesti per diventare professionisti? ",
            content: <ol className='px-2'>
                        <li>&#x2022; Foto </li>
                        <li>&#x2022; Professione </li>
                        <li>&#x2022; Lingue parlate </li>
                        <li>&#x2022; Curriculum Vitae, suddiviso nelle seguenti sezioni: </li>
                        <li>&#x2022; Esperienze di lavoro (obbligatorio)  </li>
                        <li>&#x2022; Titoli di studio (obbligatorio)  </li>
                        <li>&#x2022; Licenze e certificazioni (facoltativo)  </li>
                        <li>&#x2022; Cosa Offro  </li>
                        <li>&#x2022; Informazioni di fatturazione </li>
                    </ol> 
        },
        {
            title: "Il profilo utente è collegato con il profilo da professionista? ",
            content: <p className='px-2'>
                Si, condividono lo stesso account. 
            </p>
        },
        {
            title: "Chiunque può visitare il mio profilo da professionista? ",
            content: <p className='px-2'>
               Solo gli autori (utenti) delle richieste per cui ti sei candidato. 
            </p>
        },
        {
            title: "Chi riceve i feedback? ",
            content: <p className='px-2'>
              Sia gli utenti che i professionisti. 
            </p>
        },
        {
            title: "Qual è la differenza tra il feedback per l’utente e quello per il professionista? ",
            content: <ul className='px-2'>
                        <li>Il feedback al professionista riflette le sue competenze e la qualità del lavoro svolto in relazione alla richiesta dell’utente. </li>
                        <li>Il feedback all’utente viene assegnato automaticamente e coincide con il feedback del professionista che ha raccomandato, rappresentando dunque la capacità dell’utente di raccomandare professionisti di qualità. </li>
                    </ul>,
        },
        {
            title: "È obbligatorio assegnare i feedback?  ",
            content: <ul className='px-2'>
                        <li>No, ma è una pratica vivamente consigliata, che se non viene svolta potrebbe limitare l’esperienza utente.  </li>
                        <li>Un utente infatti non potrà pubblicare altre richieste se prima non ha assegnato i feedback alle richieste precedentemente completate.</li>
                    </ul>,
        },
        {
            title: "Quando può essere considerata completata una richiesta? ",
            content:<span className='px-2'>
                    <b>In due casi</b>:
                        <ol className='px-4'>
                            <li>1. Quando viene raggiunta la deadline;  </li>
                            <li>2. Quando l’utente assegna il feedback. </li>
                        </ol> 
                    </span>,
        },
        {
            title: "Che cos’è la deadline? ",
            content: <p className='px-2'>
               È la data (futura) scelta dal professionista che dovrebbe indicativamente coincidere con il completamento della richiesta. 
            </p>
        },
        {
            title: "Che cosa succede se un utente si accorge di aver scelto un professionista sbagliato? ",
            content: <p className='px-2'>
                Terminate le 8 ore a partire dal momento della scelta del professionista, può decidere di cambiarlo, indicando il motivo del cambiamento e scegliendo di lasciare un feedback, o meno. 
            </p>
        },

    ],
};

const styles = {
    // bgColor: 'white',
    titleTextColor: "rgba(46, 198, 213, var(--bg-opacity))",
    rowTitleColor: "black",
    // rowContentColor: 'grey',
    // arrowColor: "red",
};

const config = {
    animate: true,
    arrowIcon: <i className="fas fa-angle-down"></i>,
};

export default class FaqSupport extends Info {
    render() {
        return <div style={{ padding: '20px', backgroundColor: 'white', }}>
                    <div style={{fontSize: '1.7rem'}}>
                        <div style={{color: "rgba(46, 198, 213, var(--bg-opacity))"}}>FAQ</div>
                        <div style={{color: "rgba(46, 198, 213, var(--bg-opacity))"}}>(Frequently Asked Questions)</div>
                    </div>
                    <div style={{fontSize: '1.2rem', marginTop: '20px', marginBottom: '20px'}}>
                        <div style={{color: "#000"}}><span style={{fontWeight:"bold"}}>Trova la risposta </span>che stai cercando, oppure <span style={{fontWeight:"bold"}}> scrivici la domanda!</span> </div>
                        <div style={{color: "#000"}}><span style={{fontWeight:"bold"}}>Aggiorniamo </span>la sezione FAQ <span style={{fontWeight:"bold"}}> continuamente!</span></div>
                    </div>
                    <Faq
                        data={data}
                        styles={styles}
                        config={config}
                    />
                    
                </div>
    
    }
}