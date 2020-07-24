import React from 'react';
import { FacebookProvider, Comments } from 'react-facebook';

const FacebookComments = ({ postKey }) => (
  <section className="text-center">
    <FacebookProvider
      appId={process.env.FACEBOOK_APP_ID_COMMENT}
      language="pt_BR"
    >
      <Comments
        href={`https://hashmap.app/view/${postKey}`}
        width="100%"
        numPosts="3"
      />
    </FacebookProvider>
  </section>
);

export default FacebookComments;
