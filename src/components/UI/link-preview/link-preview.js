import React from 'react';
import styled from 'styled-components';
import { GRAY, DARK_GRAY } from 'app/styles/colors';
import { Image } from 'app/components/UI/styles/styles';

const WrapLinkPreview = styled.div`
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  margin: 15px;
  padding: 0px;
  cursor: pointer;
`;

const WrapImage = styled(Image)`
  height: 220px;
`;

const WrapInfo = styled.div`
  background-color: ${GRAY};
  width: 100%;

  span {
    font-size: 12px;
    color: ${DARK_GRAY};
    font-family: 'Open Sans Light';
  }
`;

const LinkPreview = () => {
  return (
    <div className="row justify-content-md-center">
      <WrapLinkPreview
        className="col-8 text-center"
        onClick={() => {
          alert('Redirecionar para Site');
        }}
      >
        <WrapImage
          src="https://popseries.com.br/wp-content/uploads/2019/11/capitao-america-.jpg"
          alt="text"
        />
        <WrapInfo className="p-2 text-left">
          <span>link.com.br</span>
          <h6>As extraordinárias mulheres que reinventam o futuro no Nubank</h6>
        </WrapInfo>
      </WrapLinkPreview>
    </div>
  );
};

export default LinkPreview;
