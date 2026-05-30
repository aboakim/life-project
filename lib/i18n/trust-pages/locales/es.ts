import type { TrustPageCopy, PublisherEducationCopy } from "../types";

const cookies: TrustPageCopy = {
  metaTitle: "Política de cookies",
  metaDescription:
    "Cómo Life Decision Engine usa cookies: esenciales, analíticas (Google Analytics) y publicitarias (Google AdSense). Gestione sus opciones.",
  eyebrow: "Legal",
  title: "Política de cookies",
  subtitle:
    "Última actualización: mayo de 2026. Esta página explica qué cookies establecemos, por qué y cómo controlar las no esenciales. Derechos completos en {privacy}.",
  sections: [
    {
      heading: "¿Qué son las cookies?",
      blocks: [
        {
          kind: "p",
          text: "Las cookies son pequeños archivos de texto en su navegador. Ayudan a un sitio a recordar preferencias, mantener la sesión, medir tráfico o mostrar anuncios relevantes. Algunas las ponemos nosotros; otras, socios como Google si acepta cookies publicitarias o analíticas.",
        },
      ],
    },
    {
      heading: "Cookies esenciales",
      blocks: [
        {
          kind: "p",
          text: "Usamos una cookie de idioma y claves de almacenamiento local para que el idioma de la interfaz y la elección de consentimiento persistan entre visitas. Son necesarias para el funcionamiento y, según la guía de la UE, no requieren consentimiento por ser estrictamente funcionales.",
        },
      ],
    },
    {
      heading: "Cookies analíticas (opcionales)",
      blocks: [
        {
          kind: "p",
          text: "Con su permiso cargamos Google Analytics 4 para entender qué páginas ayudan a los lectores y dónde la experiencia es lenta. Las analíticas permanecen desactivadas hasta que acepte cookies no esenciales en el banner. Puede rechazarlas y seguir usando el analizador.",
        },
      ],
    },
    {
      heading: "Cookies publicitarias (opcionales)",
      blocks: [
        {
          kind: "p",
          text: "Participamos en Google AdSense. Las cookies de anuncios pueden mostrar y medir anuncios, limitar la frecuencia y, con consentimiento, personalizarlos. Nuestro archivo {adsTxt} lista el seller ID pub-3541461663112540. Vea {googleAdsCookies}.",
        },
      ],
    },
    {
      heading: "Cómo cambiar su elección",
      blocks: [
        {
          kind: "p",
          text: "Use el banner de consentimiento o borre los datos del sitio lifedecisions.space en el navegador para restablecer el banner. Las extensiones pueden bloquear cookies de terceros globalmente.",
        },
      ],
    },
    {
      heading: "Más información",
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
  metaTitle: "Política de contenido",
  metaDescription:
    "Qué publica Life Decision Engine: artículos editoriales, herramientas con IA, directorio de expertos y Q&A comunitario. Estándares de calidad y moderación.",
  eyebrow: "Editor",
  title: "Política de contenido",
  subtitle:
    "Esta política describe qué aparece en lifedecisions.space, quién lo crea y cómo mantenemos la calidad para lectores y socios publicitarios.",
  sections: [
    {
      heading: "Contenido editorial original",
      blocks: [
        {
          kind: "p",
          text: "Nuestro valor principal son artículos largos originales en el {blog}: marcos de decisión sobre carrera, reubicación, relaciones y dinero. Los redacta el {editorialTeam}, se revisan según {editorialStandards} y se actualizan cuando cambian los hechos. No extraemos artículos ajenos ni publicamos páginas de relleno autogeneradas.",
        },
      ],
    },
    {
      heading: "Herramientas e informes generados",
      blocks: [
        {
          kind: "p",
          text: "El analizador produce texto personalizado a partir de sus entradas con plantillas estructuradas y asistencia de IA descrita en {howWeUseAi}. Los informes son privados de su sesión salvo que los comparta. Son educativos, no asesoramiento profesional.",
        },
      ],
    },
    {
      heading: "Directorio de expertos",
      blocks: [
        {
          kind: "p",
          text: "Los profesionales envían perfiles vía {expertsRegister}. Revisamos antes de publicar y eliminamos entradas engañosas o spam. No garantizamos resultados de ninguna relación profesional.",
        },
      ],
    },
    {
      heading: "Q&A comunitario",
      blocks: [
        {
          kind: "p",
          text: "La {community} permite texto Q&A según {communityGuidelines}. Las publicaciones pueden eliminarse por abuso, spam, consejo médico o legal categórico o contenido peligroso. El contenido comunitario está moderado y no representa al equipo editorial.",
        },
      ],
    },
    {
      heading: "Publicidad",
      blocks: [
        {
          kind: "p",
          text: "Podemos mostrar Google AdSense en páginas con contenido editorial sustancial. Los anuncios están etiquetados y separados del texto editorial. Vea {monetize}.",
        },
      ],
    },
    {
      heading: "Reportar un problema",
      blocks: [
        {
          kind: "p",
          text: "Para correcciones, retiradas o preguntas de política: hello@lifedecisions.space o {contact}. Objetivo: responder en cinco días hábiles.",
        },
      ],
    },
  ],
};

const privacy: TrustPageCopy = {
  metaTitle: "Política de privacidad",
  metaDescription:
    "Cómo Life Decision Engine trata sus datos, cookies, anuncios (Google AdSense) y servicios de terceros. Derechos RGPD y CCPA.",
  eyebrow: "Legal",
  title: "Política de privacidad",
  subtitle:
    "Última actualización: abril de 2026. Transparencia para visitantes y programas publicitarios (incluido Google AdSense). No es asesoramiento legal.",
  sections: [
    {
      heading: "Quiénes somos",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine ofrece análisis estructurado de decisiones (con IA opcional) y enlaces a profesionales externos, como se describe en la {home}.",
        },
      ],
    },
    {
      heading: "Información que usted proporciona",
      blocks: [
        {
          kind: "p",
          text: "Al usar el analizador o formularios puede introducir situaciones personales. Ese contenido genera los resultados de su sesión. No envíe lo que no acepte procesar. Es apoyo a la decisión, no servicio médico, legal ni terapéutico.",
        },
      ],
    },
    {
      heading: "Cookies y publicidad",
      blocks: [
        {
          kind: "p",
          text: "Vea {cookies}. Podemos mostrar anuncios vía Google AdSense. Google y socios pueden usar cookies según su región y elecciones. Vea {googleAdsCookies}. Banner de consentimiento compatible con RGPD donde se requiera.",
        },
      ],
    },
    {
      heading: "Proveedores de IA",
      blocks: [
        {
          kind: "p",
          text: "Si el análisis con IA en vivo está activado, el texto del prompt puede enviarse a un proveedor de IA solo para generar una respuesta, según sus políticas. Detalles: {howWeUseAi}.",
        },
      ],
    },
    {
      heading: "Pagos",
      blocks: [
        {
          kind: "p",
          text: "Las funciones de pago pueden procesarse con Stripe. No almacenamos números de tarjeta completos; Stripe gestiona los datos de pago.",
        },
      ],
    },
    {
      heading: "Conservación de datos",
      blocks: [
        {
          kind: "ul",
          items: [
            "Entradas del analizador: procesadas para su sesión; registros de error hasta 30 días, luego eliminados o anonimizados.",
            "Contacto y registros de expertos: conservados para responder y mantener listados; eliminación a solicitud.",
            "Facturación: registros mínimos vía Stripe según ley fiscal; sin datos completos de tarjeta en nuestros sistemas.",
            "Cookies publicitarias: conservación según políticas de Google.",
          ],
        },
      ],
    },
    {
      heading: "Sus derechos",
      blocks: [
        {
          kind: "p",
          text: "Según su región puede tener derechos de acceso, rectificación, supresión o limitación del tratamiento y oposición a ciertos usos. Contáctenos vía {contact}. UE/Reino Unido: reclamación ante la autoridad de control.",
        },
      ],
    },
    {
      heading: "Menores",
      blocks: [
        {
          kind: "p",
          text: "El servicio no está dirigido a menores de 16 años. No recopilamos conscientemente sus datos.",
        },
      ],
    },
    {
      heading: "Cambios",
      blocks: [
        {
          kind: "p",
          text: "Podemos actualizar esta política; la fecha superior refleja la última versión. El uso continuado tras cambios implica aceptación de la política actualizada.",
        },
      ],
    },
  ],
};

