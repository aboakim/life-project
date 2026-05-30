import type { TrustPageCopy, PublisherEducationCopy } from "../types";

const cookies: TrustPageCopy = {
  metaTitle: "Cookie-Richtlinie",
  metaDescription:
    "Wie Life Decision Engine Cookies nutzt: notwendige, Analyse (Google Analytics) und Werbung (Google AdSense). Verwalten Sie Ihre Wahl.",
  eyebrow: "Rechtliches",
  title: "Cookie-Richtlinie",
  subtitle:
    "Zuletzt aktualisiert Mai 2026. Diese Seite erklärt, welche Cookies wir setzen, warum und wie Sie nicht notwendige Cookies steuern. Vollständige Datenschutzrechte: {privacy}.",
  sections: [
    {
      heading: "Was sind Cookies?",
      blocks: [
        {
          kind: "p",
          text: "Cookies sind kleine Textdateien im Browser. Sie helfen einer Website, Einstellungen zu speichern, Sie angemeldet zu halten, Traffic zu messen oder relevante Anzeigen zu zeigen. Einige setzen wir, andere Partner wie Google, wenn Sie Werbe- oder Analyse-Cookies akzeptieren.",
        },
      ],
    },
    {
      heading: "Notwendige Cookies",
      blocks: [
        {
          kind: "p",
          text: "Wir nutzen ein Locale-Cookie und local-storage-Schlüssel, damit Sprache und Einwilligung zwischen Besuchen bleiben. Sie sind für die Funktion nötig und erfordern nach EU-Leitlinien keine Einwilligung, da strikt funktional.",
        },
      ],
    },
    {
      heading: "Analyse-Cookies (optional)",
      blocks: [
        {
          kind: "p",
          text: "Mit Ihrer Erlaubnis laden wir Google Analytics 4, um zu sehen, welche Seiten helfen und wo es hakt. Analyse-Cookies bleiben aus, bis Sie im Banner nicht notwendige Cookies akzeptieren. Sie können ablehnen und den Analyzer weiter nutzen.",
        },
      ],
    },
    {
      heading: "Werbe-Cookies (optional)",
      blocks: [
        {
          kind: "p",
          text: "Wir nehmen an Google AdSense teil. Werbe-Cookies können Anzeigen ausliefern und messen, Häufigkeit begrenzen und — mit Einwilligung — personalisieren. In {adsTxt} steht seller ID pub-3541461663112540. Siehe {googleAdsCookies}.",
        },
      ],
    },
    {
      heading: "Wahl ändern",
      blocks: [
        {
          kind: "p",
          text: "Nutzen Sie das Einwilligungsbanner oder löschen Sie Site-Daten für lifedecisions.space im Browser, um das Banner zurückzusetzen. Erweiterungen können Drittanbieter-Cookies global blockieren.",
        },
      ],
    },
    {
      heading: "Weitere Informationen",
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
  metaTitle: "Inhaltsrichtlinie",
  metaDescription:
    "Was Life Decision Engine veröffentlicht: Redaktionsartikel, KI-gestützte Tools, Expertenverzeichnis und Community-Q&A. Qualitätsstandards und Moderation.",
  eyebrow: "Publisher",
  title: "Inhaltsrichtlinie",
  subtitle:
    "Diese Richtlinie beschreibt, was auf lifedecisions.space erscheint, wer es erstellt und wie wir Qualität für Leser und Werbepartner halten.",
  sections: [
    {
      heading: "Originale redaktionelle Inhalte",
      blocks: [
        {
          kind: "p",
          text: "Unser Kernwert sind originale Langform-Artikel im {blog}: Entscheidungsrahmen zu Karriere, Umzug, Beziehungen und Geld. Artikel stammen vom {editorialTeam}, werden an {editorialStandards} geprüft und bei Faktenänderung aktualisiert. Wir scrapen keine fremden Artikel und veröffentlichen keine Auto-Füller-Seiten.",
        },
      ],
    },
    {
      heading: "Tools und generierte Berichte",
      blocks: [
        {
          kind: "p",
          text: "Der Analyzer erzeugt personalisierten Text aus Ihren Eingaben mit strukturierten Vorlagen und KI-Unterstützung auf {howWeUseAi}. Berichte sind privat für Ihre Sitzung, sofern Sie sie nicht teilen. Sie sind Bildung, kein professioneller Rat.",
        },
      ],
    },
    {
      heading: "Expertenverzeichnis",
      blocks: [
        {
          kind: "p",
          text: "Fachleute reichen Profile über {expertsRegister} ein. Wir prüfen vor Veröffentlichung und entfernen irreführende oder Spam-Einträge. Wir garantieren keine Ergebnisse aus einer professionellen Beziehung.",
        },
      ],
    },
    {
      heading: "Community-Q&A",
      blocks: [
        {
          kind: "p",
          text: "Die {community} erlaubt Text-Q&A gemäß {communityGuidelines}. Beiträge können bei Missbrauch, Spam, definitivem Medizin-/Rechtsrat oder gefährlichem Inhalt entfernt werden. Community-Inhalt ist moderiert und repräsentiert nicht die Redaktion.",
        },
      ],
    },
    {
      heading: "Werbung",
      blocks: [
        {
          kind: "p",
          text: "Wir können Google AdSense auf Seiten mit substanziellem Publisher-Text zeigen. Anzeigen sind gekennzeichnet und vom Redaktionstext getrennt. Siehe {monetize}.",
        },
      ],
    },
    {
      heading: "Problem melden",
      blocks: [
        {
          kind: "p",
          text: "Für Korrekturen, Entfernung oder Richtlinienfragen: hello@lifedecisions.space oder {contact}. Ziel: Antwort innerhalb von fünf Werktagen.",
        },
      ],
    },
  ],
};

const privacy: TrustPageCopy = {
  metaTitle: "Datenschutzerklärung",
  metaDescription:
    "Wie Life Decision Engine Daten, Cookies, Ads (Google AdSense) und Drittanbieter behandelt. GDPR- und CCPA-Rechte.",
  eyebrow: "Rechtliches",
  title: "Datenschutzerklärung",
  subtitle:
    "Zuletzt aktualisiert April 2026. Transparenz für Besucher und Werbeprogramme (inkl. Google AdSense). Keine Rechtsberatung.",
  sections: [
    {
      heading: "Wer wir sind",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine bietet strukturierte Entscheidungsanalyse (optional mit KI) und Links zu Drittprofis, wie auf der {home} beschrieben.",
        },
      ],
    },
    {
      heading: "Von Ihnen bereitgestellte Informationen",
      blocks: [
        {
          kind: "p",
          text: "Beim Analyzer oder in Formularen können Sie persönliche Situationen eingeben. Dieser Inhalt erzeugt Ihre Sitzungsergebnisse. Senden Sie nichts, womit Sie die Verarbeitung nicht einverstanden sind. Das ist Entscheidungsunterstützung, kein medizinischer, rechtlicher oder therapeutischer Dienst.",
        },
      ],
    },
    {
      heading: "Cookies & Werbung",
      blocks: [
        {
          kind: "p",
          text: "Siehe {cookies}. Wir können Anzeigen über Google AdSense zeigen. Google und Partner können Cookies je Region und Wahl nutzen. Siehe {googleAdsCookies}. Wo nötig, GDPR-kompatibles Einwilligungsbanner.",
        },
      ],
    },
    {
      heading: "KI-Anbieter",
      blocks: [
        {
          kind: "p",
          text: "Bei aktivierter Live-KI-Analyse kann Prompt-Text nur zur Antwortgenerierung an einen KI-Anbieter gehen, gemäß dessen Richtlinien. Details: {howWeUseAi}.",
        },
      ],
    },
    {
      heading: "Zahlungen",
      blocks: [
        {
          kind: "p",
          text: "Bezahlte Funktionen können über Stripe laufen. Wir speichern keine vollständigen Kartennummern; Stripe verarbeitet Zahlungsdaten.",
        },
      ],
    },
    {
      heading: "Datenspeicherung",
      blocks: [
        {
          kind: "ul",
          items: [
            "Analyzer-Eingaben: für Ihre Sitzung verarbeitet; Fehlerlogs bis 30 Tage, dann gelöscht oder anonymisiert.",
            "Kontakt und Expertenregistrierungen: für Antwort und Listenpflege; Löschung auf Anfrage.",
            "Abrechnung: minimale Stripe-Aufzeichnungen nach Steuerrecht; keine vollen Kartendaten bei uns.",
            "Werbe-Cookies: Speicherung nach Google-Richtlinien.",
          ],
        },
      ],
    },
    {
      heading: "Ihre Rechte",
      blocks: [
        {
          kind: "p",
          text: "Je nach Region haben Sie Rechte auf Zugang, Berichtigung, Löschung oder Einschränkung und Widerspruch gegen bestimmte Nutzungen. Kontakt über {contact}. EU/UK: Beschwerde bei der Aufsichtsbehörde.",
        },
      ],
    },
    {
      heading: "Kinder",
      blocks: [
        {
          kind: "p",
          text: "Der Dienst richtet sich nicht an Kinder unter 16. Wir erheben wissentlich keine deren Daten.",
        },
      ],
    },
    {
      heading: "Änderungen",
      blocks: [
        {
          kind: "p",
          text: "Wir können diese Erklärung aktualisieren; das Datum oben ist die letzte Version. Fortgesetzte Nutzung nach Änderungen gilt als Annahme.",
        },
      ],
    },
  ],
};

