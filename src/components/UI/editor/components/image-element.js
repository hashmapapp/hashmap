import React from 'react';
import { useSelected, useFocused } from 'slate-react';

export const ImageElement = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <div {...attributes}>
      <div
        contentEditable={false}
        className={`my-4 ${
          selected && focused ? 'border-solid border-indigo-500 border-2' : ''
        }`}
      >
        <img alt="post" src={element.url} />
      </div>
      {children}
    </div>
  );
};
