import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import isHotkey from 'is-hotkey';
import { Slate, Editable, withReact } from 'slate-react';
import { Toolbar } from './components/custom';
import NewChildren from './components/new-children';
import { HOTKEYS } from './lib/constants';
import GlobalElement from './components/global-element';
import Leaf from './components/leaf';
import { MarkButton, BlockButton } from './components/toolbar-buttons';
import { withEmbeds } from './lib/slate-custom';

const initialValue = [
  { type: 'paragraph', children: [{ text: 'Bold', bold: true }] },
  { type: 'paragraph', children: [{ text: 'Italic', italic: true }] },
  { type: 'paragraph', children: [{ text: 'Underline', underline: true }] },
  { type: 'paragraph', children: [{ text: 'Code', code: true }] },
  { type: 'heading-one', children: [{ text: 'H1' }] },
  { type: 'heading-two', children: [{ text: 'H2' }] },
  { type: 'paragraph', children: [{ text: '' }] },
  { type: 'delimiter', children: [{ text: '* * *' }] },
  { type: 'block-quote', children: [{ text: 'Quote' }] },
  { type: 'paragraph', children: [{ text: '' }] },
  {
    type: 'numbered-list',
    children: [{ type: 'list-item', children: [{ text: 'item number' }] }],
  },
  {
    type: 'bulleted-list',
    children: [{ type: 'list-item', children: [{ text: 'item ' }] }],
  },
  {
    type: 'video',
    url: 'https://player.vimeo.com/video/182592195',
    children: [{ text: '' }],
  },
  { type: 'paragraph', children: [{ text: '' }] },
  {
    type: 'video',
    url: 'https://www.youtube.com/embed/n6oSeODGmoQ',
    children: [{ text: '' }],
  },
  { type: 'paragraph', children: [{ text: '' }] },
  {
    type: 'instagram',
    url: 'https://www.instagram.com/p/CBMey70HQkb/',
    children: [{ text: '' }],
  },
  { type: 'paragraph', children: [{ text: '' }] },
  {
    type: 'instagram',
    url: 'https://www.instagram.com/tv/CB5ndoMn-Lh/',
    children: [{ text: '' }],
  },
  { type: 'paragraph', children: [{ text: '' }] },
  {
    type: 'instagram',
    url: 'https://www.instagram.com/tv/CB5ndoMn-Lh/',
    children: [{ text: '' }],
  },
  { type: 'paragraph', children: [{ text: '' }] },
  // {
  //   type: 'instagram',
  //   url: 'https://www.instagram.com/hashmap.app/',
  //   children: [{ text: '' }],
  // },
  // { type: 'paragraph', children: [{ text: '' }] },
];

const PublicationEditor = () => {
  const [value, setValue] = useState([]);
  useEffect(() => {
    setValue(initialValue);
  }, []);
  const renderElement = useCallback(props => <GlobalElement {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const editor = useMemo(
    () => withHistory(withEmbeds(withReact(createEditor()))),
    []
  );
  return (
    <div
      className="px-8 py-2 rounded-lg bg-white"
      style={{ border: '1px solid #e1e4e8' }}
    >
      <Slate
        editor={editor}
        value={value}
        onChange={v => {
          setValue(v);
          const content = JSON.stringify(value);
          localStorage.setItem('content', content);
        }}
      >
        <Toolbar>
          <MarkButton format="bold" icon="format_bold" />
          <MarkButton format="italic" icon="format_italic" />
          <MarkButton format="underline" icon="format_underlined" />
          <MarkButton format="code" icon="code" />
          <BlockButton format="heading-one" icon="looks_one" />
          <BlockButton format="heading-two" icon="looks_two" />
          <BlockButton format="block-quote" icon="format_quote" />
          <BlockButton format="numbered-list" icon="format_list_numbered" />
          <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        </Toolbar>
        <div className="pb-2">
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="Enter some rich text…"
            spellCheck
            autoFocus
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </div>
        <NewChildren />
      </Slate>
    </div>
  );
};

export default PublicationEditor;
