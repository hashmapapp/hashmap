import React from 'react';
import styled from 'styled-components';
import { GRAY, DARK_GRAY } from 'app/styles/colors';
import { Image } from 'app/components/UI/styles/styles';

const WrapLinkPreview = styled.div`
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  margin: 15px;
  padding: 0px;
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
      <WrapLinkPreview className="col-8 text-center">
        <WrapImage
          src="https://media-exp1.licdn.com/dms/image/sync/C4D27AQEJe3NFEI55YA/articleshare-shrink_1280_800/0?e=1584320400&v=beta&t=vULgBma57hdVkVaMCb5LyTntvylPQ2BWp2n4LxahUJk"
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
