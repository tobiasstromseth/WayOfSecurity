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