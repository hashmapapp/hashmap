import React from 'react';
import { useEditor, useSlate } from 'slate-react';
import { toggleBlock, insertImage } from '../lib/slate-custom';
import { fireBaseUpload } from '../../image/only-upload';

const NewChildren = () => {
  const editor = useSlate();
  const handlerPreview = () => {
    toggleBlock(editor, 'input-link');
  };

  const onRequestSaveSuccess = (path, url) => {
    console.log(path, url);
    insertImage(editor, url);
  };

  const handleImageAsFile = e => {
    e.preventDefault();
    const image = e.target.files[0];
    fireBaseUpload(image, 'posts', onRequestSaveSuccess);
  };

  return (
    <div>
      {/* <button type="button">+</button> */}
      {/* <label htmlFor="selecao-arquivo">
        Selecionar um arquivo
      </label> */}
      <input
        id="selecao-arquivo"
        // style={{ display: 'none' }}
        type="file"
        onChange={handleImageAsFile}
      />
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
