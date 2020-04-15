import styled from 'styled-components';
// import { DARK_GRAY } from 'app/styles/colors';

export const Section = styled.section`
  margin: 2% ${prop => (prop.marginColum ? prop.marginColum : 25)}%;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export const TextArea = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  resize: none;
  color: black;

  &::-webkit-scrollbar {
    display: none;
  }

  &.Title {
    font-size: 2.5rem;
  }

  &.Text {
    font-size: 1rem;
  }
`;
