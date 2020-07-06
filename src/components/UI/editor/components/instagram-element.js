import React from 'react';
import InstagramEmbed from 'react-instagram-embed';

const InstagramElement = ({ attributes, children, element }) => {
  const { url } = element;
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div className="my-4 flex justify-center">
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
      </div>
      {children}
    </div>
  );
};

export default InstagramElement;
