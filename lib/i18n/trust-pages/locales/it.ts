import type { TrustPageCopy, PublisherEducationCopy } from "../types";

const cookies: TrustPageCopy = {
  metaTitle: "Informativa sui cookie",
  metaDescription:
    "Come Life Decision Engine usa i cookie: essenziali, analitici (Google Analytics) e pubblicitari (Google AdSense). Gestisci le tue scelte.",
  eyebrow: "Legale",
  title: "Informativa sui cookie",
  subtitle:
    "Ultimo aggiornamento: maggio 2026. Questa pagina spiega quali cookie impostiamo, perché e come controllare quelli non essenziali. Diritti completi in {privacy}.",
  sections: [
    {
      heading: "Cosa sono i cookie",
      blocks: [
        {
          kind: "p",
          text: "I cookie sono piccoli file di testo nel browser. Aiutano un sito a ricordare preferenze, mantenere l'accesso, misurare il traffico o mostrare annunci pertinenti. Alcuni li impostiamo noi, altri partner come Google se accetti cookie pubblicitari o analitici.",
        },
      ],
    },
    {
      heading: "Cookie essenziali",
      blocks: [
        {
          kind: "p",
          text: "Usiamo un cookie di lingua e chiavi local storage perché lingua dell'interfaccia e scelta di consenso persistano tra le visite. Sono necessari al funzionamento e, secondo le linee guida UE, non richiedono consenso perché strettamente funzionali.",
        },
      ],
    },
    {
      heading: "Cookie analitici (opzionali)",
      blocks: [
        {
          kind: "p",
          text: "Con il tuo permesso carichiamo Google Analytics 4 per capire quali pagine aiutano i lettori e dove l'esperienza rallenta. I cookie analitici restano disattivati finché non accetti i cookie non essenziali nel banner. Puoi rifiutarli e usare l'analizzatore.",
        },
      ],
    },
    {
      heading: "Cookie pubblicitari (opzionali)",
      blocks: [
        {
          kind: "p",
          text: "Partecipiamo a Google AdSense. I cookie pub possono erogare e misurare annunci, limitare la frequenza e, con consenso, personalizzarli. Il file {adsTxt} elenca seller ID pub-3541461663112540. Vedi {googleAdsCookies}.",
        },
      ],
    },
    {
      heading: "Come modificare la scelta",
      blocks: [
        {
          kind: "p",
          text: "Usa il banner di consenso o cancella i dati del sito lifedecisions.space nel browser per reimpostare il banner. Le estensioni possono bloccare globalmente i cookie di terze parti.",
        },
      ],
    },
    {
      heading: "Ulteriori informazioni",
      blocks: [
        {
          kind: "ul",
          items: ["{privacy}", "{contentPolicy}", "{googleAdsCookies}"],
        },
      ],
    },
  ],
};

