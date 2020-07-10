import { Transforms, Editor, Range } from 'slate';
import isUrl from 'is-url';
import imageExtensions from 'image-extensions';
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
  const voidEmbeds = [...LINK_TYPES, 'input-link', 'image'];
  const { isVoid } = editor;
  editor.isVoid = element =>
    voidEmbeds.includes(element.type) ? true : isVoid(element);
  return editor;
};

export const isLinkActive = editor => {
  const [link] = Editor.nodes(editor, { match: n => n.type === 'link' });
  return !!link;
};

const unwrapLink = editor => {
  Transforms.unwrapNodes(editor, { match: n => n.type === 'link' });
};

const wrapLink = (editor, url) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const insertLink = (editor, url) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

export const insertImage = (editor, url) => {
  const text = { text: '' };
  const image = { type: 'image', url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const isImageUrl = url => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};

export const withLinks = editor => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.insertText = text => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const withImages = editor => {
  const { insertData } = editor;

  editor.insertData = data => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');
        if (mime === 'image') {
          reader.addEventListener('load', () => {
            const url = reader.result;
            insertImage(editor, url);
          });
          reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
