import React from 'react';
import { Blockquote } from '../style';
import VideoElement from './video-element';
import InstagramElement from './instagram-element';
import LinkPreviewElement from './link-preview-element';
import InputLinkElement from './input-link-element';
import InputImageElement from './input-image-element';
import { ImageElement } from './image-element';

const GlobalElement = props => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case 'block-quote':
      return (
        <Blockquote className="text-lg" {...attributes}>
          {children}
        </Blockquote>
      );
    case 'bulleted-list':
      return (
        <ul className="list-disc list-inside" {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 className="text-4xl text-gray-800" {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 className="text-2xl text-gray-800" {...attributes}>
          {children}
        </h2>
      );
    case 'list-item':
      return (
        <li className="text-lg text-gray-800" {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol className="list-decimal list-inside" {...attributes}>
          {children}
        </ol>
      );
    case 'divider':
      return (
        <div
          {...attributes}
          className="border-solid border-2 border-gray-300 my-4"
        >
          {children}
        </div>
      );
    case 'image':
      return <ImageElement {...props} />;
    case 'link':
      return (
        <a
          {...attributes}
          href={element.url}
          style={{ textDecoration: 'underline', color: 'blue' }}
        >
          {children}
        </a>
      );
    case 'link-preview':
      return <LinkPreviewElement {...props} />;
    case 'video':
      return <VideoElement {...props} />;
    case 'instagram':
      return <InstagramElement {...props} />;
    case 'input-link':
      return <InputLinkElement {...props} />;
    case 'input-image':
      return <InputImageElement {...props} />;
    default:
      return (
        <p className="text-lg text-gray-800" {...attributes}>
          {children}
        </p>
      );
  }
};

export default GlobalElement;
