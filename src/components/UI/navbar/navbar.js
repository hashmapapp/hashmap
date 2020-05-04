import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Link from 'next/link';
import Router from 'next/router';
import { loadFirebaseAuth } from 'app/lib/db';
import { MdClose } from 'react-icons/md';
import AuthenticationServiceFirebase from 'app/services/authentication.service';
import { TiThMenu } from 'react-icons/ti';
import * as ACTIONS_AUTH from 'app/screens/lib/constants';
import { authorization } from 'app/screens/lib/authorization';
import { hashmapReset } from 'app/redux/actions/hashmapActions';
import { HashmapService } from 'app/services/hashmap.service';
import { UserService } from 'app/services/user.service';
import AccountDropdown from './account-dropdown';

const Avatar = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const DivButton = styled.div`
  cursor: pointer;
`;

const NavBar = ({
  typeNav,
  hashmapKey,
  handlerReset,
  hashmapRedux,
  authorKey,
}) => {
  const [showNav, setShowNav] = useState(false);
  const [userData, setUserData] = useState();
  const [currentUser, setCurrentUser] = useState();

  const signOut = () => {
    const auth = new AuthenticationServiceFirebase();
    auth.signOut(() => Router.push('/login'));
  };

  const callback = () => {
    Router.push('/[profile]', `/${userData.username}`);
  };

  const handlerSave = evt => {
    evt.preventDefault();
    // console.log(hashmapRedux);
    HashmapService.saveHashmap(hashmapRedux, callback, currentUser.uid);
  };

  const handlerDelete = evt => {
    evt.preventDefault();
    HashmapService.deleteHashmap(hashmapKey, callback);
  };

  useEffect(() => {
    async function getUserByUid(uid) {
      const userService = new UserService();
      try {
        const data = await userService.getUserById(uid);
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadFirebaseAuth().onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        if (typeNav === 'edit' || typeNav === 'create') {
          getUserByUid(user.uid);
        }
      }
    });
  }, []);

  return (
    <header className="shadow-lg bg-gray-100">
      <div className="container mx-auto sm:px-24 sm:flex sm:justify-between sm:items:center sm:px-4 sm:py-3">
        <div className="flex items-center justify-between px-4 py-3 sm:p-0">
          <div>
            <Link href="/">
              <a>
                {typeNav === 'home' || typeNav === 'profile' ? (
                  <img
                    src="/imgs/logo/hashmapname-t.png"
                    className="h-8"
                    alt="logo"
                  />
                ) : (
                  <img src="/imgs/logo/H.png" className="h-8" alt="logo" />
                )}
              </a>
            </Link>
          </div>
          {currentUser ? (
            <div className="sm:hidden">
              <button
                type="button"
                className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
                onClick={() => {
                  setShowNav(!showNav);
                }}
              >
                {currentUser.photoURL ? (
                  <Avatar
                    className="h-8 w-8 rounded-full mx-auto"
                    src={currentUser.photoURL}
                  />
                ) : (
                  <Avatar
                    className="h-8 w-8 rounded-full mx-auto"
                    src="imgs/avatar/avatar.jpg"
                  />
                )}
              </button>
            </div>
          ) : (
            <div className="sm:hidden">
              <button
                type="button"
                className="block text-gray-500 hover:text-white focus:text-white focus:outline-none"
                onClick={() => {
                  setShowNav(!showNav);
                }}
              >
                {showNav && (
                  <div style={{ color: 'black' }}>
                    <MdClose />
                  </div>
                )}
                {!showNav && (
                  <div style={{ color: 'black' }}>
                    <TiThMenu />
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
        <nav
          className={`px-2 pt-2 pb-4 sm:flex sm:p-0 ${
            showNav ? 'block' : 'hidden'
          }`}
        >
          {currentUser &&
            authorization(ACTIONS_AUTH.CREATE_HASHMAP_BUTTON) &&
            (typeNav === 'home' || typeNav === 'profile') && (
              <button
                onClick={() => {
                  handlerReset();
                  Router.push('/edit');
                }}
                type="button"
                className="uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-400 sm:mt-0 sm:ml-2"
              >
                Criar
              </button>
            )}
          {currentUser &&
            typeNav === 'view' &&
            authorization(ACTIONS_AUTH.EDIT_HASHMAP_BUTTON) &&
            authorKey &&
            authorKey === currentUser.uid && (
              <Link href={`/edit?key=${hashmapKey}`}>
                <a className="uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-400 sm:mt-0 sm:ml-2">
                  Editar
                </a>
              </Link>
            )}
          {currentUser && (typeNav === 'edit' || typeNav === 'create') && (
            <button
              onClick={handlerSave}
              type="button"
              className="uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-green-200 sm:mt-0 sm:ml-2"
            >
              Salvar
            </button>
          )}
          {currentUser && typeNav === 'edit' && (
            <button
              type="button"
              onClick={handlerDelete}
              className="uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-red-200 sm:mt-0 sm:ml-2"
            >
              Deletar
            </button>
          )}
          {currentUser && (
            <Link href="/settings">
              <a className="md:hidden uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-400 sm:mt-0 sm:ml-2">
                Meu Perfil
              </a>
            </Link>
          )}
          {currentUser && (
            <DivButton
              onClick={signOut}
              className="md:hidden uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-400 sm:mt-0 sm:ml-2"
            >
              Sair
            </DivButton>
          )}
          {!currentUser && typeNav !== 'signup' && (
            <Link href="/login">
              <a className="uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-100 sm:mt-0 sm:ml-2">
                Entrar
              </a>
            </Link>
          )}
          {!currentUser && typeNav === 'signup' && (
            <Link href="/sign-up">
              <a className="uppercase mt-1 block px-2 py-1 font-semibold rounded hover:bg-gray-100 sm:mt-0 sm:ml-2">
                Criar Conta
              </a>
            </Link>
          )}
          {currentUser && (
            <AccountDropdown user={currentUser} signOut={signOut} />
          )}
        </nav>
      </div>
    </header>
  );
};

NavBar.propTypes = {
  typeNav: PropTypes.string,
  hashmapKey: PropTypes.string,
  hashmapRedux: PropTypes.shape().isRequired,
  handlerReset: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  typeNav: 'home',
  hashmapKey: undefined,
};

const mapStateToProps = state => ({
  hashmapRedux: state.hashmap,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handlerReset: hashmapReset }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
