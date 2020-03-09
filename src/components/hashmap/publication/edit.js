import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  titlePostUpdate,
  subtitlePostUpdate,
} from 'app/redux/actions/hashmapActions';

const ArticleCardBox = styled.article`
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  transition: 0.3s;
  width: 100%;
  margin: 2% 0%;
`;

// const LinkPreviewCard = styled.div`
//   border: solid 1px rgba(0, 0, 0, 0.05);
//   padding: 2%;
//   margin: 5% 0%;
// `;

const TitleTextArea = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  resize: none;
`;

const DescriptionTextArea = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  resize: none;
`;

// const LinkBar = styled.div`
//   box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
//   border-radius: 15px;
//   transition: 0.3s;
//   width: 100%;
//   margin: 1% 0%;
// `;

// const InputLink = styled.input`
//   padding-left: 15px;
//   border-radius: 15px;
//   width: 100%;
//   margin: 4px 0;
//   box-sizing: border-box;
//   border: none;
//   font-size: 1rem;
//   resize: none;
// `;

const Publication = ({ data, index, titlePostUpdate, subtitlePostUpdate }) => {
  return (
    <>
      {/* <LinkBar>
        <InputLink
          type="text"
          id="link"
          name="link"
          placeholder="https://seulinkaqui.com"
          onChange={e => {
            setLink(e.target.value);
          }}
          value={link || ''}
        />
      </LinkBar> */}
      <ArticleCardBox className="p-2">
        <TitleTextArea
          rows="1"
          type="text"
          id="title"
          name="title"
          placeholder="Título"
          onChange={e => {
            titlePostUpdate(e.target.value, index);
          }}
          value={data.title}
        />
        <hr />
        <DescriptionTextArea
          rows="10"
          type="text"
          id="description"
          name="description"
          placeholder="Descrição"
          onChange={e => {
            subtitlePostUpdate(e.target.value, index);
          }}
          value={data.description}
        />
      </ArticleCardBox>
    </>
  );
};

Publication.propTypes = {
  data: PropTypes.shape(),
};

Publication.defaultProps = {
  data: undefined,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ titlePostUpdate, subtitlePostUpdate }, dispatch);

export default connect(null, mapDispatchToProps)(Publication);
