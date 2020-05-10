import React, { useEffect, useState } from 'react';
import {
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share';

const ShareButtons = ({ title, summary }) => {
  const [url, setUrl] = useState();
  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <>
      {url && (
        <div className="container mx-auto px-4 md:px-64 pt-8">
          <WhatsappShareButton
            title={`Veja só essas recomendações: ${title}`}
            url={url}
            className="ml-2"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LinkedinShareButton
            title={title}
            url={url}
            summary={summary}
            source="Hashmap"
            className="ml-2"
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <TwitterShareButton title={title} url={url} className="ml-2">
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      )}
    </>
  );
};

export default ShareButtons;
