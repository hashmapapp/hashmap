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
import { MdLooksOne, MdLooksTwo } from 'react-icons/md';
import {
  toggleBlock,
  isBlockActive,
  isMarkActive,
  toggleMark,
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