const contentPolicy: TrustPageCopy = {
  metaTitle: "Politica dei contenuti",
  metaDescription:
    "Cosa pubblica Life Decision Engine: articoli editoriali, strumenti con IA, directory esperti e Q&A della community. Standard di qualità e moderazione.",
  eyebrow: "Editore",
  title: "Politica dei contenuti",
  subtitle:
    "Questa politica descrive cosa appare su lifedecisions.space, chi lo crea e come manteniamo alta la qualità per lettori e partner pubblicitari.",
  sections: [
    {
      heading: "Contenuto editoriale originale",
      blocks: [
        {
          kind: "p",
          text: "Il nostro valore principale sono articoli lunghi originali nel {blog}: framework decisionali su carriera, trasferimento, relazioni e denaro. Redatti dal {editorialTeam}, revisionati secondo {editorialStandards} e aggiornati quando cambiano i fatti. Non facciamo scraping né pubblichiamo pagine filler autogenerate.",
        },
      ],
    },
    {
      heading: "Strumenti e report generati",
      blocks: [
        {
          kind: "p",
          text: "L'analizzatore produce testo personalizzato dalle tue input con modelli strutturati e assistenza IA descritta in {howWeUseAi}. I report sono privati alla sessione salvo condivisione. Sono formativi, non consulenza professionale.",
        },
      ],
    },
    {
      heading: "Directory esperti",
      blocks: [
        {
          kind: "p",
          text: "I professionisti inviano profili tramite {expertsRegister}. Revisioniamo prima della pubblicazione e rimuoviamo inserzioni fuorvianti o spam. Non garantiamo esiti da alcuna relazione professionale.",
        },
      ],
    },
    {
      heading: "Q&A community",
      blocks: [
        {
          kind: "p",
          text: "La {community} consente Q&A testuale secondo {communityGuidelines}. I post possono essere rimossi per abuso, spam, consiglio medico o legale categorico o contenuti pericolosi. Il contenuto community è moderato e non rappresenta la redazione.",
        },
      ],
    },
    {
      heading: "Pubblicità",
      blocks: [
        {
          kind: "p",
          text: "Possiamo mostrare Google AdSense su pagine con contenuto editoriale sostanziale. Gli annunci sono etichettati e separati dal testo editoriale. Vedi {monetize}.",
        },
      ],
    },
    {
      heading: "Segnalare un problema",
      blocks: [
        {
          kind: "p",
          text: "Per correzioni, rimozioni o domande sulla politica: hello@lifedecisions.space o {contact}. Obiettivo: risposta entro cinque giorni lavorativi.",
        },
      ],
    },
  ],
};

const privacy: TrustPageCopy = {
  metaTitle: "Informativa sulla privacy",
  metaDescription:
    "Come Life Decision Engine tratta i tuoi dati, cookie, annunci (Google AdSense) e servizi terzi. Diritti GDPR e CCPA.",
  eyebrow: "Legale",
  title: "Informativa sulla privacy",
  subtitle:
    "Ultimo aggiornamento: aprile 2026. Trasparenza per visitatori e programmi pubblicitari (incluso Google AdSense). Non è consulenza legale.",
  sections: [
    {
      heading: "Chi siamo",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine offre analisi strutturata delle decisioni (con IA opzionale) e link a professionisti terzi, come descritto nella {home}.",
        },
      ],
    },
    {
      heading: "Informazioni che fornisci",
      blocks: [
        {
          kind: "p",
          text: "Usando l'analizzatore o i moduli puoi inserire situazioni personali. Tale contenuto genera i risultati di sessione. Non inviare ciò che non accetti di trattare. È supporto decisionale, non servizio medico, legale o terapeutico.",
        },
      ],
    },
    {
      heading: "Cookie e pubblicità",
      blocks: [
        {
          kind: "p",
          text: "Vedi {cookies}. Possiamo mostrare annunci tramite Google AdSense. Google e partner possono usare cookie secondo regione e scelte. Vedi {googleAdsCookies}. Banner di consenso compatibile GDPR dove richiesto.",
        },
      ],
    },
    {
      heading: "Fornitori IA",
      blocks: [
        {
          kind: "p",
          text: "Se l'analisi IA live è attiva, il testo del prompt può essere inviato a un fornitore IA solo per generare una risposta, secondo le sue politiche. Dettagli: {howWeUseAi}.",
        },
      ],
    },
    {
      heading: "Pagamenti",
      blocks: [
        {
          kind: "p",
          text: "Le funzioni a pagamento possono essere elaborate da Stripe. Non conserviamo numeri di carta completi; Stripe gestisce i dati di pagamento.",
        },
      ],
    },
    {
      heading: "Conservazione dei dati",
      blocks: [
        {
          kind: "ul",
          items: [
            "Input analizzatore: elaborati per la sessione; log errori fino a 30 giorni, poi cancellati o anonimizzati.",
            "Contatti e registrazioni esperti: conservati per rispondere e mantenere elenchi; cancellazione su richiesta.",
            "Fatturazione: registri minimi via Stripe per legge fiscale; nessun dato carta completo da noi.",
            "Cookie pub: conservazione secondo politiche Google.",
          ],
        },
      ],
    },
    {
      heading: "I tuoi diritti",
      blocks: [
        {
          kind: "p",
          text: "A seconda della regione puoi avere diritti di accesso, rettifica, cancellazione o limitazione del trattamento e opposizione a certi usi. Contattaci via {contact}. UE/UK: reclamo all'autorità di controllo.",
        },
      ],
    },
    {
      heading: "Minori",
      blocks: [
        {
          kind: "p",
          text: "Il servizio non è rivolto a minori di 16 anni. Non raccogliamo consapevolmente i loro dati.",
        },
      ],
    },
    {
      heading: "Modifiche",
      blocks: [
        {
          kind: "p",
          text: "Possiamo aggiornare questa informativa; la data sopra è l'ultima versione. L'uso continuato dopo le modifiche implica accettazione.",
        },
      ],
    },
  ],
};

