import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AssessmentContext } from '../../context/AssessmentContext';
import { categories, categoryIcons } from '../../data/categories';
import CategoryDetail from '../common/Category/CategoryDetail';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  background-color: #28604B;
  padding: 2rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const TitleContainer = styled.div`
  flex: 3;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  margin: 0;
  line-height: 1.1;
  font-weight: bold;
`;

const HeaderDescription = styled.p`
  margin-top: 1rem;
  line-height: 1.5;
  max-width: 600px;
`;

const VikingsContainer = styled.div`
  flex: 1;
  text-align: right;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 0 2rem 2rem 2rem;
`;

const CategoryCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const IconContainer = styled.div`
  width: 100px;
  height: 100px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryTitle = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  margin-bottom: 1rem;
  color: #333;
`;

const CategoryDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
`;

const WavyDivider = styled.div`
  height: 20px;
  background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='20px' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,10 C30,20 70,0 100,10 L100,00 L0,0 Z' fill='%23f5f5f5'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  margin: 1rem 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

const ActionButton = styled.button`
  background-color: ${props => props.primary ? props.theme.brand.main : '#f0f0f0'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 500;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  &:hover {
    background-color: ${props => props.primary ? props.theme.brand.dark : '#e0e0e0'};
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  }
  
  &:disabled {
    background-color: #cccccc;
    color: #666666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

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