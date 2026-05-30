import type { TrustPageCopy, PublisherEducationCopy } from "../types";

const cookies: TrustPageCopy = {
  metaTitle: "Politique des cookies",
  metaDescription:
    "Comment Life Decision Engine utilise les cookies : essentiels, analytiques (Google Analytics) et publicitaires (Google AdSense). Gérez vos choix.",
  eyebrow: "Juridique",
  title: "Politique des cookies",
  subtitle:
    "Dernière mise à jour : mai 2026. Cette page explique quels cookies nous posons, pourquoi et comment contrôler les cookies non essentiels. Droits complets : {privacy}.",
  sections: [
    {
      heading: "Que sont les cookies ?",
      blocks: [
        {
          kind: "p",
          text: "Les cookies sont de petits fichiers texte stockés dans votre navigateur. Ils aident un site à mémoriser les préférences, vous garder connecté, mesurer le trafic ou afficher des annonces pertinentes. Certains sont posés par nous, d'autres par des partenaires comme Google si vous acceptez les cookies publicitaires ou analytiques.",
        },
      ],
    },
    {
      heading: "Cookies essentiels",
      blocks: [
        {
          kind: "p",
          text: "Nous utilisons un cookie de langue et des clés local storage pour que la langue de l'interface et le choix de consentement persistent entre les visites. Ils sont nécessaires au fonctionnement et, selon les lignes UE, ne requièrent pas de consentement car strictement fonctionnels.",
        },
      ],
    },
    {
      heading: "Cookies analytiques (optionnels)",
      blocks: [
        {
          kind: "p",
          text: "Avec votre permission, nous chargeons Google Analytics 4 pour comprendre quelles pages aident les lecteurs et où l'expérience ralentit. Les cookies analytiques restent désactivés tant que vous n'acceptez pas les cookies non essentiels dans la bannière. Vous pouvez les refuser et utiliser l'analyseur.",
        },
      ],
    },
    {
      heading: "Cookies publicitaires (optionnels)",
      blocks: [
        {
          kind: "p",
          text: "Nous participons à Google AdSense. Les cookies pub peuvent diffuser et mesurer les annonces, limiter la fréquence et, avec consentement, personnaliser les annonces. Notre fichier {adsTxt} liste l'ID vendeur pub-3541461663112540. Voir {googleAdsCookies}.",
        },
      ],
    },
    {
      heading: "Modifier votre choix",
      blocks: [
        {
          kind: "p",
          text: "Utilisez la bannière de consentement ou effacez les données du site lifedecisions.space dans votre navigateur pour réinitialiser la bannière. Des extensions peuvent bloquer globalement les cookies tiers.",
        },
      ],
    },
    {
      heading: "Plus d'informations",
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
  metaTitle: "Politique de contenu",
  metaDescription:
    "Ce que publie Life Decision Engine : articles éditoriaux, outils assistés par IA, annuaire d'experts et Q&R communautaire. Normes de qualité et modération.",
  eyebrow: "Éditeur",
  title: "Politique de contenu",
  subtitle:
    "Cette politique décrit ce qui apparaît sur lifedecisions.space, qui le crée et comment nous maintenons la qualité pour les lecteurs et partenaires publicitaires.",
  sections: [
    {
      heading: "Contenu éditorial original",
      blocks: [
        {
          kind: "p",
          text: "Notre valeur principale : des articles longs originaux dans le {blog} — cadres de décision pour carrière, relocation, relations et argent. Rédigés par l'{editorialTeam}, revus selon les {editorialStandards} et mis à jour quand les faits changent. Pas de scraping ni de pages remplissage auto-générées.",
        },
      ],
    },
    {
      heading: "Outils et rapports générés",
      blocks: [
        {
          kind: "p",
          text: "L'analyseur produit un texte personnalisé à partir de vos entrées via des modèles structurés et une assistance IA décrite sur {howWeUseAi}. Les rapports restent privés à votre session sauf partage. Ils sont éducatifs, pas un conseil professionnel.",
        },
      ],
    },
    {
      heading: "Annuaire d'experts",
      blocks: [
        {
          kind: "p",
          text: "Les professionnels soumettent des profils via {expertsRegister}. Nous revoyons avant publication et retirons les entrées trompeuses ou spam. Nous ne garantissons aucun résultat d'une relation professionnelle.",
        },
      ],
    },
    {
      heading: "Q&R communautaire",
      blocks: [
        {
          kind: "p",
          text: "La {community} autorise du texte Q&R selon les {communityGuidelines}. Les posts peuvent être retirés pour abus, spam, conseil médical ou juridique catégorique ou contenu dangereux. Le contenu communautaire est modéré et ne représente pas la rédaction.",
        },
      ],
    },
    {
      heading: "Publicité",
      blocks: [
        {
          kind: "p",
          text: "Nous pouvons afficher Google AdSense sur des pages avec un contenu éditorial substantiel. Les annonces sont étiquetées et séparées du texte éditorial. Voir {monetize}.",
        },
      ],
    },
    {
      heading: "Signaler un problème",
      blocks: [
        {
          kind: "p",
          text: "Pour corrections, retrait ou questions de politique : hello@lifedecisions.space ou {contact}. Objectif : réponse sous cinq jours ouvrés.",
        },
      ],
    },
  ],
};

const privacy: TrustPageCopy = {
  metaTitle: "Politique de confidentialité",
  metaDescription:
    "Comment Life Decision Engine traite vos données, cookies, publicités (Google AdSense) et services tiers. Droits RGPD et CCPA.",
  eyebrow: "Juridique",
  title: "Politique de confidentialité",
  subtitle:
    "Dernière mise à jour : avril 2026. Transparence pour visiteurs et programmes pub (dont Google AdSense). Pas un conseil juridique.",
  sections: [
    {
      heading: "Qui nous sommes",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine fournit une analyse structurée des décisions (IA optionnelle) et des liens vers des professionnels tiers, comme décrit sur la {home}.",
        },
      ],
    },
    {
      heading: "Informations que vous fournissez",
      blocks: [
        {
          kind: "p",
          text: "En utilisant l'analyseur ou des formulaires, vous pouvez saisir des situations personnelles. Ce contenu génère les résultats de session. N'envoyez pas ce que vous n'acceptez pas de traiter. C'est un soutien à la décision, pas un service médical, juridique ou thérapeutique.",
        },
      ],
    },
    {
      heading: "Cookies et publicité",
      blocks: [
        {
          kind: "p",
          text: "Voir {cookies}. Nous pouvons afficher des annonces via Google AdSense. Google et partenaires peuvent utiliser des cookies selon votre région et choix. Voir {googleAdsCookies}. Bannière de consentement compatible RGPD où requis.",
        },
      ],
    },
    {
      heading: "Fournisseurs d'IA",
      blocks: [
        {
          kind: "p",
          text: "Si l'analyse IA en direct est activée, le texte du prompt peut être envoyé à un fournisseur d'IA uniquement pour générer une réponse, selon ses politiques. Détails : {howWeUseAi}.",
        },
      ],
    },
    {
      heading: "Paiements",
      blocks: [
        {
          kind: "p",
          text: "Les fonctions payantes peuvent être traitées par Stripe. Nous ne stockons pas les numéros de carte complets ; Stripe gère les données de paiement.",
        },
      ],
    },
    {
      heading: "Conservation des données",
      blocks: [
        {
          kind: "ul",
          items: [
            "Entrées analyseur : traitées pour votre session ; journaux d'erreur jusqu'à 30 jours puis suppression ou anonymisation.",
            "Contact et inscriptions experts : conservés pour répondre et maintenir les listes ; suppression sur demande.",
            "Facturation : enregistrements minimaux via Stripe selon la loi fiscale ; pas de données carte complètes chez nous.",
            "Cookies pub : conservation selon les politiques Google.",
          ],
        },
      ],
    },
    {
      heading: "Vos droits",
      blocks: [
        {
          kind: "p",
          text: "Selon votre région, vous pouvez avoir droit d'accès, rectification, suppression, limitation du traitement et opposition à certains usages. Contactez-nous via {contact}. UE/R-U : réclamation auprès de l'autorité de contrôle.",
        },
      ],
    },
    {
      heading: "Enfants",
      blocks: [
        {
          kind: "p",
          text: "Le service ne vise pas les enfants de moins de 16 ans. Nous ne collectons pas sciemment leurs données.",
        },
      ],
    },
    {
      heading: "Modifications",
      blocks: [
        {
          kind: "p",
          text: "Nous pouvons mettre à jour cette politique ; la date ci-dessus reflète la dernière version. L'utilisation continue après modification vaut acceptation.",
        },
      ],
    },
  ],
};

