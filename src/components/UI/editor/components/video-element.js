import React from 'react';
import Iframe from 'react-iframe';
import { useSelected, useFocused } from 'slate-react';

const VideoElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  const { url } = element;
  if (url.includes('youtube')) {
    return (
      <div {...attributes}>
        <div contentEditable={false}>
          <div
            className={`my-4 ${
              selected && focused
                ? 'border-solid border-indigo-500 border-2'
                : ''
            }`}
          >
            <Iframe
              frameborder="0"
              allowfullscreen
              url={url}
              width="100%"
              className="h-56 sm:h-64"
              id="myId"
              display="initial"
              position="relative"
            />
          </div>
        </div>
        {children}
      </div>
    );
  }
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div
          style={{
            padding: '60% 0 0 0',
            position: 'relative',
          }}
          className={
            selected && focused ? 'border-solid border-indigo-500 border-2' : ''
          }
        >
          <iframe
            title="vimeo"
            src={`${url}?title=0&byline=0&portrait=0`}
            frameBorder="0"
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>
      {children}
    </div>
  );
};

export default VideoElement;