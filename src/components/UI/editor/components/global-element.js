import React from 'react';
import { Blockquote } from '../style';
import VideoElement from './video-element';
import InstagramElement from './instagram-element';

const GlobalElement = props => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'block-quote':
      return <Blockquote {...attributes}>{children}</Blockquote>;
    case 'bulleted-list':
      return (
        <ul style={{ listStyle: 'inside' }} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 className="text-5xl" {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 className="text-3xl" {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return (
        <ol style={{ listStyle: 'decimal' }} className="pl-4" {...attributes}>
          {children}
        </ol>
      );
    case 'delimiter':
      return (
        <div {...attributes} className="text-center text-2xl">
          {children}
        </div>
      );
    case 'video':
      return <VideoElement {...props} />;
    case 'instagram':
      return <InstagramElement {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default GlobalElement;
