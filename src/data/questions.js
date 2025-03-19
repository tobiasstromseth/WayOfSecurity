export const questions = [
  // Category 1: Sikkerhetsvurdering
  {
    id: "q1_1",
    categoryId: "category1",
    text: "Har din virksomhet gjennomført en sikkerhetsvurdering i løpet av det siste året?",
    standard: "CIS Controls V8's baseline controller 1.3",
    explanation:
      "En regelmessig sikkerhetsvurdering hjelper med å identifisere sårbarheter og sikkerhetshull.",
    recommendation:
      "Gjennomfør en årlig sikkerhetsvurdering for å identifisere potensielle sårbarheter.",
  },
  {
    id: "q1_2",
    categoryId: "category1",
    text: "Har du identifisert dine mest kritiske data og systemer?",
    standard: "NIST CSF 1.8.0",
    explanation:
      "Å vite hvilke data og systemer som er mest kritiske for virksomheten din er avgjørende for å prioritere sikkerhetstiltak.",
    recommendation:
      "Lag en liste over kritiske data og systemressurser og prioriter beskyttelsen av disse.",
  },
  {
    id: "q1_3",
    categoryId: "category1",
    text: "Har din virksomhet en beredskapsplan for cybersikkerhetshendelser?",
    standard: "NSM kontroller 2.6.3",
    explanation:
      "En beredskapsplan er avgjørende for å kunne reagere raskt og effektivt på sikkerhetshendelser.",
    recommendation:
      "Utvikle en enkel beredskapsplan som beskriver hva som skal gjøres ved et sikkerhetsbrudd.",
  },

  // Category 2: Passord
  {
    id: "q2_1",
    categoryId: "category2",
    text: "Bruker din virksomhet sterke passord (minst 12 tegn med en blanding av store/små bokstaver, tall og symboler)?",
    standard: "CIS Controls V8 4.1",
    explanation:
      "Sterke passord er vanskeligere å gjette og knekke for angripere.",
    recommendation:
      "Implementer en passordpolicy som krever sterke passord på minst 12 tegn med variasjon.",
  },
  {
    id: "q2_2",
    categoryId: "category2",
    text: "Har du aktivert tofaktorautentisering (2FA) for viktige kontoer?",
    standard: "NIST SP 800-63B",
    explanation:
      "Tofaktorautentisering gir et ekstra lag med sikkerhet ved å kreve noe du vet (passord) og noe du har (f.eks. telefon).",
    recommendation:
      "Aktiver 2FA på alle viktige kontoer som e-post, nettbank og skytjenester.",
  },

  // Category 3: Datalagring
  {
    id: "q3_1",
    categoryId: "category3",
    text: "Har din virksomhet regelmessige backup-rutiner for viktige data?",
    standard: "CIS Controls V8 11.2",
    explanation:
      "Regelmessige backups sikrer at du kan gjenopprette data etter tap eller skade.",
    recommendation:
      "Implementer en 3-2-1 backup-strategi: 3 kopier, 2 ulike medier, 1 offsite.",
  },
  {
    id: "q3_2",
    categoryId: "category3",
    text: "Er sensitive data kryptert når de lagres?",
    standard: "CIS Controls V8 3.11",
    explanation:
      "Kryptering beskytter data slik at de ikke kan leses selv om noen får uautorisert tilgang.",
    recommendation:
      "Krypter sensitive data på alle enheter, spesielt på bærbare enheter.",
  },
  {
    id: "q3_3",
    categoryId: "category3",
    text: "Tester du regelmessig at dine backups kan gjenopprettes?",
    standard: "CIS Controls V8 11.3",
    explanation:
      "Det er viktig å verifisere at backups faktisk fungerer når du trenger dem.",
    recommendation:
      "Gjennomfør kvartalsvis testing av backup-gjenoppretting for å sikre at de fungerer.",
  },
  {
    id: "q3_4",
    categoryId: "category3",
    text: "Har du en policy for sikker sletting av data når du kasserer gamle enheter?",
    standard: "NIST SP 800-88",
    explanation:
      "Riktig sletting av data hindrer at sensitive opplysninger kommer på avveie når utstyr skiftes ut.",
    recommendation:
      "Implementer en prosedyre for sikker sletting eller fysisk destruksjon av lagringsmedier.",
  },

  // Category 4: E-post sikkerhet
  {
    id: "q4_1",
    categoryId: "category4",
    text: "Bruker din virksomhet spam-filter og antivirus-løsninger for e-post?",
    standard: "CIS Controls V8 7.3",
    explanation:
      "Spam-filter og antivirus reduserer mengden ondsinnet e-post som når brukerne.",
    recommendation:
      "Implementer spam-filter og antivirus-beskyttelse på e-postserveren eller -tjenesten.",
  },
  {
    id: "q4_2",
    categoryId: "category4",
    text: "Har ansatte fått opplæring i å identifisere phishing-angrep?",
    standard: "CIS Controls V8 14.2",
    explanation:
      "Opplæring hjelper ansatte å gjenkjenne og unngå phishing-forsøk.",
    recommendation:
      "Gjennomfør regelmessig opplæring og simulerte phishing-tester for ansatte.",
  },
  {
    id: "q4_3",
    categoryId: "category4",
    text: "Er e-postkontoer beskyttet med sterke passord og tofaktorautentisering?",
    standard: "CIS Controls V8 6.5",
    explanation:
      "E-post er ofte et primærmål for angripere og trenger ekstra beskyttelse.",
    recommendation: "Krev sterke passord og aktiver 2FA på alle e-postkontoer.",
  },

  // Fortsett med å legge til flere spørsmål for resten av kategoriene
  // Category 5: Enhetssikkerhet
  {
    id: "q5_1",
    categoryId: "category5",
    text: "Er alle enheter (datamaskiner, telefoner, nettbrett) beskyttet med oppdatert antivirus/antimalware?",
    standard: "CIS Controls V8 10.1",
    explanation: "Oppdatert antimalware beskytter mot mange typer angrep.",
    recommendation:
      "Installer og konfigurer automatisk oppdatering av antimalware på alle enheter.",
  },
  {
    id: "q5_2",
    categoryId: "category5",
    text: "Oppdateres operativsystemet og programvare regelmessig på alle enheter?",
    standard: "CIS Controls V8 2.2",
    explanation:
      "Sikkerhetsoppdateringer retter kjente sårbarheter som angripere kan utnytte.",
    recommendation:
      "Aktiver automatiske oppdateringer og etabler en rutine for månedlig kontroll.",
  },

  // Category 6: Nettverkssikkerhet
  {
    id: "q6_1",
    categoryId: "category6",
    text: "Bruker din virksomhet en brannmur for å beskytte nettverket?",
    standard: "CIS Controls V8 9.1",
    explanation:
      "En brannmur er den første forsvarslinjen mot uautorisert nettverkstrafikk.",
    recommendation:
      "Installer og konfigurer en brannmur mellom internett og ditt interne nettverk.",
  },
  {
    id: "q6_2",
    categoryId: "category6",
    text: "Er ditt WiFi-nettverk sikret med WPA3 (eller minst WPA2) og et sterkt passord?",
    standard: "CIS Controls V8 15.7",
    explanation:
      "Sikker WiFi hindrer uvedkommende i å koble seg til nettverket ditt.",
    recommendation:
      "Oppgrader til WPA3 hvis mulig, ellers bruk WPA2 med et sterkt, unikt passord.",
  },

  // Category 7: Opplæring
  {
    id: "q7_1",
    categoryId: "category7",
    text: "Har ansatte fått grunnleggende opplæring i cybersikkerhet?",
    standard: "CIS Controls V8 14.1",
    explanation: "Opplærte ansatte er mer oppmerksomme på sikkerhetstrusler.",
    recommendation: "Gjennomfør årlig sikkerhetsopplæring for alle ansatte.",
  },
  {
    id: "q7_2",
    categoryId: "category7",
    text: "Finnes det klare retningslinjer for sikker bruk av IT-systemer som ansatte kjenner til?",
    standard: "CIS Controls V8 14.6",
    explanation:
      "Tydelige retningslinjer hjelper ansatte å ta sikre valg i hverdagen.",
    recommendation:
      "Utvikle et enkelt sett med retningslinjer og gjør dem lett tilgjengelige.",
  },
  {
    id: "q7_3",
    categoryId: "category7",
    text: "Vet ansatte hvem de skal kontakte hvis de oppdager en sikkerhetshendelse?",
    standard: "CIS Controls V8 17.2",
    explanation: "Rask rapportering av hendelser kan begrense skadene.",
    recommendation:
      "Etabler klare rapporteringsrutiner og informer alle ansatte.",
  },

  // Category 8: Tilgangskontroll
  {
    id: "q8_1",
    categoryId: "category8",
    text: "Har din virksomhet rutiner for å fjerne tilgang når ansatte slutter?",
    standard: "CIS Controls V8 5.3",
    explanation:
      "Tidligere ansatte som beholder tilgang utgjør en sikkerhetsrisiko.",
    recommendation:
      "Opprett en sjekkliste for å deaktivere alle kontoer når ansatte slutter.",
  },
  {
    id: "q8_2",
    categoryId: "category8",
    text: "Er prinsippet om minste nødvendige tilgang implementert?",
    standard: "CIS Controls V8 6.8",
    explanation:
      "Dette prinsippet begrenser tilgang til kun det brukere trenger for å utføre jobben sin.",
    recommendation:
      "Gjennomgå og juster tilgangsrettigheter basert på jobbroller og behov.",
  },
  {
    id: "q8_3",
    categoryId: "category8",
    text: "Brukes unike brukerkontoer for hver ansatt (i stedet for delte kontoer)?",
    standard: "CIS Controls V8 5.1",
    explanation: "Unike kontoer gjør det mulig å spore aktivitet og ta ansvar.",
    recommendation:
      "Sørg for at hver ansatt har en egen brukerkonto på alle systemer.",
  },
];

