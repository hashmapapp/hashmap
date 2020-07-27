import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postDelete } from 'app/redux/actions/hashmapActions';
import ModalConfirm from 'app/components/UI/modal/confirm';
import PublicationView from '../publication-editor-js/view';

const article = ({ posts, handlerDelete, onActionEditPost }) => {
  const [showModalComfirm, setShowModalConfirm] = useState({
    show: false,
    post: undefined,
  });

  const handleRemovePost = () => {
    // console.log('remove post', showModalComfirm.post);
    handlerDelete(showModalComfirm.post);
    setShowModalConfirm({
      show: false,
      post: undefined,
    });
  };

  const handleEditPost = post => {
    // console.log('edit ', post.key);
    onActionEditPost(post);
  };

  return (
    <div className="md:px-32">
      {posts
        .filter(post => !post.key.startsWith('DELETE'))
        .map(post => (
          <div key={post.key} className="mt-4">
            <div className="flex justify-between pt-3 pb-1">
              <button
                type="button"
                className="bg-transparent border border-red-200 text-red-500 font-bold bg-white
                py-2 px-4 rounded inline-flex items-center hover:bg-red-400 hover:text-white"
                onClick={() => {
                  setShowModalConfirm({
                    show: true,
                    post: post.key,
                  });
                }}
              >
                <span>Remover</span>
              </button>
              <button
                type="button"
                className="border border-indigo-200 hover:bg-indigo-400 text-indigo-800 font-bold bg-white
                py-2 px-4 rounded inline-flex items-center hover:text-white"
                onClick={() => {
                  handleEditPost(post);
                }}
              >
                <span>Editar</span>
              </button>
            </div>
            <PublicationView key={post.key} content={post.content} />
          </div>
        ))}
      {showModalComfirm.show && (
        <ModalConfirm
          closeModal={() => {
            setShowModalConfirm({
              show: false,
              post: undefined,
            });
          }}
          actionConfirm={handleRemovePost}
        />
      )}
    </div>
  );
};

article.defaultProps = {
  description: '',
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      handlerDelete: postDelete,
    },
    dispatch
  );

const mapStateToProps = state => ({
  posts: state.hashmap.posts,
});

export default connect(mapStateToProps, mapDispatchToProps)(article);