const terms: TrustPageCopy = {
  metaTitle: "Termini di servizio",
  metaDescription:
    "Termini d'uso di Life Decision Engine, abbonamenti, uso accettabile e limitazione di responsabilità.",
  eyebrow: "Legale",
  title: "Termini di servizio",
  subtitle:
    "Ultimo aggiornamento: maggio 2026. Usando Life Decision Engine accetti questi termini. Vedi anche {privacy} e {disclaimer}.",
  sections: [
    {
      heading: "Il servizio",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine fornisce strumenti educativi di analisi decisionale, contenuti editoriali e collegamenti opzionali a esperti. Il servizio è fornito «così com'è» e può cambiare senza preavviso.",
        },
      ],
    },
    {
      heading: "Account e abbonamenti",
      blocks: [
        {
          kind: "p",
          text: "Premium è fatturato via Stripe. Prezzi e cicli su {pricing}. Sei responsabile dell'accuratezza dell'account e dei pagamenti. Cancellazione tramite portale Stripe o {contact}.",
        },
      ],
    },
    {
      heading: "Uso accettabile",
      blocks: [
        {
          kind: "ul",
          items: [
            "Non usare il servizio per scopi illegali, dannosi o fraudolenti.",
            "Non tentare accesso ai sistemi, scraping o ripubblicazione di report senza permesso.",
            "Non dare consiglio medico, legale o di investimento per conto altrui.",
            "I post community devono seguire {communityGuidelines}.",
          ],
        },
      ],
    },
    {
      heading: "Proprietà intellettuale",
      blocks: [
        {
          kind: "p",
          text: "Framework del sito, design e testo editoriale sono protetti da copyright. Puoi stampare o condividere report personali, non ripubblicare i nostri articoli o framework per concorrenza commerciale.",
        },
      ],
    },
    {
      heading: "Limitazione di responsabilità",
      blocks: [
        {
          kind: "p",
          text: "Nei limiti di legge, Life Decision Engine e gli operatori non sono responsabili per danni indiretti, incidentali o consequenziali da affidamento al servizio o ai report. Dettagli: {disclaimer}.",
        },
      ],
    },
    {
      heading: "Risoluzione e contatto",
      blocks: [
        {
          kind: "p",
          text: "Possiamo sospendere o terminare l'accesso per violazione. Domande: {contact}. Le modifiche sono pubblicate qui; l'uso continuato implica accettazione.",
        },
      ],
    },
  ],
};

