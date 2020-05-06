import {
  HASHMAPS_COLLECTION,
  USERS_COLLECTION,
} from 'app/screens/lib/constants';
import { loadFirebaseStore } from './db';

export async function getAllHashmapsKeys() {
  const hashmaps = [];
  const fb = loadFirebaseStore();
  try {
    const data = await fb()
      .collection(HASHMAPS_COLLECTION)
      .get();
    data.forEach(doc => {
      hashmaps.push({
        params: {
          hashmap: doc.id,
        },
      });
    });
  } catch (err) {
    console.error(err);
  }
  return hashmaps;
}

export async function getAllUsernames() {
  const usernames = [];
  const fb = loadFirebaseStore();
  try {
    const data = await fb()
      .collection(USERS_COLLECTION)
      .get();
    data.forEach(doc => {
      usernames.push({
        params: {
          profile: doc.data().username,
        },
      });
    });
  } catch (err) {
    console.error(err);
  }
  return usernames;
}
