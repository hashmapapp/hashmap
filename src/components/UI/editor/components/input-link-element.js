import React, { useState } from 'react';
import { useEditor, ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { loadLink } from 'app/components/hashmap/publication/lib/loadLink';
import { toggleEmbed } from '../lib/slate-custom';

const InputLinkElement = ({ attributes, children, element }) => {
  const editor = useEditor();
  const [link, setLink] = useState('');
  const [loadingLink, setLoadingLink] = useState(false);
  const onChange = val => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { url: val }, { at: path });
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && link.length) {
      setLoadingLink(true);
      loadLink(link).then(loadData => {
        if (loadData) {
          let typeEmbed;
          let url;
          let data;
          const { type, preview } = loadData;
          switch (type) {
            case 'videoYT':
            case 'videoVM':
              typeEmbed = 'video';
              url = preview.embed;
              data = preview;
              break;
            case 'instragramPostPreview':
            case 'instragramProfilePreview':
              typeEmbed = 'instagram';
              url = preview.value;
              data = loadData;
              break;
            default:
              typeEmbed = 'link-preview';
              url = preview.url;
              data = loadData;
              break;
          }
          setLoadingLink(false);
          toggleEmbed(editor, typeEmbed, url, data);
        }
      });
    }
  };

  return (
    <div
      {...attributes}
      className={`my-2 border-dashed border-2 border-gray-600 ${loadingLink &&
        'bg-gray-200'}`}
    >
      <div contentEditable={false}>
        <input
          value={link}
          onClick={e => e.stopPropagation()}
          placeholder="Cole um link e pressione ENTER"
          style={{
            width: '98%',
            outline: 'none',
          }}
          onChange={e => {
            const newUrl = e.target.value;
            if (!loadingLink) {
              setLink(newUrl);
              onChange(newUrl);
            }
          }}
          onKeyDown={handleKeyDown}
          className={`m-2 p-2 font-sans text-lg text-gray-800 text-center ${loadingLink &&
            'bg-gray-200 text-opacity-25'}`}
        />
        {children}
      </div>
    </div>
  );
};

export default InputLinkElement;
