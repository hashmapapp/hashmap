import axios from 'axios';
import { loadFirebaseAuth } from 'app/lib/db';
import { USERS_COLLECTION } from 'app/screens/lib/constants';
import { HttpWrapperFirebase } from './http-wrapper';

class AuthenticationServiceFirebase {
  constructor() {
    this.fb = loadFirebaseAuth();
    this.httpFirebase = new HttpWrapperFirebase();
  }

  createAccount(displayName, email, password, callbackSuccess, callbackError) {
    axios
      .post(
        'https://us-central1-hashmap-prod.cloudfunctions.net/createUserByRequest',
        { displayName, email, password }
      )
      .then(res => {
        if (res.status === 201) {
          this.signIn(
            email,
            password,
            () => {
              this.sendEmailVerification(callbackSuccess, callbackError);
            },
            callbackError
          );
        } else {
          callbackError(new Error('Failed in create new user'));
        }
      })
      .catch(callbackError);
  }

  signIn(
    email,
    password,
    callbackSuccess,
    callbackError = error => console.error(error.code, error.message)
  ) {
    this.fb
      .signInWithEmailAndPassword(email, password)
      .then(callbackSuccess)
      .catch(callbackError);
  }

  signOut(callback) {
    this.fb
      .signOut()
      .then(() => {
        callback();
      })
      .catch(error => console.error(error.code, error.message));
  }

  updateProfile(
    userFirestore,
    callbackSuccess = () => {
      // console.log('Profile Update');
    },
    callbackError = error => console.error(error.code, error.message)
  ) {
    const user = this.fb.currentUser;
    const profileData = {};
    if (userFirestore.displayName) {
      profileData.displayName = userFirestore.displayName;
    }
    if (userFirestore.photoURL && userFirestore.photoURL.url) {
      profileData.photoURL = userFirestore.photoURL.url;
    } else {
      profileData.photoURL = '';
      userFirestore.photoURL = {};
    }
    user
      .updateProfile(profileData)
      .then(() => {
        this.httpFirebase
          .updateItem(USERS_COLLECTION, user.uid, userFirestore)
          .then(callbackSuccess)
          .catch(callbackError);
      })
      .catch(callbackError);
  }

  sendEmailVerification(
    callbackSuccess = () => {
      // console.log('Success');
    },
    callbackError = error => console.error(error.code, error.message)
  ) {
    const user = this.fb.currentUser;
    user
      .sendEmailVerification()
      .then(callbackSuccess)
      .catch(callbackError);
  }

  sendPasswordResetEmail(
    email,
    callbackSuccess = () => {
      // console.log('Send Reset Success');
    },
    callbackError = error => console.error(error.code, error.message)
  ) {
    this.fb
      .sendPasswordResetEmail(email)
      .then(callbackSuccess)
      .catch(callbackError);
  }
}

export default AuthenticationServiceFirebase;
