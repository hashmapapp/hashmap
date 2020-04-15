import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { titleUpdate, subtitleUpdate } from 'app/redux/actions/hashmapActions';
import { TextArea } from 'app/components/UI/styles/styles';

const header = ({ title, subtitle, handlerTitle, handlerSubtitle }) => {
  return (
    <header className="container mx-auto px-4 md:px-64 md:py-8">
      <TextArea
        className="Title"
        rows="2"
        id="title"
        name="title"
        placeholder="Título"
        onChange={evt => {
          handlerTitle(evt.target.value);
        }}
        value={title}
      />
      <TextArea
        className="Text"
        rows="3"
        type="text"
        id="subtitle"
        name="subtitle"
        placeholder="Subtítulo"
        onChange={evt => {
          handlerSubtitle(evt.target.value);
        }}
        value={subtitle}
      />
    </header>
  );
};

header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  handlerTitle: PropTypes.func.isRequired,
  handlerSubtitle: PropTypes.func.isRequired,
};

header.defaultProps = {
  subtitle: '',
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { handlerTitle: titleUpdate, handlerSubtitle: subtitleUpdate },
    dispatch
  );

const mapStateToProps = state => ({
  title: state.hashmap.title,
  subtitle: state.hashmap.subtitle,
});

export default connect(mapStateToProps, mapDispatchToProps)(header);
