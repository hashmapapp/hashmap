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
        }
        return resolve;
      })
      .catch(callbackError);
  }

  updateFirestore = (user, displayName, email, username, callbackError) => {
    const role = 'productor';
    this.httpFirebase
      .setNewItem(USERS_COLLECTION, user.uid, {
        displayName,
        email,
        username,
        role: 'productor',
      })
      .then(() => {
        console.log('user success');
        localStorage.setItem('@hashmap/role', role);
      })
      .catch(callbackError);
  };

  signIn(
    email,
    password,
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
        // console.log('Saiu com Sucesso');
        localStorage.setItem('@hashmap/role', undefined);
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

  requesterGroup(
    callbackSuccess = () => {
      console.log('Requester Success');
    },
    callbackError = error => console.log(error.code, error.message)
  ) {
    const user = this.fb.currentUser;
    this.httpFirebase
      .updateItem(USERS_COLLECTION, user.uid, { groupMember: true })
      .then(callbackSuccess)
      .catch(callbackError);
  }
}

export default AuthenticationServiceFirebase;