const terms: TrustPageCopy = {
  metaTitle: "Nutzungsbedingungen",
  metaDescription:
    "Bedingungen für Life Decision Engine, Abonnements, zulässige Nutzung und Haftungsbeschränkung.",
  eyebrow: "Rechtliches",
  title: "Nutzungsbedingungen",
  subtitle:
    "Zuletzt aktualisiert Mai 2026. Mit Nutzung von Life Decision Engine stimmen Sie diesen Bedingungen zu. Siehe auch {privacy} und {disclaimer}.",
  sections: [
    {
      heading: "Der Dienst",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine bietet Bildungs-Tools zur Entscheidungsanalyse, redaktionelle Inhalte und optionale Expertenverknüpfungen. Der Dienst wird „wie besehen“ bereitgestellt und kann sich ohne Vorankündigung ändern.",
        },
      ],
    },
    {
      heading: "Konten und Abonnements",
      blocks: [
        {
          kind: "p",
          text: "Premium wird über Stripe abgerechnet. Preise und Zyklen auf {pricing}. Sie sind für korrekte Kontodaten und Zahlungen verantwortlich. Kündigung über Stripe-Kundenportal oder {contact}.",
        },
      ],
    },
    {
      heading: "Zulässige Nutzung",
      blocks: [
        {
          kind: "ul",
          items: [
            "Keine Nutzung für illegale, schädliche oder betrügerische Zwecke.",
            "Kein Zugriff auf Systeme, Scraping oder Wiederveröffentlichung von Berichten ohne Erlaubnis.",
            "Kein Medizin-, Rechts- oder Anlagerat im Namen anderer.",
            "Community-Beiträge müssen {communityGuidelines} folgen.",
          ],
        },
      ],
    },
    {
      heading: "Geistiges Eigentum",
      blocks: [
        {
          kind: "p",
          text: "Rahmen, Design und Redaktionstext sind urheberrechtlich geschützt. Persönliche Berichte dürfen gedruckt/geteilt werden, nicht aber unsere Artikel oder Rahmen für kommerziellen Wettbewerb.",
        },
      ],
    },
    {
      heading: "Haftungsbeschränkung",
      blocks: [
        {
          kind: "p",
          text: "Soweit gesetzlich zulässig haften Life Decision Engine und Betreiber nicht für indirekten, zufälligen oder Folgeschaden aus Vertrauen in Dienst oder Berichte. Details: {disclaimer}.",
        },
      ],
    },
    {
      heading: "Beendigung und Kontakt",
      blocks: [
        {
          kind: "p",
          text: "Bei Verstoß können wir Zugang sperren oder beenden. Fragen: {contact}. Änderungen auf dieser Seite; fortgesetzte Nutzung = Annahme.",
        },
      ],
    },
  ],
};

