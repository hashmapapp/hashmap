import styled from 'styled-components';

export const Blockquote = styled.blockquote`
  border-left: 2px solid #ddd;
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  color: #aaa;
  font-style: italic;

  & [dir='rtl'] {
    border-left: none;
    padding-left: 0;
    padding-right: 10px;
    border-right: 2px solid #ddd;
  }
`;
