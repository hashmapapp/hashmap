import { loadFirebaseAuth, loadFirebaseStore } from 'app/lib/db';
import { HttpWrapperFirebase } from './http-wrapper';

const USERS_COLLECTION = 'users';

class AuthenticationServiceFirebase {
  constructor() {
    this.fb = loadFirebaseAuth();
    this.fbStore = loadFirebaseStore();
    this.httpFirebase = new HttpWrapperFirebase();
  }

  createAccount(
    displayName,
    email,
    password,
    callbackSuccess = () => {},
    callbackError = error => console.log(error.code, error.message),
    role = 'default'
  ) {
    const username = email.split('@')[0];
    this.fb
      .createUserWithEmailAndPassword(email, password)
      .then(resolve => {
        const { user } = resolve;
        user
          .updateProfile({ displayName })
          .then(() => {
            this.httpFirebase
              .setNewItem(USERS_COLLECTION, user.uid, {
                role,
                displayName,
                email,
                username,
              })
              .then(() => {
                localStorage.setItem('@hashmap/role', role);
                callbackSuccess();
              })
              .catch(callbackError);
          })
          .catch(callbackError);
      })
      .catch(callbackError);
  }

  signIn(
    email,
    password,
    callbackSuccess = () => {},
    callbackError = error => console.log(error.code, error.message)
  ) {
    this.fb
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        const { user } = response;
        const userRef = this.fbStore()
          .collection(USERS_COLLECTION)
          .doc(user.uid);
        userRef
          .get()
          .then(doc => {
            if (!doc.exists) {
              console.error('User not found');
              localStorage.setItem('@hashmap/role', undefined);
            } else {
              localStorage.setItem('@hashmap/role', doc.data().role);
              callbackSuccess();
            }
          })
          .catch(callbackError);
      })
      .catch(callbackError);
  }

  signOut(callback) {
    this.fb
      .signOut()
      .then(() => {
        console.log('Saiu com Sucesso');
        localStorage.setItem('@hashmap/role', undefined);
        callback();
      })
      .catch(error => console.log(error.code, error.message));
  }

  updateProfile(displayName, photoURL, callback) {
    const user = this.fb.currentUser;
    user
      .updateProfile({
        displayName,
        photoURL,
      })
      .then(() => {
        console.log('Profile Update');
        callback();
      })
      .catch(error => console.log(error.code, error.message));
  }
}

export default AuthenticationServiceFirebase;
