export const categories = [
  {
    id: "category1",
    name: "Ressurshåndtering",
    icon: "resources",
    description:
      "Ressurshåndtering handler om å ha oversikt og kontroll over alle IT-komponenter i virksomheten. God ressurshåndtering er grunnlaget for effektiv IT-sikkerhet, siden man ikke kan beskytte det man ikke vet at man har.",
    color: "#f5f5f5",
  },
  {
    id: "category2",
    name: "Sterke passord",
    icon: "password",
    description:
      "God passordpraksis er grunnleggende for IT-sikkerheten. Svake passord er en av de vanligste årsakene til sikkerhetsbrudd. Sterke, unike passord for hver tjeneste er avgjørende for å beskytte virksomhetens data og systemer.",
    color: "#f5f5f5",
  },
  {
    id: "category5",
    name: "Brannmur og antivirus",
    icon: "antivirus",
    description:
      "Brannmur og antivirus handler om å ha beskyttelse mot digitale trusler i virksomheten. God implementering av disse verktøyene er grunnlaget for effektiv cybersikkerhet, siden man ikke kan forsvare seg mot trusler uten riktige sikkerhetsbarrierer.",
    color: "#f5f5f5",
  },
  {
    id: "category3",
    name: "Sikkerhetskiopiering",
    icon: "backup",
    description:
      "Sikkerhetskiopiering handler om å ta regelmessige reservekopier av viktige data i virksomheten. God sikkerhetskiopiering er grunnlaget for effektiv katastrofehåndtering, siden man ikke kan gjenopprette informasjon som ikke er sikkerhetskopiert.",
    color: "#f5f5f5",
  },
  {
    id: "category8",
    name: "Tilgangskontroll",
    icon: "access",
    description:
      "Tilgangskontroll handler om å styre hvem som har tilgang til hvilke ressurser i virksomheten. God tilgangskontroll er grunnlaget for effektiv informasjonssikkerhet, siden man ikke kan beskytte data hvis uautoriserte brukere har tilgang til dem.",
    color: "#f5f5f5",
  },
  {
    id: "category4",
    name: "Tofaktorautentisering",
    icon: "2fa",
    description:
      "Tofaktorautentisering handler om å kreve to ulike bevistyper for å bekrefte en brukers identitet i virksomheten. God tofaktorautentisering er grunnlaget for effektiv tilgangssikring, siden man ikke kan stole på passord alene når uvedkommende forsøker å få uautorisert tilgang.",
    color: "#f5f5f5",
  },
  {
    id: "category6",
    name: "Programvareoppdatering",
    icon: "updates",
    description:
      "Programvareoppdatering handler om å installere nyeste versjoner og sikkerhetsoppdateringer i virksomhetens systemer. God programvare-oppdatering er grunnlaget for effektiv sårbarhets-reduksjon, siden man ikke kan beskytte seg mot angrep som utnytter kjente sikkerhetshull.",
    color: "#f5f5f5",
  },
  {
    id: "category7",
    name: "Nettverkssikkerhet",
    icon: "network",
    description:
      "Nettverkssikkerhet handler om å beskytte virksomhetens digitale infrastruktur og datatrafikk mot uautorisert tilgang. God nettverkssikkerhet er grunnlaget for effektiv perimetersikring, siden man ikke kan sikre virksomhetens data uten et beskyttet nettverk.",
    color: "#f5f5f5",
  },
  {
    id: "category9",
    name: "Fysisk sikring",
    icon: "physical",
    description:
      "Fysisk sikring handler om å beskytte virksomhetens IT-utstyr og datasentre mot uautorisert fysisk tilgang. God fysisk sikring er grunnlaget for effektiv helhetlig sikkerhet, siden man ikke kan sikre digital informasjon hvis uvedkommende har fysisk tilgang til systemene.",
    color: "#f5f5f5",
  },
  {
    id: "category10",
    name: "Opplæring",
    icon: "education",
    description:
      "Opplæring handler om å gi ansatte kunnskap og bevissthet om IT-sikkerhet i virksomheten. God sikkerhetsopplæring er grunnlaget for effektiv menneskelig sikkerhet, siden man ikke kan beskytte seg mot trusler når ansatte mangler forståelse for sikker digital atferd.",
    color: "#f5f5f5",
  },
  {
    id: "category11",
    name: "Datakryptering",
    icon: "encryption",
    description:
      "Datakryptering handler om å kode informasjon slik at den bare kan leses av autoriserte brukere i virksomheten. God datakryptering er grunnlaget for effektiv databeskyttelse, siden man ikke kan sikre sensitiv informasjon hvis den lagres eller overføres i lesbar form.",
    color: "#f5f5f5",
  },
  {
    id: "category12",
    name: "Hendelseshåndteringsplan",
    icon: "incident",
    description:
      "Hendelseshåndteringsplan handler om å ha dokumenterte prosedyrer for å håndtere sikkerhetshendelser i virksomheten. God hendelseshåndtering er grunnlaget for effektiv krisehåndtering, siden man ikke kan reagere raskt og korrekt på sikkerhetshendelser uten en tydelig plan.",
    color: "#f5f5f5",
  },
];

// Extended categoryIcons to include all icons needed for the 12 categories
export const categoryIcons = {
  resources: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
  ),
  password: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  antivirus: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.91 11.12a9 9 0 1 0-8.03 8.03"></path>
      <path d="M13.57 9.43L21 16.86"></path>
      <path d="M16 14l-3.37-3.37"></path>
      <path d="M19.5 17.5L16 14"></path>
    </svg>
  ),
  backup: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  ),
  access: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
    </svg>
  ),
  "2fa": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 11v-4a4 4 0 0 0-8 0v4"></path>
      <rect x="5" y="11" width="14" height="10" rx="2" ry="2"></rect>
      <circle cx="12" cy="16" r="1"></circle>
    </svg>
  ),
  updates: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21.5 2v6h-6"></path>
      <path d="M21.5 13a9 9 0 1 1-3-7.85"></path>
    </svg>
  ),
  network: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="6" height="6"></rect>
      <rect x="14" y="4" width="6" height="6"></rect>
      <rect x="4" y="14" width="6" height="6"></rect>
      <rect x="14" y="14" width="6" height="6"></rect>
      <line x1="10" y1="7" x2="14" y2="7"></line>
      <line x1="7" y1="10" x2="7" y2="14"></line>
      <line x1="17" y1="10" x2="17" y2="14"></line>
      <line x1="10" y1="17" x2="14" y2="17"></line>
    </svg>
  ),
  physical: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <path d="M8 12h8"></path>
      <path d="M12 8v8"></path>
    </svg>
  ),
  education: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>
  ),
  encryption: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      <path d="M12 16v.01"></path>
    </svg>
  ),
  incident: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
      <line x1="12" y1="9" x2="12" y2="13"></line>
      <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
  ),
  // Include the original icons too for backward compatibility
  home: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
  ),
  lock: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
  ),
  database: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  ),
  email: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
      <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
  ),
  devices: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
      <rect x="9" y="9" width="6" height="6"></rect>
      <line x1="9" y1="1" x2="9" y2="4"></line>
      <line x1="15" y1="1" x2="15" y2="4"></line>
      <line x1="9" y1="20" x2="9" y2="23"></line>
      <line x1="15" y1="20" x2="15" y2="23"></line>
      <line x1="20" y1="9" x2="23" y2="9"></line>
      <line x1="20" y1="14" x2="23" y2="14"></line>
      <line x1="1" y1="9" x2="4" y2="9"></line>
      <line x1="1" y1="14" x2="4" y2="14"></line>
    </svg>
  ),
};