const terms: TrustPageCopy = {
  metaTitle: "Términos del servicio",
  metaDescription:
    "Términos de uso de Life Decision Engine, suscripciones, uso aceptable y limitación de responsabilidad.",
  eyebrow: "Legal",
  title: "Términos del servicio",
  subtitle:
    "Última actualización: mayo de 2026. Al usar Life Decision Engine acepta estos términos. Vea también {privacy} y {disclaimer}.",
  sections: [
    {
      heading: "El servicio",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine ofrece herramientas educativas de análisis de decisiones, contenido editorial y enlaces opcionales a expertos. El servicio se proporciona «tal cual» y puede cambiar sin aviso previo.",
        },
      ],
    },
    {
      heading: "Cuentas y suscripciones",
      blocks: [
        {
          kind: "p",
          text: "Premium se factura vía Stripe. Precios y ciclos en {pricing}. Usted es responsable de la exactitud de la cuenta y los pagos. Cancelación vía portal de Stripe o {contact}.",
        },
      ],
    },
    {
      heading: "Uso aceptable",
      blocks: [
        {
          kind: "ul",
          items: [
            "No use el servicio con fines ilegales, dañinos o fraudulentos.",
            "No intente acceder a sistemas, hacer scraping ni republicar informes sin permiso.",
            "No ofrezca consejo médico, legal o de inversión en nombre de otros.",
            "Las publicaciones comunitarias deben seguir {communityGuidelines}.",
          ],
        },
      ],
    },
    {
      heading: "Propiedad intelectual",
      blocks: [
        {
          kind: "p",
          text: "Los marcos del sitio, el diseño y el texto editorial están protegidos por derechos de autor. Puede imprimir o compartir informes personales, no republicar nuestros artículos o marcos con fines competitivos comerciales.",
        },
      ],
    },
    {
      heading: "Limitación de responsabilidad",
      blocks: [
        {
          kind: "p",
          text: "En la medida permitida por la ley, Life Decision Engine y sus operadores no son responsables de daños indirectos, incidentales o consecuentes por confiar en el servicio o los informes. Detalles: {disclaimer}.",
        },
      ],
    },
    {
      heading: "Terminación y contacto",
      blocks: [
        {
          kind: "p",
          text: "Podemos suspender o terminar el acceso por incumplimiento. Preguntas: {contact}. Los cambios se publican aquí; el uso continuado implica aceptación.",
        },
      ],
    },
  ],
};

