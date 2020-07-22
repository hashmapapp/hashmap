import React from 'react';
import { useSlate } from 'slate-react';
import { cx, css } from 'emotion';
import {
  GoBold,
  GoItalic,
  GoCode,
  GoQuote,
  GoListOrdered,
  GoListUnordered,
} from 'react-icons/go';
import { BsTypeUnderline } from 'react-icons/bs';
import { FaRegWindowMinimize } from 'react-icons/fa';
import { MdLooksOne, MdLooksTwo } from 'react-icons/md';
import { FiLink2, FiImage } from 'react-icons/fi';
import {
  toggleBlock,
  isBlockActive,
  isMarkActive,
  toggleMark,
  isLinkActive,
  insertLink,
  insertDivider,
} from '../lib/slate-custom';

const Button = React.forwardRef(
  ({ className, active, reversed, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          cursor: pointer;
          color: ${reversed
            ? active
              ? 'white'
              : '#aaa'
            : active
            ? 'black'
            : '#ccc'};
        `
      )}
    />
  )
);

export const BlockButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      {icon === 'looks_one' && <MdLooksOne />}
      {icon === 'looks_two' && <MdLooksTwo />}
      {icon === 'format_quote' && <GoQuote />}
      {icon === 'format_list_numbered' && <GoListOrdered />}
      {icon === 'format_list_bulleted' && <GoListUnordered />}
    </Button>
  );
};

export const DividerButton = () => {
  const editor = useSlate();
  const format = 'divider';
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        insertDivider(editor);
      }}
    >
      <FaRegWindowMinimize />
    </Button>
  );
};

export const ImageButton = () => {
  const editor = useSlate();
  const format = 'input-image';
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <FiImage />
    </Button>
  );
};

export const LinkButton = () => {
  const editor = useSlate();
  return (
    <Button
      active={isLinkActive(editor)}
      onMouseDown={event => {
        event.preventDefault();
        const url = window.prompt('Enter the URL of the link:');
        if (!url) return;
        insertLink(editor, url);
      }}
    >
      <FiLink2 />
    </Button>
  );
};

export const EmbedButton = () => {
  const editor = useSlate();
  const format = 'input-link';
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
    >
      <FiLink2 />
    </Button>
  );
};

export const MarkButton = ({ format, icon }) => {
  const editor = useSlate();
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
    >
      {icon === 'format_bold' && <GoBold />}
      {icon === 'format_italic' && <GoItalic />}
      {icon === 'format_underlined' && <BsTypeUnderline />}
      {icon === 'code' && <GoCode />}
    </Button>
  );
};