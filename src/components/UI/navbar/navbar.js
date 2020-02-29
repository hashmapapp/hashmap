import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';

const NavBarDiv = styled.div`
  overflow: hidden;
  background-color: white;
  -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  /* transition: transform 300ms ease; */
  /* transform: translateY(-100%); */
`;

const ItemLi = styled.li`
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

const LogoDiv = styled.div`
  a {
    font-weight: bold;
    padding: 10px 30px;
    float: left;
    color: black;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
  }
`;

const NavBar = () => (
  <NavBarDiv>
    <Container>
      <LogoDiv>
        <a href="/">HashMap</a>
      </LogoDiv>
      <ul>
        <ItemLi>
          <a href="/">Item 1</a>
        </ItemLi>
        <ItemLi>
          <a href="/">Item 2</a>
        </ItemLi>
        <ItemLi>
          <a href="/">Item 3</a>
        </ItemLi>
      </ul>
    </Container>
  </NavBarDiv>
);

export default NavBar;
