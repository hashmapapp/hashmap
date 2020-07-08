import React from 'react';
import LinkPreview from '../../link-preview/link-preview';

const LinkPreviewElement = ({ attributes, children, element }) => {
  const { data } = element;
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <LinkPreview data={data.preview} />
      </div>
      {children}
    </div>
  );
};

export default LinkPreviewElement;
