import React from 'react';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

const NavBarDiv = styled.div`
  overflow: hidden;
  background-color: white;
  -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  /* transition: transform 300ms ease; */
  /* transform: translateY(-100%); */

  position: ${prop => (prop.fixed ? 'fixed;' : '')};
  top: ${prop => (prop.fixed ? '0' : '')};
  width: ${prop => (prop.fixed ? '100%;' : '')};
`;

const Space = styled.div`
  height: 10vh;
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

const NavBar = props => {
  const { fixed, children } = props;
  return (
    <>
      <NavBarDiv fixed={fixed}>
        <Container>
          <LogoDiv>
            <a href="/"> {'{ hashmap }'}</a>
          </LogoDiv>
          <ul>{children}</ul>
        </Container>
      </NavBarDiv>
      <Space />
    </>
  );
};

NavBar.propTypes = {
  fixed: PropTypes.bool,
  children: PropTypes.element.isRequired,
};

NavBar.defaultProps = {
  fixed: false,
};

export default NavBar;
