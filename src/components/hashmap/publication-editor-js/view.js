import React from 'react';
import dompurify from 'dompurify';
import Iframe from 'react-iframe';
import styled from 'styled-components';
import { FacebookProvider, Comments } from 'react-facebook';

const StyleParagraph = styled.div`
  code {
    background: rgba(250, 239, 240, 0.78);
    color: #b44437;
    padding: 3px 4px;
    border-radius: 5px;
    margin: 0 1px;
    font-family: inherit;
    font-size: 0.86em;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  mark {
    background: rgba(245, 235, 111, 0.29);
    padding: 3px 0;
  }

  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 2.5em;
  }

  h3 {
    font-size: 2.17em;
  }

  h4 {
    font-size: 2em;
  }

  h5 {
    font-size: 1.83em;
  }

  h6 {
    font-size: 1.67em;
  }

  a {
    color: #2969b9;
    text-decoration: underline;
  }
`;

const Blockquote = styled.blockquote`
  border-left: 2px solid #e2e8f0;
  margin-left: 0;
  margin-right: 0;
  padding-left: 10px;
  color: #718096;
  font-style: italic;

  & [dir='rtl'] {
    border-left: none;
    padding-left: 0;
    padding-right: 10px;
    border-right: 2px solid #e2e8f0;
  }
`;

const sanitizer = dompurify.sanitize;

const paragraph = data => {
  return (
    <StyleParagraph
      dangerouslySetInnerHTML={{ __html: sanitizer(data.text) }}
    />
  );
};

const header = data => {
  return paragraph({
    text: `<h${data.level}>${data.text}</h${data.level}>`,
  });
};

const list = data => {
  if (data.style === 'unordered') {
    return (
      <ul className="list-disc list-inside">
        {data.items.map(item => paragraph({ text: `<li>${item}</li>` }))}
      </ul>
    );
  }
  return (
    <ol className="list-decimal list-inside">
      {data.items.map(item => paragraph({ text: `<li>${item}</li>` }))}
    </ol>
  );
};

const delimiter = () => {
  return (
    <div
      className="w-full text-center py-4"
      style={{
        fontSize: '30px',
        // lineHeight: '65px',
        // height: '30px',
        letterSpacing: '0.2em',
      }}
    >
      ***
    </div>
  );
};

const image = data => {
  return (
    <div className="flex justify-center pt-2">
      <img
        className="md:hidden shadow"
        src={data.file.url}
        alt={data.caption}
        style={{ maxHeight: '14rem' }}
      />
      <img
        className="hidden md:block shadow"
        src={data.file.url}
        alt={data.caption}
        style={{ maxHeight: '28rem' }}
      />
    </div>
  );
};

const quote = data => {
  return (
    <Blockquote>
      {paragraph({
        text: `${data.text}${data.caption &&
          ` - <strong>${data.caption}</strong>`}`,
      })}
    </Blockquote>
  );
};

const embed = data => {
  if (data.service === 'youtube' || data.service === 'vimeo') {
    return (
      <>
        <div className="hidden sm:block" style={{ height: 480 }}>
          <Iframe
            frameborder="0"
            url={data.embed}
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
            url={data.embed}
            width="100%"
            className="h-56"
            id="myId"
            display="initial"
            position="relative"
          />
        </div>
      </>
    );
  }
  return <div>embed not found</div>;
};

const blocks = {
  header,
  paragraph,
  list,
  delimiter,
  image,
  quote,
  embed,
};

const PublicationView = ({ content, comments, postKey }) => {
  return (
    <div
      style={{ border: '1px solid #e1e4e8' }}
      className="mb-8 px-4 md:px-8 py-4 rounded-lg bg-white"
    >
      {content && content.blocks && content.blocks.length ? (
        content.blocks.map((block, index) => (
          <div key={index.toString()}>{blocks[block.type](block.data)}</div>
        ))
      ) : (
        <div className="text-center">{`<<Vazio>>`}</div>
      )}
      {comments && (
        <div className="pt-8">
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
        </div>
      )}
    </div>
  );
};

PublicationView.defaultProps = {
  comments: false,
};

export default PublicationView;