const disclaimer: TrustPageCopy = {
  metaTitle: "Disclaimer",
  metaDescription:
    "Report e articoli di Life Decision Engine sono formativi, non consulenza professionale. Risorse in crisi.",
  eyebrow: "Legale",
  title: "Disclaimer",
  subtitle:
    "Leggi prima di decisioni di vita importanti. Non sostituisce un professionista abilitato.",
  sections: [
    {
      heading: "Non consulenza professionale",
      blocks: [
        {
          kind: "p",
          text: "I report dell'analizzatore, gli articoli {blog} e le risposte community sono formativi per pensare in modo strutturato. Non sono diagnosi, parere legale, fiscale o di investimento.",
        },
      ],
    },
    {
      heading: "IA ed errori",
      blocks: [
        {
          kind: "p",
          text: "I risultati possono contenere errori o lacune, soprattutto con input semplificati. La revisione umana non garantisce accuratezza totale. Vedi {howWeUseAi} e {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Terze parti",
      blocks: [
        {
          kind: "p",
          text: "Link a {experts}, inserzionisti o siti esterni non implicano approvazione. I contratti con esperti sono tra te e il professionista.",
        },
      ],
    },
    {
      heading: "Crisi",
      blocks: [
        {
          kind: "p",
          text: "Se ti fai del male o minacci di farlo, contatta i servizi di emergenza locali. Questo strumento non monitora messaggi urgenti.",
        },
      ],
    },
    {
      heading: "Nessuna garanzia",
      blocks: [
        {
          kind: "p",
          text: "Il servizio è fornito senza garanzie espresse o implicite. Uso a tuo rischio. Questioni legali: {terms} e {privacy}.",
        },
      ],
    },
  ],
};

const about: TrustPageCopy = {
  metaTitle: "Chi siamo",
  metaDescription:
    "Missione di Life Decision Engine: framework strutturati per grandi decisioni di vita.",
  eyebrow: "Editore",
  title: "Chi siamo",
  subtitle:
    "Aiutiamo a pensare in modo chiaro e completo quando un elenco pro/contro non basta.",
  sections: [
    {
      heading: "Missione",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine è nato per i momenti in cui una decisione sembra troppo grande per un solo elenco — trasferimento, carriera, relazioni, denaro. Offriamo scenari, quattro lenti e una timeline, non una sola risposta «giusta».",
        },
      ],
    },
    {
      heading: "Fondatore",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine è stato fondato e creato da Albert Akimyan. Guida prodotto, framework editoriali e il motore di analisi delle decisioni su lifedecisions.space.",
        },
      ],
    },
    {
      heading: "Cosa costruiamo",
      blocks: [
        {
          kind: "ul",
          items: [
            "{analyze} interattivo con report personalizzati",
            "Articoli {blog} originali e {editorialStandards}",
            "Directory {experts} opzionale per supporto umano",
          ],
        },
      ],
    },
    {
      heading: "Cosa non siamo",
      blocks: [
        {
          kind: "p",
          text: "Non siamo social network, servizio terapeutico o studio legale. Non vendiamo il testo delle tue decisioni né garantiamo esiti degli esperti.",
        },
      ],
    },
    {
      heading: "Finanziamento",
      blocks: [
        {
          kind: "p",
          text: "Sostenuto da abbonamenti {pricing}, presentazioni opzionali a esperti e, dove attivo, pubblicità. Trasparenza: {monetize}.",
        },
      ],
    },
    {
      heading: "Team e contatto",
      blocks: [
        {
          kind: "p",
          text: "Il lavoro editoriale è guidato dal {editorialTeam}. Domande e correzioni: {contact}.",
        },
      ],
    },
  ],
};

const contact: TrustPageCopy = {
  metaTitle: "Contatti",
  metaDescription:
    "Contatta Life Decision Engine per redazione, supporto e stampa.",
  eyebrow: "Editore",
  title: "Contatti",
  subtitle:
    "Rispondiamo entro cinque giorni lavorativi. In emergenza, chiama i servizi locali, non questa pagina.",
  sections: [
    {
      heading: "Email",
      blocks: [
        {
          kind: "p",
          text: "hello@lifedecisions.space — domande generali, correzioni, politica, stampa.",
        },
      ],
    },
    {
      heading: "Cosa includere",
      blocks: [
        {
          kind: "ul",
          items: [
            "URL articolo e chiarimento concreto per una correzione",
            "Email account per domande Stripe",
            "Screenshot per segnalazioni moderazione (senza dati personali sensibili)",
          ],
        },
      ],
    },
    {
      heading: "Registrazione esperti",
      blocks: [
        {
          kind: "p",
          text: "I professionisti inviano tramite {expertsRegister}. Rimuoviamo spam e qualifiche false.",
        },
      ],
    },
    {
      heading: "Privacy",
      blocks: [
        {
          kind: "p",
          text: "Per richieste GDPR/CCPA: oggetto «Privacy request» e azione richiesta. Vedi {privacy}.",
        },
      ],
    },
  ],
};

