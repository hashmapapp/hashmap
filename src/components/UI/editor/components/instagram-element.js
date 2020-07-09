import React from 'react';
import InstagramEmbed from 'react-instagram-embed';
import { useSelected, useFocused } from 'slate-react';
import InstagramProfilePreview from '../../link-preview/instagram-profile-preview';

const InstagramElement = ({ attributes, children, element }) => {
  const { url, data } = element;
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        className={
          selected && focused ? 'border-solid border-indigo-500 border-2' : ''
        }
      >
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