const disclaimer: TrustPageCopy = {
  metaTitle: "Haftungsausschluss",
  metaDescription:
    "Berichte und Artikel von Life Decision Engine sind Bildung, kein professioneller Rat. Krisenressourcen.",
  eyebrow: "Rechtliches",
  title: "Haftungsausschluss",
  subtitle:
    "Bitte lesen Sie vor wichtigen Lebensentscheidungen. Dies ersetzt keine lizenzierte Fachperson.",
  sections: [
    {
      heading: "Kein professioneller Rat",
      blocks: [
        {
          kind: "p",
          text: "Analyzer-Berichte, {blog}-Artikel und Community-Antworten sind Bildung für strukturiertes Denken. Keine Diagnose, Rechtsmeinung, Steuer- oder Anlagerat.",
        },
      ],
    },
    {
      heading: "KI und Fehler",
      blocks: [
        {
          kind: "p",
          text: "Ergebnisse können Fehler oder Lücken haben, besonders bei vereinfachten Eingaben. Menschliche Prüfung garantiert keine Vollständigkeit. Siehe {howWeUseAi} und {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Dritte",
      blocks: [
        {
          kind: "p",
          text: "Links zu {experts}, Werbetreibenden oder externen Sites sind keine Empfehlung. Verträge mit Experten schließen Sie mit dem Profi.",
        },
      ],
    },
    {
      heading: "Krise",
      blocks: [
        {
          kind: "p",
          text: "Wenn Sie sich oder anderen Schaden zufügen oder drohen, rufen Sie lokale Notdienste. Dieses Tool überwacht keine dringenden Nachrichten.",
        },
      ],
    },
    {
      heading: "Keine Garantien",
      blocks: [
        {
          kind: "p",
          text: "Der Dienst wird ohne ausdrückliche oder stillschweigende Garantien bereitgestellt. Nutzung auf eigenes Risiko. Weitere Rechtsfragen: {terms} und {privacy}.",
        },
      ],
    },
  ],
};

const about: TrustPageCopy = {
  metaTitle: "Über uns",
  metaDescription:
    "Mission von Life Decision Engine: strukturierte Rahmen für große Lebensentscheidungen.",
  eyebrow: "Publisher",
  title: "Über uns",
  subtitle:
    "Wir helfen klar und ganzheitlich zu denken, wenn eine Pro-Contra-Liste nicht reicht.",
  sections: [
    {
      heading: "Mission",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine ist für Momente, in denen eine Entscheidung zu groß für eine Liste wirkt — Umzug, Karriere, Beziehungen, Geld. Wir liefern Szenarien, vier Linsen und eine Zeitachse, nicht eine einzige „richtige“ Antwort.",
        },
      ],
    },
    {
      heading: "Gründer",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine wurde von Albert Akimyan gegründet und entwickelt. Er verantwortet Produkt, redaktionelle Frameworks und die Entscheidungs-Engine auf lifedecisions.space.",
        },
      ],
    },
    {
      heading: "Was wir bauen",
      blocks: [
        {
          kind: "ul",
          items: [
            "Interaktiver {analyze} mit personalisierten Berichten",
            "Originale {blog}-Artikel und {editorialStandards}",
            "Optionales {experts}-Verzeichnis für menschliche Unterstützung",
          ],
        },
      ],
    },
    {
      heading: "Was wir nicht sind",
      blocks: [
        {
          kind: "p",
          text: "Kein soziales Netzwerk, keine Therapie oder Kanzlei. Wir verkaufen Ihren Entscheidungstext nicht und garantieren keine Expertenergebnisse.",
        },
      ],
    },
    {
      heading: "Finanzierung",
      blocks: [
        {
          kind: "p",
          text: "Unterstützt durch {pricing}-Abos, optionale Expertenvermittlung und wo aktiv Werbung. Transparenz: {monetize}.",
        },
      ],
    },
    {
      heading: "Team und Kontakt",
      blocks: [
        {
          kind: "p",
          text: "Redaktion führt das {editorialTeam}. Fragen und Korrekturen: {contact}.",
        },
      ],
    },
  ],
};

