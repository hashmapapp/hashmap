import React, { useState } from 'react';
import NewPublicationButton from 'app/components/hashmap/publication/components/new-button';
import HeaderEdit from 'app/components/hashmap/header/edit';
import ArticleEdit from 'app/components/hashmap/article/edit';

import { bindActionCreators } from 'redux';
import { dataPostUpdate } from 'app/redux/actions/hashmapActions';
import { connect } from 'react-redux';
import PublicationEditor from './publication-editor-js/editor';
import ButtonBar from './publication/components/button-bar';

const SectionHashmapEdit = ({ handlerData }) => {
  const [editorVisible, setEditorVisible] = useState(false);
  const [post, setPost] = useState({ content: undefined, postKey: undefined });
  const handlerNewPost = () => {
    setPost({ content: undefined, postKey: undefined });
    setEditorVisible(true);
  };

  const handlerEditPost = postEdit => {
    setPost(postEdit);
    setEditorVisible(true);
  };

  const handlerSave = data => {
    // console.log(data);
    handlerData(data.outputData, data.postKey);
    setEditorVisible(false);
  };

  const handleCancel = () => {
    // console.log('Cancelar');
    setEditorVisible(false);
  };

  return (
    <>
      {editorVisible ? (
        <PublicationEditor
          saveAction={handlerSave}
          cancelAction={handleCancel}
          post={post}
        />
      ) : (
        <article className="container mx-auto px-4 md:px-64 md:py-8">
          <HeaderEdit />
          <ArticleEdit onActionEditPost={handlerEditPost} />
          <NewPublicationButton onAction={handlerNewPost} />
          <ButtonBar />
        </article>
      )}
    </>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handlerData: dataPostUpdate,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(SectionHashmapEdit);
