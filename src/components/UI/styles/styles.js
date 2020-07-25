import styled from 'styled-components';

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
  outline: none !important;
  /* box-shadow: 0 0 10px #d4d4d4; */
  color: black;
  background-color: #f7fafc;
  padding: 8px;
  border-radius: 10px;

  /* &::-webkit-scrollbar {
    display: none;
  } */

  &.Title {
    font-size: 2.1rem;
  }

  &.Text {
    font-size: 1rem;
  }
`;