const terms: TrustPageCopy = {
  metaTitle: "Conditions d'utilisation",
  metaDescription:
    "Conditions d'utilisation de Life Decision Engine, abonnements, usage acceptable et limitation de responsabilité.",
  eyebrow: "Juridique",
  title: "Conditions d'utilisation",
  subtitle:
    "Dernière mise à jour : mai 2026. En utilisant Life Decision Engine, vous acceptez ces conditions. Voir aussi {privacy} et {disclaimer}.",
  sections: [
    {
      heading: "Le service",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine fournit des outils éducatifs d'analyse de décision, du contenu éditorial et des liens optionnels vers des experts. Le service est fourni « en l'état » et peut changer sans préavis.",
        },
      ],
    },
    {
      heading: "Comptes et abonnements",
      blocks: [
        {
          kind: "p",
          text: "Premium est facturé via Stripe. Tarifs et cycles sur {pricing}. Vous êtes responsable de l'exactitude du compte et des paiements. Résiliation via le portail Stripe ou {contact}.",
        },
      ],
    },
    {
      heading: "Usage acceptable",
      blocks: [
        {
          kind: "ul",
          items: [
            "N'utilisez pas le service à des fins illégales, nuisibles ou frauduleuses.",
            "N'essayez pas d'accéder aux systèmes, scraper ou republier des rapports sans autorisation.",
            "Ne donnez pas de conseil médical, juridique ou d'investissement au nom d'autrui.",
            "Les posts communautaires doivent respecter les {communityGuidelines}.",
          ],
        },
      ],
    },
    {
      heading: "Propriété intellectuelle",
      blocks: [
        {
          kind: "p",
          text: "Les cadres du site, le design et le texte éditorial sont protégés par le droit d'auteur. Vous pouvez imprimer ou partager vos rapports personnels, pas republier nos articles ou cadres pour concurrence commerciale.",
        },
      ],
    },
    {
      heading: "Limitation de responsabilité",
      blocks: [
        {
          kind: "p",
          text: "Dans la mesure permise par la loi, Life Decision Engine et ses opérateurs ne sont pas responsables des dommages indirects, accidentels ou consécutifs liés au service ou aux rapports. Détails : {disclaimer}.",
        },
      ],
    },
    {
      heading: "Résiliation et contact",
      blocks: [
        {
          kind: "p",
          text: "Nous pouvons suspendre ou résilier l'accès en cas de violation. Questions : {contact}. Les changements sont publiés ici ; l'usage continu vaut acceptation.",
        },
      ],
    },
  ],
};

