import React from 'react';
import { Image } from 'app/components/UI/styles/styles';
import styled from 'styled-components';
import { DARK_GRAY } from 'app/styles/colors';
import PropTypes from 'prop-types';

const Description = styled.span`
  font-size: 10px;
  color: ${DARK_GRAY};
`;

const WrapImg = styled(Image)`
  padding-bottom: 8px;
`;

const WrapImage = ({ src, alt, description }) => {
  return (
    <div className="text-center pb-4">
      <WrapImg src={src} alt={alt} />
      {description && <Description className="m-2">{description}</Description>}
    </div>
  );
};

WrapImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  description: PropTypes.string,
};

WrapImage.defaultProps = {
  alt: '',
  description: '',
};

export default WrapImage;
