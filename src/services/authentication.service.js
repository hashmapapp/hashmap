import { loadFirebaseAuth } from 'app/lib/db';
import { HttpWrapperFirebase } from './http-wrapper';

const USERS_COLLECTION = 'users';

class AuthenticationServiceFirebase {
  constructor() {
    this.fb = loadFirebaseAuth();
    this.httpFirebase = new HttpWrapperFirebase();
  }

  createAccount(email, password) {
    console.log('createAccount');
    this.fb
      .createUserWithEmailAndPassword(email, password)
      .then(resolve => {
        console.log('Success');
        const { user } = resolve;
        console.log(user.uid);
        this.httpFirebase
          .setNewItem(USERS_COLLECTION, user.uid, {
            email: user.email,
          })
          .then(() => {
            console.log('Usuário Criado Com Sucesso!');
          });
      })
      .catch(error => console.log(error.code, error.message));
  }

  signIn(email, password) {
    this.fb
      .signInWithEmailAndPassword(email, password)
      .then(resolve => {
        console.log('Entrou com sucesso');
        console.log(resolve);
      })
      .catch(error => console.log(error.code, error.message));
  }

  signOut() {
    this.fb
      .signOut()
      .then(() => {
        console.log('Saiu com Sucesso');
      })
      .catch(error => console.log(error.code, error.message));
  }

  updateProfile(displayName, photoURL) {
    const user = this.fb.currentUser;
    user
      .updateProfile({
        displayName,
        photoURL,
      })
      .then(resolve => {
        console.log('Success');
        console.log(resolve);
      })
      .catch(error => console.log(error.code, error.message));
  }
}

export default AuthenticationServiceFirebase;
