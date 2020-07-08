import React from 'react';
import { useEditor } from 'slate-react';
import { toggleBlock } from '../lib/slate-custom';

const NewChildren = () => {
  const editor = useEditor();
  const handlerPreview = () => {
    toggleBlock(editor, 'input-link');
  };

  return (
    <div>
      {/* <button type="button">+</button> */}

      <button type="button" className="p-2">
        Imagem
      </button>
      <button type="button" className="p-2" onClick={handlerPreview}>
        Preview
      </button>
      <button type="button" className="p-2">
        Delimitador
      </button>
    </div>
  );
};

export default NewChildren;
