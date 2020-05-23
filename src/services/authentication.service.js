import { loadFirebaseAuth, loadFirebaseStore } from 'app/lib/db';
import { USERS_COLLECTION } from 'app/screens/lib/constants';
import { HttpWrapperFirebase } from './http-wrapper';

class AuthenticationServiceFirebase {
  constructor() {
    this.fb = loadFirebaseAuth();
    this.fbStore = loadFirebaseStore();
    this.httpFirebase = new HttpWrapperFirebase();
  }

  createAccount(displayName, email, password, callbackError) {
    const username = email.split('@')[0];
    this.fb
      .createUserWithEmailAndPassword(email, password)
      .then(resolve => {
        const { user } = resolve;
        if (user) {
          this.updateFirestore(user, displayName, email, username);
          user.updateProfile({ displayName });
          user.sendEmailVerification();
        }
        return resolve;
      })
      .catch(callbackError);
  }

  updateFirestore = (user, displayName, email, username, callbackError) => {
    this.httpFirebase
      .setNewItem(USERS_COLLECTION, user.uid, {
        displayName,
        email,
        username,
        role: 'productor',
      })
      .then(() => {
        console.log('user success');
      })
      .catch(callbackError);
  };

  signIn(
    email,
    password,
    callbackError = error => console.log(error.code, error.message)
  ) {
    this.fb.signInWithEmailAndPassword(email, password).catch(callbackError);
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
