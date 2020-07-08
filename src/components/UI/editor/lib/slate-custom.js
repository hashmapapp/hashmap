import { Transforms, Editor } from 'slate';
import { LIST_TYPES, LINK_TYPES } from './constants';

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
};

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  });

  let type = format;
  if (isActive) {
    type = 'paragraph';
  } else if (isList) {
    type = 'list-item';
  }

  Transforms.setNodes(editor, { type });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

export const toggleEmbed = (editor, format, url, data) => {
  Transforms.unwrapNodes(editor, {
    match: n => LINK_TYPES.includes(n.type),
    split: true,
  });

  if (LINK_TYPES.includes(format)) {
    const block = {
      type: format,
      url,
      data,
      children: [{ text: '' }],
    };
    const paragraphNode = {
      type: 'paragraph',
      children: [{ text: '' }],
    };
    Transforms.wrapNodes(editor, block);
    Transforms.insertNodes(editor, paragraphNode);
  }
};

export const isMarkActive = (editor, format) => {
  let marks = false;
  try {
    marks = Editor.marks(editor);
  } catch (err) {
    return false;
  }
  return marks ? marks[format] === true : false;
};

export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export const withEmbeds = editor => {
  const voidEmbeds = [...LINK_TYPES, 'input-link'];
  const { isVoid } = editor;
  editor.isVoid = element =>
    voidEmbeds.includes(element.type) ? true : isVoid(element);
  return editor;
};
