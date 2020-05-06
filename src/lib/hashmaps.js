import { HASHMAPS_COLLECTION } from 'app/screens/lib/constants';
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
