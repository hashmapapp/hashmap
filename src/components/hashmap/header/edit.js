import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { titleUpdate, subtitleUpdate } from 'app/redux/actions/hashmapActions';
import { TextArea } from 'app/components/UI/styles/styles';

const header = ({ title, subtitle, handlerTitle, handlerSubtitle }) => {
  return (
    <header className="container mx-auto px-4 md:px-64 py-8">
      <h6 className="pt-2 px-2 font-sans text-lg text-gray-500">Título *</h6>
      <TextArea
        className="Title"
        rows="2"
        id="title"
        name="title"
        placeholder="Um título bem legal aqui!"
        onChange={evt => {
          handlerTitle(evt.target.value);
        }}
        value={title}
        maxLength="50"
      />
      <h6 className="pt-2 px-2 font-sans text-lg text-gray-500">
        Subtítulo (Opcional)
      </h6>
      <TextArea
        className="Text"
        rows="2"
        type="text"
        id="subtitle"
        name="subtitle"
        placeholder="Aqui você pode colocar algo que complete o título, este texto aparecerá na sua home, junto com o título e a capa do seu hashmap."
        onChange={evt => {
          handlerSubtitle(evt.target.value);
        }}
        value={subtitle}
        maxLength="150"
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
