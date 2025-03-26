import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AssessmentContext } from '../../context/AssessmentContext';
import { categories, categoryIcons } from '../../data/categories';
import CategoryDetail from '../common/Category/CategoryDetail';



// Updated category descriptions to match the image
const categoryDescriptions = {
  category1: "Ressurshåndtering handler om å ha oversikt og kontroll over alle IT-komponenter i virksomheten. God ressurshåndtering er grunnlaget for effektiv IT-sikkerhet, siden man ikke kan beskytte det man ikke vet at man har.",
  category2: "God passordpraksis er grunnleggende for IT-sikkerheten. Svake passord er en av de vanligste årsakene til sikkerhetsbrudd. Sterke, unike passord for hver tjeneste er avgjørende for å beskytte virksomhetens data og systemer.",
  category5: "Brannmur og antivirus handler om å ha beskyttelse mot digitale trusler i virksomheten. God implementering av disse verktøyene er grunnlaget for effektiv cybersikkerhet, siden man ikke kan forsvare seg mot trusler uten riktige sikkerhetsbarrierer.",
  category3: "Sikkerhetskiopiering handler om å ta regelmessige reservekopier av viktige data i virksomheten. God sikkerhetskiopiering er grunnlaget for effektiv katastrofehåndtering, siden man ikke kan gjenopprette informasjon som ikke er sikkerhetskopiert.",
  category8: "Tilgangskontroll handler om å styre hvem som har tilgang til hvilke ressurser i virksomheten. God tilgangskontroll er grunnlaget for effektiv informasjonssikkerhet, siden man ikke kan beskytte data hvis uautoriserte brukere har tilgang til dem.",
  "2fa": "Tofaktorautentisering handler om å kreve to ulike bevistyper for å bekrefte en brukers identitet i virksomheten. God tofaktorautentisering er grunnlaget for effektiv tilgangssikring, siden man ikke kan stole på passord alene når uvedkommende forsøker å få uautorisert tilgang.",
  "software-updates": "Programvareoppdatering handler om å installere nyeste versjoner og sikkerhetsoppdateringer i virksomhetens systemer. God programvare-oppdatering er grunnlaget for effektiv sårbarhets-reduksjon, siden man ikke kan beskytte seg mot angrep som utnytter kjente sikkerhetshull.",
  category6: "Nettverkssikkerhet handler om å beskytte virksomhetens digitale infrastruktur og datatrafikk mot uautorisert tilgang. God nettverkssikkerhet er grunnlaget for effektiv perimetersikring, siden man ikke kan sikre virksomhetens data uten et beskyttet nettverk.",
  "physical": "Fysisk sikring handler om å beskytte virksomhetens IT-utstyr og datasentre mot uautorisert fysisk tilgang. God fysisk sikring er grunnlaget for effektiv helhetlig sikkerhet, siden man ikke kan sikre digital informasjon hvis uvedkommende har fysisk tilgang til systemene.",
  category7: "Opplæring handler om å gi ansatte kunnskap og bevissthet om IT-sikkerhet i virksomheten. God sikkerhetsopplæring er grunnlaget for effektiv menneskelig sikkerhet, siden man ikke kan beskytte seg mot trusler når ansatte mangler forståelse for sikker digital atferd.",
  "encryption": "Datakryptering handler om å kode informasjon slik at den bare kan leses av autoriserte brukere i virksomheten. God datakryptering er grunnlaget for effektiv databeskyttelse, siden man ikke kan sikre sensitiv informasjon hvis den lagres eller overføres i lesbar form.",
  category1_3: "Hendelseshåndteringsplan handler om å ha dokumenterte prosedyrer for å håndtere sikkerhetshendelser i virksomheten. God hendelseshåndtering er grunnlaget for effektiv krisehåndtering, siden man ikke kan reagere raskt og korrekt på sikkerhetshendelser uten en tydelig plan."
};

// Map our existing categories to the illustrated icons in the image
const categoryImageMap = {
  category1: "resources", // Ressurshåndtering
  category2: "password", // Passord
  category3: "backup", // Datalagring/Sikkerhetskiopiering
  category4: "email", // E-post sikkerhet
  category5: "antivirus", // Enhetssikkerhet/Brannmur og antivirus
  category6: "network", // Nettverkssikkerhet
  category7: "education", // Opplæring
  category8: "access" // Tilgangskontroll
};

// For a real implementation, you would create or import actual images
const getIllustrationImage = (categoryId) => {
  return categoryIcons[categoryId] || null;
};

const AssessmentPage = () => {
  const { 
    securityScore, 
    completedCategories, 
    isAssessmentComplete
  } = useContext(AssessmentContext);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  
  const handleCloseDetail = () => {
    setSelectedCategory(null);
  };
  
  const handleNext = () => {
    navigate('/results');
  };
  
  // For simplicity, we're using our existing categories data
  return (
    <PageContainer>
      <Header>
        <TitleContainer>
          <Title>12 VEIER TIL SIKKERHET</Title>
          <HeaderDescription>
            Dette verktøyet kombinerer ledende cybersikkerhets-standarder fra CIS, NSM og NIST i en brukervennlig løsning for små bedrifter uten IT-ekspertise. Det forener teori med praktiske tiltak for rask risikoidentifisering og konkrete forbedringer.
          </HeaderDescription>
        </TitleContainer>
        <VikingsContainer>
          {/* This would be replaced with an actual image of the vikings from your design */}
          <div style={{ fontSize: '40px' }}>👨‍🦰👨‍🦱👨‍🦳</div>
        </VikingsContainer>
      </Header>
      
      <CategoriesGrid>
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <CategoryCard onClick={() => handleCategoryClick(category.id)}>
              <IconContainer>
                {categoryIcons[category.icon]}
              </IconContainer>
              <CategoryTitle>{category.name}</CategoryTitle>
              <CategoryDescription>
                {categoryDescriptions[category.id] || category.description}
              </CategoryDescription>
            </CategoryCard>
            {index < categories.length - 1 && <WavyDivider />}
          </motion.div>
        ))}
      </CategoriesGrid>
      
      <ButtonContainer>
        <ActionButton 
          primary
          onClick={handleNext}
          disabled={!isAssessmentComplete()}
        >
          {isAssessmentComplete() 
            ? "Se anbefalte tiltak" 
            : `Fullfør alle ${categories.length} kategorier for å fortsette`}
        </ActionButton>
      </ButtonContainer>
      
      {/* Render CategoryDetail if there is a selectedCategory */}
      {selectedCategory && (
        <CategoryDetail 
          categoryId={selectedCategory}
          onClose={handleCloseDetail}
          standalone={true}
        />
      )}
    </PageContainer>
  );
};

export default AssessmentPage;