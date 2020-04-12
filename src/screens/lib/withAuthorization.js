import React, { useEffect } from 'react';
import Router from 'next/router';
import { authorization } from 'app/screens/lib/authorization';
import { loadFirebaseAuth } from 'app/lib/db';

const withAuthorization = (WrappedComponent, key) => {
  const Component = props => {
    useEffect(() => {
      const user = loadFirebaseAuth().currentUser;
      const auth = authorization(key);
      if (!user || !auth) {
        console.log(
          'Usuário não logado ou não tem permissão para esta acessar esta página'
        );
        Router.push('/');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
  return Component;
};

export default withAuthorization;
