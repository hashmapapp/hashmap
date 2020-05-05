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
      const aux = { ...doc.data(), key: doc.id };
      aux.createdAt = aux.createdAt.toDate().toISOString();
      hashmaps.push(aux);
    });
  } catch (err) {
    console.error(err);
  }
  return hashmaps.map(h => {
    return {
      params: {
        hashmap: h.key,
      },
    };
  });
}
