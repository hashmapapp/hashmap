import { loadFirebaseStore } from 'app/lib/db';
import { USERS_COLLECTION } from 'app/screens/lib/constants';

export class UserService {
  getUserById = uid => {
    return new Promise((resolve, reject) => {
      const fb = loadFirebaseStore();
      fb()
        .collection(USERS_COLLECTION)
        .doc(uid)
        .get()
        .then(user => {
          if (user) {
            // console.log(user.data());
            resolve(user.data());
          }
          reject(new Error('User not found'));
        })
        .catch(error => reject(error));
    });
  };
}
