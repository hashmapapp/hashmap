import React, { useEffect } from 'react';
import Router from 'next/router';
import { authorization } from 'app/screens/lib/authorization';

const withAuthorization = (WrappedComponent, key) => {
  const Component = props => {
    const currentUser = true;
    const auth = authorization(key);
    useEffect(() => {
      if (!currentUser || !auth) {
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
