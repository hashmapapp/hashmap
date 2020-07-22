import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import LinkPreview from 'app/components/UI/link-preview/link-preview';
import InstagramEmbed from 'react-instagram-embed';
import Iframe from 'react-iframe';
import InstagramProfilePreview from 'app/components/UI/link-preview/instagram-profile-preview';
import { FacebookProvider, Comments } from 'react-facebook';
import { loadLink } from 'app/components/hashmap/publication/lib/loadLink';
import PublicationEditor from 'app/components/UI/editor/publication';
import DynamicLoadedPublication from 'app/components/UI/editor/dynamic-loader-publication';

const Publication = ({ data }) => {
  const [pDescription, setPDescription] = useState([]);
  const [instaProfile, setInstaProfile] = useState({});
  useMemo(() => {
    if (data.instragramProfilePreview && data.instragramProfilePreview.value) {
      const profile = data.instragramProfilePreview;
      loadLink(profile.profileUrl)
        .then(loadData => {
          setInstaProfile(loadData.preview);
        })
        .catch(error => {
          console.error(error);
        });
    }
    if (data.textDescription) {
      setPDescription(data.textDescription.split('\n'));
    }
  }, [data]);

  if (data.content) {
    return (
      <article
        className="my-8 px-5 py-4 rounded-lg bg-white divide-y divide-gray-400"
        style={{ border: '1px solid #e1e4e8' }}
      >
        {/* <PublicationEditor data={data} editable={false} /> */}
        <DynamicLoadedPublication editable={false} data={data} />
        <div className="pt-8">
          <FacebookProvider
            appId={process.env.FACEBOOK_APP_ID_COMMENT}
            language="pt_BR"
          >
            <Comments
              href={`https://hashmap.app/view/${data.key}`}
              width="100%"
              numPosts="3"
              handleParse={e => console.log(e)}
            />
          </FacebookProvider>
        </div>
      </article>
    );
  }

  return (
    <article className="my-4 bg-white md:rounded-lg overflow-hidden shadow-xl">
      <div>
        {data.title && (
          <div className="py-4 px-10 font-sans font-bold text-2xl text-gray-800">
            {data.title}
          </div>
        )}
        {data.imageUrl && (
          <div className="flex justify-center pt-2">
            <img
              className="md:hidden shadow"
              src={data.imageUrl}
              alt={data.title}
              style={{ maxHeight: '14rem' }}
            />
            <img
              className="hidden md:block shadow"
              src={data.imageUrl}
              alt={data.title}
              style={{ maxHeight: '28rem' }}
            />
          </div>
        )}

        {data.instragramPostPreview && data.instragramPostPreview.value && (
          <div className="md:flex md:justify-center">
            <InstagramEmbed
              maxWidth={480}
              url={data.instragramPostPreview.value}
              hideCaption={false}
              containerTagName="article"
              protocol=""
              injectScript
            />
          </div>
        )}

        {instaProfile.value && <InstagramProfilePreview data={instaProfile} />}

        {pDescription.map((p, index) => (
          <p
            key={index.toString()}
            className="py-4 px-10 font-sans text-lg md:text-xl text-gray-700"
          >
            {p}
          </p>
        ))}
        {data.linksToPreview &&
          data.linksToPreview.map(link => (
            <LinkPreview key={link.url} data={link} />
          ))}
        {data.videoYT && data.videoYT.embed && (
          <>
            <div className="hidden sm:block" style={{ height: 480 }}>
              <Iframe
                frameborder="0"
                url={data.videoYT.embed}
                width="100%"
                className="h-full"
                id="myId"
                display="initial"
                position="relative"
                allowFullScreen
              />
            </div>
            <div className="block sm:hidden">
              <Iframe
                frameborder="0"
                url={data.videoYT.embed}
                width="100%"
                className="h-56"
                id="myId"
                display="initial"
                position="relative"
              />
            </div>
          </>
        )}
      </div>
      <div className="px-5 md:px-10">
        <FacebookProvider
          appId={process.env.FACEBOOK_APP_ID_COMMENT}
          language="pt_BR"
        >
          <Comments
            href={`https://hashmap.app/view/${data.key}`}
            width="100%"
            numPosts="3"
            handleParse={e => console.log(e)}
          />
        </FacebookProvider>
      </div>
    </article>
  );
};

Publication.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default Publication;
