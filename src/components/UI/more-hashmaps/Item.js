import React from 'react';
import styled from 'styled-components';
import { Image } from 'app/components/UI/styles/styles';
import { Avatar } from 'app/components/hashmap/publication/components/style';

const Wrap = styled.div`
  h6 {
    font-family: 'Open Sans Regular';
  }

  span {
    display: grid;
    &.author {
      font-size: 0.8em;
    }

    &.info {
      color: #545b6294;
      font-size: 0.6em;
    }
  }
`;

const WrapImage = styled(Image)`
  padding: 15px 0px;
`;

const WrapAvatar = styled.div`
  padding-right: 0px;
`;

const Item = () => {
  return (
    <Wrap>
      <WrapImage
        src="https://siena.rosselcdn.net/sites/default/files/dpistyles_v2/ena_16_9_extra_big/2019/03/16/node_361216/1313078/public/2019/03/16/B9718926104Z.1_20190316212158_000%2BG0UD6AC6Q.1-0.jpg?itok=Mn-MJkZT1555584182"
        alt="img"
      />
      <h6>Algum título aqui</h6>
      <div className="row pb-4 pt-2">
        <WrapAvatar className="col col-lg-2 text-right">
          <Avatar src="imgs/avatar/pp.jpg" alt="avatar" />
        </WrapAvatar>
        <div className="col-md-auto text-left">
          <span className="author">Nome do cara</span>
          <span className="info">Info - xx/xx/xx</span>
        </div>
      </div>
    </Wrap>
  );
};

export default Item;
