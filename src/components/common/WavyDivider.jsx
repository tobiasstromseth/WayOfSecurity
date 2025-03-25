import React from 'react';
import styled from 'styled-components';

const Divider = styled.div`
  height: 20px;
  width: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='100%25' height='20px' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,10 C30,20 70,0 100,10 L100,00 L0,0 Z' fill='%23f5f5f5'/%3E%3C/svg%3E");
  background-repeat: repeat-x;
  margin: 1rem 0;
`;

const WavyDivider = () => {
  return <Divider />;
};

export default WavyDivider;