const disclaimer: TrustPageCopy = {
  metaTitle: "Aviso legal",
  metaDescription:
    "Los informes y artículos de Life Decision Engine son educativos, no asesoramiento profesional. Recursos en crisis.",
  eyebrow: "Legal",
  title: "Aviso legal",
  subtitle:
    "Lea antes de decisiones de vida importantes. Esto no sustituye a un profesional acreditado.",
  sections: [
    {
      heading: "No es asesoramiento profesional",
      blocks: [
        {
          kind: "p",
          text: "Los informes del analizador, artículos del {blog} y respuestas comunitarias son educativos para pensar con estructura. No son diagnóstico, opinión legal, fiscal ni de inversión.",
        },
      ],
    },
    {
      heading: "IA y errores",
      blocks: [
        {
          kind: "p",
          text: "Los resultados pueden contener errores u omisiones, especialmente con entradas simplificadas. La revisión humana no garantiza exactitud total. Vea {howWeUseAi} y {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Terceros",
      blocks: [
        {
          kind: "p",
          text: "Enlaces a {experts}, anunciantes o sitios externos no implican respaldo. Los contratos con expertos son entre usted y el profesional.",
        },
      ],
    },
    {
      heading: "Crisis",
      blocks: [
        {
          kind: "p",
          text: "Si se hace daño o amenaza con hacerlo, llame a servicios de emergencia locales. Esta herramienta no monitoriza mensajes urgentes.",
        },
      ],
    },
    {
      heading: "Sin garantías",
      blocks: [
        {
          kind: "p",
          text: "El servicio se ofrece sin garantías expresas o implícitas. Uso bajo su propio riesgo. Más información legal: {terms} y {privacy}.",
        },
      ],
    },
  ],
};

const about: TrustPageCopy = {
  metaTitle: "Sobre nosotros",
  metaDescription:
    "Misión de Life Decision Engine: marcos estructurados para grandes decisiones de vida.",
  eyebrow: "Editor",
  title: "Sobre nosotros",
  subtitle:
    "Ayudamos a pensar con claridad e integridad cuando una lista de pros y contras no basta.",
  sections: [
    {
      heading: "Misión",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine existe para momentos en que una decisión parece demasiado grande para una sola lista — mudanza, carrera, relaciones, dinero. Ofrecemos escenarios, cuatro lentes y una línea temporal, no una única respuesta «correcta».",
        },
      ],
    },
    {
      heading: "Fundador",
      blocks: [
        {
          kind: "p",
          text: "Life Decision Engine fue fundado y creado por Albert Akimyan. Dirige el producto, los marcos editoriales y el motor de análisis de decisiones en lifedecisions.space.",
        },
      ],
    },
    {
      heading: "Qué construimos",
      blocks: [
        {
          kind: "ul",
          items: [
            "{analyze} interactivo con informes personalizados",
            "Artículos originales en el {blog} y {editorialStandards}",
            "Directorio opcional de {experts} para apoyo humano",
          ],
        },
      ],
    },
    {
      heading: "Qué no somos",
      blocks: [
        {
          kind: "p",
          text: "No somos red social, servicio terapéutico ni bufete de abogados. No vendemos su texto de decisión ni garantizamos resultados de expertos.",
        },
      ],
    },
    {
      heading: "Financiación",
      blocks: [
        {
          kind: "p",
          text: "Sostenido por suscripciones en {pricing}, presentaciones opcionales a expertos y, donde esté activo, publicidad. Transparencia: {monetize}.",
        },
      ],
    },
    {
      heading: "Equipo y contacto",
      blocks: [
        {
          kind: "p",
          text: "El trabajo editorial lo dirige el {editorialTeam}. Preguntas y correcciones: {contact}.",
        },
      ],
    },
  ],
};

