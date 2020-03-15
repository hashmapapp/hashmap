import styled from 'styled-components';
import { DARK_GRAY } from 'app/styles/colors';

export const ItemLi = styled.li`
  display: inline;
  list-style-type: none;
  padding: 10px 40px;

  a {
    color: ${DARK_GRAY};
    display: block;
    padding: 10px 30px;
    float: right;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }

  a:hover {
    color: #4caf50;
  }

  a.active {
    color: #4caf50;
  }
`;

export const Section = styled.section`
  margin: 2% ${prop => (prop.marginColum ? prop.marginColum : 25)}%;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
