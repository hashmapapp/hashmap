import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UINavBar from 'app/components/UI/navbar/navbar';
import SectionHashmapEdit from 'app/components/hashmap/edit';
import { ItemLi } from 'app/components/UI/styles/styles';
import Router from 'next/router';
import { bindActionCreators, compose } from 'redux';
import { hashmapUpdate as handlerHashmapUpdate } from 'app/redux/actions/hashmapActions';
import withSubscriptionHashmapData from 'app/screens/lib/withSubscriptionHashmapData';

const Edit = ({
  postsLength,
  hashmap,
  posts,
  hashmapKey,
  handlerHashmapUpdate,
  hashmapRedux,
}) => {
  useEffect(() => {
    if (hashmap && posts.length > 0) handlerHashmapUpdate({ hashmap, posts });
  }, [hashmap, posts]);
  const handlerSave = evt => {
    evt.preventDefault();
    console.log(hashmapRedux);
  };

  return (
    <>
      <UINavBar fixed>
        <ul>
          <ItemLi>
            <a href="/" onClick={handlerSave}>
              Salvar
            </a>
          </ItemLi>
          <ItemLi>
            <a>Posts: {postsLength}</a>
          </ItemLi>
        </ul>
      </UINavBar>
      <SectionHashmapEdit />
    </>
  );
};

const mapStateToProps = state => ({
  postsLength: state.hashmap.posts.length,
  hashmapRedux: state.hashmap,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handlerHashmapUpdate }, dispatch);

const enhance = compose(
  withSubscriptionHashmapData,
  connect(mapStateToProps, mapDispatchToProps)
);

export default enhance(Edit);
