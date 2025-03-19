export const categories = [
  {
    id: "category1",
    name: "Sikkerhetsvurdering",
    icon: "home",
    description: "Grunnleggende sikkerhetsvurdering",
    color: "#c2f0c2", // Light green
  },
  {
    id: "category2",
    name: "Passord",
    icon: "lock",
    description: "Passordpolicies og -håndtering",
    color: "#fff0b3", // Light yellow
  },
  {
    id: "category3",
    name: "Datalagring",
    icon: "database",
    description: "Sikker datalagring og backup",
    color: "#fff0b3", // Light yellow
  },
  {
    id: "category4",
    name: "E-post sikkerhet",
    icon: "email",
    description: "Beskyttelse mot e-post angrep",
    color: "#fff0b3", // Light yellow
  },
  {
    id: "category5",
    name: "Enhetssikkerhet",
    icon: "devices",
    description: "Beskyttelse av datamaskiner og enheter",
    color: "#fff0b3", // Light yellow
  },
  {
    id: "category6",
    name: "Nettverkssikkerhet",
    icon: "network",
    description: "Sikring av nettverk og internettbruk",
    color: "#fff0b3", // Light yellow
  },
  {
    id: "category7",
    name: "Opplæring",
    icon: "education",
    description: "Sikkerhetsopplæring av ansatte",
    color: "#fff0b3", // Light yellow
  },
  {
    id: "category8",
    name: "Tilgangskontroll",
    icon: "access",
    description: "Håndtering av tilgang til systemer",
    color: "#fff0b3", // Light yellow
  },
];

export const categoryIcons = {
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
};
