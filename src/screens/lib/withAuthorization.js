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
        const auth = authorization(key, userData.role);
        if (!user || !auth) {
          console.log(
            'Usuário não logado ou não tem permissão para esta acessar esta página'
          );
          Router.push('/login');
        }
      });
      window.onbeforeunload = e => {
        e = e || window.event;
        if (e) e.returnValue = 'Sure?';
        return 'Sure?';
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  const mapStateToProps = state => ({
    userData: state.user,
  });

  return connect(mapStateToProps, null)(Component);
};

export default withAuthorization;