const disclaimer: TrustPageCopy = {
  metaTitle: "Avertissement",
  metaDescription:
    "Les rapports et articles de Life Decision Engine sont éducatifs, pas un conseil professionnel. Ressources de crise.",
  eyebrow: "Juridique",
  title: "Avertissement",
  subtitle:
    "Veuillez lire avant des décisions de vie importantes. Ceci ne remplace pas un professionnel agréé.",
  sections: [
    {
      heading: "Pas un conseil professionnel",
      blocks: [
        {
          kind: "p",
          text: "Les rapports de l'analyseur, les articles {blog} et les réponses communautaires sont éducatifs pour structurer la réflexion. Ce n'est pas un diagnostic, un avis juridique, fiscal ou d'investissement.",
        },
      ],
    },
    {
      heading: "IA et erreurs",
      blocks: [
        {
          kind: "p",
          text: "Les résultats peuvent contenir des erreurs ou lacunes, surtout avec des entrées simplifiées. La relecture humaine ne garantit pas une exactitude totale. Voir {howWeUseAi} et {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Tiers",
      blocks: [
        {
          kind: "p",
          text: "Les liens vers {experts}, annonceurs ou sites externes ne constituent pas une approbation. Les contrats avec des experts sont entre vous et le professionnel.",
        },
      ],
    },
    {
      heading: "Crise",
      blocks: [
        {
          kind: "p",
          text: "Si vous vous faites du mal ou menacez de le faire, contactez les services d'urgence locaux. Cet outil ne surveille pas les messages urgents.",
        },
      ],
    },
    {
      heading: "Absence de garantie",
      blocks: [
        {
          kind: "p",
          text: "Le service est fourni sans garantie expresse ou implicite. Utilisation à vos risques. Questions juridiques : {terms} et {privacy}.",
        },
      ],
    },
  ],
};

const about: TrustPageCopy = {
  metaTitle: "À propos",
  metaDescription:
    "Mission de Life Decision Engine : des cadres structurés pour les grandes décisions de vie.",
  eyebrow: "Éditeur",
  title: "À propos",
  subtitle:
    "Nous aidons à penser clairement et globalement quand une liste pour/contre ne suffit pas.",
  sections: [
    {
      heading: "Mission",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine est conçu pour les moments où une décision semble trop grande pour une seule liste — déménagement, carrière, relations, argent. Nous offrons scénarios, quatre lentilles et une chronologie, pas une seule « bonne » réponse.",
        },
      ],
    },
    {
      heading: "Fondateur",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine a été fondé et créé par Albert Akimyan. Il dirige le produit, les cadres éditoriaux et le moteur d’analyse des décisions sur lifedecisions.space.",
        },
      ],
    },
    {
      heading: "Ce que nous construisons",
      blocks: [
        {
          kind: "ul",
          items: [
            "{analyze} interactif avec rapports personnalisés",
            "Articles {blog} originaux et {editorialStandards}",
            "Annuaire {experts} optionnel pour un soutien humain",
          ],
        },
      ],
    },
    {
      heading: "Ce que nous ne sommes pas",
      blocks: [
        {
          kind: "p",
          text: "Pas un réseau social, pas un service thérapeutique ni un cabinet d'avocats. Nous ne vendons pas votre texte de décision et ne garantissons pas les résultats des experts.",
        },
      ],
    },
    {
      heading: "Financement",
      blocks: [
        {
          kind: "p",
          text: "Soutenu par des abonnements {pricing}, des mises en relation optionnelles et, où activé, la publicité. Transparence : {monetize}.",
        },
      ],
    },
    {
      heading: "Équipe et contact",
      blocks: [
        {
          kind: "p",
          text: "Le travail éditorial est mené par l'{editorialTeam}. Questions et corrections : {contact}.",
        },
      ],
    },
  ],
};

