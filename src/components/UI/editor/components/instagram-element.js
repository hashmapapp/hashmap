import React from 'react';
import InstagramEmbed from 'react-instagram-embed';
import InstagramProfilePreview from '../../link-preview/instagram-profile-preview';

const InstagramElement = ({ attributes, children, element }) => {
  const { url, data } = element;
  // console.log(url, data);

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        {data.type === 'instragramPostPreview' && (
          <div className="my-4 justify-center">
            <InstagramEmbed
              url={url}
              hideCaption={false}
              containerTagName="div"
              protocol=""
              injectScript
              // onLoading={() => {}}
              // onSuccess={() => {}}
              // onAfterRender={() => {}}
              // onFailure={() => {}}
            />
          </div>
        )}
        {data.type === 'instragramProfilePreview' && (
          <InstagramProfilePreview data={data.preview} />
        )}
      </div>
      {children}
    </div>
  );
};

export default InstagramElement;