const contact: TrustPageCopy = {
  metaTitle: "Contacto",
  metaDescription:
    "Contacte con Life Decision Engine para redacción, soporte y prensa.",
  eyebrow: "Editor",
  title: "Contacto",
  subtitle:
    "Respondemos en cinco días hábiles. En emergencias, llame a servicios locales, no a esta página.",
  sections: [
    {
      heading: "Correo electrónico",
      blocks: [
        {
          kind: "p",
          text: "hello@lifedecisions.space — consultas generales, correcciones, política, prensa.",
        },
      ],
    },
    {
      heading: "Qué incluir",
      blocks: [
        {
          kind: "ul",
          items: [
            "URL del artículo y aclaración concreta si pide corrección",
            "Correo de la cuenta para preguntas de Stripe",
            "Captura de pantalla para quejas de moderación (sin datos personales sensibles)",
          ],
        },
      ],
    },
    {
      heading: "Registro de expertos",
      blocks: [
        {
          kind: "p",
          text: "Los profesionales envían perfiles vía {expertsRegister}. Eliminamos spam y credenciales falsas.",
        },
      ],
    },
    {
      heading: "Privacidad",
      blocks: [
        {
          kind: "p",
          text: "Para solicitudes RGPD/CCPA: asunto «Privacy request» y acción deseada. Vea {privacy}.",
        },
      ],
    },
  ],
};

