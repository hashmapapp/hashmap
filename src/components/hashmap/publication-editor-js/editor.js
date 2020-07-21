import React, { useRef, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { postCreate } from 'app/redux/actions/hashmapActions';
import { connect } from 'react-redux';
import shortid from 'shortid';

const PublicationEditor = ({
  saveAction,
  cancelAction,
  handlerCreate,
  post,
}) => {
  const editorFrame = useRef();

  const loadNewEditor = editor => {
    // console.log(post);
    const { key, content } = post;
    const newKey = '_'.concat(shortid.generate());
    if (!key) {
      handlerCreate(newKey);
    }
    // console.log('Carregando comunicação com o editor...');
    editor.current.contentWindow.postMessage(
      {
        postKey: key || newKey,
        content: content || {},
      },
      process.env.EDITOR_FRAME_URL
    );
  };

  const receiveMessage = event => {
    if (event.origin.startsWith(process.env.EDITOR_FRAME_URL)) {
      if (event.data && event.data.type) {
        if (event.data.type === 'save') {
          saveAction(event.data);
        }
        if (event.data.type === 'cancel') {
          cancelAction();
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('message', receiveMessage);
    return function cleanup() {
      window.removeEventListener('message', receiveMessage);
    };
  }, []);

  return (
    <>
      <div style={{ height: '93vh' }}>
        <iframe
          title="editor"
          ref={editorFrame}
          width="100%"
          height="100%"
          src="http://localhost:1234"
          onLoad={() => {
            loadNewEditor(editorFrame);
          }}
        />
      </div>
    </>
  );
};

PublicationEditor.defaultProps = {};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handlerCreate: postCreate,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(PublicationEditor);