const contact: TrustPageCopy = {
  metaTitle: "Kontakt",
  metaDescription:
    "Kontakt zu Life Decision Engine für Redaktion, Support und Presse.",
  eyebrow: "Publisher",
  title: "Kontakt",
  subtitle:
    "Antwort innerhalb von fünf Werktagen. In Notfällen lokale Rettungsdienste, nicht diese Seite.",
  sections: [
    {
      heading: "E-Mail",
      blocks: [
        {
          kind: "p",
          text: "hello@lifedecisions.space — allgemeine Fragen, Korrekturen, Richtlinien, Presse.",
        },
      ],
    },
    {
      heading: "Was angeben",
      blocks: [
        {
          kind: "ul",
          items: [
            "Artikel-URL und konkrete Korrektur bei Berichtigung",
            "Konto-E-Mail für Stripe-Fragen",
            "Screenshot bei Moderationsbeschwerden (ohne sensible personenbezogene Daten)",
          ],
        },
      ],
    },
    {
      heading: "Expertenregistrierung",
      blocks: [
        {
          kind: "p",
          text: "Fachleute reichen über {expertsRegister} ein. Spam und falsche Qualifikationen werden entfernt.",
        },
      ],
    },
    {
      heading: "Datenschutzanfragen",
      blocks: [
        {
          kind: "p",
          text: "Für GDPR/CCPA: Betreff „Privacy request“ und gewünschte Aktion. Siehe {privacy}.",
        },
      ],
    },
  ],
};

