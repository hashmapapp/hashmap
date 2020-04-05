import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { loadFirebaseAuth } from 'app/lib/db';
// import { Container } from 'react-bootstrap';
// import PropTypes from 'prop-types';
// import { DARK_GRAY } from 'app/styles/colors';
// import AuthenticationServiceFirebase from 'app/services/authentication.service';
// import { loadFirebaseAuth } from 'app/lib/db';
// import px2vw from 'app/styles/px2vw';

const NavBarDiv = styled.nav`
  overflow: hidden;
  background-color: white;
  -webkit-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  height: 8vh;
  /* transition: transform 300ms ease; */
  /* transform: translateY(-100%); */
  position: ${prop => (prop.fixed ? 'fixed;' : '')};
  top: ${prop => (prop.fixed ? '0' : '')};
  width: ${prop => (prop.fixed ? '100%;' : '')};
  z-index: 10;
`;

const Items = styled.div`
  li {
    margin-left: 15px;
    margin-right: 15px;
  }

  a {
    cursor: pointer;
  }
`;

const Avatar = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Profile = styled.li`
  cursor: pointer;
`;

const NavBar = () => {
  const user = loadFirebaseAuth().currentUser;
  return (
    <NavBarDiv className="navbar navbar-expand-lg">
      <Items className="container d-flex justify-content-between">
        <Link href="/">
          <strong>
            <a className="navbar-brand">{'{ Hashmap }'}</a>
          </strong>
        </Link>
        <ul className="navbar-nav">
          {/* <li className="nav-item active">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Features
            </a>
          </li> */}
          {user && (
            <Profile
              className="nav-item"
              onClick={() => {
                console.log('Sair');
              }}
            >
              {user.photoURL ? (
                <Avatar
                  className="h-8 w-8 rounded-full mx-auto"
                  src={user.photoURL}
                />
              ) : (
                <Avatar
                  className="h-8 w-8 rounded-full mx-auto"
                  src="imgs/avatar/avatar.jpg"
                />
              )}
            </Profile>
          )}
        </ul>
      </Items>
    </NavBarDiv>
  );
};

NavBar.propTypes = {
  // fixed: PropTypes.bool,
};

NavBar.defaultProps = {
  fixed: false,
};

export default NavBar;
