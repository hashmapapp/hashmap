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
          console.log(res.data);
          this.signIn(email, password, callbackSuccess, callbackError);
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
    callbackError = error => console.log(error.code, error.message)
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
      .catch(error => console.log(error.code, error.message));
  }

  updateProfile(
    displayName,
    photoURL,
    bio,
    facebook,
    instagram,
    twitter,
    linkedin,
    callbackSuccess = () => {
      console.log('Profile Update');
    },
    callbackError = error => console.log(error.code, error.message)
  ) {
    const user = this.fb.currentUser;
    const profileData = {};
    const profileCloud = {};
    if (displayName) {
      profileData.displayName = displayName;
      profileCloud.displayName = displayName;
    }
    if (photoURL && photoURL.path && photoURL.url) {
      profileData.photoURL = photoURL.url;
      profileCloud.photoURL = { path: photoURL.path, url: photoURL.url };
    } else {
      profileData.photoURL = '';
      profileCloud.photoURL = {};
    }
    if (bio) profileCloud.bio = bio;
    if (facebook) profileCloud.facebook = facebook;
    if (instagram) profileCloud.instagram = instagram;
    if (twitter) profileCloud.twitter = twitter;
    if (linkedin) profileCloud.linkedin = linkedin;
    user
      .updateProfile(profileData)
      .then(() => {
        this.httpFirebase
          .updateItem(USERS_COLLECTION, user.uid, profileCloud)
          .then(callbackSuccess)
          .catch(callbackError);
      })
      .catch(callbackError);
  }

  sendEmailVerification(
    callbackSuccess = () => {
      console.log('Success');
    },
    callbackError = error => console.log(error.code, error.message)
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
      console.log('Send Reset Success');
    },
    callbackError = error => console.log(error.code, error.message)
  ) {
    this.fb
      .sendPasswordResetEmail(email)
      .then(callbackSuccess)
      .catch(callbackError);
  }
}

export default AuthenticationServiceFirebase;