const faq: TrustPageCopy = {
  metaTitle: "Häufige Fragen",
  metaDescription:
    "Antworten zum Life Decision Engine Analyzer, Datenschutz, Abrechnung und Experten.",
  eyebrow: "Hilfe",
  title: "Häufige Fragen",
  subtitle:
    "Kurze Antworten. Ausführliche Rechtstexte: {privacy}, {terms}, {disclaimer}.",
  sections: [
    {
      heading: "Analyzer",
      blocks: [
        {
          kind: "p",
          text: "Ist das professioneller Rat? Nein — Bildungstool. Bericht mit Therapeut oder Anwalt teilen? Ja, Szenario-Zusammenfassung fokussiert oft Sitzungen.",
        },
      ],
    },
    {
      heading: "Datenschutz",
      blocks: [
        {
          kind: "p",
          text: "Wir veröffentlichen oder verkaufen Ihren Entscheidungstext nicht. Details: {privacy} und {cookies}.",
        },
      ],
    },
    {
      heading: "Abrechnung",
      blocks: [
        {
          kind: "p",
          text: "Free-Tier liefert vollständigen strukturierten Bericht. Premium ergänzt Historie und tiefere Läufe — {pricing}.",
        },
      ],
    },
    {
      heading: "Experten",
      blocks: [
        {
          kind: "p",
          text: "Verzeichnis listet Drittprofis; Sie kontaktieren sie selbst. Keine Ergebnisgarantie. {experts} und {expertsRegister}.",
        },
      ],
    },
    {
      heading: "Redaktion",
      blocks: [
        {
          kind: "p",
          text: "Wer schreibt Artikel? {editorialTeam} nach {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Weitere Fragen",
      blocks: [
        {
          kind: "p",
          text: "Keine Antwort gefunden? Schreiben Sie {contact} oder siehe {about}.",
        },
      ],
    },
  ],
};

const editorialTeam: TrustPageCopy = {
  metaTitle: "Redaktionsteam",
  metaDescription:
    "Wer die Entscheidungsrahmen und {blog}-Inhalte von Life Decision Engine pflegt.",
  eyebrow: "Publisher",
  title: "Redaktionsteam",
  subtitle:
    "Menschen, die Rahmen und Artikel entwerfen, prüfen und aktualisieren.",
  sections: [
    {
      heading: "Rolle",
      blocks: [
        {
          kind: "p",
          text: "Die Redaktion definiert die Analyzer-Struktur, schreibt und prüft {blog}-Artikel und arbeitet mit {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Unabhängigkeit",
      blocks: [
        {
          kind: "p",
          text: "Werbetreibende und {experts}-Listen steuern keine redaktionellen Schlüsse. Partnerschaften werden in Artikeln gekennzeichnet.",
        },
      ],
    },
    {
      heading: "Prüfung",
      blocks: [
        {
          kind: "p",
          text: "Neue Rahmen durchlaufen interne Prüfung und werden bei Gesetzes-, Markt- oder Forschungsänderung aktualisiert.",
        },
      ],
    },
    {
      heading: "Kontakt",
      blocks: [
        {
          kind: "p",
          text: "Korrekturen und Presse: {contact}.",
        },
      ],
    },
  ],
};

const editorialStandards: TrustPageCopy = {
  metaTitle: "Redaktionsstandards",
  metaDescription:
    "Standards zu Genauigkeit, Updates, KI-Offenlegung und Korrekturen bei Life Decision Engine.",
  eyebrow: "Publisher",
  title: "Redaktionsstandards",
  subtitle:
    "Wie wir Vertrauen von Lesern und Werbeprogrammen halten.",
  sections: [
    {
      heading: "Genauigkeit",
      blocks: [
        {
          kind: "p",
          text: "Artikel stützen sich auf geprüfte Quellen und Erfahrung. Faktenfehler werden schnell korrigiert und bei wesentlichen Änderungen vermerkt.",
        },
      ],
    },
    {
      heading: "Updates",
      blocks: [
        {
          kind: "p",
          text: "Große Entscheidungsrahmen werden jährlich oder öfter bei Regel- oder Datenänderung überprüft.",
        },
      ],
    },
    {
      heading: "KI-Offenlegung",
      blocks: [
        {
          kind: "p",
          text: "Wenn KI Entwurf oder Bericht unterstützt, steht das auf {howWeUseAi}. Menschen prüfen Struktur und Sicherheitsgrenzen.",
        },
      ],
    },
    {
      heading: "Inhaltsrichtlinie",
      blocks: [
        {
          kind: "p",
          text: "Community, Werbung und Tools folgen {contentPolicy}.",
        },
      ],
    },
    {
      heading: "Korrekturen",
      blocks: [
        {
          kind: "p",
          text: "Fehler melden über {contact} oder hello@lifedecisions.space. Ziel: Antwort in fünf Werktagen.",
        },
      ],
    },
  ],
};

const analyze: PublisherEducationCopy = {
  editorialOverviewLabel: "Redaktioneller Überblick",
  introParagraphs: [
    "Der Life Decision Engine Analyzer ist ein strukturierter Arbeitsraum für Entscheidungen, die zu groß für eine Pro-Contra-Liste sind. Sie beschreiben Ihre Situation in einfacher Sprache — was Sie entscheiden, Kontext und feste Grenzen (Geld, Geografie, Familie, Ethik). Die Engine erzeugt einen privaten Bericht: Szenarien (best, worst, likely), vier Linsen (Finanzen, Psychologie, Risiken, Chancen), Zeitachse und Score.",
    "Das ist kein Chatbot mit improvisiertem Rat. Die Ausgabe folgt einem festen, gepflegten redaktionellen Rahmen. Er hilft klar zu denken — er ersetzt keinen Therapeuten, Anwalt oder Finanzplaner. Bei regulierten Themen verlinken wir {experts} und {blog}-Artikel.",
  ],
  sections: [
    {
      heading: "Was im Bericht steht",
      blocks: [
        {
          kind: "ul",
          items: [
            "Szenarien — drei konkrete Zukünfte zum Vergleich.",
            "Vier Linsen — Geld, emotionale Last, Abwärtsrisiko, unterschätztes Upside.",
            "Zeitachse — typische Veränderungen nach sechs Monaten, zwei und fünf Jahren.",
            "Score — vergleichendes Signal, kein Urteil.",
          ],
        },
      ],
    },
    {
      heading: "Free vs Premium",
      blocks: [
        {
          kind: "p",
          text: "Free-Tier nutzt den vollen Rahmen mit Fair-Use-Limits. Premium ergänzt tiefere Läufe, Historie und Erinnerungen — siehe {pricing}. Zahlung via Stripe; keine Kartenspeicherung.",
        },
      ],
    },
    {
      heading: "Datenschutz",
      blocks: [
        {
          kind: "p",
          text: "Ihr Entscheidungstext geht nur bei Analysestart an unsere Server. Wir veröffentlichen oder verkaufen Fragen nicht. Siehe {privacy} und {howWeUseAi}.",
        },
      ],
    },
    {
      heading: "Diese Seite vs Home-Analyzer",
      blocks: [
        {
          kind: "p",
          text: "Dieselbe Engine im Workspace auf {home}. Diese URL zum Merken oder aus der Suche. Standards wie {editorialStandards}.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Ist das medizinischer, rechtlicher oder finanzieller Rat?",
      a: "Nein. Bildungssoftware. Bei Diagnose, Verträgen, Steuern oder Investitionen mit echtem Geld: lizenzierte Fachperson.",
      plainAnswer:
        "Nein. Bildungssoftware. Bei Diagnose, Verträgen, Steuern oder Investitionen mit echtem Geld: lizenzierte Fachperson.",
    },
    {
      q: "Bericht mit Therapeut oder Anwalt nutzen?",
      a: "Ja — viele fügen die Szenario-Zusammenfassung ein, damit Sitzungen die echte Gabelung treffen.",
      plainAnswer:
        "Ja — viele fügen die Szenario-Zusammenfassung ein, damit Sitzungen die echte Gabelung treffen.",
    },
    {
      q: "Wer pflegt die Rahmen?",
      a: "Das Redaktionsteam von Life Decision Engine. Siehe {editorialTeam}.",
      plainAnswer: "Das Redaktionsteam von Life Decision Engine.",
    },
  ],
  footerParagraph:
    "In der Krise lokale Notdienste — dieses Tool überwacht keine dringenden Nachrichten. Siehe {disclaimer}.",
  lastReviewed: "25. Mai 2026",
};

const pricing: PublisherEducationCopy = {
  introParagraphs: [
    "Life Decision Engine wird so finanziert, dass der Kern-Analyzer ohne Paywall aufs Denken nützlich bleibt. Free umfasst Szenarien, vier Linsen, Zeitachse und Score mit Fair-Use-Limits. Premium ist für viele Entscheidungen pro Monat mit Historie, Erinnerungen und tieferen Läufen.",
    "Transparent zu Geld: Abos, optionale Expertenvermittlung (Profis rechnen direkt ab) und wo aktiv Google AdSense. Wir verkaufen Ihren Entscheidungstext nicht. Siehe {monetize}.",
  ],
  sections: [
    {
      heading: "Was Premium ergänzt",
      blocks: [
        {
          kind: "ul",
          items: [
            "Häufigere oder tiefere Analyse bei mehrstufigen Entscheidungen.",
            "Gespeicherte Historie und Erinnerungen nach Abkühlung.",
            "Früher Zugang zu neuen Rahmen-Updates.",
          ],
        },
      ],
    },
    {
      heading: "Abrechnung und Erstattung",
      blocks: [
        {
          kind: "p",
          text: "Checkout über Stripe. Abo-Bedingungen in {terms}. Hilfe: {contact}.",
        },
      ],
    },
    {
      heading: "Werbung auf Free-Seiten",
      blocks: [
        {
          kind: "p",
          text: "AdSense möglich auf Seiten mit substanziellem Redaktionsinhalt. Google-Richtlinien und EU-Einwilligung. Siehe {privacy} und {contentPolicy}.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Brauche ich Premium für einen nützlichen Bericht?",
      a: "Nein. Free-Tier liefert vollständigen strukturierten Bericht für typische Lebensentscheidungen.",
      plainAnswer:
        "Nein. Free-Tier liefert vollständigen strukturierten Bericht für typische Lebensentscheidungen.",
    },
    {
      q: "Entfernt Premium Werbung?",
      a: "Premium fokussiert Funktionen. Auf manchen Info-Seiten kann Werbung je Konfiguration bleiben.",
      plainAnswer:
        "Premium fokussiert Funktionen. Auf manchen Info-Seiten kann Werbung je Konfiguration bleiben.",
    },
  ],
  lastReviewed: "25. Mai 2026",
};

const home: PublisherEducationCopy = {
  editorialOverviewLabel: "Publisher-Überblick",
  introParagraphs: [
    "Life Decision Engine veröffentlicht originale Rahmen hier und im {blog} — Karriere, Umzug, Beziehungen, Geld, Psychologie großer Wahl. Jedes Stück prüft das {editorialTeam} an {editorialStandards}.",
    "Der interaktive Analyzer unten macht aus Ihrer Frage Szenarien, vier Linsen, Zeitachse und Score — auch auf {analyze}. Wenn ein Mensch-Prof passend ist: {experts} oder {faq}. Kein soziales Netzwerk.",
  ],
  sections: [
    {
      heading: "Richtlinien und Kontakt",
      blocks: [
        {
          kind: "ul",
          items: [
            "{privacy} — Cookies, AdSense, GDPR/CCPA",
            "{terms} — Abos, zulässige Nutzung",
            "{contentPolicy} — was wir veröffentlichen und moderieren",
            "{contact} — Redaktion, Presse, Support",
          ],
        },
      ],
    },
  ],
  lastReviewed: "25. Mai 2026",
};

export const trustPagesDe = {
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
