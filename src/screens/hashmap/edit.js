import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UINavBar from 'app/components/UI/navbar/navbar';
import SectionHashmapEdit from 'app/components/hashmap/edit';
import { bindActionCreators, compose } from 'redux';
import { hashmapUpdate as handlerHashmapUpdate } from 'app/redux/actions/hashmapActions';
import withSubscriptionHashmapData from 'app/screens/lib/withSubscriptionHashmapData';
import withAuthorization from 'app/screens/lib/withAuthorization';
import { CREATE_HASHMAP } from 'app/screens/lib/constants';

const Edit = ({ hashmap, posts, handlerHashmap, hashmapKey }) => {
  useEffect(() => {
    window.onbeforeunload = e => {
      e = e || window.event;
      if (e) e.returnValue = 'Sure?';
      return 'Sure?';
    };
    if (hashmap) handlerHashmap({ hashmap, posts });
  }, [hashmap, posts]);

  return (
    <>
      <UINavBar
        typeNav={hashmapKey ? 'edit' : 'create'}
        hashmapKey={hashmapKey}
      />
      <SectionHashmapEdit />
    </>
  );
};

Edit.propTypes = {
  hashmap: PropTypes.shape(),
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  handlerHashmap: PropTypes.func.isRequired,
  hashmapKey: PropTypes.string,
};

Edit.defaultProps = {
  hashmap: undefined,
  hashmapKey: undefined,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handlerHashmap: handlerHashmapUpdate }, dispatch);

const enhance = compose(
  Component => withAuthorization(Component, CREATE_HASHMAP),
  withSubscriptionHashmapData,
  connect(null, mapDispatchToProps)
);

export default enhance(Edit);
