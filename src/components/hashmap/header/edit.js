import React from 'react';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { titleUpdate, subtitleUpdate } from 'app/redux/actions/hashmapActions';

const TitleTextArea = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 2.5rem;
  resize: none;
  font-family: 'Open Sans Bold', sans-serif;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SubTitleTextArea = styled.textarea`
  width: 100%;
  margin: 4px 0;
  box-sizing: border-box;
  border: none;
  font-size: 1rem;
  resize: none;
  font-family: 'Open Sans Regular', sans-serif;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const header = ({ title, subtitle, titleUpdate, subtitleUpdate }) => {
  return (
    <header>
      <TitleTextArea
        rows="2"
        id="title"
        name="title"
        placeholder="Título"
        onChange={evt => {
          titleUpdate(evt.target.value);
        }}
        value={title}
      />
      <SubTitleTextArea
        rows="3"
        type="text"
        id="subtitle"
        name="subtitle"
        placeholder="Subtítulo"
        onChange={evt => {
          subtitleUpdate(evt.target.value);
        }}
        value={subtitle}
      />
    </header>
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ titleUpdate, subtitleUpdate }, dispatch);

const mapStateToProps = state => ({
  title: state.hashmap.title,
  subtitle: state.hashmap.subtitle,
});

export default connect(mapStateToProps, mapDispatchToProps)(header);
