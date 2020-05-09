import { loadFirebaseStore } from 'app/lib/db';
import { USERS_COLLECTION } from 'app/screens/lib/constants';

export class UserService {
  getUserById = uid => {
    const fb = loadFirebaseStore();
    return fb()
      .collection(USERS_COLLECTION)
      .doc(uid)
      .get();
  };
}
