import React, { useState } from 'react';
import { useEditor, ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { toggleEmbed } from '../lib/slate-custom';
import { fireBaseUpload } from '../../image/only-upload';

const InputImageElement = ({ attributes, children, element }) => {
  const editor = useEditor();
  const [link, setLink] = useState('');
  const [uploadImageLoading, setUploadImageLoading] = useState(false);
  const onChange = val => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { url: val }, { at: path });
  };

  const onRequestSaveSuccess = (path, url) => {
    setUploadImageLoading(false);
    toggleEmbed(editor, 'image', url, {});
  };

  const handleImageAsFile = e => {
    e.preventDefault();
    const image = e.target.files[0];
    setUploadImageLoading(true);
    fireBaseUpload(image, 'posts', onRequestSaveSuccess);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && link.length) {
      toggleEmbed(editor, 'image', link, {});
    }
  };

  return (
    <div {...attributes} className="border-dashed border-2 border-gray-600">
      <div contentEditable={false}>
        <input
          value={link}
          onClick={e => e.stopPropagation()}
          placeholder="Cole o endereço da imagem e pressione ENTER"
          style={{
            width: '98%',
            outline: 'none',
          }}
          onChange={e => {
            const newUrl = e.target.value;
            setLink(newUrl);
            onChange(newUrl);
          }}
          className="m-2 p-2 font-sans text-lg text-gray-800 text-center"
          onKeyDown={handleKeyDown}
        />
        {children}
      </div>
      <div className="grid grid-cols-1 flex justify-center">
        <span className="text-center">OU</span>
        {!uploadImageLoading && (
          <label
            className="text-center bg-transparent hover:bg-blue-500 text-blue-700 
          font-semibold hover:text-white py-2 px-4 border border-blue-500 
          hover:border-transparent rounded m-2"
            htmlFor="selecao-arquivo"
            style={{ cursor: 'pointer' }}
          >
            Selecione uma Imagem
            <input
              id="selecao-arquivo"
              style={{ display: 'none' }}
              type="file"
              onChange={handleImageAsFile}
            />
          </label>
        )}
        {uploadImageLoading && (
          <div
            className="text-center bg-transparent hover:bg-blue-500 text-blue-700 
          font-semibold hover:text-white py-2 px-4 border border-blue-500 
          hover:border-transparent rounded m-2"
          >
            Enviando...
          </div>
        )}
      </div>
    </div>
  );
};

export default InputImageElement;