export const recommendations = {
  category1: {
    title: "Sikkerhetsvurdering",
    actions: [
      "Gjennomfør en årlig sikkerhetsvurdering",
      "Identifiser og dokumenter kritiske data og systemer",
      "Utvikle en enkel beredskapsplan for sikkerhetshendelser",
    ],
  },
  category2: {
    title: "Passord",
    actions: [
      "Implementer en passordpolicy med krav om sterke passord",
      "Aktiver tofaktorautentisering på alle viktige kontoer",
      "Vurder bruk av passordbehandler for å håndtere unike passord",
    ],
  },
  category3: {
    title: "Datalagring",
    actions: [
      "Etabler regelmessige backup-rutiner (3-2-1 prinsippet)",
      "Krypter sensitive data på alle enheter",
      "Test regelmessig at backups kan gjenopprettes",
    ],
  },
  category4: {
    title: "E-post sikkerhet",
    actions: [
      "Implementer spam-filter og antivirus-beskyttelse",
      "Gjennomfør opplæring i å gjenkjenne phishing-angrep",
      "Beskytt e-postkontoer med 2FA",
    ],
  },
  category5: {
    title: "Enhetssikkerhet",
    actions: [
      "Installer og oppdater antimalware på alle enheter",
      "Aktiver automatiske oppdateringer for OS og programvare",
      "Krypter harddisker på bærbare enheter",
    ],
  },
  category6: {
    title: "Nettverkssikkerhet",
    actions: [
      "Installer og konfigurer en brannmur",
      "Sikre WiFi-nettverk med WPA3/WPA2 og sterkt passord",
      "Vurder bruk av VPN for ekstern tilkobling",
    ],
  },
  category7: {
    title: "Opplæring",
    actions: [
      "Gjennomfør årlig sikkerhetsopplæring for alle ansatte",
      "Utvikle tydelige retningslinjer for sikker IT-bruk",
      "Etabler rutiner for rapportering av sikkerhetshendelser",
    ],
  },
  category8: {
    title: "Tilgangskontroll",
    actions: [
      "Opprett en offboarding-prosess for å fjerne tilgang",
      "Implementer prinsippet om minste nødvendige tilgang",
      "Bruk unike brukerkontoer for hver ansatt",
    ],
  },
};
