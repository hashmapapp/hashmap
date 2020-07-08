import React, { useState } from 'react';
import { useEditor, ReactEditor } from 'slate-react';
import { Transforms } from 'slate';
import { loadLink } from 'app/components/hashmap/publication/lib/loadLink';
import { toggleEmbed, addParagraph } from '../lib/slate-custom';

const InputLinkElement = ({ attributes, children, element }) => {
  const editor = useEditor();
  const [link, setLink] = useState('');
  const onChange = val => {
    const path = ReactEditor.findPath(editor, element);
    Transforms.setNodes(editor, { url: val }, { at: path });
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' && link.length) {
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
          toggleEmbed(editor, typeEmbed, url, data);
        }
      });
    }
  };

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <input
          value={link}
          onClick={e => e.stopPropagation()}
          placeholder="Cole um link e pressione enter"
          style={{
            padding: '5px',
            width: '100%',
            backgroundColor: '#f4f4f4',
          }}
          onChange={e => {
            const newUrl = e.target.value;
            setLink(newUrl);
            onChange(newUrl);
          }}
          onKeyDown={handleKeyDown}
        />
        {children}
      </div>
    </div>
  );
};

export default InputLinkElement;
