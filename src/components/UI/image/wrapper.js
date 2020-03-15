import React from 'react';
import { Image } from 'app/components/UI/styles/styles';
import styled from 'styled-components';
import { DARK_GRAY } from 'app/styles/colors';

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

export default WrapImage;