const contact: TrustPageCopy = {
  metaTitle: "Contact",
  metaDescription:
    "Contactez Life Decision Engine pour la rédaction, le support et la presse.",
  eyebrow: "Éditeur",
  title: "Contact",
  subtitle:
    "Réponse sous cinq jours ouvrés. En urgence, appelez les services locaux, pas cette page.",
  sections: [
    {
      heading: "E-mail",
      blocks: [
        {
          kind: "p",
          text: "hello@lifedecisions.space — questions générales, corrections, politique, presse.",
        },
      ],
    },
    {
      heading: "Quoi inclure",
      blocks: [
        {
          kind: "ul",
          items: [
            "URL de l'article et précision pour une correction",
            "E-mail du compte pour questions Stripe",
            "Capture d'écran pour signalement modération (sans données personnelles sensibles)",
          ],
        },
      ],
    },
    {
      heading: "Inscription experts",
      blocks: [
        {
          kind: "p",
          text: "Les professionnels soumettent via {expertsRegister}. Spam et fausses qualifications sont retirés.",
        },
      ],
    },
    {
      heading: "Demandes confidentialité",
      blocks: [
        {
          kind: "p",
          text: "Pour RGPD/CCPA : objet « Privacy request » et action souhaitée. Voir {privacy}.",
        },
      ],
    },
  ],
};

