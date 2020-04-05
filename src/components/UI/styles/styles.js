import styled from 'styled-components';
// import { DARK_GRAY } from 'app/styles/colors';

export const Section = styled.section`
  margin: 2% ${prop => (prop.marginColum ? prop.marginColum : 25)}%;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