const faq: TrustPageCopy = {
  metaTitle: "Preguntas frecuentes",
  metaDescription:
    "Respuestas sobre el analizador Life Decision Engine, privacidad, facturación y expertos.",
  eyebrow: "Ayuda",
  title: "Preguntas frecuentes",
  subtitle:
    "Respuestas breves. Textos legales detallados: {privacy}, {terms}, {disclaimer}.",
  sections: [
    {
      heading: "Analizador",
      blocks: [
        {
          kind: "p",
          text: "¿Es asesoramiento profesional? No — herramienta educativa. ¿Puedo compartir el informe con terapeuta o abogado? Sí, el resumen de escenarios suele enfocar las sesiones.",
        },
      ],
    },
    {
      heading: "Privacidad",
      blocks: [
        {
          kind: "p",
          text: "No publicamos ni vendemos su texto de decisión. Detalles: {privacy} y {cookies}.",
        },
      ],
    },
    {
      heading: "Facturación",
      blocks: [
        {
          kind: "p",
          text: "El plan gratuito ofrece un informe estructurado completo. Premium añade historial y análisis más profundos — {pricing}.",
        },
      ],
    },
    {
      heading: "Expertos",
      blocks: [
        {
          kind: "p",
          text: "El directorio lista terceros; usted los contacta. No garantizamos resultados. {experts} y {expertsRegister}.",
        },
      ],
    },
    {
      heading: "Editorial",
      blocks: [
        {
          kind: "p",
          text: "¿Quién escribe los artículos? El {editorialTeam} según {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Otras preguntas",
      blocks: [
        {
          kind: "p",
          text: "¿No encuentra respuesta? Escriba a {contact} o vea {about}.",
        },
      ],
    },
  ],
};

const editorialTeam: TrustPageCopy = {
  metaTitle: "Equipo editorial",
  metaDescription:
    "Quién mantiene los marcos de decisión y el contenido del {blog} de Life Decision Engine.",
  eyebrow: "Editor",
  title: "Equipo editorial",
  subtitle:
    "Personas que diseñan, revisan y actualizan marcos y artículos.",
  sections: [
    {
      heading: "Función",
      blocks: [
        {
          kind: "p",
          text: "El equipo editorial define la estructura del analizador, escribe y revisa artículos del {blog} y aplica {editorialStandards}.",
        },
      ],
    },
    {
      heading: "Independencia",
      blocks: [
        {
          kind: "p",
          text: "Anunciantes y listados de {experts} no controlan conclusiones editoriales. Las relaciones de socio se señalan en los artículos.",
        },
      ],
    },
    {
      heading: "Revisión",
      blocks: [
        {
          kind: "p",
          text: "Los marcos nuevos pasan revisión interna y se actualizan cuando cambian ley, mercado o investigación.",
        },
      ],
    },
    {
      heading: "Contacto",
      blocks: [
        {
          kind: "p",
          text: "Correcciones y prensa: {contact}.",
        },
      ],
    },
  ],
};

const editorialStandards: TrustPageCopy = {
  metaTitle: "Estándares editoriales",
  metaDescription:
    "Estándares de exactitud, actualizaciones, transparencia de IA y correcciones en Life Decision Engine.",
  eyebrow: "Editor",
  title: "Estándares editoriales",
  subtitle:
    "Cómo mantenemos la confianza de lectores y programas publicitarios.",
  sections: [
    {
      heading: "Exactitud",
      blocks: [
        {
          kind: "p",
          text: "Los artículos se basan en fuentes verificadas y experiencia. Los errores factuales se corrigen con rapidez y se anotan si el cambio es significativo.",
        },
      ],
    },
    {
      heading: "Actualizaciones",
      blocks: [
        {
          kind: "p",
          text: "Los grandes marcos de decisión se revisan anualmente o más a menudo si cambian normas o datos.",
        },
      ],
    },
    {
      heading: "Transparencia de IA",
      blocks: [
        {
          kind: "p",
          text: "Cuando la IA ayuda en borrador o informe, se indica en {howWeUseAi}. Un humano revisa estructura y límites de seguridad.",
        },
      ],
    },
    {
      heading: "Política de contenido",
      blocks: [
        {
          kind: "p",
          text: "Comunidad, publicidad y herramientas siguen {contentPolicy}.",
        },
      ],
    },
    {
      heading: "Correcciones",
      blocks: [
        {
          kind: "p",
          text: "Reporte errores vía {contact} o hello@lifedecisions.space. Objetivo: respuesta en cinco días hábiles.",
        },
      ],
    },
  ],
};

const analyze: PublisherEducationCopy = {
  editorialOverviewLabel: "Resumen editorial",
  introParagraphs: [
    "El analizador Life Decision Engine es un espacio estructurado para decisiones demasiado grandes para una lista de pros y contras. Describe su situación en lenguaje claro — qué decide, el contexto y restricciones fijas (dinero, geografía, familia, ética). El motor produce un informe privado: escenarios (mejor, peor, probable), cuatro lentes (finanzas, psicología, riesgos, oportunidades), línea temporal y puntuación.",
    "No es un chatbot que improvisa consejos. La salida sigue un marco editorial fijo que mantenemos y revisamos. Ayuda a pensar con claridad, no sustituye a terapeuta, abogado ni planificador financiero. En temas regulados enlazamos {experts} y el {blog}.",
  ],
  sections: [
    {
      heading: "Qué incluye el informe",
      blocks: [
        {
          kind: "ul",
          items: [
            "Escenarios — tres futuros concretos para comparar.",
            "Cuatro lentes — dinero, carga emocional, riesgo a la baja, potencial subestimado.",
            "Línea temporal — qué suele cambiar a seis meses, dos y cinco años.",
            "Puntuación — señal comparativa, no veredicto.",
          ],
        },
      ],
    },
    {
      heading: "Gratis vs Premium",
      blocks: [
        {
          kind: "p",
          text: "El nivel gratuito ejecuta el marco completo con límites de uso razonable. Premium añade pasadas más profundas, historial y recordatorios — vea {pricing}. Pagos vía Stripe; no guardamos números de tarjeta.",
        },
      ],
    },
    {
      heading: "Privacidad",
      blocks: [
        {
          kind: "p",
          text: "Su texto de decisión solo se envía a nuestros servidores al ejecutar un análisis. No publicamos ni vendemos sus preguntas. Vea {privacy} y {howWeUseAi}.",
        },
      ],
    },
    {
      heading: "Esta página vs analizador en inicio",
      blocks: [
        {
          kind: "p",
          text: "El mismo motor en el espacio de la {home}. Esta URL para marcadores o búsqueda. Estándares alineados con {editorialStandards}.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "¿Es consejo médico, legal o financiero?",
      a: "No. Es software educativo. Para diagnóstico, contratos, impuestos o inversiones con dinero real, consulte a un profesional acreditado.",
      plainAnswer:
        "No. Es software educativo. Para diagnóstico, contratos, impuestos o inversiones con dinero real, consulte a un profesional acreditado.",
    },
    {
      q: "¿Puedo usar el informe con mi terapeuta o abogado?",
      a: "Sí — muchos pegan el resumen de escenarios para centrar las sesiones en la bifurcación real.",
      plainAnswer:
        "Sí — muchos pegan el resumen de escenarios para centrar las sesiones en la bifurcación real.",
    },
    {
      q: "¿Quién mantiene los marcos?",
      a: "El equipo editorial de Life Decision Engine. Vea {editorialTeam}.",
      plainAnswer: "El equipo editorial de Life Decision Engine.",
    },
  ],
  footerParagraph:
    "En crisis, contacte servicios de emergencia locales — esta herramienta no monitoriza mensajes urgentes. Vea {disclaimer}.",
  lastReviewed: "25 de mayo de 2026",
};

const pricing: PublisherEducationCopy = {
  introParagraphs: [
    "Life Decision Engine se financia para que el analizador base siga siendo útil sin muro de pago al pensar. El plan gratuito incluye escenarios, cuatro lentes, línea temporal y puntuación con límites razonables. Premium es para quien analiza muchas decisiones al mes y quiere historial, recordatorios y pasadas más profundas.",
    "Transparencia sobre el dinero: suscripciones, presentaciones opcionales a expertos (los profesionales le facturan directamente) y, donde esté activo, Google AdSense. No vendemos su texto de decisión. Vea {monetize}.",
  ],
  sections: [
    {
      heading: "Qué añade Premium",
      blocks: [
        {
          kind: "ul",
          items: [
            "Análisis más frecuentes o profundos en decisiones de varios pasos.",
            "Historial guardado y recordatorios tras un periodo de reflexión.",
            "Acceso anticipado a actualizaciones de marcos.",
          ],
        },
      ],
    },
    {
      heading: "Facturación y reembolsos",
      blocks: [
        {
          kind: "p",
          text: "Pago vía Stripe. Condiciones de suscripción en {terms}. Ayuda de facturación: {contact}.",
        },
      ],
    },
    {
      heading: "Publicidad en páginas gratuitas",
      blocks: [
        {
          kind: "p",
          text: "Podemos mostrar AdSense en páginas con contenido editorial sustancial. Cumplimos políticas de Google y consentimiento en la UE. Vea {privacy} y {contentPolicy}.",
        },
      ],
    },
  ],
  faq: [
    {
      q: "¿Necesito Premium para un informe útil?",
      a: "No. El nivel gratuito produce un informe estructurado completo para una decisión de vida típica.",
      plainAnswer:
        "No. El nivel gratuito produce un informe estructurado completo para una decisión de vida típica.",
    },
    {
      q: "¿Premium elimina los anuncios?",
      a: "Premium se centra en funciones. Algunas páginas informativas pueden seguir mostrando anuncios según la configuración.",
      plainAnswer:
        "Premium se centra en funciones. Algunas páginas informativas pueden seguir mostrando anuncios según la configuración.",
    },
  ],
  lastReviewed: "25 de mayo de 2026",
};

const home: PublisherEducationCopy = {
  editorialOverviewLabel: "Resumen del editor",
  introParagraphs: [
    "Life Decision Engine publica marcos originales en este sitio y en el {blog} — carrera, reubicación, relaciones, dinero y psicología de grandes elecciones. Cada artículo lo revisa el {editorialTeam} según {editorialStandards}.",
    "El analizador interactivo abajo convierte su pregunta en escenarios, cuatro lentes, línea temporal y puntuación — también en {analyze}. Cuando conviene un profesional humano, explore {experts} o lea la {faq}. No somos red social.",
  ],
  sections: [
    {
      heading: "Políticas y contacto",
      blocks: [
        {
          kind: "ul",
          items: [
            "{privacy} — cookies, AdSense, RGPD/CCPA",
            "{terms} — suscripciones, uso aceptable",
            "{contentPolicy} — qué publicamos y moderamos",
            "{contact} — redacción, prensa, soporte",
          ],
        },
      ],
    },
  ],
  lastReviewed: "25 de mayo de 2026",
};

export const trustPagesEs = {
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