const faq: TrustPageCopy = {
  metaTitle: "FAQ",
  metaDescription:
    "Réponses sur l'analyseur Life Decision Engine, confidentialité, facturation et experts.",
  eyebrow: "Aide",
  title: "FAQ",
  subtitle:
    "Réponses courtes. Textes juridiques détaillés : {privacy}, {terms}, {disclaimer}.",
  sections: [
    {
      heading: "Analyseur",
      blocks: [
        {
          kind: "p",
          text: "Est-ce un conseil professionnel ? Non — outil éducatif. Puis-je partager le rapport avec un thérapeute ou avocat ? Oui, le résumé de scénarios focalise souvent les séances.",
        },
      ],
    },
    {
      heading: "Confidentialité",
      blocks: [
        {
          kind: "p",
          text: "Nous ne publions ni ne vendons votre texte de décision. Détails : {privacy} et {cookies}.",
        },
      ],
    },
    {
      heading: "Facturation",
      blocks: [
        {
          kind: "p",
          text: "Le gratuit fournit un rapport structuré complet. Premium ajoute historique et analyses plus profondes — {pricing}.",
        },
      ],
    },
    {
      heading: "Experts",
      blocks: [
        {
          kind: "p",
          text: "L'annuaire liste des tiers ; vous les contactez vous-même. Pas de garantie de résultat. {experts} et {expertsRegister}.",
        },
      ],
    },
    {
      heading: "Éditorial",
      blocks: [
        {
          kind: "p",
          text: "Qui écrit les articles ? L'{editorialTeam} selon les {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Autres questions",
      blocks: [
        {
          kind: "p",
          text: "Pas trouvé ? Écrivez à {contact} ou voir {about}.",
        },
      ],
    },
  ],
};

const editorialTeam: TrustPageCopy = {
  metaTitle: "Équipe éditoriale",
  metaDescription:
    "Qui maintient les cadres de décision et le contenu {blog} de Life Decision Engine.",
  eyebrow: "Éditeur",
  title: "Équipe éditoriale",
  subtitle:
    "Les personnes qui conçoivent, relisent et mettent à jour les cadres et articles.",
  sections: [
    {
      heading: "Rôle",
      blocks: [
        {
          kind: "p",
          text: "L'équipe éditoriale définit la structure de l'analyseur, rédige et relit les articles {blog} et applique les {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Indépendance",
      blocks: [
        {
          kind: "p",
          text: "Les annonceurs et listes {experts} ne contrôlent pas les conclusions éditoriales. Les partenariats sont signalés dans les articles.",
        },
      ],
    },
    {
      heading: "Relecture",
      blocks: [
        {
          kind: "p",
          text: "Les nouveaux cadres passent une revue interne puis sont mis à jour quand la loi, le marché ou la recherche changent.",
        },
      ],
    },
    {
      heading: "Contact",
      blocks: [
        {
          kind: "p",
          text: "Corrections et presse : {contact}.",
        },
      ],
    },
  ],
};

const editorialStandards: TrustPageCopy = {
  metaTitle: "Normes éditoriales",
  metaDescription:
    "Normes d'exactitude, mises à jour, transparence IA et corrections chez Life Decision Engine.",
  eyebrow: "Éditeur",
  title: "Normes éditoriales",
  subtitle:
    "Comment nous maintenons la confiance des lecteurs et des programmes publicitaires.",
  sections: [
    {
      heading: "Exactitude",
      blocks: [
        {
          kind: "p",
          text: "Les articles s'appuient sur des sources vérifiées et l'expérience. Les erreurs factuelles sont corrigées rapidement et notées si le changement est significatif.",
        },
      ],
    },
    {
      heading: "Mises à jour",
      blocks: [
        {
          kind: "p",
          text: "Les grands cadres de décision sont revus chaque année ou plus souvent si règles ou données changent.",
        },
      ],
    },
    {
      heading: "Transparence IA",
      blocks: [
        {
          kind: "p",
          text: "Quand l'IA aide un brouillon ou rapport, c'est indiqué sur {howWeUseAi}. Un humain relit structure et limites de sécurité.",
        },
      ],
    },
    {
      heading: "Politique de contenu",
      blocks: [
        {
          kind: "p",
          text: "Communauté, publicité et outils suivent la {contentPolicy}.",
        },
      ],
    },
    {
      heading: "Corrections",
      blocks: [
        {
          kind: "p",
          text: "Signalez les erreurs via {contact} ou hello@lifedecisions.space. Objectif : réponse sous cinq jours ouvrés.",
        },
      ],
    },
  ],
};

const analyze: PublisherEducationCopy = {
  editorialOverviewLabel: "Aperçu éditorial",
  introParagraphs: [
    "L'analyseur Life Decision Engine est un espace structuré pour les décisions trop grandes pour une simple liste pour/contre. Vous décrivez votre situation en langage clair — ce que vous décidez, le contexte et les contraintes fixes (argent, géographie, famille, éthique). Le moteur produit un rapport privé : scénarios (meilleur, pire, probable), quatre lentilles (finances, psychologie, risques, opportunités), chronologie et score.",
    "Ce n'est pas un chatbot qui improvise des conseils. La sortie suit un cadre éditorial fixe que nous maintenons et relisons. Il aide à penser clairement — il ne remplace pas thérapeute, avocat ou planificateur financier. Pour les sujets réglementés, nous renvoyons vers {experts} et le {blog}.",
  ],
  sections: [
    {
      heading: "Contenu du rapport",
      blocks: [
        {
          kind: "ul",
          items: [
            "Scénarios — trois futurs concrets à comparer.",
            "Quatre lentilles — argent, charge émotionnelle, risque bas, potentiel sous-estimé.",
            "Chronologie — ce qui change souvent à six mois, deux ans et cinq ans.",
            "Score — signal comparatif, pas un verdict.",
          ],
        },
      ],
    },
    {
      heading: "Gratuit vs Premium",
      blocks: [
        {
          kind: "p",
          text: "Le gratuit exécute le cadre complet avec limites d'usage raisonnable. Premium ajoute des passes plus profonds, historique et rappels — voir {pricing}. Paiements via Stripe ; pas de stockage de carte.",
        },
      ],
    },
    {
      heading: "Confidentialité",
      blocks: [
        {
          kind: "p",
          text: "Votre texte n'est envoyé à nos serveurs que lors d'une analyse. Nous ne publions ni ne vendons vos questions. Voir {privacy} et {howWeUseAi}.",
        },
      ],
    },
    {
      heading: "Cette page vs analyseur d'accueil",
      blocks: [
        {
          kind: "p",
          text: "Le même moteur sur l'espace {home}. Cette URL pour marquer-page ou recherche. Normes alignées sur {editorialStandards}.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Est-ce un conseil médical, juridique ou financier ?",
      a: "Non. Logiciel éducatif. Pour diagnostic, contrats, impôts ou investissements avec argent réel, consultez un professionnel agréé.",
      plainAnswer:
        "Non. Logiciel éducatif. Pour diagnostic, contrats, impôts ou investissements avec argent réel, consultez un professionnel agréé.",
    },
    {
      q: "Puis-je utiliser le rapport avec mon thérapeute ou avocat ?",
      a: "Oui — beaucoup collent le résumé de scénarios pour cibler la vraie bifurcation.",
      plainAnswer:
        "Oui — beaucoup collent le résumé de scénarios pour cibler la vraie bifurcation.",
    },
    {
      q: "Qui maintient les cadres ?",
      a: "L'équipe éditoriale Life Decision Engine. Voir {editorialTeam}.",
      plainAnswer: "L'équipe éditoriale Life Decision Engine.",
    },
  ],
  footerParagraph:
    "En crise, contactez les urgences locales — cet outil ne surveille pas les messages urgents. Voir {disclaimer}.",
  lastReviewed: "25 mai 2026",
};

const pricing: PublisherEducationCopy = {
  introParagraphs: [
    "Life Decision Engine est financé pour que l'analyseur de base reste utile sans paywall sur la réflexion. Le plan gratuit inclut scénarios, quatre lentilles, chronologie et score avec limites raisonnables. Premium est pour ceux qui analysent beaucoup de décisions par mois et veulent historique, rappels et passes plus profonds.",
    "Transparence sur l'argent : abonnements, mises en relation experts optionnelles (facturation directe par le pro) et, où activé, Google AdSense. Nous ne vendons pas votre texte de décision. Voir {monetize}.",
  ],
  sections: [
    {
      heading: "Ce qu'ajoute Premium",
      blocks: [
        {
          kind: "ul",
          items: [
            "Analyses plus fréquentes ou profondes pour décisions en plusieurs étapes.",
            "Historique sauvegardé et rappels après une période de réflexion.",
            "Accès anticipé aux mises à jour de cadres.",
          ],
        },
      ],
    },
    {
      heading: "Facturation et remboursements",
      blocks: [
        {
          kind: "p",
          text: "Paiement via Stripe. Conditions d'abonnement dans {terms}. Aide facturation : {contact}.",
        },
      ],
    },
    {
      heading: "Publicité sur pages gratuites",
      blocks: [
        {
          kind: "p",
          text: "AdSense possible sur pages avec contenu éditorial substantiel. Politiques Google et consentement UE. Voir {privacy} et {contentPolicy}.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "Faut-il Premium pour un rapport utile ?",
      a: "Non. Le gratuit produit un rapport structuré complet pour une décision de vie typique.",
      plainAnswer:
        "Non. Le gratuit produit un rapport structuré complet pour une décision de vie typique.",
    },
    {
      q: "Premium supprime-t-il les annonces ?",
      a: "Premium vise les fonctionnalités. Certaines pages informatives peuvent encore afficher des annonces selon la configuration.",
      plainAnswer:
        "Premium vise les fonctionnalités. Certaines pages informatives peuvent encore afficher des annonces selon la configuration.",
    },
  ],
  lastReviewed: "25 mai 2026",
};

const home: PublisherEducationCopy = {
  editorialOverviewLabel: "Aperçu éditeur",
  introParagraphs: [
    "Life Decision Engine publie des cadres originaux sur ce site et dans le {blog} — carrière, relocation, relations, argent, psychologie des grands choix. Chaque article est relu par l'{editorialTeam} selon les {editorialStandards}.",
    "L'analyseur interactif ci-dessous transforme votre question en scénarios, quatre lentilles, chronologie et score — aussi sur {analyze}. Quand un humain professionnel convient, parcourez {experts} ou lisez la {faq}. Pas un réseau social.",
  ],
  sections: [
    {
      heading: "Politiques et contact",
      blocks: [
        {
          kind: "ul",
          items: [
            "{privacy} — cookies, AdSense, RGPD/CCPA",
            "{terms} — abonnements, usage acceptable",
            "{contentPolicy} — ce que nous publions et modérons",
            "{contact} — rédaction, presse, support",
          ],
        },
      ],
    },
  ],
  lastReviewed: "25 mai 2026",
};

export const trustPagesFr = {
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
