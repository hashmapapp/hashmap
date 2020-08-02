import React, { useEffect } from 'react';
import ScreenHashmapView from 'app/screens/hashmap/view';
import DynamicHead from 'app/components/UI/head/dynamic-head';
import {
  HASHMAPS_COLLECTION,
  USERS_COLLECTION,
  POSTS_COLLECTION,
  NOTIFICATIONS_COLLECTION
} from 'app/screens/lib/constants';
import { loadFirebaseStore } from 'app/lib/db';

export default ({ hashmap, posts, hashmapKey, authorId, notifications }) => {
  useEffect(() => {
    window.onbeforeunload = null;
  }, []);

  return (
    <>
      <DynamicHead
        titleText={hashmap ? hashmap.title : undefined}
        description={hashmap ? hashmap.subtitle : undefined}
        imageUrl={hashmap ? hashmap.imageUrl : undefined}
      />
      <ScreenHashmapView
        hashmap={hashmap}
        posts={posts}
        hashmapKey={hashmapKey}
        authorId={authorId}
        notifications={notifications}
      />
    </>
  );
};

export async function getServerSideProps({ params }) {
  let hashmap;
  let notifications = [];
  const posts = [];
  const FirebaseStore = loadFirebaseStore();
  const hashmapKey = params.hashmap;
  try {
    const dataHashmap = await FirebaseStore()
      .collection(HASHMAPS_COLLECTION)
      .doc(hashmapKey)
      .get();
    hashmap = { ...dataHashmap.data(), key: hashmapKey };
    hashmap.createdAt = hashmap.createdAt.toDate().toISOString();
    hashmap.updatedAt = hashmap.updatedAt.toDate().toISOString();
    const dataAuthor = await FirebaseStore()
      .collection(USERS_COLLECTION)
      .doc(hashmap.author)
      .get();
    hashmap.author = { ...dataAuthor.data(), key: hashmap.author };
    const dataPosts = await FirebaseStore()
      .collection(`${HASHMAPS_COLLECTION}/${hashmapKey}/${POSTS_COLLECTION}`)
      .orderBy('index')
      .get();
    dataPosts.forEach(doc => {
      const aux = { ...doc.data(), key: doc.id };
      aux.createdAt = aux.createdAt.toDate().toISOString();
      aux.updatedAt = aux.updatedAt.toDate().toISOString();
      posts.push(aux);
    });

    const dataNotifications = await FirebaseStore()
      .collection(NOTIFICATIONS_COLLECTION)
      .where('hashmapId', '==', hashmapKey)
      .where('status', '==', 'PENDENTE')
      .get()

    dataNotifications.forEach(doc => {
      const aux = { ...doc.data(), key: doc.id };
      notifications.push(aux);
    });

  } catch (err) {
    console.error(err);
  }
  return { props: { hashmap, posts, hashmapKey, authorId: hashmap.author, notifications } };
}

// export async function getStaticPaths() {
//   const hashmapKeys = await getAllHashmapsKeys();
//   return {
//     paths: hashmapKeys,
//     fallback: true,
//   };
// }
