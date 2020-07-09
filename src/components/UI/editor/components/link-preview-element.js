import React from 'react';
import { useSelected, useFocused } from 'slate-react';
import LinkPreview from '../../link-preview/link-preview';

const LinkPreviewElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  const { data } = element;
  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        className={
          selected && focused ? 'border-solid border-indigo-500 border-2' : ''
        }
      >
        <LinkPreview data={data.preview} />
      </div>
      {children}
    </div>
  );
};

export default LinkPreviewElement;
