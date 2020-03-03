import styled from 'styled-components';

export const ItemLi = styled.li`
  display: inline;
  list-style-type: none;
  padding: 10px 40px;

  a {
    color: rgba(0, 0, 0, 0.84);
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
