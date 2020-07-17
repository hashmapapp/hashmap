import React, { useRef, useState, useEffect } from 'react';
// import { Animated } from 'react-animated-css';
import HeaderEdit from 'app/components/hashmap/header/edit';
import ArticleEdit from 'app/components/hashmap/article/edit';
import NewPublicationButton from 'app/components/hashmap/publication/components/new-button';

const SectionHashmapEdit = () => {
  const editorFrame = useRef();
  const [editorVisible, setEditorVisible] = useState(true);
  const handlerNewPost = () => {
    setEditorVisible(!editorVisible);
  };

  const loadNewEditor = editor => {
    console.log('loadNewEditor');
    editor.current.contentWindow.postMessage(
      { messageType: 'new-editor' },
      'http://localhost:1234/'
    );
  };

  useEffect(() => {
    // setEditorVisible(false);
    if (editorVisible) {
      loadNewEditor(editorFrame);
      const receiveMessage = event => {
        if (event.origin.startsWith('http://localhost:1234/')) {
          console.log(event.data);
        }
      };
      window.addEventListener('message', receiveMessage);
    }
  }, [editorVisible]);

  return (
    <div>
      {editorVisible ? (
        <div style={{ height: '93vh' }}>
          <iframe
            className=""
            title="editor"
            ref={editorFrame}
            width="100%"
            height="100%"
            src="http://localhost:1234/"
          />
        </div>
      ) : (
        <>
          <HeaderEdit />
          <ArticleEdit />
          <NewPublicationButton onAction={handlerNewPost} />
        </>
      )}
    </div>
  );
};

export default SectionHashmapEdit;