const faq: TrustPageCopy = {
  metaTitle: "Domande frequenti",
  metaDescription:
    "Risposte su analizzatore Life Decision Engine, privacy, fatturazione ed esperti.",
  eyebrow: "Aiuto",
  title: "Domande frequenti",
  subtitle:
    "Risposte brevi. Testi legali dettagliati: {privacy}, {terms}, {disclaimer}.",
  sections: [
    {
      heading: "Analizzatore",
      blocks: [
        {
          kind: "p",
          text: "È consulenza professionale? No — strumento educativo. Posso condividere il report con terapeuta o avvocato? Sì, il riepilogo scenari spesso focalizza le sessioni.",
        },
      ],
    },
    {
      heading: "Privacy",
      blocks: [
        {
          kind: "p",
          text: "Non pubblichiamo né vendiamo il testo delle tue decisioni. Dettagli: {privacy} e {cookies}.",
        },
      ],
    },
    {
      heading: "Fatturazione",
      blocks: [
        {
          kind: "p",
          text: "Il piano gratuito offre un report strutturato completo. Premium aggiunge cronologia e analisi più profonde — {pricing}.",
        },
      ],
    },
    {
      heading: "Esperti",
      blocks: [
        {
          kind: "p",
          text: "La directory elenca terzi; li contatti tu. Nessuna garanzia di esito. {experts} e {expertsRegister}.",
        },
      ],
    },
    {
      heading: "Editoriale",
      blocks: [
        {
          kind: "p",
          text: "Chi scrive gli articoli? Il {editorialTeam} secondo {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Altre domande",
      blocks: [
        {
          kind: "p",
          text: "Non trovi risposta? Scrivi a {contact} o vedi {about}.",
        },
      ],
    },
  ],
};

const editorialTeam: TrustPageCopy = {
  metaTitle: "Team editoriale",
  metaDescription:
    "Chi mantiene i framework decisionali e i contenuti {blog} di Life Decision Engine.",
  eyebrow: "Editore",
  title: "Team editoriale",
  subtitle:
    "Le persone che progettano, revisionano e aggiornano framework e articoli.",
  sections: [
    {
      heading: "Ruolo",
      blocks: [
        {
          kind: "p",
          text: "Il team editoriale definisce la struttura dell'analizzatore, scrive e revisiona articoli {blog} e applica {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Indipendenza",
      blocks: [
        {
          kind: "p",
          text: "Inserzionisti ed elenchi {experts} non controllano le conclusioni editoriali. Le partnership sono indicate negli articoli.",
        },
      ],
    },
    {
      heading: "Revisione",
      blocks: [
        {
          kind: "p",
          text: "I nuovi framework passano revisione interna e si aggiornano quando cambiano legge, mercato o ricerca.",
        },
      ],
    },
    {
      heading: "Contatto",
      blocks: [
        {
          kind: "p",
          text: "Correzioni e stampa: {contact}.",
        },
      ],
    },
  ],
};

const editorialStandards: TrustPageCopy = {
  metaTitle: "Standard editoriali",
  metaDescription:
    "Standard di accuratezza, aggiornamenti, trasparenza IA e correzioni in Life Decision Engine.",
  eyebrow: "Editore",
  title: "Standard editoriali",
  subtitle:
    "Come manteniamo la fiducia di lettori e programmi pubblicitari.",
  sections: [
    {
      heading: "Accuratezza",
      blocks: [
        {
          kind: "p",
          text: "Gli articoli si basano su fonti verificate ed esperienza. Gli errori fattuali sono corretti rapidamente e annotati se il cambiamento è significativo.",
        },
      ],
    },
    {
      heading: "Aggiornamenti",
      blocks: [
        {
          kind: "p",
          text: "I grandi framework decisionali sono rivisti annualmente o più spesso se cambiano norme o dati.",
        },
      ],
    },
    {
      heading: "Trasparenza IA",
      blocks: [
        {
          kind: "p",
          text: "Quando l'IA aiuta bozza o report, è indicato in {howWeUseAi}. Un umano revisiona struttura e limiti di sicurezza.",
        },
      ],
    },
    {
      heading: "Politica contenuti",
      blocks: [
        {
          kind: "p",
          text: "Community, pubblicità e strumenti seguono {contentPolicy}.",
        },
      ],
    },
    {
      heading: "Correzioni",
      blocks: [
        {
          kind: "p",
          text: "Segnala errori via {contact} o hello@lifedecisions.space. Obiettivo: risposta entro cinque giorni lavorativi.",
        },
      ],
    },
  ],
};

const analyze: PublisherEducationCopy = {
  editorialOverviewLabel: "Panoramica editoriale",
  introParagraphs: [
    "L'analizzatore Life Decision Engine è uno spazio strutturato per decisioni troppo grandi per un elenco pro/contro. Descrivi la situazione in linguaggio semplice — cosa decidi, contesto e vincoli fissi (denaro, geografia, famiglia, etica). Il motore produce un report privato: scenari (migliore, peggiore, probabile), quattro lenti (finanze, psicologia, rischi, opportunità), timeline e punteggio.",
    "Non è un chatbot che improvvisa consigli. L'output segue un framework editoriale fisso che manteniamo e revisioniamo. Aiuta a pensare chiaramente, non sostituisce terapeuta, avvocato o pianificatore finanziario. Per temi regolamentati rimandiamo a {experts} e al {blog}.",
  ],
  sections: [
    {
      heading: "Cosa contiene il report",
      blocks: [
        {
          kind: "ul",
          items: [
            "Scenari — tre futuri concreti da confrontare.",
            "Quattro lenti — denaro, carico emotivo, rischio al ribasso, potenziale sottostimato.",
            "Timeline — cosa cambia di solito a sei mesi, due e cinque anni.",
            "Punteggio — segnale comparativo, non verdetto.",
          ],
        },
      ],
    },
    {
      heading: "Gratuito vs Premium",
      blocks: [
        {
          kind: "p",
          text: "Il livello gratuito esegue il framework completo con limiti fair-use. Premium aggiunge passate più profonde, cronologia e promemoria — vedi {pricing}. Pagamenti via Stripe; non conserviamo numeri di carta.",
        },
      ],
    },
    {
      heading: "Privacy",
      blocks: [
        {
          kind: "p",
          text: "Il testo della decisione va ai nostri server solo all'avvio dell'analisi. Non pubblichiamo né vendiamo le domande. Vedi {privacy} e {howWeUseAi}.",
        },
      ],
    },
    {
      heading: "Questa pagina vs analizzatore home",
      blocks: [
        {
          kind: "p",
          text: "Lo stesso motore nello workspace sulla {home}. Questo URL per segnalibri o ricerca. Standard allineati a {editorialStandards}.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "È consulenza medica, legale o finanziaria?",
      a: "No. È software educativo. Per diagnosi, contratti, tasse o investimenti con denaro reale, consulta un professionista abilitato.",
      plainAnswer:
        "No. È software educativo. Per diagnosi, contratti, tasse o investimenti con denaro reale, consulta un professionista abilitato.",
    },
    {
      q: "Posso usare il report con terapeuta o avvocato?",
      a: "Sì — molti incollano il riepilogo scenari per focalizzare le sessioni sulla vera biforcazione.",
      plainAnswer:
        "Sì — molti incollano il riepilogo scenari per focalizzare le sessioni sulla vera biforcazione.",
    },
    {
      q: "Chi mantiene i framework?",
      a: "Il team editoriale Life Decision Engine. Vedi {editorialTeam}.",
      plainAnswer: "Il team editoriale Life Decision Engine.",
    },
  ],
  footerParagraph:
    "In crisi, contatta i servizi di emergenza locali — questo strumento non monitora messaggi urgenti. Vedi {disclaimer}.",
  lastReviewed: "25 maggio 2026",
};

const pricing: PublisherEducationCopy = {
  introParagraphs: [
    "Life Decision Engine è finanziato così che l'analizzatore base resti utile senza paywall sul pensiero. Il piano gratuito include scenari, quattro lenti, timeline e punteggio con limiti fair-use. Premium è per chi analizza molte decisioni al mese e vuole cronologia, promemoria e passate più profonde.",
    "Trasparenza sul denaro: abbonamenti, presentazioni opzionali a esperti (i professionisti fatturano direttamente) e, dove attivo, Google AdSense. Non vendiamo il testo delle decisioni. Vedi {monetize}.",
  ],
  sections: [
    {
      heading: "Cosa aggiunge Premium",
      blocks: [
        {
          kind: "ul",
          items: [
            "Analisi più frequenti o profonde per decisioni in più passi.",
            "Cronologia salvata e promemoria dopo un periodo di riflessione.",
            "Accesso anticipato agli aggiornamenti dei framework.",
          ],
        },
      ],
    },
    {
      heading: "Fatturazione e rimborsi",
      blocks: [
        {
          kind: "p",
          text: "Checkout via Stripe. Termini abbonamento in {terms}. Aiuto fatturazione: {contact}.",
        },
      ],
    },
    {
      heading: "Pubblicità su pagine gratuite",
      blocks: [
        {
          kind: "p",
          text: "Possiamo mostrare AdSense su pagine con contenuto editoriale sostanziale. Rispettiamo politiche Google e consenso UE. Vedi {privacy} e {contentPolicy}.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Serve Premium per un report utile?",
      a: "No. Il gratuito produce un report strutturato completo per una tipica decisione di vita.",
      plainAnswer:
        "No. Il gratuito produce un report strutturato completo per una tipica decisione di vita.",
    },
    {
      q: "Premium rimuove gli annunci?",
      a: "Premium punta alle funzioni. Alcune pagine informative possono ancora mostrare annunci a seconda della configurazione.",
      plainAnswer:
        "Premium punta alle funzioni. Alcune pagine informative possono ancora mostrare annunci a seconda della configurazione.",
    },
  ],
  lastReviewed: "25 maggio 2026",
};

const home: PublisherEducationCopy = {
  editorialOverviewLabel: "Panoramica editore",
  introParagraphs: [
    "Life Decision Engine pubblica framework originali su questo sito e nel {blog} — carriera, trasferimento, relazioni, denaro, psicologia delle grandi scelte. Ogni articolo è revisionato dal {editorialTeam} secondo {editorialStandards}.",
    "L'analizzatore interattivo sotto trasforma la domanda in scenari, quattro lenti, timeline e punteggio — anche su {analyze}. Quando serve un professionista umano, esplora {experts} o leggi la {faq}. Non siamo un social network.",
  ],
  sections: [
    {
      heading: "Politiche e contatto",
      blocks: [
        {
          kind: "ul",
          items: [
            "{privacy} — cookie, AdSense, GDPR/CCPA",
            "{terms} — abbonamenti, uso accettabile",
            "{contentPolicy} — cosa pubblichiamo e moderiamo",
            "{contact} — redazione, stampa, supporto",
          ],
        },
      ],
    },
  ],
  lastReviewed: "25 maggio 2026",
};

export const trustPagesIt = {
  cookies,
  "content-policy": contentPolicy,
  privacy,
  terms,
  disclaimer,
  about,
  contact,
  faq,
  "editorial-team": editorialTeam,
  "editorial-standards": editorialStandards,
  publisher: { analyze, pricing, home },
};
