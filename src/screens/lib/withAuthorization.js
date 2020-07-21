import React, { useEffect } from 'react';
import Router from 'next/router';
import { authorization } from 'app/screens/lib/authorization';
import { loadFirebaseAuth } from 'app/lib/db';
import { connect } from 'react-redux';

const withAuthorization = (WrappedComponent, key) => {
  const Component = props => {
    const { userData } = props;
    useEffect(() => {
      loadFirebaseAuth().onAuthStateChanged(user => {
        if (!user) {
          // console.log('Usuário não logado');
          Router.push('/login');
        } else if (process.env.NODE_ENV !== 'development') {
          const auth = authorization(key, userData.role);
          if (!auth) {
            // console.log(
            //   'Usuário não tem permissão para esta acessar esta página'
            // );
            Router.push('/');
          }
        }
      });
    }, []);

    return <WrappedComponent {...props} />;
  };

  const mapStateToProps = state => ({
    userData: state.user,
  });

  return connect(mapStateToProps, null)(Component);
};

export default withAuthorization;
